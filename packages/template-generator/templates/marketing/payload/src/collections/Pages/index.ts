import type { CollectionConfig } from "payload"

import { hero } from "@/heros/config"
import { slugField } from "payload"
import { authenticated } from "../../access/authenticated"
import { authenticatedOrPublished } from "../../access/authenticatedOrPublished"
import { Archive } from "../../blocks/ArchiveBlock/config"
import { BentoFeatures } from "../../blocks/BentoFeatures/config"
import { CallToAction } from "../../blocks/CallToAction/config"
import { Content } from "../../blocks/Content/config"
import { FAQAccordion } from "../../blocks/FAQAccordion/config"
import { FeatureGrid } from "../../blocks/FeatureGrid/config"
import { FeatureShowcase } from "../../blocks/FeatureShowcase/config"
import { FinalCTA } from "../../blocks/FinalCTA/config"
import { FormBlock } from "../../blocks/Form/config"
import { HowItWorks } from "../../blocks/HowItWorks/config"
import { IndustryTabs } from "../../blocks/IndustryTabs/config"
import { LogoBanner } from "../../blocks/LogoBanner/config"
import { MediaBlock } from "../../blocks/MediaBlock/config"
import { Personas } from "../../blocks/Personas/config"
import { PricingTable } from "../../blocks/PricingTable/config"
import { ProofBanner } from "../../blocks/ProofBanner/config"
import { TestimonialsGrid } from "../../blocks/TestimonialsGrid/config"
import { TrustColumns } from "../../blocks/TrustColumns/config"
import { populatePublishedAt } from "../../hooks/populatePublishedAt"
import { generatePreviewPath } from "../../utilities/generatePreviewPath"
import { revalidateDelete, revalidatePage } from "./hooks/revalidatePage"

import {
	MetaDescriptionField,
	MetaImageField,
	MetaTitleField,
	OverviewField,
	PreviewField,
} from "@payloadcms/plugin-seo/fields"

export const Pages: CollectionConfig<"pages"> = {
	slug: "pages",
	access: {
		create: authenticated,
		delete: authenticated,
		read: authenticatedOrPublished,
		update: authenticated,
	},
	// This config controls what's populated by default when a page is referenced
	// https://payloadcms.com/docs/queries/select#defaultpopulate-collection-config-property
	// Type safe if the collection slug generic is passed to `CollectionConfig` - `CollectionConfig<'pages'>
	defaultPopulate: {
		title: true,
		slug: true,
	},
	admin: {
		defaultColumns: ["title", "slug", "updatedAt"],
		livePreview: {
			url: ({ data, req }) =>
				generatePreviewPath({
					slug: data?.slug,
					collection: "pages",
					req,
				}),
		},
		preview: (data, { req }) =>
			generatePreviewPath({
				slug: data?.slug as string,
				collection: "pages",
				req,
			}),
		useAsTitle: "title",
	},
	fields: [
		{
			name: "title",
			type: "text",
			required: true,
		},
		{
			type: "tabs",
			tabs: [
				{
					fields: [hero],
					label: "Hero",
				},
				{
					fields: [
						{
							name: "layout",
							type: "blocks",
							blocks: [
								Archive,
								BentoFeatures,
								CallToAction,
								Content,
								FAQAccordion,
								FeatureGrid,
								FeatureShowcase,
								FinalCTA,
								FormBlock,
								HowItWorks,
								IndustryTabs,
								LogoBanner,
								MediaBlock,
								Personas,
								PricingTable,
								ProofBanner,
								TestimonialsGrid,
								TrustColumns,
							],
							required: true,
							admin: {
								initCollapsed: true,
							},
						},
					],
					label: "Content",
				},
				{
					name: "meta",
					label: "SEO",
					fields: [
						OverviewField({
							titlePath: "meta.title",
							descriptionPath: "meta.description",
							imagePath: "meta.image",
						}),
						MetaTitleField({
							hasGenerateFn: true,
						}),
						MetaImageField({
							relationTo: "media",
						}),

						MetaDescriptionField({}),
						PreviewField({
							// if the `generateUrl` function is configured
							hasGenerateFn: true,

							// field paths to match the target field for data
							titlePath: "meta.title",
							descriptionPath: "meta.description",
						}),
					],
				},
			],
		},
		{
			name: "publishedAt",
			type: "date",
			admin: {
				position: "sidebar",
			},
		},
		slugField(),
	],
	hooks: {
		afterChange: [revalidatePage],
		beforeChange: [populatePublishedAt],
		afterDelete: [revalidateDelete],
	},
	versions: {
		drafts: {
			autosave: {
				interval: 100, // We set this interval for optimal live preview
			},
			schedulePublish: true,
		},
		maxPerDoc: 50,
	},
}
