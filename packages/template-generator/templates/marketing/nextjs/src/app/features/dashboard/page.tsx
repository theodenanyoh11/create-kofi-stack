import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FinalCTA } from "@/components/blocks"
import { LayoutDashboard, Layers, Palette, Monitor, Smartphone, Share2 } from "lucide-react"

const features = [
  {
    icon: <LayoutDashboard className="h-6 w-6" />,
    title: "Customizable Layouts",
    description:
      "Drag and drop widgets to create the perfect view for your workflow.",
  },
  {
    icon: <Layers className="h-6 w-6" />,
    title: "Multiple Views",
    description:
      "Switch between board, list, timeline, and calendar views instantly.",
  },
  {
    icon: <Palette className="h-6 w-6" />,
    title: "Personalized Themes",
    description:
      "Choose from light, dark, or system themes. Make it yours.",
  },
  {
    icon: <Monitor className="h-6 w-6" />,
    title: "Desktop App",
    description:
      "Native apps for Mac and Windows. Full offline support included.",
  },
  {
    icon: <Smartphone className="h-6 w-6" />,
    title: "Mobile Ready",
    description:
      "Full-featured iOS and Android apps. Stay productive on the go.",
  },
  {
    icon: <Share2 className="h-6 w-6" />,
    title: "Shareable Dashboards",
    description:
      "Share views with stakeholders. Public links or password-protected.",
  },
]

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Dashboard
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Your command center for everything
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                A beautiful, customizable dashboard that puts everything you need at your fingertips. Multiple views, drag-and-drop widgets, and full mobile support.
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

        {/* Dashboard Preview */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="max-w-5xl mx-auto">
              <div className="aspect-video bg-gradient-to-br from-primary/20 to-primary/5 rounded-lg border border-border flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <LayoutDashboard className="h-16 w-16 mx-auto mb-4 opacity-50" />
                  <p>Dashboard Preview</p>
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
                A dashboard that works for you
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Customize every aspect of your workspace to match how you work best.
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
          headline="Ready to build your perfect workspace?"
          subheading="Start your free trial and customize your dashboard in minutes."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "Watch demo", href: "/demo", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
