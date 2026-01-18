import { NextResponse } from "next/server"

const RESEND_API_URL = "https://api.resend.com"

/**
 * Email validation regex
 */
const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

/**
 * Company address for CAN-SPAM compliance
 */
const COMPANY_ADDRESS = "KrumaLabs • 102 West Main Street #501, New Albany, OH 43054"

/**
 * DirectoryHub logo URL
 */
const LOGO_URL = "https://directoryhub.app/logo.png"

/**
 * Generate newsletter confirmation email HTML with logo and branding
 */
function renderNewsletterConfirmationEmail(unsubscribeUrl?: string): string {
	const emailStyles = {
		main: `
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      background-color: #f5f5f5;
      margin: 0;
      padding: 20px;
    `,
		container: `
      background-color: #ffffff;
      border-radius: 8px;
      margin: 0 auto;
      padding: 0;
      max-width: 600px;
    `,
		header: `
      padding: 32px 32px 24px;
      border-bottom: 1px solid #e5e5e5;
    `,
		logoText: `
      color: #0070f3;
      font-size: 24px;
      font-weight: 600;
      margin: 0;
      padding: 0;
      line-height: 1;
    `,
		heading: `
      color: #111111;
      font-size: 24px;
      font-weight: 600;
      line-height: 1.4;
      margin: 0 0 24px;
    `,
		content: `
      padding: 32px;
    `,
		paragraph: `
      font-size: 16px;
      color: #444444;
      margin: 0 0 16px;
      line-height: 1.6;
    `,
		paragraphSmall: `
      font-size: 14px;
      color: #666666;
      margin: 0 0 16px;
      line-height: 1.6;
    `,
		button: `
      background-color: #0070f3;
      color: white;
      padding: 14px 32px;
      text-decoration: none;
      border-radius: 6px;
      display: inline-block;
      font-weight: 500;
      font-size: 16px;
    `,
		footer: `
      padding: 24px 32px;
      text-align: center;
    `,
		footerText: `
      color: #666666;
      font-size: 14px;
      line-height: 1.6;
      margin: 0 0 8px;
    `,
		footerTextSmall: `
      color: #999999;
      font-size: 12px;
      line-height: 1.6;
      margin: 16px 0 0;
    `,
		footerAddress: `
      color: #999999;
      font-size: 11px;
      line-height: 1.6;
      margin: 8px 0 0;
    `,
		link: `
      color: #0070f3;
      text-decoration: underline;
    `,
	}

	return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
</head>
<body style="${emailStyles.main}">
  <div style="${emailStyles.container}">
    <!-- Header with Logo -->
    <div style="${emailStyles.header}">
      <a href="https://directoryhub.app" style="display: inline-flex; align-items: center; gap: 12px; text-decoration: none; color: inherit;">
        <img src="${LOGO_URL}" alt="DirectoryHub" width="32" height="32" style="display: block; width: 32px; height: 32px;">
        <span style="${emailStyles.logoText}">DirectoryHub</span>
      </a>
    </div>
    
    <!-- Content -->
    <div style="padding: 32px 32px 0;"><h1 style="${emailStyles.heading}">Welcome to the Newsletter!</h1></div>
    <div style="${emailStyles.content}">
      <p style="${emailStyles.paragraph}">
        Thanks for subscribing to the DirectoryHub newsletter! 🎉
      </p>
      <p style="${emailStyles.paragraph}">
        You'll now receive updates about:
      </p>
      <ul style="${emailStyles.paragraph}">
        <li>New features and product updates</li>
        <li>Tips for building better directories</li>
        <li>Industry insights and best practices</li>
        <li>Special announcements and offers</li>
      </ul>
      <p style="${emailStyles.paragraph}">
        We respect your inbox and only send emails when we have something valuable to share.
      </p>
      <div style="margin: 32px 0; text-align: center;">
        <a href="https://directoryhub.app" style="${emailStyles.button}">Visit DirectoryHub</a>
      </div>
      <p style="${emailStyles.paragraphSmall}">
        If you didn't subscribe to this newsletter, you can safely ignore this email or
        <a href="${unsubscribeUrl || "https://directoryhub.app/unsubscribe"}" style="${emailStyles.link}">unsubscribe here</a>.
      </p>
    </div>
    
    <!-- Divider -->
    <hr style="border: none; border-top: 1px solid #e5e5e5; margin: 0 32px;">
    
    <!-- Footer -->
    <div style="${emailStyles.footer}">
      <p style="${emailStyles.footerText}">DirectoryHub - Build beautiful directory websites</p>
      <p style="${emailStyles.footerText}">
        <a href="https://directoryhub.app" style="${emailStyles.link}">Visit our website</a>
        <span style="color: #999999;"> • </span>
        <a href="https://directoryhub.app/support" style="${emailStyles.link}">Support</a>
        ${unsubscribeUrl ? `<span style="color: #999999;"> • </span><a href="${unsubscribeUrl}" style="${emailStyles.link}">Unsubscribe</a>` : ""}
      </p>
      <p style="${emailStyles.footerTextSmall}">You're receiving this email because you signed up for the DirectoryHub newsletter.</p>
      <p style="${emailStyles.footerAddress}">${COMPANY_ADDRESS}</p>
    </div>
  </div>
</body>
</html>`.trim()
}

export async function POST(request: Request) {
	try {
		const body = await request.json()
		const { email } = body

		if (!email) {
			return NextResponse.json({ success: false, message: "Email is required." }, { status: 400 })
		}

		// Normalize and validate email
		const normalizedEmail = email.toLowerCase().trim()
		if (!EMAIL_REGEX.test(normalizedEmail)) {
			return NextResponse.json(
				{ success: false, message: "Please enter a valid email address." },
				{ status: 400 },
			)
		}

		const apiKey = process.env.RESEND_API_KEY
		const audienceId = process.env.RESEND_AUDIENCE_NEWSLETTER
		// Marketing emails use "Theo from DirectoryHub" as sender
		const fromEmail = "Theo from DirectoryHub <theo@notifications.directoryhub.app>"

		// In development without API key, just return success
		if (!apiKey) {
			console.warn("RESEND_API_KEY not set - newsletter signup simulated")
			return NextResponse.json({
				success: true,
				message: "Thanks for subscribing! Check your inbox for a confirmation email.",
			})
		}

		// Call Convex newsletter subscribe action via HTTP
		// This ensures consistent handling and uses the proper addNewsletterSubscriber function
		const convexUrl = process.env.NEXT_PUBLIC_CONVEX_URL || process.env.CONVEX_URL
		if (!convexUrl) {
			console.warn("CONVEX_URL not set - newsletter signup will fail")
			return NextResponse.json(
				{ success: false, message: "Server configuration error. Please try again later." },
				{ status: 500 },
			)
		}

		try {
			const response = await fetch(`${convexUrl}/api/newsletter/subscribe`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					email: normalizedEmail,
				}),
			})

			const result = await response.json()

			if (!result.success) {
				return NextResponse.json(result, { status: response.status })
			}

			return NextResponse.json(result)
		} catch (error) {
			console.error("Newsletter subscription error:", error)
			return NextResponse.json(
				{ success: false, message: "Something went wrong. Please try again later." },
				{ status: 500 },
			)
		}
	} catch (error) {
		console.error("Newsletter subscription error:", error)

		// Check if it's a duplicate subscriber error
		if (error instanceof Error && error.message.includes("already exists")) {
			return NextResponse.json({
				success: true,
				message: "You're already subscribed to our newsletter!",
			})
		}

		return NextResponse.json(
			{ success: false, message: "Something went wrong. Please try again later." },
			{ status: 500 },
		)
	}
}
