import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

/** Escape HTML special characters to prevent injection in email body */
function escapeHtml(str: string): string {
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
}

export async function POST(req: NextRequest) {
    const body = await req.json();
    const { name, email, subject, message } = body;

    if (!name || !email || !message) {
        return NextResponse.json({ success: false, error: 'Missing required fields' }, { status: 400 });
    }

    // Basic length limits to prevent abuse
    if (
        typeof name !== 'string' || name.length > 200 ||
        typeof email !== 'string' || email.length > 200 ||
        typeof message !== 'string' || message.length > 5000 ||
        (subject && (typeof subject !== 'string' || subject.length > 300))
    ) {
        return NextResponse.json({ success: false, error: 'Input exceeds maximum length' }, { status: 400 });
    }

    // Basic email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        return NextResponse.json({ success: false, error: 'Invalid email address' }, { status: 400 });
    }

    // Escape all user input before inserting into HTML
    const safeName = escapeHtml(name);
    const safeEmail = escapeHtml(email);
    const safeSubject = escapeHtml(subject || '');
    const safeMessage = escapeHtml(message).replace(/\n/g, '<br/>');

    const { error } = await resend.emails.send({
        from: 'Forward Falls Contact <onboarding@resend.dev>',
        to: 'forwardfalls@gmail.com',
        replyTo: email,
        subject: subject ? `Contact: ${safeSubject}` : `New message from ${safeName}`,
        html: `
            <h2>New Contact Form Submission</h2>
            <p><strong>Name:</strong> ${safeName}</p>
            <p><strong>Email:</strong> ${safeEmail}</p>
            <p><strong>Subject:</strong> ${safeSubject || 'N/A'}</p>
            <hr />
            <p><strong>Message:</strong></p>
            <p>${safeMessage}</p>
        `,
        // Plain-text fallback
        text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject || 'N/A'}\n\nMessage:\n${message}`,
    });

    if (error) {
        return NextResponse.json({ success: false, error: error.message }, { status: 500 });
    }

    return NextResponse.json({ success: true });
}
