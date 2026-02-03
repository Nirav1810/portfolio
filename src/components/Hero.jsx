import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GitHubIcon } from './icons/GitHubIcon'
import { MailIcon } from './icons/MailIcon'
import { LiquidMeshBackground } from './LiquidMeshBackground'
import { WordHoverHeader } from './WordHoverHeader'

export function Hero() {
  const [emailCopied, setEmailCopied] = useState(false)

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('niravsurati20@gmail.com')
    setEmailCopied(true)
    setTimeout(() => setEmailCopied(false), 2000)
  }

  return (
    <motion.section
      id="home"
      className="relative min-h-screen py-12 px-4 sm:px-6 lg:px-8 flex items-center justify-center overflow-hidden"
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: false, amount: 0.3 }}
    >
      <LiquidMeshBackground />

      <div className="max-w-3xl w-full relative z-10">
        <motion.div
          className="text-center space-y-4 md:space-y-6"
        >
          {/* Greeting */}
          <motion.p
            className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide"
            variants={itemVariants}
          >
            Welcome to my portfolio
          </motion.p>

          {/* Name */}
          <WordHoverHeader
            as="h1"
            text="Nirav Surati"
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight"
            style={{
              textShadow: '0 14px 40px rgba(2,6,23,0.75)',
              WebkitTextStroke: '0.6px rgba(2,6,23,0.08)',
              transformOrigin: 'center'
            }}
            variants={itemVariants}
          />

          {/* Subtitle */}
          <motion.h2
            className="text-xl md:text-2xl text-slate-100 dark:text-slate-200 font-semibold drop-shadow-lg"
            style={{ textShadow: '0 8px 18px rgba(2,6,23,0.6)', letterSpacing: '0.6px' }}
            variants={itemVariants}
            animate={{ 
              color: ["#d1d5db", "#8ab2ff", "#d1d5db"],
            }}
            transition={{ 
              duration: 4, 
              repeat: Infinity,
              ease: "easeInOut" 
            }}
          >
            Computer Science Student
          </motion.h2>

          {/* Description */}
          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Building full-stack applications and blockchain solutions. Passionate about clean code, security, and creating seamless user experiences with modern technologies.
          </motion.p>

          {/* Contact Info */}
          <motion.div
            className="flex flex-col sm:flex-row gap-4 justify-center pt-8"
            variants={itemVariants}
          >
            <motion.div variants={itemVariants}>
              <motion.button
                onClick={copyEmailToClipboard}
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/60 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 shadow-sm hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <MailIcon />
                </span>
                <span className="font-medium">
                  {emailCopied ? 'Email copied!' : 'niravsurati20@gmail.com'}
                </span>
              </motion.button>
            </motion.div>
            <motion.div variants={itemVariants}>
              <motion.a
                href="https://github.com/Nirav1810/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-5 py-3 rounded-xl border border-slate-200/70 dark:border-slate-700/70 bg-slate-50/60 dark:bg-slate-900/40 text-slate-800 dark:text-slate-200 shadow-sm hover:border-blue-500 hover:bg-blue-500/5 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
              >
                <span className="inline-flex items-center justify-center w-9 h-9 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                  <GitHubIcon />
                </span>
                <span className="font-medium">
                  GitHub
                </span>
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            className="pt-16 flex justify-center"
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <svg
              className="w-6 h-6 text-slate-400 dark:text-slate-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 14l-7 7m0 0l-7-7m7 7V3"
              />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
