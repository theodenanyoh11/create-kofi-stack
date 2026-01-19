import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { LogoBanner, FinalCTA } from "@/components/blocks"
import { Link2, RefreshCw, Code2, Zap, ArrowRight, Check } from "lucide-react"

const features = [
  {
    icon: <Link2 className="h-6 w-6" />,
    title: "100+ Native Integrations",
    description:
      "Connect with the tools your team already uses. From CRMs to project management, we've got you covered.",
  },
  {
    icon: <RefreshCw className="h-6 w-6" />,
    title: "Two-Way Sync",
    description:
      "Changes flow automatically between apps. Update in one place, see it everywhere.",
  },
  {
    icon: <Code2 className="h-6 w-6" />,
    title: "Developer API",
    description:
      "Build custom integrations with our comprehensive REST API and webhooks.",
  },
  {
    icon: <Zap className="h-6 w-6" />,
    title: "Real-Time Updates",
    description:
      "Data syncs instantly, not in batches. Always work with the latest information.",
  },
]

const integrationCategories = [
  {
    name: "CRM & Sales",
    tools: ["Salesforce", "HubSpot", "Pipedrive", "Close"],
  },
  {
    name: "Communication",
    tools: ["Slack", "Microsoft Teams", "Discord", "Email"],
  },
  {
    name: "Project Management",
    tools: ["Jira", "Asana", "Linear", "Notion"],
  },
  {
    name: "Productivity",
    tools: ["Google Workspace", "Microsoft 365", "Dropbox", "Box"],
  },
]

export default function IntegrationsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Integrations
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Connect everything your team uses
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Integrate with 100+ popular tools. Two-way sync keeps everything up to date automatically.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <a
                  href="/sign-up"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
                >
                  Start free trial
                </a>
                <a
                  href="/contact"
                  className="inline-flex items-center justify-center px-6 py-3 text-sm font-medium rounded-md border border-border bg-background hover:bg-muted transition-colors"
                >
                  Request integration
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
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

        {/* Integration Categories */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Integrations for every workflow
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                Connect the tools you already use to streamline your work.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-5xl mx-auto">
              {integrationCategories.map((category) => (
                <div key={category.name} className="bg-card rounded-lg border border-border p-6">
                  <h3 className="font-semibold mb-4">{category.name}</h3>
                  <ul className="space-y-3">
                    {category.tools.map((tool) => (
                      <li key={tool} className="flex items-center text-sm text-muted-foreground">
                        <Check className="h-4 w-4 text-primary mr-2 shrink-0" />
                        {tool}
                      </li>
                    ))}
                  </ul>
                  <a
                    href="#"
                    className="inline-flex items-center text-sm text-primary hover:underline mt-4"
                  >
                    See all <ArrowRight className="h-4 w-4 ml-1" />
                  </a>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Logo Banner */}
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

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to connect your tools?"
          subheading="Start your free trial and integrate with your favorite apps in minutes."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "View all integrations", href: "#", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
