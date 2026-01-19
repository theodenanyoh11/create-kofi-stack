import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FinalCTA } from "@/components/blocks"
import { Zap, GitBranch, Clock, Repeat, Mail, Bell } from "lucide-react"

const features = [
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Visual Workflow Builder",
    description:
      "Build powerful automations with our drag-and-drop builder. No coding required.",
  },
  {
    icon: <GitBranch className="h-6 w-6" />,
    title: "Conditional Logic",
    description:
      "Create smart workflows with if/then rules, filters, and branching paths.",
  },
  {
    icon: <Clock className="h-6 w-6" />,
    title: "Scheduled Triggers",
    description:
      "Run automations on a schedule. Daily reports, weekly syncs, monthly reviews.",
  },
  {
    icon: <Repeat className="h-6 w-6" />,
    title: "Cross-App Actions",
    description:
      "Trigger actions across all your connected tools. True end-to-end automation.",
  },
  {
    icon: <Mail className="h-6 w-6" />,
    title: "Email Automation",
    description:
      "Send automated emails based on triggers. Follow-ups, reminders, notifications.",
  },
  {
    icon: <Bell className="h-6 w-6" />,
    title: "Smart Notifications",
    description:
      "Route notifications intelligently. Right message, right person, right time.",
  },
]

const useCases = [
  {
    title: "Lead Assignment",
    description: "Automatically assign new leads to sales reps based on territory or round-robin.",
  },
  {
    title: "Approval Workflows",
    description: "Route documents for approval with multi-step workflows and escalation.",
  },
  {
    title: "Onboarding",
    description: "Create welcome sequences for new customers or team members automatically.",
  },
  {
    title: "Status Updates",
    description: "Sync status changes across tools and notify stakeholders automatically.",
  },
]

export default function AutomationPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Automation
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Eliminate busywork with smart automation
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Build powerful workflows without code. Automate approvals, notifications, data entry, and more to focus on what matters.
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

        {/* Features Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Automation that scales with you
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                From simple triggers to complex workflows, automate anything.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {features.map((feature) => (
                <div
                  key={feature.title}
                  className="bg-card rounded-lg border border-border p-6"
                >
                  <div className="w-12 h-12 rounded-lg bg-primary/10 text-primary flex items-center justify-center mb-4">
                    {feature.icon}
                  </div>
                  <h3 className="text-lg font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground text-sm">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Use Cases */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Popular automation recipes
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Get started quickly with pre-built templates for common workflows.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-6 max-w-3xl mx-auto">
              {useCases.map((useCase) => (
                <div
                  key={useCase.title}
                  className="p-6 rounded-lg border border-border bg-card hover:border-primary/50 transition-colors"
                >
                  <h3 className="font-semibold mb-2">{useCase.title}</h3>
                  <p className="text-muted-foreground text-sm">{useCase.description}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to automate your workflow?"
          subheading="Start your free trial and build your first automation in minutes."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "View templates", href: "#", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
