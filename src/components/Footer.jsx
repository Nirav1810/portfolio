import React from 'react'
import { motion } from 'framer-motion'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'

export function Footer() {
  const currentYear = new Date().getFullYear()

  const links = [
    { label: 'Home', url: '#home' },
    { label: 'Projects', url: '#projects' },
    { label: 'Skills', url: '#skills' },
    { label: 'Education', url: '#education' },
  ]

  const social = [
    { icon: LinkedInIcon, label: 'LinkedIn', url: 'https://www.linkedin.com/in/nirav-surati-428864222' },
    { icon: GitHubIcon, label: 'GitHub', url: 'https://github.com/Nirav1810/' },
  ]

  return (
    <motion.footer
      className="bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-50 py-12"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, amount: 0.1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-8">
          {/* Brand */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.2 }}
          >
            <a href="#home" className="text-xl font-bold mb-4 block hover:text-blue-600 dark:hover:text-blue-400 transition-colors">
              Nirav Surati
            </a>
            <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed">
              Computer Science student building full-stack applications and blockchain solutions with modern technologies.
            </p>
          </motion.div>

          {/* Navigation */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.3 }}
          >
            <h3 className="font-semibold mb-4">Navigation</h3>
            <div className="space-y-2">
              {links.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  className="group block text-slate-600 dark:text-slate-400 text-sm transition-colors"
                  whileHover={{ x: 4 }}
                >
                  <span className="transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-sky-400 group-hover:bg-clip-text">
                    {link.label}
                  </span>
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Social & Contact */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ delay: 0.4 }}
          >
            <h3 className="font-semibold mb-4">Connect</h3>
            <div className="flex gap-3">
              {social.map((item, i) => (
                <motion.a
                  key={i}
                  href={item.url}
                  title={item.label}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <item.icon />
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <motion.div 
          className="border-t border-slate-200 dark:border-slate-800 pt-8"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 1, delay: 0.5 }}
        >
          <motion.p
            className="text-center text-slate-500 dark:text-slate-400 text-sm"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.8 }}
          >
            © {currentYear} Nirav Surati. All rights reserved. Built with React, Tailwind CSS & Framer Motion.
          </motion.p>
        </motion.div>
      </div>
    </motion.footer>
  )
}
