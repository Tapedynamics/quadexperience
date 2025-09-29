import type { APIRoute } from 'astro';

export const POST: APIRoute = async ({ request }) => {
  try {
    const formData = await request.formData();

    const contactData = {
      name: formData.get('name')?.toString() || '',
      email: formData.get('email')?.toString() || '',
      phone: formData.get('phone')?.toString() || '',
      tour: formData.get('tour')?.toString() || '',
      message: formData.get('message')?.toString() || '',
      participants: formData.get('participants')?.toString() || '',
      preferredDate: formData.get('preferredDate')?.toString() || '',
      language: formData.get('language')?.toString() || 'it',
      timestamp: new Date().toISOString()
    };

    // Basic validation
    if (!contactData.name || !contactData.email || !contactData.message) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Missing required fields'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(contactData.email)) {
      return new Response(
        JSON.stringify({
          success: false,
          error: 'Invalid email format'
        }),
        {
          status: 400,
          headers: { 'Content-Type': 'application/json' }
        }
      );
    }

    // Mock logging for now - in production you'd send to email service/CRM
    console.log('🎯 New Contact Form Submission:');
    console.log('==================================');
    console.log(`Name: ${contactData.name}`);
    console.log(`Email: ${contactData.email}`);
    console.log(`Phone: ${contactData.phone}`);
    console.log(`Tour: ${contactData.tour}`);
    console.log(`Participants: ${contactData.participants}`);
    console.log(`Preferred Date: ${contactData.preferredDate}`);
    console.log(`Language: ${contactData.language}`);
    console.log(`Message: ${contactData.message}`);
    console.log(`Timestamp: ${contactData.timestamp}`);
    console.log('==================================');

    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    // Return success response
    return new Response(
      JSON.stringify({
        success: true,
        message: 'Contact form submitted successfully'
      }),
      {
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );

  } catch (error) {
    console.error('Contact form error:', error);

    return new Response(
      JSON.stringify({
        success: false,
        error: 'Internal server error'
      }),
      {
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
};