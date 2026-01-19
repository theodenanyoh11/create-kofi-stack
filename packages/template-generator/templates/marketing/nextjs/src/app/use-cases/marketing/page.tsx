import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { TestimonialsGrid, FinalCTA } from "@/components/blocks"
import { Megaphone, BarChart3, Calendar, Users, Sparkles, Target } from "lucide-react"

const benefits = [
  {
    icon: <Megaphone className="h-6 w-6" />,
    title: "Campaign Management",
    description:
      "Plan, execute, and track campaigns across channels. Everything in one place.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Performance Analytics",
    description:
      "See what's working with real-time dashboards. ROI tracking for every campaign.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Content Calendar",
    description:
      "Plan your content pipeline visually. Collaborate on drafts and approvals.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description:
      "Creative briefs, feedback, and approvals in one workflow. No more email chains.",
  },
  {
    icon: <Sparkles className="h-6 w-6" />,
    title: "AI-Powered Insights",
    description:
      "Get recommendations for improving campaign performance based on your data.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Audience Segmentation",
    description:
      "Build and manage audience segments. Personalize at scale.",
  },
]

const stats = [
  { value: "40%", label: "More campaigns shipped" },
  { value: "2.5x", label: "Faster time to launch" },
  { value: "25%", label: "Better campaign ROI" },
]

export default function MarketingPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                For Marketing Teams
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Launch campaigns that drive results
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Plan, execute, and measure marketing campaigns with a platform built for modern marketing teams.
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
                Built for modern marketing
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to plan, execute, and measure your marketing efforts.
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
          heading="Trusted by marketing teams everywhere"
          subheading="See how teams like yours are driving results with SaaSify."
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to level up your marketing?"
          subheading="Start your free trial and see why top marketing teams choose SaaSify."
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
