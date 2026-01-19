import { UserPlus, Settings, Zap } from "lucide-react"

interface Step {
  icon: React.ReactNode
  title: string
  description: string
}

interface HowItWorksProps {
  heading?: string
  subheading?: string
  steps?: Step[]
}

const defaultSteps: Step[] = [
  {
    icon: <UserPlus className="h-8 w-8" />,
    title: "Sign up in seconds",
    description:
      "Create your account with just an email. No credit card required to get started.",
  },
  {
    icon: <Settings className="h-8 w-8" />,
    title: "Configure your workspace",
    description:
      "Set up your team, invite members, and customize your workspace to fit your workflow.",
  },
  {
    icon: <Zap className="h-8 w-8" />,
    title: "Start collaborating",
    description:
      "Hit the ground running with templates, integrations, and automation built right in.",
  },
]

export function HowItWorks({
  heading = "Get started in minutes",
  subheading = "Three simple steps to transform how your team works",
  steps = defaultSteps,
}: HowItWorksProps) {
  return (
    <section className="py-16 md:py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            {heading}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            {subheading}
          </p>
        </div>

        {/* Steps */}
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 md:gap-12">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* Connector line (hidden on mobile, shown between items on desktop) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[calc(50%+3rem)] w-[calc(100%-6rem)] h-px bg-border" />
                )}

                <div className="flex flex-col items-center text-center">
                  {/* Step number badge */}
                  <div className="relative mb-6">
                    <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                      {step.icon}
                    </div>
                    <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                      {index + 1}
                    </span>
                  </div>

                  <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground">{step.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="text-center mt-12 md:mt-16">
          <a
            href="/sign-up"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-medium rounded-md bg-primary text-primary-foreground hover:bg-primary/90 transition-colors"
          >
            Get started for free
          </a>
        </div>
      </div>
    </section>
  )
}
