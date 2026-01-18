"use client"
import type { Footer } from "@/payload-types"
import { type RowLabelProps, useRowLabel } from "@payloadcms/ui"

type FooterLink = NonNullable<NonNullable<Footer["columns"]>[number]["links"]>[number]

export const RowLabel: React.FC<RowLabelProps> = () => {
	const data = useRowLabel<FooterLink>()

	const label = data?.data?.link?.label
		? `Link ${data.rowNumber !== undefined ? data.rowNumber + 1 : ""}: ${data?.data?.link?.label}`
		: "Row"

	return <div>{label}</div>
}
