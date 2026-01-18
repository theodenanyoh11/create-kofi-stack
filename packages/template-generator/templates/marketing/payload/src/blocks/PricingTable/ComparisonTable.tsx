"use client"

import { Check, X } from "lucide-react"
import React from "react"

import { cn } from "@/utilities/ui"

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
 * Plan type for comparison
 */
interface Plan {
	planId: string
	name: string
	features: PlanFeature[]
	popular?: boolean
}

/**
 * Props for the comparison table
 */
interface PricingComparisonTableProps {
	plans: Plan[]
	allFeatures: AllFeature[]
	className?: string
}

/**
 * Feature category labels for display
 */
const CATEGORY_LABELS: Record<string, string> = {
	limits: "Directories & Listings",
	templates: "Templates",
	core: "Core Features",
	infrastructure: "Infrastructure",
	content: "Content & Customization",
	branding: "Branding",
	monetization: "Monetization",
	developer: "Developer Tools",
	analytics: "Analytics",
	collaboration: "Team & Collaboration",
	support: "Support",
}

/**
 * Category display order
 */
const CATEGORY_ORDER = [
	"limits",
	"templates",
	"core",
	"infrastructure",
	"content",
	"branding",
	"monetization",
	"developer",
	"analytics",
	"collaboration",
	"support",
]

/**
 * Get the feature value to display (e.g., "5" for directory limit)
 */
function getFeatureValue(plan: Plan, feature: AllFeature): string | boolean {
	const planFeature = plan.features.find((f) => f.lookupKey === feature.lookupKey)
	if (!planFeature) return false

	// Check for limit metadata
	const limit = planFeature.metadata?.limit || feature.metadata?.limit
	if (limit) {
		if (limit === "-1") return "Unlimited"
		return limit
	}

	return true
}

/**
 * Group features by category
 */
function groupFeaturesByCategory(features: AllFeature[]): Map<string, AllFeature[]> {
	const grouped = new Map<string, AllFeature[]>()

	for (const feature of features) {
		const category = feature.category || "other"
		const existing = grouped.get(category) || []
		existing.push(feature)
		grouped.set(category, existing)
	}

	return grouped
}

/**
 * Feature cell component
 */
function FeatureCell({
	value,
	isPopular,
}: {
	value: string | boolean
	isPopular?: boolean
}) {
	if (value === false) {
		return (
			<td className={cn("px-4 py-3 text-center", isPopular && "bg-primary/5")}>
				<X className="mx-auto size-5 text-muted-foreground/40" />
			</td>
		)
	}

	if (value === true) {
		return (
			<td className={cn("px-4 py-3 text-center", isPopular && "bg-primary/5")}>
				<Check className="mx-auto size-5 text-green-500" />
			</td>
		)
	}

	// String value (e.g., "5" or "Unlimited")
	return (
		<td className={cn("px-4 py-3 text-center font-medium", isPopular && "bg-primary/5")}>
			{value}
		</td>
	)
}

/**
 * Pricing comparison table component
 * Shows a grid of features (rows) vs plans (columns)
 */
export const PricingComparisonTable: React.FC<PricingComparisonTableProps> = ({
	plans,
	allFeatures,
	className,
}) => {
	if (!plans.length || !allFeatures.length) {
		return null
	}

	// Find the index of the first plan marked as popular (only show badge on ONE plan)
	const popularPlanIndex = plans.findIndex((p) => p.popular)

	// Group features by category
	const groupedFeatures = groupFeaturesByCategory(allFeatures)

	// Get sorted categories
	const sortedCategories = [...groupedFeatures.keys()].sort((a, b) => {
		const aIndex = CATEGORY_ORDER.indexOf(a)
		const bIndex = CATEGORY_ORDER.indexOf(b)
		if (aIndex === -1 && bIndex === -1) return a.localeCompare(b)
		if (aIndex === -1) return 1
		if (bIndex === -1) return -1
		return aIndex - bIndex
	})

	return (
		<div className={cn("mt-16", className)}>
			<h3 className="text-2xl font-bold text-center mb-8">Full Feature Comparison</h3>

			<div className="overflow-x-auto">
				<table className="w-full border-collapse">
					{/* Header with plan names */}
					<thead>
						<tr className="border-b">
							<th className="py-4 px-4 text-left font-semibold">Features</th>
							{plans.map((plan, index) => {
								const isPopular = index === popularPlanIndex
								return (
									<th
										key={plan.planId}
										className={cn(
											"py-4 px-4 text-center font-semibold min-w-[120px]",
											isPopular && "bg-primary/5",
										)}
									>
										<span className="block">{plan.name}</span>
										{isPopular && (
											<span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-primary text-primary-foreground rounded-full">
												Popular
											</span>
										)}
									</th>
								)
							})}
						</tr>
					</thead>

					<tbody>
						{sortedCategories.map((category) => {
							const categoryFeatures = groupedFeatures.get(category) || []
							const categoryLabel = CATEGORY_LABELS[category] || category

							return (
								<React.Fragment key={`category-${category}`}>
									{/* Category header row */}
									<tr className="bg-muted/50">
										<td
											colSpan={plans.length + 1}
											className="py-3 px-4 font-semibold text-sm uppercase tracking-wide text-muted-foreground"
										>
											{categoryLabel}
										</td>
									</tr>

									{/* Feature rows */}
									{categoryFeatures.map((feature) => (
										<tr key={feature.id} className="border-b border-border/50 hover:bg-muted/30">
											<td className="py-3 px-4 text-sm">{feature.name}</td>
											{plans.map((plan, index) => (
												<FeatureCell
													key={`${plan.planId}-${feature.id}`}
													value={getFeatureValue(plan, feature)}
													isPopular={index === popularPlanIndex}
												/>
											))}
										</tr>
									))}
								</React.Fragment>
							)
						})}
					</tbody>
				</table>
			</div>
		</div>
	)
}

export default PricingComparisonTable
