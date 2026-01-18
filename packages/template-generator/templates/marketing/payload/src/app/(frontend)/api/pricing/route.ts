import { NextResponse } from "next/server"
import Stripe from "stripe"

/**
 * Stripe Lookup Keys - defined in Stripe Dashboard for each price
 * These must match the lookup keys configured in your Stripe Dashboard
 */
const STRIPE_LOOKUP_KEYS = {
	free_monthly: "free_monthly",
	free_annual: "free_annual",
	pro_monthly: "pro_monthly",
	pro_annual: "pro_annual",
	business_monthly: "business_monthly",
	business_annual: "business_annual",
} as const

/**
 * Default product metadata when Stripe metadata is missing
 */
const DEFAULT_PRODUCT_INFO: Record<
	string,
	{ description: string; popular: boolean; order: number }
> = {
	free: { description: "Perfect for getting started", popular: false, order: 1 },
	pro: { description: "For growing businesses", popular: false, order: 2 },
	business: { description: "For teams and agencies", popular: true, order: 3 },
}

/**
 * Feature type from Stripe Entitlements
 */
interface PlanFeature {
	id: string
	lookupKey: string
	name: string
	metadata?: Record<string, string>
}

/**
 * All features type for comparison table
 */
interface AllFeature {
	id: string
	lookupKey: string
	name: string
	category?: string
	metadata?: Record<string, string>
}

/**
 * Plan pricing type with features from Stripe
 */
interface PlanPricing {
	planId: string
	stripeProductId: string
	name: string
	description: string
	features: PlanFeature[]
	monthlyPriceId?: string
	monthlyAmount: number
	annualPriceId?: string
	annualAmount: number
	annualDiscount: number
	popular: boolean
	order: number
}

/**
 * Fetch pricing and features from Stripe and return formatted data
 * GET /api/pricing
 *
 * Returns JSON with plan pricing and features for the marketing site
 */
export async function GET() {
	try {
		const stripeSecretKey = process.env.STRIPE_SECRET_KEY

		if (!stripeSecretKey) {
			return NextResponse.json(
				{
					plans: [],
					allFeatures: [],
					lastFetched: Date.now(),
					error: "Stripe not configured",
				},
				{ status: 200 },
			)
		}

		const stripe = new Stripe(stripeSecretKey)

		// Fetch all features for comparison table
		const allFeatures: AllFeature[] = []
		try {
			const featuresResponse = await stripe.entitlements.features.list({ limit: 100 })
			for (const feature of featuresResponse.data) {
				allFeatures.push({
					id: feature.id,
					lookupKey: feature.lookup_key,
					name: feature.name,
					category: feature.metadata?.category,
					metadata: feature.metadata as Record<string, string> | undefined,
				})
			}
		} catch (err) {
			console.error("Error fetching Stripe features:", err)
		}

		// Fetch prices with product info
		const priceMap = new Map<string, { id: string; amount: number; productId: string }>()

		try {
			const allLookupKeys = Object.values(STRIPE_LOOKUP_KEYS)
			const prices = await stripe.prices.list({
				lookup_keys: allLookupKeys,
				active: true,
				expand: ["data.product"],
				limit: 20,
			})

			for (const price of prices.data) {
				if (price.lookup_key && price.unit_amount !== null) {
					const productId = typeof price.product === "string" ? price.product : price.product?.id
					if (productId) {
						priceMap.set(price.lookup_key, {
							id: price.id,
							amount: price.unit_amount,
							productId,
						})
					}
				}
			}
		} catch (stripeError) {
			console.error("Error fetching Stripe prices:", stripeError)
		}

		// Group prices by product
		const productPrices = new Map<
			string,
			{ monthly?: { id: string; amount: number }; annual?: { id: string; amount: number } }
		>()

		for (const [lookupKey, priceData] of priceMap.entries()) {
			const isAnnual = lookupKey.endsWith("_annual")
			const existingPrices = productPrices.get(priceData.productId) || {}

			if (isAnnual) {
				existingPrices.annual = { id: priceData.id, amount: priceData.amount }
			} else {
				existingPrices.monthly = { id: priceData.id, amount: priceData.amount }
			}

			productPrices.set(priceData.productId, existingPrices)
		}

		// Build plans from products
		const plans: PlanPricing[] = []

		for (const [productId, prices] of productPrices.entries()) {
			// Fetch product details
			let product: Stripe.Product | null = null
			try {
				const fetched = await stripe.products.retrieve(productId)
				if (!fetched.deleted) {
					product = fetched
				}
			} catch (err) {
				console.error(`Error fetching product ${productId}:`, err)
				continue
			}

			if (!product) continue

			// Get plan ID from product metadata
			const planId = product.metadata?.plan_id
			if (!planId) {
				console.warn(`Product ${productId} missing plan_id metadata, skipping`)
				continue
			}

			// Fetch features for this product
			const features: PlanFeature[] = []
			try {
				const productFeatures = await stripe.products.listFeatures(productId, {
					limit: 100,
				})
				for (const pf of productFeatures.data) {
					features.push({
						id: pf.entitlement_feature.id,
						lookupKey: pf.entitlement_feature.lookup_key,
						name: pf.entitlement_feature.name,
						metadata: pf.entitlement_feature.metadata as Record<string, string> | undefined,
					})
				}
			} catch (err) {
				console.error(`Error fetching features for product ${productId}:`, err)
			}

			// Get metadata or use defaults
			const defaultInfo = DEFAULT_PRODUCT_INFO[planId] || {
				description: "",
				popular: false,
				order: 99,
			}
			const description =
				product.metadata?.description || product.description || defaultInfo.description
			const popular = product.metadata?.popular === "true" || defaultInfo.popular
			const order = Number.parseInt(product.metadata?.order || String(defaultInfo.order), 10)

			const monthlyAmount = prices.monthly?.amount ?? 0
			const annualAmount = prices.annual?.amount ?? 0

			// Calculate annual discount
			const yearlyMonthlyEquivalent = monthlyAmount * 12
			const annualDiscount =
				yearlyMonthlyEquivalent > 0
					? Math.round(((yearlyMonthlyEquivalent - annualAmount) / yearlyMonthlyEquivalent) * 100)
					: 0

			plans.push({
				planId,
				stripeProductId: productId,
				name: product.name,
				description,
				features,
				monthlyPriceId: prices.monthly?.id,
				monthlyAmount,
				annualPriceId: prices.annual?.id,
				annualAmount,
				annualDiscount: Math.max(0, annualDiscount),
				popular,
				order,
			})
		}

		// Sort plans by order
		plans.sort((a, b) => a.order - b.order)

		return NextResponse.json(
			{
				plans,
				allFeatures,
				lastFetched: Date.now(),
			},
			{
				status: 200,
				headers: {
					// Cache for 1 hour on CDN, revalidate in background
					"Cache-Control": "public, s-maxage=3600, stale-while-revalidate=7200",
				},
			},
		)
	} catch (error) {
		console.error("Pricing API error:", error)

		return NextResponse.json(
			{
				plans: [],
				allFeatures: [],
				lastFetched: Date.now(),
				error: "Failed to fetch pricing",
			},
			{ status: 200 },
		)
	}
}
