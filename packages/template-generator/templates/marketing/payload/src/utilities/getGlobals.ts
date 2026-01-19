import type { Config } from "src/payload-types"

import configPromise from "@payload-config"
import { unstable_cache } from "next/cache"
import { getPayload } from "payload"

type Global = keyof Config["globals"]

async function getGlobal(slug: Global, depth = 0) {
	try {
		const payload = await getPayload({ config: configPromise })

		const global = await payload.findGlobal({
			slug,
			depth,
		})

		return global
	} catch (error) {
		// Database tables may not exist yet on first launch
		// Return null so components can show a setup UI instead of crashing
		console.warn(`Could not fetch global "${String(slug)}". Database may not be initialized yet.`)
		return null
	}
}

/**
 * Returns a unstable_cache function mapped with the cache tag for the slug
 */
export const getCachedGlobal = (slug: Global, depth = 0) =>
	unstable_cache(async () => getGlobal(slug, depth), [slug], {
		tags: [`global_${slug}`],
	})
