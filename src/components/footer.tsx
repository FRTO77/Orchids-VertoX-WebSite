import Link from "next/link";

const footerLinks = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/#features" },
      { name: "Pricing", href: "/pricing" },
      { name: "Download", href: "/download" },
      { name: "Solutions", href: "/#solutions" },
    ],
  },
  {
    title: "Solutions",
    links: [
      { name: "Online Meetings", href: "/solutions/online-meetings" },
      { name: "Physical Meetings", href: "/solutions/physical-meetings" },
      { name: "Developer API", href: "/solutions/api" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Documentation", href: "/docs" },
      { name: "Community", href: "/community" },
      { name: "Blog", href: "/blog" },
      { name: "Partnership", href: "/partnership" },
    ],
  },
  {
    title: "Company",
    links: [
      { name: "About", href: "/about" },
      { name: "Careers", href: "/careers" },
      { name: "Terms", href: "/terms" },
      { name: "Privacy", href: "/privacy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="bg-black text-white py-24 relative overflow-hidden">
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none">
        <span className="text-[25vw] font-serif font-light text-white/[0.02] whitespace-nowrap">
          VertoX
        </span>
      </div>

      <div className="container mx-auto px-6 md:px-12 relative z-10">
        {/* Large CTA */}
        <div className="mb-20 pb-20 border-b border-white/10">
          <h2 className="text-4xl md:text-6xl lg:text-7xl font-serif font-light leading-[0.9] mb-8">
            Ready to speak
            <br />
            <em className="italic">globally?</em>
          </h2>
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 text-sm uppercase tracking-[0.3em] text-white/60 hover:text-white transition-colors duration-500 group"
          >
            Get Started
            <span className="group-hover:translate-x-2 transition-transform duration-300">→</span>
          </Link>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2 md:col-span-1">
            <Link href="/" className="inline-block mb-6">
              <span className="text-2xl font-serif tracking-tight">
                Verto<em className="italic">X</em>
              </span>
            </Link>
            <p className="text-sm text-white/40 font-light leading-relaxed max-w-xs">
              Real-time voice translation preserving speaker identity.
            </p>
          </div>

          {footerLinks.map((section) => (
            <div key={section.title}>
              <h4 className="text-xs uppercase tracking-[0.3em] text-white/40 mb-6">
                {section.title}
              </h4>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm font-light text-white/60 hover:text-white transition-colors duration-300 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom Bar */}
        <div className="flex flex-col md:flex-row justify-between items-center pt-8 border-t border-white/10 gap-6">
          <p className="text-[10px] uppercase tracking-[0.5em] text-white/20">
            © {new Date().getFullYear()} VertoX AI Inc.
          </p>
          <div className="flex items-center gap-8">
              <Link
                href="https://x.com/omenssa"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
              >
                Twitter
              </Link>
              <Link
                href="https://www.linkedin.com/company/106549609"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
              >
                LinkedIn
              </Link>
            <Link
              href="#"
              className="text-xs uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors duration-300"
            >
              GitHub
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
