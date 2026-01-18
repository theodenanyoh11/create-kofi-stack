// Helper function to create simple paragraph rich text
export const createParagraph = (text: string) => ({
	root: {
		type: "root",
		children: [
			{
				type: "paragraph",
				children: [
					{
						type: "text",
						detail: 0,
						format: 0,
						mode: "normal",
						style: "",
						text,
						version: 1,
					},
				],
				direction: "ltr" as const,
				format: "" as const,
				indent: 0,
				textFormat: 0,
				version: 1,
			},
		],
		direction: "ltr" as const,
		format: "" as const,
		indent: 0,
		version: 1,
	},
})

// Helper to create rich text with multiple elements (headings, paragraphs)
type RichTextElement =
	| { type: "heading"; tag: "h1" | "h2" | "h3" | "h4" | "h5" | "h6"; text: string }
	| { type: "paragraph"; text: string }

export const createRichText = (elements: RichTextElement[]) => ({
	root: {
		type: "root",
		children: elements.map((el) => {
			if (el.type === "heading") {
				return {
					type: "heading",
					tag: el.tag,
					children: [
						{
							type: "text",
							detail: 0,
							format: 0,
							mode: "normal",
							style: "",
							text: el.text,
							version: 1,
						},
					],
					direction: "ltr" as const,
					format: "" as const,
					indent: 0,
					version: 1,
				}
			}
			return {
				type: "paragraph",
				children: [
					{
						type: "text",
						detail: 0,
						format: 0,
						mode: "normal",
						style: "",
						text: el.text,
						version: 1,
					},
				],
				direction: "ltr" as const,
				format: "" as const,
				indent: 0,
				textFormat: 0,
				version: 1,
			}
		}),
		direction: "ltr" as const,
		format: "" as const,
		indent: 0,
		version: 1,
	},
})
