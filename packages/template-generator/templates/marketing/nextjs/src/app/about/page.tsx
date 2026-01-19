import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LogoBanner, FinalCTA } from "@/components/blocks"
import { Users, Target, Heart, Zap } from "lucide-react"

const values = [
  {
    icon: <Users className="h-6 w-6" />,
    title: "Customer First",
    description:
      "Every decision we make starts with our customers. Their success is our success.",
  },
  {
    icon: <Target className="h-6 w-6" />,
    title: "Simplicity Wins",
    description:
      "We believe powerful software doesn't have to be complicated. We obsess over making things simple.",
  },
  {
    icon: <Heart className="h-6 w-6" />,
    title: "Built with Care",
    description:
      "We sweat the details because we know they matter. Quality is never an accident.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Move Fast",
    description:
      "We ship early and often. Progress beats perfection when you're learning from real users.",
  },
]

const stats = [
  { value: "50K+", label: "Teams worldwide" },
  { value: "180+", label: "Countries" },
  { value: "99.9%", label: "Uptime" },
  { value: "4.8/5", label: "Customer rating" },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                We're on a mission to help teams work better together
              </h1>
              <p className="text-xl text-muted-foreground">
                SaaSify was founded in 2020 with a simple belief: work doesn't have to be
                complicated. We're building the tools that help teams focus on what matters.
              </p>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="py-12 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl md:text-5xl font-bold text-primary mb-2">
                    {stat.value}
                  </div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Story */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-8 text-center">
                Our story
              </h2>
              <div className="prose prose-lg max-w-none text-muted-foreground">
                <p className="mb-6">
                  It all started with a frustration we've all felt: too many tools, too many
                  tabs, too much time wasted switching between them. We knew there had to be
                  a better way.
                </p>
                <p className="mb-6">
                  So we set out to build a platform that brings everything together—tasks,
                  documents, communication, and automation—in one seamless experience. No more
                  context switching. No more lost information. Just focused, productive work.
                </p>
                <p>
                  Today, SaaSify is used by over 50,000 teams worldwide, from two-person
                  startups to Fortune 500 companies. And we're just getting started.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Our values
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                These principles guide everything we do, from product decisions to how we
                treat each other.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {values.map((value) => (
                <div
                  key={value.title}
                  className="bg-card rounded-lg border border-border p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{value.title}</h3>
                  <p className="text-muted-foreground text-sm">{value.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Trusted By */}
        <LogoBanner
          heading="Trusted by teams at companies of all sizes"
          style="scroll"
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Join us on our mission"
          subheading="Start your free trial today and see why thousands of teams trust SaaSify."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Contact us", href: "/contact", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
