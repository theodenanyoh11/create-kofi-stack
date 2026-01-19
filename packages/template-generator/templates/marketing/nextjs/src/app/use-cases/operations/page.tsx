import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { TestimonialsGrid, FinalCTA } from "@/components/blocks"
import { Settings, Workflow, Clock, Shield, BarChart3, Users } from "lucide-react"

const benefits = [
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Process Automation",
    description:
      "Automate repetitive tasks and approvals. Free your team to focus on strategic work.",
  },
  {
    icon: <Settings className="h-6 w-6" />,
    title: "Resource Management",
    description:
      "Track and allocate resources across projects. Optimize utilization and reduce waste.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Time Tracking",
    description:
      "Track time across projects and clients. Automated timesheets and billing integration.",
  },
  {
    icon: <Shield className="h-6 w-6" />,
    title: "Compliance Management",
    description:
      "Track compliance requirements and deadlines. Audit trails for everything.",
  },
  {
    icon: <BarChart3 className="h-6 w-6" />,
    title: "Operational Analytics",
    description:
      "Real-time dashboards for operational metrics. Identify bottlenecks and optimize.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Vendor Management",
    description:
      "Track vendors, contracts, and renewals. Never miss a deadline.",
  },
]

const stats = [
  { value: "50%", label: "Less manual work" },
  { value: "35%", label: "Cost reduction" },
  { value: "99%", label: "Compliance rate" },
]

export default function OperationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                For Operations Teams
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Run operations like a well-oiled machine
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Automate processes, manage resources, and ensure compliance. The operations platform that scales with you.
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
                Built for operational excellence
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Everything you need to run efficient, compliant operations.
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
          heading="Trusted by operations teams everywhere"
          subheading="See how teams like yours are optimizing operations with SaaSify."
        />

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to optimize your operations?"
          subheading="Start your free trial and see why top operations teams choose SaaSify."
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
