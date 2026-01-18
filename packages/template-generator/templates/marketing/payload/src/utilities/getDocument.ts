import type { Config } from "src/payload-types"

import configPromise from "@payload-config"
import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

type Collection = keyof Config["collections"]

async function getDocument(collection: Collection, slug: string, depth = 2) {
	const payload = await getPayload({ config: configPromise })

	const page = await payload.find({
		collection,
		depth,
		where: {
			slug: {
				equals: slug,
			},
		},
	})

	return page.docs[0]
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 * @param depth - Depth for populating relationships (default: 2 for rich text content)
 */
export const getCachedDocument = (collection: Collection, slug: string, depth = 2) =>
	unstable_cache(async () => getDocument(collection, slug, depth), [collection, slug], {
		tags: [`${collection}_${slug}`],
	})
