"use client"

import Link from "next/link"

const footerLinks = {
  company: [
    { name: "About", href: "#about" },
    { name: "Contact", href: "#contact" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="flex flex-col md:flex-row justify-between gap-8 mb-12">
          {/* Brand Column */}
          <div className="max-w-xs">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect x="4" y="20" width="24" height="10" rx="3" fill="#4ADE80" />
                <rect x="6" y="14" width="20" height="4" rx="1" fill="#4ADE80" opacity="0.8" />
                <rect x="8" y="10" width="16" height="3" rx="1" fill="#4ADE80" opacity="0.6" />
              </svg>
              <span className="text-lg font-bold text-white">barn ai</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              AI infrastructure for the equine industry.
            </p>
          </div>

          {/* Links */}
          <div className="flex gap-16">
            {/* Company */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Company</h3>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h3 className="text-sm font-semibold text-white mb-4">Legal</h3>
              <ul className="space-y-3">
                {footerLinks.legal.map((link) => (
                  <li key={link.name}>
                    <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/50 text-center">
          <p className="text-sm text-zinc-500">
            © 2026 Barn AI. All rights reserved.
          </p>
        </div>


      </div>
    </footer>
  )
}
