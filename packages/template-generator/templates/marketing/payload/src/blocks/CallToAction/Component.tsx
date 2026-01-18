"use client"

import type React from "react"

import type { CallToActionBlock as CTABlockProps } from "@/payload-types"

import { CTATracker } from "@/components/Analytics"
import { CMSLink } from "@/components/Link"
import RichText from "@/components/RichText"

export const CallToActionBlock: React.FC<CTABlockProps> = ({ links, richText }) => {
	return (
		<div className="container">
			<div className="bg-card rounded border-border border p-4 flex flex-col gap-8 md:flex-row md:justify-between md:items-center">
				<div className="max-w-[48rem] flex items-center">
					{richText && <RichText className="mb-0" data={richText} enableGutter={false} />}
				</div>
				<div className="flex flex-col gap-8">
					{(links || []).map(({ link }, i) => {
						return (
							// biome-ignore lint/suspicious/noArrayIndexKey: CMS links don't have stable IDs
							<CTATracker key={i} location="cta_block" variant={link?.label || `cta_${i}`}>
								<CMSLink size="lg" {...link} />
							</CTATracker>
						)
					})}
				</div>
			</div>
		</div>
	)
}
