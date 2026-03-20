import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import config from '@/config/framework.config';

export async function POST(req: NextRequest) {
    const { name, email, subject, message } = await req.json();

    if (!name || !email || !message) {
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
        return NextResponse.json({ success: false, error: 'Email service not configured' }, { status: 503 });
    }

    const resend = new Resend(apiKey);

    const { error } = await resend.emails.send({
        from: `${config.org.name} Contact <onboarding@resend.dev>`,
        to: config.contact.email,
        replyTo: email,
        subject: subject || `New message from ${name}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Subject:</strong> ${subject || 'N/A'}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${message.replace(/\n/g, '<br/>')}</p>
        `,
    });

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
