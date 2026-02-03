import React from 'react'
import { motion } from 'framer-motion'
import { ThemeToggle } from './ThemeToggle'
import { GitHubIcon } from './icons/GitHubIcon'
import { LinkedInIcon } from './icons/LinkedInIcon'

const navItems = ['Home', 'Projects', 'Skills', 'Education', 'Contact']
const socialLinks = [
  { icon: LinkedInIcon, label: 'LinkedIn', url: 'https://www.linkedin.com/in/nirav-surati-428864222' },
  { icon: GitHubIcon, label: 'GitHub', url: 'https://github.com/Nirav1810/' },
]

export function Header() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: -8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 },
    },
  }

  return (
    <motion.header
      className="sticky top-0 z-50 bg-white/95 dark:bg-slate-800/95 backdrop-blur-sm border-b border-slate-200 dark:border-slate-700"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Name / Logo */}
          <motion.div
            className="flex-shrink-0"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <a href="#home" className="text-lg font-bold text-slate-900 dark:text-white">
              Nirav
            </a>
          </motion.div>

          {/* Navigation */}
          <motion.nav
            className="hidden md:flex items-center gap-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {navItems.map((item) => (
              <motion.a
                key={item}
                href={item === 'Contact' ? '#home' : `#${item.toLowerCase()}`}
                className="relative group text-sm font-medium text-slate-600 dark:text-slate-400 transition-colors"
                variants={itemVariants}
                whileHover={{ scale: 1.04 }}
                whileTap={{ scale: 0.96 }}
              >
                <span className="relative transition-colors group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:from-blue-500 group-hover:to-sky-400 group-hover:bg-clip-text">
                  {item}
                  <span className="pointer-events-none absolute left-0 -bottom-0.5 w-full h-0.5 origin-left scale-x-0 bg-blue-600 dark:bg-blue-400 transition-transform duration-200 group-hover:scale-x-100" />
                </span>
              </motion.a>
            ))}
          </motion.nav>

          {/* Social Links & Theme Toggle */}
          <div className="flex items-center gap-4">
            <motion.div
              className="hidden sm:flex items-center gap-3"
              variants={containerVariants}
              initial="hidden"
              animate="visible"
            >
              {socialLinks.map((link) => (
                <motion.a
                  key={link.label}
                  href={link.url}
                  title={link.label}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-slate-100 dark:hover:bg-slate-700 transition-all relative group"
                  variants={itemVariants}
                  whileHover={{ 
                    scale: 1.2,
                    rotate: [0, -10, 10, 0],
                    transition: { duration: 0.3 }
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <link.icon />
                  <span className="absolute inset-0 rounded-full bg-blue-400/20 scale-0 group-hover:scale-150 transition-transform duration-500 blur-xl" />
                </motion.a>
              ))}
            </motion.div>

            <ThemeToggle />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
