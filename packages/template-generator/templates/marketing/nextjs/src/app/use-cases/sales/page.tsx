import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { TestimonialsGrid, FinalCTA } from "@/components/blocks"
import { Target, TrendingUp, Users, Zap, BarChart3, Clock } from "lucide-react"

const benefits = [
  {
    icon: <Target className="h-6 w-6" />,
    title: "Close More Deals",
    description:
      "Track every opportunity from first contact to close. Never let a deal slip through the cracks.",
  },
  {
    icon: <TrendingUp className="h-6 w-6" />,
    title: "Forecast Accurately",
    description:
      "AI-powered forecasting gives you confidence in your pipeline. Know what's coming.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Align Your Team",
    description:
      "Keep everyone on the same page with shared visibility into accounts and deals.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Automate Follow-ups",
    description:
      "Never forget a follow-up. Automated reminders and sequences keep deals moving.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Track Performance",
    description:
      "Real-time dashboards show rep performance, pipeline health, and revenue metrics.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Save Hours Weekly",
    description:
      "Reduce data entry with automatic logging. Spend more time selling.",
  },
]

const stats = [
  { value: "32%", label: "Faster deal cycles" },
  { value: "28%", label: "Higher win rates" },
  { value: "5hrs", label: "Saved per week" },
]

export default function SalesPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                For Sales Teams
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Close more deals, faster
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Give your sales team the tools they need to hit quota. Track deals, automate follow-ups, and forecast with confidence.
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
                Built for modern sales teams
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to manage your pipeline and close more deals.
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
          heading="Trusted by sales teams everywhere"
          subheading="See how teams like yours are crushing their quotas with SaaSify."
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to accelerate your sales?"
          subheading="Start your free trial and see why top sales teams choose SaaSify."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Talk to sales", href: "/contact", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
