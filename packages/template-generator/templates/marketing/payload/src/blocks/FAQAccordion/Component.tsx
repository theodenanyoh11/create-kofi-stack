"use client"

import RichText from "@/components/RichText"
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion"
import type { FAQAccordionBlock as FAQAccordionBlockProps, Faq } from "@/payload-types"
import { cn } from "@/utilities/ui"
import type React from "react"

export const FAQAccordionBlock: React.FC<FAQAccordionBlockProps> = ({
	heading,
	subheading,
	style = "default",
	faqs,
}) => {
	// Type guard to ensure we have FAQ objects, not just IDs
	const faqItems = (faqs || []).filter((faq): faq is Faq => typeof faq === "object" && faq !== null)

	if (faqItems.length === 0) {
		return null
	}

	const isCentered = style === "centered"
	const isTwoColumn = style === "twoColumn"

	// Split FAQs into two columns for two-column layout
	const midpoint = Math.ceil(faqItems.length / 2)
	const leftColumnFaqs = isTwoColumn ? faqItems.slice(0, midpoint) : faqItems
	const rightColumnFaqs = isTwoColumn ? faqItems.slice(midpoint) : []

	const renderFAQAccordion = (items: Faq[], columnKey: string) => (
		<Accordion type="single" collapsible className="w-full">
			{items.map((faq, index) => (
				<AccordionItem
					key={faq.id || `${columnKey}-${index}`}
					value={`${columnKey}-item-${index}`}
					className="border-b border-border/50"
				>
					<AccordionTrigger className="text-left text-base md:text-lg font-semibold hover:no-underline py-5">
						{faq.question}
					</AccordionTrigger>
					<AccordionContent className="text-muted-foreground pb-5">
						{faq.answer && (
							<RichText
								data={faq.answer}
								enableGutter={false}
								enableProse={false}
								className="prose-sm"
							/>
						)}
					</AccordionContent>
				</AccordionItem>
			))}
		</Accordion>
	)

	return (
		<section className="py-16 md:py-24">
			<div className="container">
				{/* Header */}
				{(heading || subheading) && (
					<div className={cn("mb-12 md:mb-16", isCentered && "text-center max-w-3xl mx-auto")}>
						{heading && (
							<h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
								{heading}
							</h2>
						)}
						{subheading && <p className="text-lg md:text-xl text-muted-foreground">{subheading}</p>}
					</div>
				)}

				{/* FAQ Content */}
				{isTwoColumn ? (
					<div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16">
						<div>{renderFAQAccordion(leftColumnFaqs, "left")}</div>
						<div>{renderFAQAccordion(rightColumnFaqs, "right")}</div>
					</div>
				) : (
					<div className={cn(isCentered && "max-w-3xl mx-auto")}>
						{renderFAQAccordion(faqItems, "main")}
					</div>
				)}
			</div>
		</section>
	)
}
