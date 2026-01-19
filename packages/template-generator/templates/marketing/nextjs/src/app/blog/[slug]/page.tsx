import { Header } from "@/components/Header"
import { Footer } from "@/components/Footer"
import { FinalCTA } from "@/components/blocks"
import Link from "next/link"
import { ArrowLeft, Calendar, Clock, User } from "lucide-react"

// This is sample data - in a real app, you would fetch this from a CMS or MDX files
const blogPosts: Record<string, {
  title: string
  description: string
  content: string
  date: string
  author: string
  readTime: string
  category: string
}> = {
  "boost-team-productivity": {
    title: "10 Ways to Boost Your Team's Productivity",
    description: "Discover proven strategies to help your team work smarter, not harder.",
    date: "January 15, 2025",
    author: "Sarah Johnson",
    readTime: "8 min read",
    category: "Productivity",
    content: `
      <p>In today's fast-paced business environment, productivity isn't just about working harder—it's about working smarter. Here are 10 proven strategies to help your team achieve more while maintaining a healthy work-life balance.</p>

      <h2>1. Set Clear Goals and Priorities</h2>
      <p>Without clear direction, teams can easily get lost in busywork. Start each week by defining the top 3-5 priorities that will move the needle for your organization.</p>

      <h2>2. Embrace Asynchronous Communication</h2>
      <p>Not every message needs an immediate response. By embracing async communication, you give your team members uninterrupted blocks of time to focus on deep work.</p>

      <h2>3. Automate Repetitive Tasks</h2>
      <p>If your team is doing the same task more than twice, it's time to automate it. Modern tools make it easy to create workflows that handle routine work automatically.</p>

      <h2>4. Hold Fewer, Better Meetings</h2>
      <p>Before scheduling a meeting, ask yourself: "Could this be an email?" When meetings are necessary, have a clear agenda and stick to the allotted time.</p>

      <h2>5. Invest in the Right Tools</h2>
      <p>The right tools can multiply your team's effectiveness. Look for platforms that integrate well with each other to reduce context switching.</p>

      <h2>6. Create a Culture of Documentation</h2>
      <p>When knowledge lives only in people's heads, it creates bottlenecks. Document processes, decisions, and learnings so everyone can move faster independently.</p>

      <h2>7. Encourage Regular Breaks</h2>
      <p>Counterintuitive as it may seem, taking breaks actually improves productivity. The human brain needs rest to perform at its best.</p>

      <h2>8. Provide Feedback Continuously</h2>
      <p>Don't wait for annual reviews to give feedback. Regular, constructive feedback helps team members course-correct and grow continuously.</p>

      <h2>9. Eliminate Unnecessary Approvals</h2>
      <p>Too many approval steps slow teams down. Trust your people to make good decisions and only require sign-off when truly necessary.</p>

      <h2>10. Celebrate Wins (Big and Small)</h2>
      <p>Recognition fuels motivation. Take time to acknowledge achievements, whether it's closing a big deal or simply shipping a feature on time.</p>

      <h2>Conclusion</h2>
      <p>Improving productivity is an ongoing journey, not a destination. Start with one or two of these strategies, measure the impact, and keep iterating. Your team will thank you for it.</p>
    `,
  },
}

// Generate static params for static generation
export function generateStaticParams() {
  return Object.keys(blogPosts).map((slug) => ({
    slug,
  }))
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const post = blogPosts[slug]

  // If post doesn't exist, show a placeholder
  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1">
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 text-center">
              <h1 className="text-4xl font-bold mb-4">Post Not Found</h1>
              <p className="text-muted-foreground mb-8">
                This blog post doesn&apos;t exist or has been removed.
              </p>
              <Link
                href="/blog"
                className="inline-flex items-center text-primary hover:underline"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to blog
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">
        {/* Back Link */}
        <section className="pt-8">
          <div className="container mx-auto px-4">
            <Link
              href="/blog"
              className="inline-flex items-center text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to blog
            </Link>
          </div>
        </section>

        {/* Header */}
        <section className="py-12 md:py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <div className="mb-6">
                <span className="inline-block px-3 py-1 text-xs font-medium rounded-full bg-primary/10 text-primary">
                  {post.category}
                </span>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
                {post.title}
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                {post.description}
              </p>
              <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  {post.date}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  {post.readTime}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="pb-16 md:pb-24">
          <div className="container mx-auto px-4">
            <div
              className="max-w-3xl mx-auto prose prose-lg prose-gray dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />
          </div>
        </section>

        {/* Final CTA */}
        <FinalCTA
          headline="Ready to transform how your team works?"
          subheading="Start your free trial and see the difference SaaSify can make."
          style="dark"
          links={[
            { label: "Start free trial", href: "/sign-up", variant: "outline" },
            { label: "View pricing", href: "/pricing", variant: "default" },
          ]}
        />
      </main>

      <Footer />
    </div>
  )
}
