import type { Block } from "payload"

export const TrustColumns: Block = {
	slug: "trustColumns",
	interfaceName: "TrustColumnsBlock",
	fields: [
		{
			name: "columns",
			type: "array",
			label: "Trust Columns",
			minRows: 1,
			maxRows: 2,
			fields: [
				{
					name: "label",
					type: "text",
					label: "Label",
					admin: {
						description: 'Small label above heading (e.g., "Integrations")',
					},
				},
				{
					name: "heading",
					type: "text",
					label: "Heading",
					required: true,
				},
				{
					name: "description",
					type: "textarea",
					label: "Description",
				},
				{
					name: "items",
					type: "array",
					label: "Feature Items",
					maxRows: 6,
					fields: [
						{
							name: "icon",
							type: "select",
							options: [
								{ label: "Check", value: "check" },
								{ label: "Shield", value: "shield" },
								{ label: "Lock", value: "lock" },
								{ label: "Globe", value: "globe" },
								{ label: "Zap", value: "zap" },
								{ label: "Server", value: "server" },
								{ label: "Cloud", value: "cloud" },
								{ label: "Database", value: "database" },
								{ label: "Plug", value: "plug" },
								{ label: "Award", value: "award" },
							],
							defaultValue: "check",
						},
						{
							name: "text",
							type: "text",
							required: true,
						},
					],
				},
			],
		},
	],
	labels: {
		plural: "Trust Columns",
		singular: "Trust Columns",
	},
}
