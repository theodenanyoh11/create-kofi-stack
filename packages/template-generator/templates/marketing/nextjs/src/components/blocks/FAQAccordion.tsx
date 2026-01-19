"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"

interface FAQItem {
  question: string
  answer: string
}

interface FAQAccordionProps {
  heading?: string
  subheading?: string
  items?: FAQItem[]
}

const defaultFAQs: FAQItem[] = [
  {
    question: "How does the free trial work?",
    answer:
      "Our 14-day free trial gives you full access to all features with no credit card required. At the end of your trial, you can choose the plan that best fits your needs.",
  },
  {
    question: "Can I change plans at any time?",
    answer:
      "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any billing differences.",
  },
  {
    question: "What payment methods do you accept?",
    answer:
      "We accept all major credit cards (Visa, Mastercard, American Express) as well as PayPal. For Enterprise plans, we also offer invoicing.",
  },
  {
    question: "Is my data secure?",
    answer:
      "Absolutely. We use industry-standard encryption (AES-256) for all data at rest and in transit. We're SOC 2 Type II certified and GDPR compliant.",
  },
  {
    question: "Do you offer discounts for nonprofits or educational institutions?",
    answer:
      "Yes! We offer 50% off for qualified nonprofits and educational institutions. Contact our sales team to learn more about our discount programs.",
  },
  {
    question: "What kind of support do you offer?",
    answer:
      "All plans include email support with 24-hour response time. Professional plans get priority support, and Enterprise plans include a dedicated success manager.",
  },
]

export function FAQAccordion({
  heading = "Frequently asked questions",
  subheading = "Everything you need to know about SaaSify",
  items = defaultFAQs,
}: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Accordion */}
        <div className="max-w-3xl mx-auto">
          {items.map((item, index) => (
            <div
              key={index}
              className="border-b border-border"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="flex items-center justify-between w-full py-5 text-left"
              >
                <span className="font-medium text-foreground pr-4">
                  {item.question}
                </span>
                <ChevronDown
                  className={cn(
                    "h-5 w-5 text-muted-foreground transition-transform shrink-0",
                    openIndex === index && "rotate-180"
                  )}
                />
              </button>
              <div
                className={cn(
                  "overflow-hidden transition-all",
                  openIndex === index ? "max-h-96 pb-5" : "max-h-0"
                )}
              >
                <p className="text-muted-foreground">{item.answer}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Still have questions?
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Contact support
          </a>
        </div>
      </div>
    </section>
  )
}
