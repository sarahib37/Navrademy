"use server"
import speaker1 from "@/assets/speaker1.jpeg";
import speaker2 from "@/assets/speaker2.jpeg";

export const FIRST_EVENT = [
    {
    id: "first-event-001",
    slug: "own-your-next-move",
    title: "Own Your Next Move",
    tagline: "LIVE 2-DAY EXPERIENCE · BY NAVRADEMY",
    description:
      "In 2 focused days, you'll break through the confusion, discover which high-income digital skill fits your life, and leave with a clear plan you can act on — even from zero.",
    startDateTime: "2026-04-23T18:00:00+01:00",
    endDateTime: "2026-04-24T18:00:00+01:00",
    location: "Online",
    locationType: "Youtube Live",
    duration: "2 Days",
    promoCode: "FIRST15",
  
    problem: {
      headline: "You're not stuck. You're overloaded.",
      body: "You've been searching, scrolling, and starting over. Not because you lack drive — but because nothing has helped you cut through the noise and just pick your next move.",
      searches: [
        '"What digital skill should I learn in 2026?"',
        '"How do I choose the right career path?"',
        '"Which skill can I start with no experience?"',
        '"How long before I start earning real money?"',
      ],
      oldWay: "Learn everything. Try ten platforms. Compare 50 courses. Still confused.",
      newWay: "Understand yourself. Match your strengths to the right skill. Execute with guidance. Move.",
      result: "You walk out with a clear direction, not another idea to add to the pile.",
    },
  
    outcomes: [
      {
        title: "Your Personal Roadmap",
        description: "A clear, written plan of what to learn, why, and in what order — tailored to where you are right now.",
      },
      {
        title: "High-Income Skill Clarity",
        description: "You'll know exactly which digital skills pay globally — and which one makes sense for your strengths and timeline.",
      },
      {
        title: "Your First Real Step",
        description: "A concrete starting point you can act on immediately — no waiting, no more searching, no guesswork.",
      },
      {
        title: "Structured Thinking",
        description: "A mental framework that helps you evaluate opportunities and make career decisions with confidence going forward.",
      },
      {
        title: "Mentor Access",
        description: "Meet the Navrademy tutors and practitioners who've been where you are — and made it to where you want to go.",
      },
      {
        title: "6–12 Month Focus",
        description: "Leave knowing exactly what to focus on for the next year. No distractions. Just the right path, clearly laid out.",
      },
    ],
  
    agenda: [
      {
        day: 1,
        title: "Clarity — Break the Confusion",
        items: [
          "Why smart people stay stuck — and the mental shift that changes everything",
          "The Clarity Framework: a structured system to assess where you are right now",
          "Mapping your strengths, circumstances, and goals to realistic digital pathways",
          "Live Q&A with industry practitioners who made real transitions",
          "Group clarity workshop: discover patterns you share with others on the same journey",
        ],
      },
      {
        day: 2,
        title: "Purpose & Skill Activation",
        items: [
          "Purpose mapping: find direction that actually makes sense for your life",
          "Deep dive into the highest-paying, most scalable digital skills of 2026",
          "How to choose between SEO, design, content, marketing, product, and more",
          "Meet the Navrademy tutors: your guides from here into execution",
          "Build your personal 6-month action plan — leave with it done, not just drafted",
        ],
      },
    ],
  
    audience: [
      {
        label: "Students",
        description: "You don't want to waste your early years making the wrong move. This gives you the clarity to start with intention, not accident.",
      },
      {
        label: "Recent Graduates",
        description: 'The degree is done but the path still feels unclear. You need structured direction — not more advice about "following your passion."',
      },
      {
        label: "Career Switchers",
        description: "You know the current path isn't working. You need someone to help you figure out the right next step — without starting from zero.",
      },
    ],
  
    stats: [
      { value: "2,500+", label: "Students trained" },
      { value: "95%", label: "Career success rate" },
      { value: "50+", label: "Expert mentors" },
      { value: "2 Days", label: "To go from confusion to direction" },
    ],
  
    testimonials: [
      {
        text: "I spent 2 years trying to figure out which skill to focus on. After this experience, I had a clear answer in less than 2 days. I wish this existed when I graduated.",
        name: "Adaeze O.",
        role: "Digital Marketer, Lagos",
      },
      {
        text: "The Clarity Framework alone was worth every naira. I understood myself better after Day 1 than I had in 3 years of job searching. Now I'm building something real.",
        name: "Samuel M.",
        role: "Freelance SEO Specialist",
      },
      {
        text: "I came in as a confused banking professional. I left with a 6-month plan into UX design. Four months later, I had my first design client. This event changed my trajectory.",
        name: "Fatima B.",
        role: "UX Designer, Remote",
      },
    ],
  
    clarityPromise:
      "If you attend both days fully and don't leave with a clear direction, we'll give you a complimentary 1-on-1 session to make it right.",
}] 

export const SPEAKERS = [
  {
    name: "David Olasunmonu",
    role: "CEO & Co-Founder · Twenties Tribe",
    bio: "David Olasunmonu is the CEO and Co-founder of Twenties Tribe, a prominent community-focused platform aimed at empowering young Africans in their twenties through growth, connection, and resources.",
    img: speaker1,
  },
  {
    name: "Joshua Riebelle",
    role: "CEO & Co-Founder · ShopKite",
    bio: "Joshua Riebelle is a Nigerian tech entrepreneur and creative director best known as the CEO and Co-founder of ShopKite, a platform designed to help retail and neighborhood stores in Africa manage inventory and sales.",
    img: speaker2,
  },
];

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