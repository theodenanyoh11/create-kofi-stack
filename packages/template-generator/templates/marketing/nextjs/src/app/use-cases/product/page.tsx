import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { TestimonialsGrid, FinalCTA } from "@/components/blocks"
import { Lightbulb, GitBranch, MessageSquare, BarChart3, Users, Rocket } from "lucide-react"

const benefits = [
  {
    icon: <Lightbulb className="h-6 w-6" />,
    title: "Idea Management",
    description:
      "Capture and prioritize ideas from your team and customers. Never lose a great idea.",
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: "Roadmap Planning",
    description:
      "Build visual roadmaps that keep stakeholders aligned. Easy drag-and-drop planning.",
  },
  {
    icon: <MessageSquare className="h-6 w-6" />,
    title: "User Feedback",
    description:
      "Collect and organize user feedback. Close the loop with customers automatically.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Product Analytics",
    description:
      "Track feature adoption and usage patterns. Make data-driven product decisions.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Cross-Team Collaboration",
    description:
      "Connect product, engineering, and design. Everyone works from the same source of truth.",
  },
  {
    icon: <Rocket className="h-6 w-6" />,
    title: "Release Management",
    description:
      "Plan releases, coordinate launches, and communicate changes across the organization.",
  },
]

const stats = [
  { value: "45%", label: "Faster time to market" },
  { value: "3x", label: "More features shipped" },
  { value: "60%", label: "Better stakeholder alignment" },
]

export default function ProductPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                For Product Teams
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Ship better products, faster
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                From idea to launch, manage your entire product lifecycle. Roadmaps, feedback, and collaboration in one platform.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start free trial
                </a>
                <a
                  href="/demo"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
                >
                  See it in action
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Benefits Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Built for product-led teams
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to build products users love.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {benefits.map((benefit) => (
                <div
                  key={benefit.title}
                  className="bg-card rounded-lg border border-border p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {benefit.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{benefit.title}</h3>
                  <p className="text-muted-foreground text-sm">{benefit.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <TestimonialsGrid
          heading="Trusted by product teams everywhere"
          subheading="See how teams like yours are shipping better products with SaaSify."
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to build better products?"
          subheading="Start your free trial and see why top product teams choose SaaSify."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Talk to us", href: "/contact", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
