import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { ProductShowcaseHero } from "@/components/heros"
import {
  LogoBanner,
  ProofBanner,
  BentoFeatures,
  FeatureShowcase,
  IndustryTabs,
  TestimonialsGrid,
  TrustColumns,
  PricingTable,
  FinalCTA,
} from "@/components/blocks"

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero Section */}
        <ProductShowcaseHero
          headline="The modern platform for growing teams"
          description="Streamline workflows, boost productivity, and scale your business with one powerful platform."
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "default" },
            { label: "Watch demo", href: "/demo", variant: "outline" },
          ]}
        />

        {/* Logo Banner - Social proof */}
        <LogoBanner
          heading="Trusted by fast-growing companies everywhere"
          style="scroll"
        />

        {/* Value Proposition */}
        <ProofBanner
          headline="Transform how your team works, collaborates, and grows"
          subtext="Every interaction feeds into a powerful platform that powers personalized experiences, seamless collaboration, and intelligent automation across every touchpoint."
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "default" },
            { label: "Book a demo", href: "/contact", variant: "outline" },
          ]}
        />

        {/* Bento Features */}
        <BentoFeatures
          heading="Discover what SaaSify can do"
          subheading="Everything you need to work smarter and scale faster"
        />

        {/* Feature Showcase: Integrations */}
        <FeatureShowcase
          label="Seamless Integrations"
          headline="Connect everything your team uses in one place"
          description="Integrate with 100+ popular tools including Slack, Salesforce, HubSpot, and more. Two-way sync keeps everything up to date automatically."
          features={[
            { text: "100+ native integrations" },
            { text: "Two-way data sync" },
            { text: "Custom webhooks" },
            { text: "API access included" },
          ]}
          link={{ label: "Explore integrations", href: "/features" }}
          imagePosition="right"
        />

        {/* Feature Showcase: Analytics */}
        <FeatureShowcase
          label="Actionable Analytics"
          headline="Make decisions backed by real-time data"
          description="Track every metric that matters. From team performance to customer insights, get the visibility you need to drive growth."
          features={[
            { text: "Real-time dashboards" },
            { text: "Custom reports" },
            { text: "Team performance metrics" },
            { text: "Automated insights" },
          ]}
          link={{ label: "Learn about analytics", href: "/features" }}
          imagePosition="left"
        />

        {/* Feature Showcase: Automation */}
        <FeatureShowcase
          label="Workflow Automation"
          headline="Eliminate busywork with smart automation"
          description="Build powerful workflows without code. Automate approvals, notifications, data entry, and more to focus on what matters."
          features={[
            { text: "Visual workflow builder" },
            { text: "Conditional logic" },
            { text: "Scheduled triggers" },
            { text: "Cross-app automation" },
          ]}
          link={{ label: "See automation features", href: "/features" }}
          imagePosition="right"
        />

        {/* Feature Showcase: Collaboration */}
        <FeatureShowcase
          label="Team Collaboration"
          headline="Work together seamlessly, from anywhere"
          description="Real-time collaboration features keep everyone aligned. Share workspaces, leave comments, and track activity across your entire team."
          features={[
            { text: "Real-time collaboration" },
            { text: "Shared workspaces" },
            { text: "Comments and mentions" },
            { text: "Activity tracking" },
          ]}
          link={{ label: "Explore collaboration", href: "/features" }}
          imagePosition="left"
        />

        {/* Industry Tabs */}
        <IndustryTabs
          heading="Solutions that deliver real results"
          subheading="Whether you're in sales, marketing, or product, SaaSify adapts to how your team works."
        />

        {/* Testimonials */}
        <TestimonialsGrid
          heading="Loved by teams at companies of all sizes"
          subheading="See how leading teams use SaaSify to drive growth and productivity."
        />

        {/* Trust Columns */}
        <TrustColumns />

        {/* Second Logo Banner - Integrations */}
        <LogoBanner
          heading="Integrates with your favorite tools"
          style="grid"
          logos={[
            { name: "Slack", initials: "SL" },
            { name: "Salesforce", initials: "SF" },
            { name: "HubSpot", initials: "HS" },
            { name: "Google Workspace", initials: "GW" },
            { name: "Zapier", initials: "ZP" },
            { name: "Jira", initials: "JI" },
          ]}
        />

        {/* Pricing */}
        <PricingTable
          heading="Simple, transparent pricing"
          subheading="Start free, upgrade as your team grows. No hidden fees."
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to transform how your team works?"
          subheading="Join thousands of teams who chose the smarter way to work. Start free, upgrade as you grow."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Book a demo", href: "/contact", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
