import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const PrivacyPolicy = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-24 pb-16 text-justify">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Privacy Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: April 9, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">1. Introduction</h2>
            <p>Navrademy ("we", "our", or "us") respects your privacy and is committed to protecting your personal data. This Privacy Policy explains how we collect, use, store, disclose, and safeguard your information when you visit our website and use our services.</p>
            <br/>
            <p>By accessing or using our platform, you consent to the practices described in this policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">2. Information We Collect</h2>
            <p>We may collect and process the following types of personal information:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Personal Information:</strong> Name, email address, phone number, and payment details (processed securely via Paystack) provided during registration or course enrollment.</li>
              <li><strong>Usage Data:</strong> Pages visited, time spent on pages, site interactions, browser type, device information, and IP address.</li>
              <li><strong>Cookies:</strong> Small data files stored on your device to improve your browsing experience and analyse site traffic.</li>
              <li><strong>Others:</strong> Any other information you voluntarily provide to us.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">3. Legal Basis for Processing</h2>
            <p>We process your personal data based on the following legal grounds:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your consent (e.g., for marketing communications).</li>
              <li>Contractual necessity (to provide our services).</li>
              <li>Compliance with legal obligations.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">4. How We Use Your Information</h2>
            <p>We use your information to:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>To process course enrollments and payments securely.</li>
              <li>To communicate with you about your account, courses, and updates.</li>
              <li>To analyze usage trends to improve our website, services, and enhance user experience.</li>
              <li>To send promotional materials and newsletters (you may opt out at any time).</li>
              <li>To comply with legal obligations and resolve disputes.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">5. Cookies and Tracking Technologies</h2>
            <p>We use cookies and similar technologies to improve your browsing experience and analyze website traffic. You can choose to disable cookies through your browser settings; however, this may affect certain functionalities of our website.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">6. Sharing of Information</h2>
            <p>We do not sell or rent your personal information to third parties. We may share data with:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li><strong>Service Providers:</strong> Payment processors, hosting providers, and email delivery services that assist in our operations.</li>
              <li><strong>Legal Requirements:</strong> When required by law, regulation, or legal process.</li>
              <li><strong>Business Transfers:</strong> In connection with a merger, acquisition, or sale of assets.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">7. Your Rights</h2>
            <p>You have the right to: </p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Access the personal data we hold about you.</li>
              <li>Request correction or deletion of your data.</li>
              <li>Withdraw consent for marketing communications at any time.</li>
              <li>Object to certain types of data processing.</li>
              <li>Request data portability.</li>
              <li>Lodge a complaint with a relevant data protection authority.</li>
            </ul>
            <p>To exercise these rights, please contact us at <a href="mailto:support@navrademy.com" className="text-primary hover:underline">support@navrademy.com</a>.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">8. Data Retention</h2>
            <p>We retain personal data only for as long as necessary to fulfill the purposes outlined in this policy, comply with legal obligations, and resolve disputes.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">9. Data Security</h2>
            <p>We implement industry-standard security measures to protect your information, including encryption, secure servers, and restricted access to authorized personnel only. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee absolute security.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">10. Children’s Privacy</h2>
            <p>Our services are not intended for individuals under the age of 13. We do not knowingly collect personal data from children. If we become aware of such data, we will take steps to delete it promptly.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">11. Governing Law</h2>
            <p>This Privacy Policy is governed by and interpreted in accordance with the laws of the Federal Republic of Nigeria.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">12. Changes to This Policy</h2>
            <p>We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated effective date. We encourage you to review this policy periodically.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">13. Contact Us</h2>
            <p>If you have any questions about this Privacy Policy or wish to exercise your right, please contact us at <a href="mailto:support@navrademy.com" className="text-primary hover:underline">support@navrademy.com</a>.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default PrivacyPolicy;
