import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FinalCTA } from "@/components/blocks"
import { Shield, Lock, Key, Eye, Server, FileCheck } from "lucide-react"

const features = [
  {
    icon: <Shield className="h-6 w-6" />,
    title: "SOC 2 Type II Certified",
    description:
      "We've passed rigorous third-party audits to verify our security controls and practices.",
  },
  {
    icon: <Lock className="h-6 w-6" />,
    title: "AES-256 Encryption",
    description:
      "All data is encrypted at rest and in transit using industry-standard encryption.",
  },
  {
    icon: <Key className="h-6 w-6" />,
    title: "Single Sign-On (SSO)",
    description:
      "Connect with your identity provider. Support for SAML 2.0, OIDC, and OAuth.",
  },
  {
    icon: <Eye className="h-6 w-6" />,
    title: "Audit Logs",
    description:
      "Track every action in your workspace. Full audit trails for compliance and security.",
  },
  {
    icon: <Server className="h-6 w-6" />,
    title: "99.9% Uptime SLA",
    description:
      "We guarantee availability with redundant infrastructure across multiple regions.",
  },
  {
    icon: <FileCheck className="h-6 w-6" />,
    title: "GDPR Compliant",
    description:
      "Full compliance with GDPR, CCPA, and other privacy regulations. Your data, your control.",
  },
]

const certifications = [
  { name: "SOC 2 Type II", description: "Audited security controls" },
  { name: "GDPR", description: "EU data protection" },
  { name: "CCPA", description: "California privacy" },
  { name: "ISO 27001", description: "Information security" },
]

export default function SecurityPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <div className="inline-block px-4 py-1 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
                Security
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                Enterprise-grade security for every team
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your data is protected by industry-leading security practices. SOC 2 certified, GDPR compliant, and built for enterprise.
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
                  Contact security team
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Certifications */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto">
              {certifications.map((cert) => (
                <div
                  key={cert.name}
                  className="text-center p-6 rounded-lg border border-border bg-card"
                >
                  <div className="font-semibold mb-1">{cert.name}</div>
                  <div className="text-sm text-muted-foreground">{cert.description}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16 md:py-24 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="text-center mb-12 md:mb-16">
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
                Security you can trust
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
                We take security seriously at every layer of our platform.
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
          headline="Ready to secure your workflow?"
          subheading="Start your free trial with enterprise-grade security from day one."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "View security docs", href: "#", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
