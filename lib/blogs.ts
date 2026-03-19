export interface BlogPost {
    id: string;
    title: string;
    category: string;
    excerpt: string;
    content: string;
    date: string;
    readTime: string;
    status: "published" | "draft";
    slug: string;
  }
  
  export const blogPosts: BlogPost[] = [
    {
      id: "1",
      slug: "why-your-degree-isnt-enough-anymore",
      title: "Why Your Degree Isn't Enough Anymore",
      category: "Career Reality Checks",
      excerpt: "The job market has changed. Here's what employers actually want in 2026.",
      readTime: "5 min",
      date: "Feb 1, 2026",
      status: "published",
      content: `<h2>The Shifting Landscape of Employment</h2>
  <p>For decades, a university degree was the golden ticket to a stable career. But in 2026, the reality is starkly different. <strong>Employers are increasingly prioritizing skills over credentials</strong>, and the gap between what universities teach and what the market demands has never been wider.</p>
  <p>A recent survey by the World Economic Forum found that <strong>65% of employers</strong> now consider demonstrated skills more important than formal education when making hiring decisions.</p>
  <h2>What Employers Actually Want</h2>
  <p>So what are companies looking for? Here are the top competencies that consistently appear in job postings across industries:</p>
  <ul>
  <li><strong>Data literacy</strong> — the ability to read, analyze, and communicate with data</li>
  <li><strong>AI fluency</strong> — understanding how to work alongside AI tools, not just use them</li>
  <li><strong>Cross-functional collaboration</strong> — working effectively across departments and disciplines</li>
  <li><strong>Adaptability</strong> — learning new tools and frameworks quickly</li>
  </ul>
  <h2>The Portfolio Era</h2>
  <p>We've entered what many are calling the <em>"portfolio era"</em> of hiring. Instead of asking <em>"Where did you study?"</em>, hiring managers are asking <em>"What have you built?"</em></p>
  <blockquote><p>"I stopped looking at CVs two years ago. I look at GitHub profiles, case studies, and project portfolios. That tells me everything I need to know." — Sarah M., Tech Recruiter at a Fortune 500</p></blockquote>
  <h2>What You Can Do About It</h2>
  <p>The good news? You don't need another degree. You need a <strong>learning strategy</strong>. Here's a practical framework:</p>
  <ol>
  <li><strong>Audit your skills</strong> against current job postings in your target role</li>
  <li><strong>Identify 2-3 gaps</strong> and find focused courses or projects to fill them</li>
  <li><strong>Build publicly</strong> — share your learning journey, create projects, write about what you learn</li>
  <li><strong>Network with intent</strong> — join communities where practitioners hang out, not just other job seekers</li>
  </ol>
  <p>The degree isn't dead — but it's no longer enough on its own. The future belongs to <strong>continuous learners</strong> who can prove their abilities through real work.</p>`,
    },
    {
      id: "2",
      slug: "top-5-digital-skills-to-learn-this-year",
      title: "Top 5 Digital Skills to Learn This Year",
      category: "Skill Trends",
      excerpt: "From AI literacy to data storytelling, these are the skills driving hiring decisions.",
      readTime: "4 min",
      date: "Jan 28, 2026",
      status: "published",
      content: `<h2>The Skills That Matter in 2026</h2>
  <p>Every year, the digital landscape shifts — but 2026 feels like a tipping point. With AI tools becoming mainstream and remote work fully normalized, the skills that get you hired have fundamentally changed.</p>
  <p>After analyzing thousands of job postings and speaking with hiring managers across Africa and globally, here are the <strong>5 digital skills</strong> that will give you the biggest career advantage this year.</p>
  <h2>1. AI Literacy & Prompt Engineering</h2>
  <p>This isn't about building AI models — it's about <strong>knowing how to use AI effectively</strong> in your daily work. From crafting precise prompts to understanding when AI output needs human judgment, this skill is becoming as fundamental as email.</p>
  <blockquote><p>"The people who thrive aren't AI experts. They're domain experts who know how to leverage AI." — Dr. Amina K., AI Ethics Researcher</p></blockquote>
  <h2>2. Data Storytelling</h2>
  <p>Raw data is everywhere. The ability to <strong>turn numbers into narratives</strong> that drive decisions is incredibly valuable. This combines:</p>
  <ul>
  <li>Basic data analysis (Excel, SQL, or Python)</li>
  <li>Visualization tools (Tableau, Power BI, or even well-crafted charts)</li>
  <li>Communication skills to present findings compellingly</li>
  </ul>
  <h2>3. No-Code / Low-Code Development</h2>
  <p>Tools like <strong>Webflow, Bubble, and Lovable</strong> have made it possible to build sophisticated applications without traditional coding. Companies are hiring "citizen developers" who can prototype and ship products fast.</p>
  <h2>4. Digital Project Management</h2>
  <p>With distributed teams being the norm, knowing how to manage projects using tools like <strong>Notion, Linear, or Asana</strong> — combined with agile methodologies — is essential for any role that involves coordination.</p>
  <h2>5. UX Research & Design Thinking</h2>
  <p>Understanding <em>why</em> users behave the way they do is more valuable than ever. Companies are investing heavily in user experience, and professionals who can conduct research, run usability tests, and translate insights into product improvements are in high demand.</p>
  <h3>How to Get Started</h3>
  <p>Don't try to learn all five at once. <strong>Pick the one most relevant to your career goals</strong>, dedicate 30 days to focused learning, build a small project, and then move to the next.</p>`,
    },
    {
      id: "3",
      slug: "the-future-of-remote-work-in-africa",
      title: "The Future of Remote Work in Africa",
      category: "Future of Work",
      excerpt: "How distributed teams are reshaping career opportunities across the continent.",
      readTime: "6 min",
      date: "Jan 22, 2026",
      status: "published",
      content: `<h2>A Continent Connected</h2>
  <p>Africa's tech ecosystem has been growing exponentially, and <strong>remote work has been the great equalizer</strong>. Talented professionals in Lagos, Nairobi, Cape Town, and Accra are now competing — and winning — against candidates from anywhere in the world.</p>
  <p>The numbers tell a compelling story: remote job applications from African professionals have grown by <strong>340% since 2022</strong>, and companies are taking notice.</p>
  <h2>The Infrastructure Revolution</h2>
  <p>The biggest barrier to remote work in Africa has always been infrastructure. But that's changing rapidly:</p>
  <ul>
  <li><strong>Submarine cables</strong> like 2Africa are dramatically increasing bandwidth</li>
  <li><strong>Co-working spaces</strong> have exploded across major cities</li>
  <li><strong>Starlink and mobile internet</strong> are reaching previously underserved areas</li>
  <li><strong>Power solutions</strong> including solar and battery backup are becoming affordable</li>
  </ul>
  <h2>What Global Companies Are Discovering</h2>
  <p>Companies that have hired remote talent from Africa consistently report three things:</p>
  <ol>
  <li><strong>Exceptional work ethic</strong> — professionals who are hungry to prove themselves on the global stage</li>
  <li><strong>Cost efficiency</strong> — competitive salaries that represent excellent value</li>
  <li><strong>Timezone advantages</strong> — overlap with both European and American business hours</li>
  </ol>
  <blockquote><p>"Our best-performing engineering team is split between Berlin and Lagos. The timezone overlap actually gives us more productive hours than a fully co-located team." — CTO of a European fintech startup</p></blockquote>
  <h2>Challenges That Remain</h2>
  <p>It's not all smooth sailing. Key challenges include:</p>
  <ul>
  <li><strong>Payment infrastructure</strong> — receiving international payments can still be complex</li>
  <li><strong>Visa and tax complications</strong> for contractors vs. full-time employees</li>
  <li><strong>Perception bias</strong> — some companies still hesitate to hire from the continent</li>
  </ul>
  <h2>Positioning Yourself for Remote Success</h2>
  <p>If you're an African professional looking to land remote roles, focus on:</p>
  <ol>
  <li>Building a <strong>strong online presence</strong> (LinkedIn, GitHub, personal portfolio)</li>
  <li>Contributing to <strong>open-source projects</strong> to demonstrate your skills globally</li>
  <li>Investing in <strong>reliable internet and workspace setup</strong></li>
  <li>Developing <strong>async communication skills</strong> — writing clearly is your superpower</li>
  </ol>
  <p>The future of work isn't just remote — it's <strong>borderless</strong>. And Africa is uniquely positioned to benefit.</p>`,
    },
    {
      id: "4",
      slug: "how-to-actually-finish-an-online-course",
      title: "How to Actually Finish an Online Course",
      category: "Learning Insights",
      excerpt: "Completion rates are abysmal. Here's a framework that works.",
      readTime: "4 min",
      date: "Jan 15, 2026",
      status: "published",
      content: `<h2>The Completion Rate Problem</h2>
  <p>Let's start with an uncomfortable truth: <strong>only 3-6% of people who start an online course actually finish it</strong>. That means for every 100 people who excitedly click "Enroll," fewer than 6 will see the certificate.</p>
  <p>But the problem isn't motivation — it's <em>strategy</em>.</p>
  <h2>Why We Don't Finish</h2>
  <p>After interviewing hundreds of learners, we've identified the top reasons courses go unfinished:</p>
  <ul>
  <li><strong>The "buffet problem"</strong> — enrolling in too many courses at once</li>
  <li><strong>No accountability</strong> — learning alone without deadlines or community</li>
  <li><strong>Passive consumption</strong> — watching videos without applying concepts</li>
  <li><strong>Perfectionism</strong> — waiting to understand everything before moving forward</li>
  </ul>
  <h2>The PACE Framework</h2>
  <p>We developed the <strong>PACE framework</strong> based on what actually works for successful learners:</p>
  <h3>P — Pick One</h3>
  <p>Commit to <strong>one course at a time</strong>. Unsubscribe from all the "new course" emails. Remove bookmarks to other courses. Your only job is to finish this one thing.</p>
  <h3>A — Anchor It</h3>
  <p>Attach your learning to an <strong>existing habit</strong>. "After my morning coffee, I study for 25 minutes." Don't rely on motivation — rely on routine.</p>
  <h3>C — Create While You Learn</h3>
  <p>For every module you complete, <strong>build something small</strong>. A code snippet. A design mockup. A written summary. Active creation beats passive consumption every time.</p>
  <blockquote><p>"I started tweeting one thing I learned each day. The accountability of a public audience changed everything." — David O., Navrademy student</p></blockquote>
  <h3>E — Engage With Others</h3>
  <p>Join a <strong>study group, cohort, or community</strong>. Learning is inherently social. When you have peers who expect you to show up, you show up.</p>
  <h2>The 80% Rule</h2>
  <p>Here's a mindset shift that helps: <strong>you don't need to absorb 100% of a course to get value from it</strong>. If you understand 80% and can apply it, you're ahead of 94% of people who enrolled. Progress over perfection.</p>
  <p>Start today. Pick one course. Apply PACE. And actually finish it.</p>`,
    },
    {
      id: "5",
      slug: "from-accountant-to-ux-designer",
      title: "From Accountant to UX Designer: A Real Story",
      category: "Career Reality Checks",
      excerpt: "How one Navrademy student made a complete career switch in 6 months.",
      readTime: "7 min",
      date: "Jan 10, 2026",
      status: "published",
      content: `<h2>Meet Chioma</h2>
  <p>Chioma Okafor spent 4 years as an accountant at a mid-sized firm in Lagos. She was good at her job — <strong>but she was miserable</strong>. Every morning felt like a countdown to 5 PM, and she couldn't shake the feeling that she was meant for something more creative.</p>
  <p>"I'd spend my lunch breaks scrolling through Dribbble and Behance, admiring beautiful app designs. One day I thought — <em>why am I just admiring? Why not creating?</em>"</p>
  <h2>The Decision</h2>
  <p>In June 2025, Chioma made a decision that terrified her: she would <strong>transition into UX design within 6 months</strong>. Not quit her job immediately — but commit fully to the transition.</p>
  <p>Her plan was simple but disciplined:</p>
  <ol>
  <li><strong>Months 1-2:</strong> Learn UX fundamentals (research, wireframing, prototyping)</li>
  <li><strong>Months 3-4:</strong> Build a portfolio with 3 case studies</li>
  <li><strong>Months 5-6:</strong> Network aggressively and apply to roles</li>
  </ol>
  <h2>The Learning Phase</h2>
  <p>Chioma enrolled in Navrademy's UX Design track. She studied every evening from 7-9 PM and dedicated full Saturdays to project work.</p>
  <blockquote><p>"The hardest part wasn't learning Figma or user research methods. It was unlearning the accountant mindset — the need for everything to be perfectly calculated before taking action. Design is messy and iterative, and I had to embrace that."</p></blockquote>
  <h3>What Surprised Her</h3>
  <ul>
  <li>Her <strong>analytical skills from accounting</strong> were actually a superpower in UX research</li>
  <li><strong>Understanding business metrics</strong> made her designs more strategic</li>
  <li>The UX community was <strong>incredibly welcoming</strong> to career switchers</li>
  </ul>
  <h2>The Portfolio That Got Her Hired</h2>
  <p>Chioma's portfolio included three projects:</p>
  <ol>
  <li>A <strong>redesign of her bank's mobile app</strong> (a real pain point she experienced daily)</li>
  <li>A <strong>health tracking app</strong> for the Navrademy design challenge</li>
  <li>A <strong>pro bono project</strong> for a local NGO's donation platform</li>
  </ol>
  <p>The bank app redesign went viral on LinkedIn, getting over <strong>2,000 reactions</strong> and catching the attention of several hiring managers.</p>
  <h2>The Result</h2>
  <p>In December 2025, Chioma accepted a <strong>Junior UX Designer role at a fintech startup</strong> — with a 40% salary increase over her accounting position. Six months later, she's already been promoted to mid-level.</p>
  <p><strong>Her advice?</strong> "Don't wait until you feel ready. You'll never feel ready. Start before you're comfortable, and let the work teach you."</p>`,
    },
    {
      id: "6",
      slug: "ai-wont-take-your-job",
      title: "AI Won't Take Your Job — But Someone Using AI Will",
      category: "Future of Work",
      excerpt: "Understanding the real impact of AI on your career trajectory.",
      readTime: "5 min",
      date: "Jan 5, 2026",
      status: "published",
      content: `<h2>The Fear vs. The Reality</h2>
  <p>Every few months, a new headline screams about AI replacing millions of jobs. And every few months, the reality turns out to be more nuanced. <strong>AI isn't replacing people — it's replacing tasks</strong>. And the people who learn to use AI for those tasks become dramatically more productive.</p>
  <p>The real threat isn't artificial intelligence. It's <strong>artificial ignorance</strong> — choosing not to learn how these tools work.</p>
  <h2>What AI Actually Does Well</h2>
  <p>Understanding AI's strengths helps you position yourself correctly:</p>
  <ul>
  <li><strong>Pattern recognition</strong> — analyzing large datasets faster than any human</li>
  <li><strong>Content generation</strong> — first drafts, summaries, translations</li>
  <li><strong>Automation</strong> — repetitive, rule-based tasks</li>
  <li><strong>Code assistance</strong> — writing boilerplate, debugging, documentation</li>
  </ul>
  <h2>What AI Can't Do (Yet)</h2>
  <p>This is where your value lies:</p>
  <ul>
  <li><strong>Understanding context and nuance</strong> — cultural sensitivity, emotional intelligence</li>
  <li><strong>Creative strategy</strong> — knowing <em>what</em> to build, not just <em>how</em> to build it</li>
  <li><strong>Relationship building</strong> — trust, negotiation, mentorship</li>
  <li><strong>Ethical judgment</strong> — deciding what <em>should</em> be done, not just what <em>can</em> be done</li>
  </ul>
  <blockquote><p>"I used to spend 3 hours writing reports. Now AI drafts them in 10 minutes and I spend 2 hours on strategic analysis that actually moves the business forward. I'm not less valuable — I'm more valuable." — Marketing Director at a Nairobi agency</p></blockquote>
  <h2>The AI-Augmented Professional</h2>
  <p>The professionals winning in 2026 share a common trait: they've become <strong>AI-augmented</strong>. This means:</p>
  <ol>
  <li><strong>They use AI daily</strong> — not as a novelty, but as a core tool</li>
  <li><strong>They know its limits</strong> — they verify, edit, and improve AI output</li>
  <li><strong>They combine AI speed with human insight</strong> — the best of both worlds</li>
  <li><strong>They're continuously learning</strong> — new AI capabilities emerge weekly</li>
  </ol>
  <h2>Your Action Plan</h2>
  <p>Here's how to become AI-augmented in your current role:</p>
  <ol>
  <li><strong>Identify your most repetitive tasks</strong> and explore AI tools that can assist</li>
  <li><strong>Spend 15 minutes daily</strong> experimenting with AI tools in your domain</li>
  <li><strong>Document your workflows</strong> — before and after AI integration</li>
  <li><strong>Share your learnings</strong> — become the AI champion in your organization</li>
  </ol>
  <p>The future doesn't belong to AI. It doesn't belong to humans who ignore AI. It belongs to <strong>humans who embrace AI as a partner</strong>.</p>`,
    },
  ];
  