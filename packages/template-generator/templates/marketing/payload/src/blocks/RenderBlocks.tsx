import type React from "react"
import { Fragment } from "react"

import type { Page } from "@/payload-types"

import { ArchiveBlock } from "@/blocks/ArchiveBlock/Component"
import { BentoFeaturesBlock } from "@/blocks/BentoFeatures/Component"
import { CallToActionBlock } from "@/blocks/CallToAction/Component"
import { ContentBlock } from "@/blocks/Content/Component"
import { FAQAccordionBlock } from "@/blocks/FAQAccordion/Component"
import { FeatureGridBlock } from "@/blocks/FeatureGrid/Component"
import { FeatureShowcaseBlock } from "@/blocks/FeatureShowcase/Component"
import { FinalCTABlock } from "@/blocks/FinalCTA/Component"
import { FormBlock } from "@/blocks/Form/Component"
import { HowItWorksBlock } from "@/blocks/HowItWorks/Component"
import { IndustryTabsBlock } from "@/blocks/IndustryTabs/Component"
import { LogoBannerBlock } from "@/blocks/LogoBanner/Component"
import { MediaBlock } from "@/blocks/MediaBlock/Component"
import { PersonasBlock } from "@/blocks/Personas/Component"
import { PricingTableBlock } from "@/blocks/PricingTable/Component"
import { ProofBannerBlock } from "@/blocks/ProofBanner/Component"
import { TestimonialsGridBlock } from "@/blocks/TestimonialsGrid/Component"
import { TrustColumnsBlock } from "@/blocks/TrustColumns/Component"

const blockComponents = {
	archive: ArchiveBlock,
	bentoFeatures: BentoFeaturesBlock,
	content: ContentBlock,
	cta: CallToActionBlock,
	faqAccordion: FAQAccordionBlock,
	featureGrid: FeatureGridBlock,
	featureShowcase: FeatureShowcaseBlock,
	finalCta: FinalCTABlock,
	formBlock: FormBlock,
	howItWorks: HowItWorksBlock,
	industryTabs: IndustryTabsBlock,
	logoBanner: LogoBannerBlock,
	mediaBlock: MediaBlock,
	personas: PersonasBlock,
	pricingTable: PricingTableBlock,
	proofBanner: ProofBannerBlock,
	testimonialsGrid: TestimonialsGridBlock,
	trustColumns: TrustColumnsBlock,
}

// Blocks that handle their own full-width styling (e.g., background colors)
const fullWidthBlocks = [
	"proofBanner",
	"howItWorks",
	"logoBanner",
	"industryTabs",
	"testimonialsGrid",
	"trustColumns",
	"finalCta",
	"bentoFeatures",
]

export const RenderBlocks: React.FC<{
	blocks: Page["layout"][0][]
}> = (props) => {
	const { blocks } = props

	const hasBlocks = blocks && Array.isArray(blocks) && blocks.length > 0

	if (hasBlocks) {
		return (
			<Fragment>
				{blocks.map((block, index) => {
					const { blockType } = block

					if (blockType && blockType in blockComponents) {
						const Block = blockComponents[blockType]
						const isFullWidth = fullWidthBlocks.includes(blockType)

						if (Block) {
							return (
								// biome-ignore lint/suspicious/noArrayIndexKey: Blocks don't have stable IDs
								<div className={isFullWidth ? "my-8" : "my-16 first:mt-0"} key={index}>
									{/* @ts-expect-error there may be some mismatch between the expected types here */}
									<Block {...block} disableInnerContainer />
								</div>
							)
						}
					}
					return null
				})}
			</Fragment>
		)
	}

	return null
}
