"use client"

import { Card, type CardPostData } from "@/components/Card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { Category } from "@/payload-types"
import { useHeaderTheme } from "@/providers/HeaderTheme"
import { Search, X } from "lucide-react"
import { useEffect, useMemo, useState } from "react"

interface BlogPageClientProps {
	initialPosts: CardPostData[]
	categories: Category[]
	totalPosts: number
}

export const BlogPageClient: React.FC<BlogPageClientProps> = ({
	initialPosts,
	categories,
	totalPosts,
}) => {
	const { setHeaderTheme } = useHeaderTheme()
	const [searchQuery, setSearchQuery] = useState("")
	const [selectedCategory, setSelectedCategory] = useState<string | null>(null)

	useEffect(() => {
		setHeaderTheme("light")
	}, [setHeaderTheme])

	// Filter posts based on search query and selected category
	const filteredPosts = useMemo(() => {
		return initialPosts.filter((post) => {
			// Search filter
			const matchesSearch =
				searchQuery === "" ||
				post.title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
				post.meta?.description?.toLowerCase().includes(searchQuery.toLowerCase())

			// Category filter
			const matchesCategory =
				!selectedCategory ||
				(Array.isArray(post.categories) &&
					post.categories.some((cat) => {
						if (typeof cat === "object" && cat !== null) {
							return String(cat.id) === selectedCategory
						}
						return String(cat) === selectedCategory
					}))

			return matchesSearch && matchesCategory
		})
	}, [initialPosts, searchQuery, selectedCategory])

	// Get featured post (first post when no filters)
	const featuredPost = searchQuery === "" && !selectedCategory ? filteredPosts[0] : null
	const regularPosts = featuredPost ? filteredPosts.slice(1) : filteredPosts

	const clearFilters = () => {
		setSearchQuery("")
		setSelectedCategory(null)
	}

	const hasActiveFilters = searchQuery !== "" || selectedCategory !== null

	return (
		<div className="pt-24 pb-24">
			{/* Hero Section */}
			<div className="container mb-12">
				<div className="max-w-4xl">
					<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-4">
						Blog & Resources
					</h1>
					<p className="text-lg md:text-xl text-muted-foreground mb-8">
						Learn how to build, grow, and monetize directory websites. Strategies, tutorials, and
						success stories to help you succeed.
					</p>

					{/* Search Bar */}
					<div className="relative max-w-xl">
						<Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
						<Input
							type="text"
							placeholder="Search articles..."
							value={searchQuery}
							onChange={(e) => setSearchQuery(e.target.value)}
							className="pl-10 pr-10 h-12 text-base"
						/>
						{searchQuery && (
							<button
								type="button"
								onClick={() => setSearchQuery("")}
								className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
								aria-label="Clear search"
							>
								<X className="h-5 w-5" aria-hidden="true" />
							</button>
						)}
					</div>
				</div>
			</div>

			{/* Category Filters */}
			<div className="container mb-8">
				<div className="flex flex-wrap gap-2">
					<Button
						variant={selectedCategory === null ? "default" : "outline"}
						size="sm"
						onClick={() => setSelectedCategory(null)}
					>
						All Posts
					</Button>
					{categories.map((category) => (
						<Button
							type="button"
							key={category.id}
							variant={selectedCategory === String(category.id) ? "default" : "outline"}
							size="sm"
							onClick={() => setSelectedCategory(String(category.id))}
						>
							{category.title}
						</Button>
					))}
				</div>
			</div>

			{/* Results Count & Clear Filters */}
			<div className="container mb-8">
				<div className="flex items-center justify-between">
					<p className="text-sm text-muted-foreground">
						{hasActiveFilters ? (
							<>
								Showing {filteredPosts.length} of {totalPosts} articles
							</>
						) : (
							<>{totalPosts} articles</>
						)}
					</p>
					{hasActiveFilters && (
						<Button variant="ghost" size="sm" onClick={clearFilters}>
							Clear filters
						</Button>
					)}
				</div>
			</div>

			{/* Featured Post */}
			{featuredPost && (
				<div className="container mb-12">
					<div className="relative">
						<span className="absolute -top-3 left-4 bg-primary text-primary-foreground text-xs font-medium px-2 py-1 rounded z-10">
							Featured
						</span>
						<Card
							doc={featuredPost}
							relationTo="posts"
							showCategories
							className="lg:grid lg:grid-cols-2 lg:gap-8"
						/>
					</div>
				</div>
			)}

			{/* Posts Grid */}
			<div className="container">
				{regularPosts.length > 0 ? (
					<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
						{regularPosts.map((post, index) => (
							<Card
								key={post.slug || index}
								doc={post}
								relationTo="posts"
								showCategories
								className="h-full"
							/>
						))}
					</div>
				) : (
					<div className="text-center py-16">
						<p className="text-lg text-muted-foreground mb-4">
							No articles found matching your criteria.
						</p>
						<Button variant="outline" onClick={clearFilters}>
							Clear filters
						</Button>
					</div>
				)}
			</div>
		</div>
	)
}
