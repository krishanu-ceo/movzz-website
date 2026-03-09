import Image from 'next/image'
import LiveCount from '@/components/LiveCount'

const TwitterIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.747l7.73-8.835L1.254 2.25H8.08l4.254 5.622L18.244 2.25zm-1.161 17.52h1.833L7.084 4.126H5.117L17.083 19.77z" />
  </svg>
)

const LinkedInIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
)

const InstagramIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
  </svg>
)

export default function Footer() {
  return (
    <footer
      className="relative overflow-hidden"
      style={{ background: '#02060F', borderTop: '1px solid rgba(255,255,255,0.05)' }}
    >
      {/* Pre-footer CTA */}
      <div
        className="relative py-16 px-6"
        style={{
          background: 'linear-gradient(180deg, rgba(37,99,235,0.05) 0%, transparent 100%)',
          borderBottom: '1px solid rgba(255,255,255,0.05)',
        }}
      >
        <div
          className="absolute inset-0 pointer-events-none"
          style={{ background: 'radial-gradient(ellipse 60% 70% at 50% 0%, rgba(37,99,235,0.08) 0%, transparent 70%)' }}
        />
        <div className="relative max-w-2xl mx-auto text-center">
          <div className="live-badge mb-5 mx-auto inline-flex"><LiveCount /></div>
          <h3 className="font-display font-black text-3xl md:text-4xl text-white mb-3" style={{ letterSpacing: '-0.025em' }}>
            Ready to never miss a ride?
          </h3>
          <p className="text-white/35 text-base mb-8 leading-relaxed">
            Join the waitlist today. Free ₹500 credits at launch for the first 500 users.
          </p>
          <a
            href="#waitlist"
            className="btn-primary inline-flex text-sm py-3.5 px-7"
          >
            Reserve My Spot — Free
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
              <path strokeLinecap="round" strokeLinejoin="round" d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </a>
        </div>
      </div>

      {/* Footer grid */}
      <div className="max-w-6xl mx-auto px-6 pt-14 pb-10">
        <div className="grid md:grid-cols-4 gap-10 mb-12">

          {/* Brand */}
          <div className="md:col-span-2">
            <div className="inline-block mb-5">
              <Image
                src="/logo.png"
                alt="Movzz"
                width={100}
                height={30}
                className="h-7 w-auto object-contain"
              />
            </div>
            <p className="text-white/28 text-sm leading-relaxed max-w-xs mb-5">
              India&apos;s first AI-powered ride reliability platform.
              Never miss a ride again.
            </p>
            <div className="flex items-center gap-2 mb-5">
              <span className="relative flex items-center justify-center w-2 h-2">
                <span className="absolute w-2 h-2 rounded-full bg-blue-400 animate-ping opacity-50" />
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
              </span>
              <span className="text-white/22 text-xs">Launching March 2026 · Chennai</span>
            </div>
            {/* Social icons */}
            <div className="flex items-center gap-3">
              {[
                { icon: <TwitterIcon />,   href: '#', label: 'Twitter' },
                { icon: <LinkedInIcon />,  href: '#', label: 'LinkedIn' },
                { icon: <InstagramIcon />, href: '#', label: 'Instagram' },
              ].map(({ icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-8 h-8 rounded-lg flex items-center justify-center text-white/25 hover:text-white/65 transition-all duration-200 hover:scale-110"
                  style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Product */}
          <div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-5">Product</p>
            <div className="space-y-3">
              {['How it Works', 'Reliability Score', 'Pricing', 'Beta Access'].map(link => (
                <a
                  key={link}
                  href="#waitlist"
                  className="block text-white/28 hover:text-white/65 text-sm transition-colors duration-200 hover:translate-x-0.5 transform"
                >
                  {link}
                </a>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <p className="text-white/40 text-[10px] font-semibold uppercase tracking-[0.2em] mb-5">Company</p>
            <div className="space-y-3">
              <a
                href="mailto:krishanu@movzzy.com"
                className="block text-white/28 hover:text-white/65 text-sm transition-colors duration-200"
              >
                krishanu@movzzy.com
              </a>
              <a
                href="tel:+919007488910"
                className="block text-white/28 hover:text-white/65 text-sm transition-colors duration-200"
              >
                +91 90074 88910
              </a>
              <a href="#" className="block text-white/28 hover:text-white/65 text-sm transition-colors duration-200">
                Privacy Policy
              </a>
              <a href="#" className="block text-white/28 hover:text-white/65 text-sm transition-colors duration-200">
                Terms of Service
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div
          className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}
        >
          <p className="text-white/16 text-xs">
            &copy; {new Date().getFullYear()} MOVZZ Technologies Pvt. Ltd. · Built in Chennai, India.
          </p>
          <p className="text-white/12 text-xs font-mono">UDYAM-TN-34-0105416</p>
        </div>
      </div>
    </footer>
  )
}
