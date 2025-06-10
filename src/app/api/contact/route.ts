
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';
import * as z from 'zod';

// Define the schema for the contact form data
const contactFormSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }).max(100, { message: 'Name too long.'}),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  message: z.string().min(10, { message: 'Message must be at least 10 characters.' }).max(2000, { message: 'Message too long.'}),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    // Validate the incoming data
    const validationResult = contactFormSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { message: 'Invalid form data.', errors: validationResult.error.flatten().fieldErrors },
        { status: 400 }
      );
    }

    const { name, email, message } = validationResult.data;

    // --- Nodemailer Configuration ---
    // Ensure environment variables are set
    const { EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM, EMAIL_TO } = process.env;

    if (!EMAIL_SERVER_HOST || !EMAIL_SERVER_PORT || !EMAIL_SERVER_USER || !EMAIL_SERVER_PASSWORD || !EMAIL_FROM || !EMAIL_TO) {
        console.error('Missing Nodemailer environment variables. Check EMAIL_SERVER_HOST, EMAIL_SERVER_PORT, EMAIL_SERVER_USER, EMAIL_SERVER_PASSWORD, EMAIL_FROM, EMAIL_TO.');
        return NextResponse.json(
            { message: 'Email service is not configured correctly on the server.' },
            { status: 500 }
        );
    }


    const transporter = nodemailer.createTransport({
      host: EMAIL_SERVER_HOST,
      port: Number(EMAIL_SERVER_PORT),
      secure: Number(EMAIL_SERVER_PORT) === 465, // true for 465, false for other ports (like 587)
      auth: {
        user: EMAIL_SERVER_USER,
        pass: EMAIL_SERVER_PASSWORD,
      },
      // Optional: Add TLS configuration for better security, especially with services like Gmail
      // Enable this if your provider requires it or for enhanced security.
      // tls: {
      //   ciphers:'SSLv3', // Example, adjust as needed for your provider
      //   rejectUnauthorized: process.env.NODE_ENV === 'production' // Stricter in production
      // }
    });

    // Verify transporter connection (optional but recommended for debugging)
    try {
      await transporter.verify();
      console.log('Nodemailer transporter verified successfully for contact form.');
    } catch (verifyError) {
      console.error('Nodemailer transporter verification failed:', verifyError);
      // Don't necessarily block sending if verification fails, but log it.
      // Some servers might not support verify, or it might fail due to transient network issues.
      // For production, you might want to be stricter or have fallback mechanisms.
    }


    // --- Email Options ---
    const mailOptions = {
      from: `"${name}" <${EMAIL_FROM}>`, // Sender address shown to the recipient (configured EMAIL_FROM)
      replyTo: email, // Set the Reply-To header to the actual sender's email
      to: EMAIL_TO, // The email address where you want to receive messages
      subject: `New Contact Form Submission from ${name} via AffiliateLink Hub`,
      text: `
You have received a new message from your AffiliateLink Hub contact form:

Name: ${name}
Email: ${email}

Message:
${message}
      `,
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6;">
          <h2 style="color: #333;">New Contact Form Submission</h2>
          <p>You have received a new message via the AffiliateLink Hub contact form:</p>
          <hr style="border: 0; border-top: 1px solid #eee;">
          <p><strong>Name:</strong> ${name}</p>
          <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
          <p><strong>Message:</strong></p>
          <div style="padding: 10px; border-left: 3px solid #eee; margin-left: 5px; white-space: pre-wrap; background-color: #f9f9f9;">${message}</div>
          <hr style="border: 0; border-top: 1px solid #eee; margin-top: 20px;">
          <p style="font-size: 0.9em; color: #777;">This email was sent from the contact form on AffiliateLink Hub.</p>
        </div>
      `,
    };

    // --- Send Email ---
    try {
      await transporter.sendMail(mailOptions);
      console.log(`Contact form email sent successfully to ${EMAIL_TO} from ${email}`);
      return NextResponse.json({ message: 'Message sent successfully! We will get back to you soon.' }, { status: 200 });
    } catch (mailError) {
      console.error('Failed to send contact email via Nodemailer:', mailError);
      return NextResponse.json({ message: 'Failed to send message. Please try again later or contact support directly.' }, { status: 500 });
    }
  } catch (error) {
    console.error('Error processing contact form request:', error);
    if (error instanceof SyntaxError) { // Error parsing JSON body
        return NextResponse.json({ message: 'Invalid request format.' }, { status: 400 });
    }
    return NextResponse.json({ message: 'An unexpected error occurred on the server.' }, { status: 500 });
  }
}

    