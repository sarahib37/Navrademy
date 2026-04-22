"use server"

export async function sendRegistrationEmail(email: string) {
    const BREVO_API_KEY = process.env.BREVO_API_KEY;
  
    if (!BREVO_API_KEY) {
      throw new Error("Server configuration error: API Key missing");
    }
  
    const response = await fetch("https://api.brevo.com/v3/smtp/email", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "api-key": BREVO_API_KEY,
      },
      body: JSON.stringify({
        sender: { email: "hello@navrademy.com", name: "Navrademy" },
        to: [{ email }],
        subject: "You’ve successfully registered for Own Your Next Move with Navrademy🎉",
        htmlContent: `
        <h2>Hi there 🥰,</h2>
        <p>We’re excited to have you join us for this powerful 3-day virtual experience designed to help you gain clarity, position yourself better, and make smarter career moves.</p>
        <p>📅 Date: April 23rd – 25th, 2026</p>
        <p>🕐 Time: 6:00 PM Daily (WAT)</p>
        <p>📍 Location: Online</p>
        <br/>
        <p>🔗 Event Channel Link: https://whatsapp.com/channel/0029Vb84VNK1SWt2SMtjK61K</p>
        <p>Join the channel to get updates, reminders, speaker announcements, and access details before the event begins.</p>
        <p>We’ll send you a reminder before we begin the event.</p>
        <p>See you soon 🔥</p>
        `,
      }),
    });
  
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to send email");
    }
  
    return { success: true };
  }