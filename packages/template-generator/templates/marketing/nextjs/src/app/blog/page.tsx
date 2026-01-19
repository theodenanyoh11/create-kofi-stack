import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import Link from "next/link"

const blogPosts = [
  {
    title: "10 Ways to Boost Your Team's Productivity",
    description: "Discover proven strategies to help your team work smarter, not harder.",
    date: "Jan 15, 2025",
    category: "Productivity",
    slug: "#",
  },
  {
    title: "The Future of Remote Work: Trends for 2025",
    description: "What's next for distributed teams? We explore the biggest trends shaping remote work.",
    date: "Jan 12, 2025",
    category: "Remote Work",
    slug: "#",
  },
  {
    title: "How to Build a Culture of Collaboration",
    description: "Learn how leading companies foster collaboration and teamwork at scale.",
    date: "Jan 8, 2025",
    category: "Culture",
    slug: "#",
  },
  {
    title: "Automation Best Practices for Growing Teams",
    description: "Stop doing repetitive tasks manually. Here's how to automate the right way.",
    date: "Jan 5, 2025",
    category: "Automation",
    slug: "#",
  },
  {
    title: "Getting Started with SaaSify: A Complete Guide",
    description: "Everything you need to know to get your team up and running with SaaSify.",
    date: "Jan 2, 2025",
    category: "Getting Started",
    slug: "#",
  },
  {
    title: "Customer Success Stories: How Acme Corp Scaled 10x",
    description: "Learn how Acme Corp used SaaSify to scale their operations while keeping their team lean.",
    date: "Dec 28, 2024",
    category: "Case Study",
    slug: "#",
  },
]

export default function BlogPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="py-16 md:py-24">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Insights, tips, and stories to help your team work better together.
            </p>
          </div>
        </section>

        {/* Blog Grid */}
        <section className="pb-24">
          <div className="container mx-auto px-4">
            <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {blogPosts.map((post) => (
                <article
                  key={post.title}
                  className="group rounded-lg border border-border bg-card p-6 transition-all hover:shadow-lg"
                >
                  <div className="mb-4">
                    <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                      {post.category}
                    </span>
                  </div>
                  <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                    <Link href={post.slug}>{post.title}</Link>
                  </h2>
                  <p className="text-muted-foreground mb-4">{post.description}</p>
                  <time className="text-sm text-muted-foreground">{post.date}</time>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
