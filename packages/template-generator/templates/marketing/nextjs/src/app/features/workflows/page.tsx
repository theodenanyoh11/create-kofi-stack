import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FinalCTA } from "@/components/blocks"
import { Workflow, Users, FileText, CheckSquare, Kanban, Calendar } from "lucide-react"

const features = [
  {
    icon: <Workflow className="h-6 w-6" />,
    title: "Custom Workflows",
    description:
      "Design workflows that match how your team actually works. Fully customizable stages and transitions.",
  },
  {
    icon: <Users className="h-6 w-6" />,
    title: "Team Collaboration",
    description:
      "Assign tasks, leave comments, and collaborate in real-time. Everyone stays in sync.",
  },
  {
    icon: <FileText className="h-6 w-6" />,
    title: "Templates Library",
    description:
      "Start fast with pre-built templates for common workflows. Customize as needed.",
  },
  {
    icon: <CheckSquare className="h-6 w-6" />,
    title: "Task Dependencies",
    description:
      "Link tasks together with dependencies. See the critical path at a glance.",
  },
  {
    icon: <Kanban className="h-6 w-6" />,
    title: "Kanban Boards",
    description:
      "Visualize your workflow with drag-and-drop kanban boards. Track progress instantly.",
  },
  {
    icon: <Calendar className="h-6 w-6" />,
    title: "Timeline View",
    description:
      "See your workflow on a timeline. Plan sprints and manage deadlines visually.",
  },
]

export default function WorkflowsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Workflows
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Build workflows that match how you work
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Design custom workflows with kanban boards, timelines, and task dependencies. Keep your team aligned and projects on track.
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
                  Watch demo
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Workflow Preview */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <Kanban className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Workflow Preview</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Everything you need to manage work
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Powerful features that adapt to any team or project type.
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

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to streamline your workflow?"
          subheading="Start your free trial and build your first workflow in minutes."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Explore templates", href: "#", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
