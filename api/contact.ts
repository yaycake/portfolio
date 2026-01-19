import { Resend } from 'resend';
import type { VercelRequest, VercelResponse } from '@vercel/node';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(
  req: VercelRequest,
  res: VercelResponse
) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { email, message, interest } = req.body;

    // Validate required fields
    if (!email || !message) {
      return res.status(400).json({ error: 'Email and message are required' });
    }

    // Send email using Resend
    const data = await resend.emails.send({
      from: 'Portfolio Contact <im@thegraceyang.com>',
      to: 'im@thegraceyang.com',
      replyTo: email,
      subject: `New Portfolio Contact: ${interest || 'General Inquiry'}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>From:</strong> ${email}</p>
        <p><strong>Interest:</strong> ${interest || 'Not specified'}</p>
        <p><strong>Message:</strong></p>
        <p>${message.replace(/\n/g, '<br>')}</p>
      `,
    });

    return res.status(200).json({ success: true, id: data.id });
  } catch (error) {
    console.error('Error sending email:', error);
    return res.status(500).json({ error: 'Failed to send message' });
  }
}
