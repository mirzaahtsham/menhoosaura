import { NextResponse } from 'next/server';
import fetch from 'node-fetch'; // Only if you're using node-fetch in older versions of Next.js

interface MailchimpResponse {
  detail?: string;
  status?: string;
  email_address?: string;
}

export async function POST(request: Request) {
  try {
    const { email } = await request.json();
    console.log('Received email:', email);

    if (!email || !email.includes('@')) {
      console.log('Invalid email:', email);
      return NextResponse.json({ message: 'Invalid email address.' }, { status: 400 });
    }

    const response = await fetch('https://us19.api.mailchimp.com/3.0/lists/b516bc3bde/members/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${Buffer.from(`anystring:${process.env.MAILCHIMP_API_KEY}`).toString('base64')}`,
      },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
      }),
    });

    // Use type assertion to tell TypeScript that response.json() returns a MailchimpResponse
    const responseData = await response.json() as MailchimpResponse;

    console.log('Mailchimp API response:', responseData);

    if (response.ok) {
      return NextResponse.json({ message: 'Subscribed successfully' });
    } else {
      return NextResponse.json({
        message: responseData.detail || 'Error while subscribing. Please try again.',
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error during subscription process:', error);
    return NextResponse.json({ message: 'An error occurred while processing the subscription.' }, { status: 500 });
  }
}
