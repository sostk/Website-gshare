import type { APIRoute } from 'astro';
import { addEmailToSheet } from '../../utils/sheets';

export const POST: APIRoute = async ({ request }) => {
  try {
    const { email } = await request.json();

    // Validate email
    if (!email || !email.includes('@')) {
      return new Response(JSON.stringify({ error: 'Invalid email address' }), {
        status: 400,
        headers: {
          'Content-Type': 'application/json'
        }
      });
    }

    // Add to Google Sheet
    await addEmailToSheet(email);

    return new Response(JSON.stringify({ 
      success: true,
      message: 'Successfully joined the beta waitlist'
    }), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
  } catch (error) {
    console.error('Beta signup error:', error);
    return new Response(JSON.stringify({ error: 'Internal server error' }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    });
  }
}