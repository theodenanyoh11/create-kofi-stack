import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { PricingTable, FinalCTA } from "@/components/blocks"

export default function PricingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Simple, transparent pricing
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Start free, upgrade as your team grows. No hidden fees, no surprises.
            </p>
          </div>
        </section>

        {/* Pricing Table */}
        <PricingTable
          heading=""
          subheading=""
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to get started?"
          subheading="Join thousands of teams who chose the smarter way to work."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Contact sales", href: "/contact", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
