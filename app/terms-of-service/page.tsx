import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const TermsOfService = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-24 pb-16 text-justify">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Terms of Service</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: April 9, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">1. Acceptance of Terms</h2>
            <p>These Terms of Service (“Terms”) govern your access to and use of Navrademy (“we”, “our”, or “us”), including our website, courses, and related services. By accessing or using our platform, you agree to be bound by these Terms. If you do not agree, please do not use our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">2. Eligibility</h2>
            <p>You must be at least 18 years old, or have parental/guardian consent, to use our services. By using Navrademy, you represent that you have the legal capacity to enter into these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">3. Description of Services</h2>
            <p>Navrademy provides online educational content, digital courses, mentorship programmes, and related learning resources in areas such as AI, marketing, web development, and related fields. We reserve the right to modify, suspend, or discontinue any service at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">4. Account Registration and Security</h2>
            <p>To access certain features, you may need to create an account. You agree to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Provide accurate and up-to-date information during registration.</li>
              <li>Maintain the confidentiality of your account credentials.</li>
              <li>Be responsible for all activities that occur under your account.</li>
            </ul>
            <p>We reserve the right to suspend or terminate accounts that are false, duplicated, or used in violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">5. Course Enrollment & Access</h2>
            <ul className="list-disc pl-6 space-y-1">
              <li>Course access is granted upon successful payment and is for personal, non-commercial use only.</li>
              <li>You may not share, redistribute, or resell course materials without written permission.</li>
              <li>Access duration varies by course type and will be specified at the time of enrollment.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">6. Code of Conduct</h2>
            <p>Users agree not to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Misuse the platform, upload malicious software or interfere with the platform's functionality.</li>
              <li>Harass, abuse, or threaten other users or staff.</li>
              <li>Engage in fraudulent or illegal activities.</li>
              <li>Attempt to gain unauthorized access to our systems or other users' accounts.</li>
              <li>Share or resell your account or course access.</li>
            </ul>
            <p>You must comply with all applicable laws while using our services.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">7. Payments and Fees</h2>
            <p>All payments are processed securely via Paystack. By purchasing any service:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You agree to pay all applicable fees.</li>
              <li>Prices are subject to change at any time.</li>
              <li>Failed or declined payments may result in restricted access.</li>
            </ul>
            <p>All transactions are also subject to Paystack’s terms and conditions.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">8. Refund Policy</h2>
            <p>Refunds are only issued under the conditions stated in our <a href="/refund-policy" className="text-primary hover:underline">Refund Policy</a>. By purchasing our services, you agree to this policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">9. Intellectual Property</h2>
            <p>All content on Navrademy including text, graphics, logos, videos, and course materials is the property of Navrademy or its content creators and is protected by applicable intellectual property laws.</p>
            <br/>
            <p>You may not copy, reproduce, distribute, modify, or resell any content without prior written permission.</p>
          </section>
         
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">10. Limitation of Liability</h2>
            <p>To the maximum extent permitted by law:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Our services are provided “as is” and “as available”.</li>
              <li>We are not liable for indirect, incidental, or consequential damages.</li>
              <li>Your use of the platform is at your own risk.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">11. Service Availability</h2>
            <p>We do not guarantee uninterrupted or error-free access to our services. We may suspend, withdraw, or restrict availability at any time without notice.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">12. Termination</h2>
            <p>We may suspend or terminate your access to our services at any time, without prior notice, if:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You violate these Terms.</li>
              <li>We suspect fraudulent or illegal activity.</li>
            </ul>
            <p>No refunds will be issued where termination results from a violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">13. Privacy</h2>
            <p>Your use of our services is also governed by our <a href="/privacy-policy" className="text-primary hover:underline">Privacy Policy</a>, which explains how we collect and use your data.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">14. Third-Party Services</h2>
            <p>Our platform may contain links to third-party websites or services. We are not responsible for their content, policies, or practices.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">15. Indemnification</h2>
            <p>You agree to indemnify and hold Navrademy harmless from any claims, damages, or expenses arising from your misuse of the platform or violation of these Terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">16. Governing Law</h2>
            <p>These Terms shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes shall be resolved in the courts of Nigeria.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">17. Changes to Terms</h2>
            <p>We reserve the right to update these Terms at any time. Continued use of the platform after changes constitutes acceptance of the revised terms.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">18. Contact Us</h2>
            <p>For questions about these Terms, please reach out at <a href="mailto:support@navrademy.com" className="text-primary hover:underline">support@navrademy.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default TermsOfService;
