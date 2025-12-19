import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { GitHubIcon } from './icons/GitHubIcon'

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
      <div className="max-w-3xl w-full">
        <motion.div className="text-center space-y-4 md:space-y-6">
          {/* Greeting */}
          <motion.p
            className="text-xs md:text-sm font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide"
            variants={itemVariants}
          >
            Welcome to my portfolio
          </motion.p>

          {/* Name */}
          <motion.h1
            className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-900 dark:text-white leading-tight"
            variants={itemVariants}
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            Nirav Surati
          </motion.h1>

          {/* Subtitle */}
          <motion.h2
            className="text-xl md:text-2xl text-slate-600 dark:text-slate-400 font-medium"
            variants={itemVariants}
            animate={{ 
              color: ["#475569", "#2563eb", "#475569"],
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
            <motion.div
              variants={itemVariants}
            >
              <motion.button
                onClick={copyEmailToClipboard}
                className={`inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg font-medium transition-colors ${
                  emailCopied
                    ? 'bg-green-600 text-white'
                    : 'bg-blue-600 text-white hover:bg-blue-700'
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                📧 {emailCopied ? 'Email Copied!' : 'Copy Email'}
              </motion.button>
            </motion.div>
            <motion.div
              variants={itemVariants}
            >
              <span className="inline-flex items-center justify-center px-4 py-3 text-slate-700 dark:text-slate-300 font-medium">
                niravsurati20@gmail.com
              </span>
            </motion.div>
            <motion.div
              variants={itemVariants}
            >
              <motion.a
                href="https://github.com/Nirav1810/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-lg border-2 border-slate-300 dark:border-slate-600 text-slate-900 dark:text-white font-medium hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <GitHubIcon />
                GitHub
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
