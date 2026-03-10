import { EmailMessage } from "cloudflare:email";
import { createMimeMessage } from "mimetext";

export interface Env {
	CONTACT_EMAIL: SendEmail;
}

export default {
	async fetch(request: Request, env: Env): Promise<Response> {
		const allowedOrigins = [
			"https://forwardfalls.com",
			"https://www.forwardfalls.com",
			"https://mail.forward-falls.pages.dev",
			"http://localhost:3000",
			"http://localhost:3001",
		];

		const origin = request.headers.get("Origin") || "";
		const allowOrigin = allowedOrigins.includes(origin)
			? origin
			: "https://forwardfalls.com";

		const corsHeaders = {
			"Access-Control-Allow-Origin": allowOrigin,
			"Access-Control-Allow-Methods": "POST, OPTIONS",
			"Access-Control-Allow-Headers": "Content-Type",
			"Content-Type": "application/json",
		};

		if (request.method === "OPTIONS") {
			return new Response(null, {
				status: 204,
				headers: corsHeaders,
			});
		}

		if (request.method !== "POST") {
			return new Response(
				JSON.stringify({ success: false, error: "Method not allowed" }),
				{ status: 405, headers: corsHeaders }
			);
		}

		try {
			const data = await request.json() as {
				name?: string;
				email?: string;
				subject?: string;
				message?: string;
			};

			const name = data.name?.trim() || "";
			const email = data.email?.trim() || "";
			const subject = data.subject?.trim() || "";
			const message = data.message?.trim() || "";

			if (!name || !email || !subject || !message) {
				return new Response(
					JSON.stringify({ success: false, error: "All fields are required" }),
					{ status: 400, headers: corsHeaders }
				);
			}

			const msg = createMimeMessage();

			msg.setSender({
				name: "Forward Falls Website",
				addr: "info@forwardfalls.com",
			});

			msg.setRecipient("forwardfalls@gmail.com");
			msg.setSubject(`Contact Form: ${subject}`);

			msg.addMessage({
				contentType: "text/plain",
				data: `New Contact Form Message

Name: ${name}
Email: ${email}
Subject: ${subject}

Message:
${message}`,
			});

			const emailMessage = new EmailMessage(
				"info@forwardfalls.com",
				"forwardfalls@gmail.com",
				msg.asRaw()
			);

			await env.CONTACT_EMAIL.send(emailMessage);

			return new Response(JSON.stringify({ success: true }), {
				status: 200,
				headers: corsHeaders,
			});
		} catch (error: any) {
			console.error("Worker error:", error?.message || error, error);

			return new Response(
				JSON.stringify({
					success: false,
					error: error?.message || "Failed to send email",
				}),
				{ status: 500, headers: corsHeaders }
			);
		}
	},
};
