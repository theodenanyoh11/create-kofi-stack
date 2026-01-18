import RichText from "@/components/RichText"
import type React from "react"

import type { ContentBlock as ContentBlockProps } from "@/payload-types"

import { CMSLink } from "../../components/Link"

// Use static class mappings for Tailwind to properly detect classes
const colSpanClasses: Record<string, string> = {
	full: "col-span-4 lg:col-span-12",
	half: "col-span-4 md:col-span-2 lg:col-span-6",
	oneThird: "col-span-4 md:col-span-2 lg:col-span-4",
	twoThirds: "col-span-4 md:col-span-2 lg:col-span-8",
}

export const ContentBlock: React.FC<ContentBlockProps> = (props) => {
	const { columns } = props

	return (
		<div className="container my-16">
			<div className="grid grid-cols-4 lg:grid-cols-12 gap-y-8 gap-x-16">
				{columns &&
					columns.length > 0 &&
					columns.map((col, index) => {
						const { enableLink, link, richText, size } = col
						const sizeKey = size || "full"

						return (
							<div className={colSpanClasses[sizeKey] || colSpanClasses.full} key={index}>
								{richText && (
									<RichText data={richText} enableGutter={false} className="max-w-none" />
								)}

								{enableLink && <CMSLink {...link} />}
							</div>
						)
					})}
			</div>
		</div>
	)
}
