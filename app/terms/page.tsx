import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Terms of Service — Movzz',
  description: 'Terms and conditions for using Movzz services.',
}

const Section = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <div className="mb-10">
    <h2 className="text-lg font-display font-bold text-white mb-4 pb-2"
      style={{ borderBottom: '1px solid rgba(37,99,235,0.15)' }}>
      {title}
    </h2>
    <div className="space-y-3 text-white/50 text-sm leading-relaxed">
      {children}
    </div>
  </div>
)

export default function TermsPage() {
  return (
    <main style={{ background: '#030B18', minHeight: '100vh' }}>
      {/* Nav */}
      <div className="border-b" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <div className="max-w-4xl mx-auto px-6 py-5 flex items-center justify-between">
          <Link href="/">
            <Image src="/logo.png" alt="Movzz" width={90} height={28} className="h-6 w-auto object-contain" />
          </Link>
          <Link href="/" className="text-white/35 hover:text-white/65 text-sm transition-colors">
            ← Back to home
          </Link>
        </div>
      </div>

      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <div className="mb-12">
          <div className="inline-block text-[10px] font-mono tracking-[0.35em] uppercase text-blue-400/55 mb-4
            px-3 py-1.5 rounded-full border border-blue-500/15 bg-blue-500/5">
            Legal
          </div>
          <h1 className="text-4xl font-display font-black text-white mb-3" style={{ letterSpacing: '-0.02em' }}>
            Terms of Service
          </h1>
          <p className="text-white/30 text-sm font-mono">Last updated: March 2026</p>
        </div>

        <Section title="1. Acceptance of Terms">
          <p>
            By accessing the Movzz website (movzzy.com) or joining our waitlist, you agree to be bound
            by these Terms of Service (&quot;Terms&quot;). If you do not agree to these Terms, please do not
            use our website or services.
          </p>
          <p>
            These Terms constitute a legally binding agreement between you and Movzz Technologies
            Pvt. Ltd. (&quot;Movzz&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;), incorporated in India.
          </p>
        </Section>

        <Section title="2. Waitlist Service">
          <p>
            Movzz is currently in pre-launch phase. By joining our waitlist, you:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Express interest in using the Movzz app when it launches</li>
            <li>Consent to receive communications about the Movzz launch and product updates</li>
            <li>Understand that joining the waitlist does not guarantee access to the app or any specific launch date</li>
            <li>Acknowledge that waitlist spot numbers are for illustrative purposes and do not confer any rights or priority</li>
          </ul>
        </Section>

        <Section title="3. Launch Credits and Offers">
          <p>
            We may offer promotional credits (e.g., &quot;₹500 launch credits&quot;) to early waitlist members.
            Such offers are:
          </p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Subject to availability and may change without notice</li>
            <li>Only valid upon the official launch of the Movzz app</li>
            <li>Non-transferable and cannot be exchanged for cash</li>
            <li>Subject to additional terms and conditions to be published at launch</li>
          </ul>
        </Section>

        <Section title="4. User Conduct">
          <p>When using our website, you agree not to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Submit false or misleading information during waitlist registration</li>
            <li>Attempt to manipulate waitlist counts or gaming our systems</li>
            <li>Use automated tools to submit multiple waitlist entries</li>
            <li>Engage in any activity that disrupts or interferes with our website</li>
            <li>Attempt to gain unauthorised access to any part of our systems</li>
          </ul>
        </Section>

        <Section title="5. Intellectual Property">
          <p>
            All content on this website — including but not limited to the Movzz name, logo, design,
            text, animations, and graphics — is the exclusive property of Movzz Technologies Pvt. Ltd.
            and is protected by applicable intellectual property laws.
          </p>
          <p>
            You may not reproduce, distribute, modify, or create derivative works of any content
            without our express written permission.
          </p>
        </Section>

        <Section title="6. Disclaimer of Warranties">
          <p>
            This website and the waitlist service are provided &quot;as is&quot; and &quot;as available&quot; without
            warranties of any kind, express or implied. We do not warrant that the website will be
            uninterrupted, error-free, or free of viruses or other harmful components.
          </p>
          <p>
            The Movzz app has not yet launched. Any descriptions of features, performance, or capabilities
            on this website represent our current plans and intentions, and are subject to change.
          </p>
        </Section>

        <Section title="7. Limitation of Liability">
          <p>
            To the maximum extent permitted by applicable law, Movzz Technologies Pvt. Ltd. shall not
            be liable for any indirect, incidental, special, consequential, or punitive damages arising
            from your use of this website or the waitlist service.
          </p>
          <p>
            Our total liability to you for any claims arising from these Terms shall not exceed ₹100.
          </p>
        </Section>

        <Section title="8. Privacy">
          <p>
            Your use of our website is also governed by our{' '}
            <Link href="/privacy" className="text-blue-400/70 hover:text-blue-400 transition-colors">
              Privacy Policy
            </Link>
            , which is incorporated into these Terms by reference.
          </p>
        </Section>

        <Section title="9. Governing Law">
          <p>
            These Terms shall be governed by and construed in accordance with the laws of India.
            Any disputes arising under these Terms shall be subject to the exclusive jurisdiction
            of the courts located in Chennai, Tamil Nadu, India.
          </p>
        </Section>

        <Section title="10. Changes to Terms">
          <p>
            We reserve the right to modify these Terms at any time. Changes will be posted on this
            page with an updated date. Your continued use of our website after any changes constitutes
            acceptance of the new Terms.
          </p>
        </Section>

        <Section title="11. Contact">
          <p>For questions about these Terms:</p>
          <div className="mt-3 p-4 rounded-xl" style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)' }}>
            <p className="text-white/55 font-medium">Movzz Technologies Pvt. Ltd.</p>
            <p>Chennai, Tamil Nadu, India</p>
            <p>
              Email:{' '}
              <a href="mailto:krishanu@movzzy.com" className="text-blue-400/70 hover:text-blue-400 transition-colors">
                krishanu@movzzy.com
              </a>
            </p>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-white/16 text-xs">
          &copy; {new Date().getFullYear()} MOVZZ Technologies Pvt. Ltd. ·{' '}
          <Link href="/privacy" className="hover:text-white/35 transition-colors">Privacy Policy</Link>
          {' · '}
          <Link href="/" className="hover:text-white/35 transition-colors">Home</Link>
        </p>
      </div>
    </main>
  )
}
