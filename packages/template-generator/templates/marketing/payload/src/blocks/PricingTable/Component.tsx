"use client"

import { Check, Loader2, X } from "lucide-react"
import Link from "next/link"
import type React from "react"
import { useEffect, useState } from "react"

import type { PricingTableBlock as PricingTableBlockProps } from "@/payload-types"

import { CTATracker, PricingViewTracker } from "@/components/Analytics"
import { CMSLink } from "@/components/Link"
import { cn } from "@/utilities/ui"

import { PricingComparisonTable } from "./ComparisonTable"

type BillingPeriod = "monthly" | "annual"

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
 * Dynamic plan type with features from Stripe
 */
interface DynamicPlan {
	planId: string
	stripeProductId: string
	name: string
	description: string
	features: PlanFeature[]
	monthlyAmount: number
	annualAmount: number
	annualDiscount: number
	popular: boolean
	order: number
}

interface PricingApiResponse {
	plans: DynamicPlan[]
	allFeatures: AllFeature[]
	lastFetched: number
	error?: string
}

/**
 * Format price in cents to display string
 */
function formatPrice(cents: number): string {
	const dollars = cents / 100
	if (dollars === 0) return "$0"
	if (dollars % 1 === 0) {
		return `$${dollars.toLocaleString()}`
	}
	return dollars.toLocaleString("en-US", {
		style: "currency",
		currency: "USD",
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})
}

/**
 * Billing period toggle component
 */
function BillingToggle({
	billingPeriod,
	onBillingPeriodChange,
	discountPercentage,
}: {
	billingPeriod: BillingPeriod
	onBillingPeriodChange: (period: BillingPeriod) => void
	discountPercentage?: number
}) {
	const isAnnual = billingPeriod === "annual"

	return (
		<div className="flex items-center justify-center gap-3 mb-12">
			<button
				type="button"
				onClick={() => onBillingPeriodChange("monthly")}
				className={cn(
					"text-sm font-medium transition-colors",
					!isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground",
				)}
			>
				Monthly
			</button>

			{/* Toggle Switch */}
			<button
				type="button"
				role="switch"
				aria-checked={isAnnual}
				aria-label={`Switch to ${isAnnual ? "monthly" : "annual"} billing`}
				onClick={() => onBillingPeriodChange(isAnnual ? "monthly" : "annual")}
				className={cn(
					"relative h-7 w-14 rounded-full border-2 border-primary transition-colors",
					isAnnual ? "bg-primary" : "bg-muted",
				)}
			>
				<div
					className={cn(
						"absolute top-0.5 size-5 rounded-full shadow-sm transition-all duration-200",
						isAnnual ? "left-[calc(100%-24px)] bg-white" : "left-0.5 bg-primary",
					)}
				/>
			</button>

			<div className="flex items-center gap-2">
				<button
					type="button"
					onClick={() => onBillingPeriodChange("annual")}
					className={cn(
						"text-sm font-medium transition-colors",
						isAnnual ? "text-foreground" : "text-muted-foreground hover:text-foreground",
					)}
				>
					Annual
				</button>

				{discountPercentage && discountPercentage > 0 && (
					<span className="inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
						Save {discountPercentage}%
					</span>
				)}
			</div>
		</div>
	)
}

/**
 * Dynamic pricing card component with Stripe features
 */
function DynamicPricingCard({
	plan,
	billingPeriod,
	ctaLink,
	isPopular,
	maxFeatures = 4,
}: {
	plan: DynamicPlan
	billingPeriod: BillingPeriod
	ctaLink?: NonNullable<PricingTableBlockProps["plans"]>[number]["link"]
	isPopular: boolean
	maxFeatures?: number
}) {
	const isAnnual = billingPeriod === "annual"
	const price = isAnnual ? plan.annualAmount : plan.monthlyAmount
	const monthlyEquivalent = isAnnual ? Math.round(plan.annualAmount / 12) : plan.monthlyAmount

	// Get CTA label based on plan
	const ctaLabel = plan.planId === "free" ? "Get Started Free" : `Get ${plan.name}`

	// Limit features shown on card
	const displayFeatures = plan.features.slice(0, maxFeatures)
	const hasMoreFeatures = plan.features.length > maxFeatures

	return (
		<div
			className={cn(
				"relative flex flex-col p-8 rounded-xl border transition-all",
				isPopular ? "border-primary bg-primary/5 shadow-lg scale-105" : "border-border bg-card",
			)}
		>
			{isPopular && (
				<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
					Most Popular
				</div>
			)}

			<div className="mb-6">
				<h3 className="text-xl font-semibold mb-2">{plan.name}</h3>
				<div className="flex items-baseline gap-1">
					<span className="text-4xl font-bold">{formatPrice(monthlyEquivalent)}</span>
					<span className="text-muted-foreground">/month</span>
				</div>
				{isAnnual && plan.monthlyAmount > 0 && (
					<p className="text-sm text-muted-foreground mt-1">{formatPrice(price)} billed annually</p>
				)}
				{isAnnual && plan.annualDiscount > 0 && (
					<span className="inline-flex items-center mt-2 px-2 py-0.5 rounded-full text-xs font-medium bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400">
						Save {plan.annualDiscount}%
					</span>
				)}
				<p className="text-muted-foreground text-sm mt-2">{plan.description}</p>
			</div>

			<ul className="space-y-3 mb-8 flex-grow">
				{displayFeatures.map((feature) => (
					<li key={feature.id} className="flex items-center gap-3">
						<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
						<span className="text-sm">{feature.name}</span>
					</li>
				))}
				{hasMoreFeatures && (
					<li className="text-sm text-muted-foreground">
						+{plan.features.length - maxFeatures} more features
					</li>
				)}
			</ul>

			<CTATracker location="pricing" variant={plan.name}>
				{ctaLink ? (
					<CMSLink
						{...ctaLink}
						label={ctaLabel}
						className="w-full"
						appearance={isPopular ? "default" : "outline"}
					/>
				) : (
					<Link
						href="/sign-up"
						className={cn(
							"inline-flex items-center justify-center w-full px-4 py-2 rounded-md text-sm font-medium transition-colors",
							isPopular
								? "bg-primary text-primary-foreground hover:bg-primary/90"
								: "border border-input bg-background hover:bg-accent hover:text-accent-foreground",
						)}
					>
						{ctaLabel}
					</Link>
				)}
			</CTATracker>
		</div>
	)
}

export const PricingTableBlock: React.FC<PricingTableBlockProps> = ({
	heading,
	subheading,
	useDynamicPricing = true,
	showComparisonTable = true,
	showViewAllLink = false,
	maxFeaturesOnCard = 4,
	plans: cmsPlans,
}) => {
	const [dynamicPlans, setDynamicPlans] = useState<DynamicPlan[] | null>(null)
	const [allFeatures, setAllFeatures] = useState<AllFeature[]>([])
	const [isLoading, setIsLoading] = useState(useDynamicPricing)
	const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("monthly")

	// Fetch dynamic pricing from API (only if enabled)
	useEffect(() => {
		if (!useDynamicPricing) {
			setIsLoading(false)
			return
		}

		const fetchPricing = async () => {
			try {
				const response = await fetch("/api/pricing")
				if (response.ok) {
					const data: PricingApiResponse = await response.json()
					if (data.plans && data.plans.length > 0) {
						setDynamicPlans(data.plans)
						setAllFeatures(data.allFeatures || [])
					}
				}
			} catch (error) {
				console.error("Failed to fetch pricing:", error)
				// Fall back to CMS plans
			} finally {
				setIsLoading(false)
			}
		}

		fetchPricing()
	}, [useDynamicPricing])

	// Calculate max discount for display
	const maxDiscount = dynamicPlans ? Math.max(...dynamicPlans.map((p) => p.annualDiscount)) : 0

	// Map CMS plan links to dynamic plans
	const getCmsLinkForPlan = (planName: string) => {
		const cmsPlan = cmsPlans?.find((p) => p.name?.toLowerCase() === planName.toLowerCase())
		return cmsPlan?.link
	}

	// Find the index of the first plan marked as popular (only show badge on ONE plan)
	const popularPlanIndex = dynamicPlans?.findIndex((p) => p.popular) ?? -1

	return (
		<PricingViewTracker>
			<section className="py-20 md:py-28">
				<div className="container">
					{(heading || subheading) && (
						<div className="text-center mb-12 max-w-3xl mx-auto">
							{heading && <h2 className="text-3xl md:text-4xl font-bold mb-4">{heading}</h2>}
							{subheading && <p className="text-lg text-muted-foreground">{subheading}</p>}
						</div>
					)}

					{/* Loading State */}
					{isLoading && (
						<div className="flex justify-center py-12">
							<Loader2 className="size-8 animate-spin text-muted-foreground" />
						</div>
					)}

					{/* Dynamic Pricing with Toggle */}
					{!isLoading && dynamicPlans && dynamicPlans.length > 0 && (
						<>
							<BillingToggle
								billingPeriod={billingPeriod}
								onBillingPeriodChange={setBillingPeriod}
								discountPercentage={maxDiscount > 0 ? maxDiscount : undefined}
							/>

							<div
								className={cn(
									"grid gap-8 max-w-5xl mx-auto",
									dynamicPlans.length === 1 && "max-w-md",
									dynamicPlans.length === 2 && "md:grid-cols-2 max-w-3xl",
									dynamicPlans.length >= 3 && "md:grid-cols-2 lg:grid-cols-3",
								)}
							>
								{dynamicPlans.map((plan, index) => (
									<DynamicPricingCard
										key={plan.planId}
										plan={plan}
										billingPeriod={billingPeriod}
										ctaLink={getCmsLinkForPlan(plan.name)}
										isPopular={index === popularPlanIndex}
										maxFeatures={maxFeaturesOnCard ?? 4}
									/>
								))}
							</div>

							{/* View Full Comparison Link (for home page) */}
							{showViewAllLink && !showComparisonTable && (
								<div className="text-center mt-8">
									<Link
										href="/pricing"
										className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:underline"
									>
										View full feature comparison
										<span aria-hidden="true">→</span>
									</Link>
								</div>
							)}

							{/* Comparison Table */}
							{showComparisonTable && allFeatures.length > 0 && (
								<PricingComparisonTable
									plans={dynamicPlans}
									allFeatures={allFeatures}
									className="max-w-5xl mx-auto"
								/>
							)}
						</>
					)}

					{/* Fallback to CMS Plans (if dynamic fetch fails) */}
					{!isLoading && !dynamicPlans && Array.isArray(cmsPlans) && cmsPlans.length > 0 && (
						<div
							className={cn(
								"grid gap-8 max-w-5xl mx-auto",
								cmsPlans.length === 1 && "max-w-md",
								cmsPlans.length === 2 && "md:grid-cols-2 max-w-3xl",
								cmsPlans.length >= 3 && "md:grid-cols-2 lg:grid-cols-3",
							)}
						>
							{cmsPlans.map((plan, index) => (
								<div
									key={plan.name || `plan-${index}`}
									className={cn(
										"relative flex flex-col p-8 rounded-xl border",
										plan.featured
											? "border-primary bg-primary/5 shadow-lg scale-105"
											: "border-border bg-card",
									)}
								>
									{plan.featured && (
										<div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
											Most Popular
										</div>
									)}

									<div className="mb-6">
										{plan.name && <h3 className="text-xl font-semibold mb-2">{plan.name}</h3>}
										{plan.price && <div className="text-4xl font-bold mb-2">{plan.price}</div>}
										{plan.description && (
											<p className="text-muted-foreground text-sm">{plan.description}</p>
										)}
									</div>

									{Array.isArray(plan.features) && plan.features.length > 0 && (
										<ul className="space-y-3 mb-8 flex-grow">
											{plan.features.map((item) => (
												<li key={item.feature} className="flex items-center gap-3">
													{item.included ? (
														<Check className="w-5 h-5 text-green-500 flex-shrink-0" />
													) : (
														<X className="w-5 h-5 text-muted-foreground flex-shrink-0" />
													)}
													<span
														className={cn(
															"text-sm",
															!item.included && "text-muted-foreground line-through",
														)}
													>
														{item.feature}
													</span>
												</li>
											))}
										</ul>
									)}

									{plan.link && (
										<CTATracker location="pricing" variant={plan.name || `plan_${index}`}>
											<CMSLink
												{...plan.link}
												className="w-full"
												appearance={plan.featured ? "default" : "outline"}
											/>
										</CTATracker>
									)}
								</div>
							))}
						</div>
					)}
				</div>
			</section>
		</PricingViewTracker>
	)
}
