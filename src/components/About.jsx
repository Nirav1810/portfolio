import React from 'react'
import { motion } from 'framer-motion'

export function About() {
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
        <motion.div
          className="max-w-3xl"
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 dark:text-white mb-6">
            About Me
          </h2>

          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-6"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            I'm a Computer Science student at Sarvajanik College of Engineering & Technology, passionate about building full-stack applications and exploring blockchain technology. I focus on writing clean, secure code and creating seamless user experiences.
          </motion.p>

          <motion.p
            className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed"
            variants={itemVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            <strong>📍 Surat, Gujarat</strong> | <strong>📞 +91-6353795646</strong>
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
