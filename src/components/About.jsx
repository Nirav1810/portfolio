import React, { useState } from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { WordHoverHeader } from './WordHoverHeader'
import { LocationIcon } from './icons/LocationIcon'
import { PhoneIcon } from './icons/PhoneIcon'

export function About() {
  const [phoneCopied, setPhoneCopied] = useState(false)
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.1,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="about" className="py-20 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        <div className="max-w-3xl">
          <Reveal>
            <WordHoverHeader
              as="h2"
              text="About Me"
              className="text-3xl md:text-4xl font-bold mb-6"
            />
          </Reveal>

          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
          >
            I'm a Computer Science student at Sarvajanik College of Engineering & Technology, passionate about building full-stack applications and exploring blockchain technology. I focus on writing clean, secure code and creating seamless user experiences.
          </motion.p>

          <motion.div
            className="mt-4 grid gap-3 text-lg text-slate-600 dark:text-slate-400"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: false, amount: 0.3 }}
            transition={{ delay: 0.1 }}
          >
            <a
              href="https://www.google.com/maps/place/Surat,+Gujarat"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 font-semibold text-slate-800 dark:text-slate-200 hover:text-blue-500 dark:hover:text-blue-400"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400">
                <LocationIcon />
              </span>
              <span>Surat, Gujarat</span>
            </a>

            <button
              type="button"
              onClick={() => {
                navigator.clipboard.writeText('+916353795646')
                setPhoneCopied(true)
                setTimeout(() => setPhoneCopied(false), 2000)
              }}
              className="inline-flex items-center gap-2 group"
            >
              <span className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-blue-500/10 text-blue-600 dark:text-blue-400 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                <PhoneIcon />
              </span>
              <span className="font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {phoneCopied ? 'Phone copied!' : '+916353795646'}
              </span>
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
