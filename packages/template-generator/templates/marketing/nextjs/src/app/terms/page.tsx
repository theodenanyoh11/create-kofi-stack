import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"

export default function TermsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        <article className="py-16 md:py-24">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Terms of Service
            </h1>
            <p className="text-muted-foreground mb-8">
              Last updated: January 1, 2025
            </p>

            <div className="prose prose-neutral dark:prose-invert max-w-none">
              <h2 className="text-2xl font-semibold mt-8 mb-4">Agreement to Terms</h2>
              <p className="text-muted-foreground mb-4">
                By accessing or using SaaSify, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Use License</h2>
              <p className="text-muted-foreground mb-4">
                Subject to your compliance with these Terms, we grant you a limited, non-exclusive, non-transferable license to access and use our service for your internal business purposes.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">User Accounts</h2>
              <p className="text-muted-foreground mb-4">
                When you create an account with us, you must provide accurate, complete, and current information. You are responsible for safeguarding your account credentials and for all activities that occur under your account.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Prohibited Uses</h2>
              <p className="text-muted-foreground mb-4">
                You may not use our service:
              </p>
              <ul className="list-disc pl-6 text-muted-foreground mb-4 space-y-2">
                <li>For any unlawful purpose or to promote illegal activities</li>
                <li>To violate any applicable laws or regulations</li>
                <li>To infringe upon the rights of others</li>
                <li>To interfere with or disrupt the service or servers</li>
              </ul>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Payment Terms</h2>
              <p className="text-muted-foreground mb-4">
                Paid subscriptions are billed in advance on a monthly or annual basis. You agree to pay all fees associated with your subscription plan.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Limitation of Liability</h2>
              <p className="text-muted-foreground mb-4">
                In no event shall SaaSify be liable for any indirect, incidental, special, consequential, or punitive damages arising out of or related to your use of the service.
              </p>

              <h2 className="text-2xl font-semibold mt-8 mb-4">Contact Us</h2>
              <p className="text-muted-foreground mb-4">
                If you have any questions about these Terms, please contact us at legal@saasify.com.
              </p>
            </div>
          </div>
        </article>
      </main>

      <Footer />
    </div>
  )
}
