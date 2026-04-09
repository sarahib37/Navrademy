import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const RefundPolicy = () => (
  <>
    <Navbar />
    <main className="min-h-screen bg-background pt-24 pb-16">
      <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
        <h1 className="text-3xl md:text-4xl font-heading font-bold text-foreground mb-2">Refund Policy</h1>
        <p className="text-sm text-muted-foreground mb-10">Last updated: April 9, 2026</p>

        <div className="prose prose-neutral dark:prose-invert max-w-none space-y-8 text-foreground/80 text-[15px] leading-relaxed">
          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">1. Overview</h2>
            <p>At Navrademy, we strive to deliver high-quality learning experiences. We understand that circumstances may change, and we want to ensure our refund process is fair and transparent.</p>
            <br/>
            <p>This Refund Policy applies to all payments made on Navrademy. By making a payment, you agree to the terms outlined in this policy.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">2. Eligibility for Refunds</h2>
            <p>Refunds may be issued only under the following conditions:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You were charged incorrectly or duplicate payments were made.</li>
              <li>You did not receive access to the service after payment.</li>
              <li>A verified technical issue prevented access to the service.</li>
            </ul>
            <p>All refund requests are subject to review and approval at our sole discretion.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">3. Non-Refundable Payments</h2>
            <p>Payments are non-refundable under the following circumstances:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>You have been granted access to any course or digital content.</li>
              <li>You have downloaded or consumed any part of the content.</li>
              <li>You are dissatisfied or changed your mind after purchase.</li>
              <li>The request does not meet the eligibility criteria.</li>
            </ul>
            <p>We reserve the right to deny refunds in cases of suspected abuse or fraud</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">4. How to Request a Refund</h2>
            <p>To request a refund, please email <a href="mailto:support@navrademy.com" className="text-primary hover:underline">support@navrademy.com</a> with the following details:</p>
            <ul className="list-disc pl-6 space-y-1">
              <li>Your full name and registered email address.</li>
              <li>The course name and date of purchase.</li>
              <li>Proof of payment.</li>
              <li>Clear reason for your refund request.</li>
            </ul>
            <p>Submit your request within 7 days from the date of payment. Requests submitted after this period may not be considered.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">5. Processing Time</h2>
            <p>Approved refunds will be processed within <strong>3-7 business days</strong> depending on your financial institution. The refund will be credited to the original payment method used at the time of purchase.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">6. Disputes</h2>
            <p>If you believe your refund request was unfairly denied, you may escalate the matter by contacting us at <a href="mailto:support@navrademy.com" className="text-primary hover:underline">support@navrademy.com</a>. We will review your case within 3 business days.</p>
          </section>

          <section>
            <h2 className="text-xl font-heading font-semibold text-foreground">7. Changes to This Policy</h2>
            <p>Navrademy reserves the right to update or modify this Refund Policy at any time. Any changes will be communicated on this page with an updated effective date.</p>
          </section>
        </div>
      </div>
    </main>
    <Footer />
  </>
);

export default RefundPolicy;
