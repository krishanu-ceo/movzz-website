import Link from 'next/link'
import Image from 'next/image'

export const metadata = {
  title: 'Privacy Policy — Movzz',
  description: 'How Movzz collects, uses, and protects your personal information.',
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

export default function PrivacyPage() {
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
            Privacy Policy
          </h1>
          <p className="text-white/30 text-sm font-mono">Last updated: March 2026</p>
        </div>

        <Section title="1. Who We Are">
          <p>
            Movzz Technologies Pvt. Ltd. (&quot;Movzz&quot;, &quot;we&quot;, &quot;our&quot;, or &quot;us&quot;) operates
            the website movzzy.com and the Movzz mobile application. We are incorporated in India
            (UDYAM-TN-34-0105416) and headquartered in Chennai, Tamil Nadu.
          </p>
          <p>
            This Privacy Policy explains how we collect, use, store, and protect your personal information
            when you visit our website or sign up for our waitlist.
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>When you join our waitlist, we collect:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li><span className="text-white/65 font-medium">Phone number</span> — to send you SMS updates about our launch</li>
            <li><span className="text-white/65 font-medium">Email address</span> — to send confirmation and launch notifications</li>
            <li><span className="text-white/65 font-medium">City</span> — to prioritise launch regions and send relevant updates</li>
          </ul>
          <p className="mt-3">
            We also automatically collect basic usage data (page visits, browser type, device type)
            through standard web analytics to improve our website experience.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>To confirm your waitlist registration and send your spot number</li>
            <li>To notify you when Movzz launches in your city</li>
            <li>To send important product updates (you can opt out at any time)</li>
            <li>To understand demand across different cities for our launch planning</li>
            <li>To improve our website and user experience</li>
          </ul>
          <p className="mt-3">
            We do <span className="text-white/65 font-medium">not</span> sell, rent, or share your personal
            information with third parties for marketing purposes.
          </p>
        </Section>

        <Section title="4. Data Storage and Security">
          <p>
            Your waitlist data is stored in Google Sheets (Google LLC, USA) which is protected by
            Google&apos;s enterprise-grade security. Email communications are sent via Gmail SMTP.
            We implement appropriate technical measures to protect your information against unauthorised
            access or disclosure.
          </p>
          <p>
            We retain your data for as long as necessary to fulfil the purposes described in this policy,
            or until you request deletion.
          </p>
        </Section>

        <Section title="5. Your Rights">
          <p>Under applicable Indian data protection laws, you have the right to:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Access the personal data we hold about you</li>
            <li>Request correction of inaccurate data</li>
            <li>Request deletion of your data</li>
            <li>Withdraw consent for communications at any time</li>
          </ul>
          <p className="mt-3">
            To exercise any of these rights, email us at{' '}
            <a href="mailto:krishanu@movzzy.com" className="text-blue-400/70 hover:text-blue-400 transition-colors">
              krishanu@movzzy.com
            </a>
            . We will respond within 7 business days.
          </p>
        </Section>

        <Section title="6. Cookies">
          <p>
            Our website uses minimal cookies necessary for basic functionality. We do not use
            advertising or tracking cookies. You can disable cookies in your browser settings
            without affecting your ability to use this website.
          </p>
        </Section>

        <Section title="7. Third-Party Services">
          <p>We use the following third-party services to operate this website:</p>
          <ul className="list-disc list-inside space-y-1.5 pl-2">
            <li>Google Sheets — waitlist data storage</li>
            <li>Gmail — transactional email delivery</li>
            <li>Vercel — website hosting</li>
          </ul>
          <p className="mt-3">
            Each of these services has their own privacy policies and data handling practices.
          </p>
        </Section>

        <Section title="8. Changes to This Policy">
          <p>
            We may update this Privacy Policy from time to time. Any changes will be posted on this page
            with an updated date. We encourage you to review this page periodically.
          </p>
        </Section>

        <Section title="9. Contact Us">
          <p>For any privacy-related questions or requests:</p>
          <div className="mt-3 p-4 rounded-xl" style={{ background: 'rgba(37,99,235,0.05)', border: '1px solid rgba(37,99,235,0.12)' }}>
            <p className="text-white/55 font-medium">Movzz Technologies Pvt. Ltd.</p>
            <p>Chennai, Tamil Nadu, India</p>
            <p>
              Email:{' '}
              <a href="mailto:krishanu@movzzy.com" className="text-blue-400/70 hover:text-blue-400 transition-colors">
                krishanu@movzzy.com
              </a>
            </p>
            <p>
              Phone:{' '}
              <a href="tel:+919007488910" className="text-blue-400/70 hover:text-blue-400 transition-colors">
                +91 90074 88910
              </a>
            </p>
          </div>
        </Section>
      </div>

      {/* Footer */}
      <div className="border-t py-8 text-center" style={{ borderColor: 'rgba(255,255,255,0.05)' }}>
        <p className="text-white/16 text-xs">
          &copy; {new Date().getFullYear()} MOVZZ Technologies Pvt. Ltd. ·{' '}
          <Link href="/terms" className="hover:text-white/35 transition-colors">Terms of Service</Link>
          {' · '}
          <Link href="/" className="hover:text-white/35 transition-colors">Home</Link>
        </p>
      </div>
    </main>
  )
}
