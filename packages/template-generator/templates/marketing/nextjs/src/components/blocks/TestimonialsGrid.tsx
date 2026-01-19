"use client"

import { cn } from "@/lib/utils"

interface Testimonial {
  stat: string
  statLabel: string
  quote: string
  author: string
  company: string
}

interface TestimonialsGridProps {
  heading?: string
  subheading?: string
  testimonials?: Testimonial[]
}

const defaultTestimonials: Testimonial[] = [
  {
    stat: "94%",
    statLabel: "Faster onboarding",
    quote:
      "We got our entire team onboarded in under a day. The intuitive interface and powerful integrations saved us weeks of setup time.",
    author: "Sarah Chen",
    company: "TechFlow Inc",
  },
  {
    stat: "3x",
    statLabel: "Productivity",
    quote:
      "Our team is shipping features faster than ever. The automation tools eliminated hours of manual work every week.",
    author: "Marcus Rivera",
    company: "Beacon Digital",
  },
  {
    stat: "40%",
    statLabel: "Cost reduction",
    quote:
      "We consolidated five different tools into SaaSify. The ROI was immediate and our team loves having everything in one place.",
    author: "David Kim",
    company: "Cascade Systems",
  },
]

export function TestimonialsGrid({
  heading = "Loved by teams at companies of all sizes",
  subheading = "See how leading teams use SaaSify to drive growth and productivity.",
  testimonials = defaultTestimonials,
}: TestimonialsGridProps) {
  const displayTestimonials = testimonials.length > 0 ? testimonials : defaultTestimonials

  return (
    <section className="py-16 md:py-24">
      <div className="container mx-auto px-4">
        {/* Header */}
        {(heading || subheading) && (
          <div className="text-center mb-12 md:mb-16 max-w-3xl mx-auto">
            {heading && (
              <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight mb-4">
                {heading}
              </h2>
            )}
            {subheading && (
              <p className="text-lg md:text-xl text-muted-foreground">
                {subheading}
              </p>
            )}
          </div>
        )}

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {displayTestimonials.map((testimonial) => (
            <div
              key={testimonial.author}
              className="relative bg-card border border-border rounded-2xl p-6 md:p-8"
            >
              {/* Stat */}
              <div className="mb-6">
                <div className="text-4xl md:text-5xl font-bold text-primary mb-1">
                  {testimonial.stat}
                </div>
                <p className="text-sm font-medium text-muted-foreground">
                  {testimonial.statLabel}
                </p>
              </div>

              {/* Quote */}
              <blockquote className="text-foreground mb-6">
                "{testimonial.quote}"
              </blockquote>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {testimonial.author
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-foreground">
                    {testimonial.author}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
