"use client"

import Link from "next/link"
import { motion } from "framer-motion"

const footerLinks = {
  product: [
    { name: "Platform", href: "#platform" },
    { name: "AI Matcher", href: "#" },
    { name: "Pedigree Web", href: "#" },
    { name: "Syndicate Tools", href: "#" },
    { name: "Pricing", href: "#" },
  ],
  company: [
    { name: "About", href: "#" },
    { name: "Careers", href: "#" },
    { name: "Blog", href: "#" },
    { name: "Press", href: "#" },
  ],
  resources: [
    { name: "Documentation", href: "#" },
    { name: "API Reference", href: "#" },
    { name: "Status", href: "#" },
    { name: "Support", href: "#" },
  ],
  legal: [
    { name: "Privacy Policy", href: "#" },
    { name: "Terms of Service", href: "#" },
    { name: "Cookie Policy", href: "#" },
  ],
}

export function Footer() {
  return (
    <footer className="relative border-t border-zinc-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 lg:gap-12 mb-16">
          {/* Brand Column */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <svg viewBox="0 0 32 32" className="w-8 h-8" fill="none">
                <rect x="4" y="20" width="24" height="10" rx="3" fill="#4ADE80" />
                <rect x="6" y="14" width="20" height="4" rx="1" fill="#4ADE80" opacity="0.8" />
                <rect x="8" y="10" width="16" height="3" rx="1" fill="#4ADE80" opacity="0.6" />
              </svg>
              <span className="text-lg font-bold text-white">barn ai</span>
            </div>
            <p className="text-sm text-zinc-500 leading-relaxed">
              The institutional-grade back office for the modern equine industry.
            </p>
          </div>

          {/* Product */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Product</h3>
            <ul className="space-y-3">
              {footerLinks.product.map((link) => (
                <li key={link.name}>
                  <Link href={link.href} className="text-sm text-zinc-500 hover:text-white transition-colors">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

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

          {/* Resources */}
          <div>
            <h3 className="text-sm font-semibold text-white mb-4">Resources</h3>
            <ul className="space-y-3">
              {footerLinks.resources.map((link) => (
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

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-zinc-800/50 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-sm text-zinc-500">
            <svg viewBox="0 0 32 32" className="w-5 h-5" fill="none">
              <rect x="4" y="20" width="24" height="10" rx="3" fill="#4ADE80" opacity="0.5" />
              <rect x="6" y="14" width="20" height="4" rx="1" fill="#4ADE80" opacity="0.4" />
              <rect x="8" y="10" width="16" height="3" rx="1" fill="#4ADE80" opacity="0.3" />
            </svg>
            <span>© 2026 Barn AI, Inc. All rights reserved.</span>
          </div>
          
          <div className="flex items-center gap-6">
            <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
              Terms of Service
            </Link>
            <Link href="#" className="text-sm text-zinc-500 hover:text-white transition-colors">
              Contact Support
            </Link>
          </div>
        </div>

        {/* Delaware Badge */}
        <div className="mt-8 text-center">
          <p className="text-xs text-zinc-600">
            Barn AI, Inc. is a Delaware C-Corporation
          </p>
        </div>
      </div>
    </footer>
  )
}
