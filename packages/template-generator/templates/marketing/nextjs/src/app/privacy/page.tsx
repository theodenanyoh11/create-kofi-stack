import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function PrivacyPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Privacy Policy
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: January 1, 2025
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mt-8 mb-4">Introduction</h2>
              <p className="text-muted-foreground mb-4">
                At SaaSify, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Information We Collect</h2>
              <p className="text-muted-foreground mb-4">
                We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support.
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Account information (name, email, password)</li>
                <li>Payment information (processed securely by our payment providers)</li>
                <li>Usage data and analytics</li>
                <li>Communications with our support team</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">How We Use Your Information</h2>
              <p className="text-muted-foreground mb-4">
                We use the information we collect to:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>Provide, maintain, and improve our services</li>
                <li>Process transactions and send related information</li>
                <li>Send you technical notices, updates, and support messages</li>
                <li>Respond to your comments, questions, and requests</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Data Security</h2>
              <p className="text-muted-foreground mb-4">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about this Privacy Policy, please contact us at privacy@saasify.com.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
