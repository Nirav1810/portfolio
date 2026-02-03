import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import { WordHoverHeader } from './WordHoverHeader'

export function Highlights() {
  const highlights = [
    {
      id: 1,
      icon: '💡',
      title: 'Innovative Solutions',
      description: 'Building cutting-edge applications using modern technologies and best practices.',
    },
    {
      id: 2,
      icon: '🔒',
      title: 'Security & Reliability',
      description: 'Developing secure, tamper-proof systems with blockchain integration and encryption.',
    },
    {
      id: 3,
      icon: '⚡',
      title: 'High Performance',
      description: 'Creating fast, responsive applications optimized for seamless user experiences.',
    },
    {
      id: 4,
      icon: '🤝',
      title: 'Collaboration',
      description: 'Working effectively in teams to deliver solutions that make a real impact.',
    },
    {
      id: 5,
      icon: '📚',
      title: 'Continuous Learning',
      description: 'Always exploring new technologies and best practices in full-stack development.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <Reveal>
            <WordHoverHeader
              as="h2"
              text="What I'm Passionate About"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
          </Reveal>
          <motion.p
            className="text-slate-600 dark:text-slate-400"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false, amount: 0.3 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Core values that drive my work and career
          </motion.p>
        </div>

        {/* Highlights grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {highlights.map((highlight, index) => (
            <TiltCard
              key={highlight.id}
              variants={cardVariants}
              className={`group ${index === 0 ? 'md:col-span-1 lg:col-span-1' : ''}`}
            >
              <motion.div
                className={`h-full p-6 rounded-lg border transition-all duration-300 ${
                  index === 0
                    ? 'border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-600/10'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800'
                } group-hover:border-blue-500 dark:group-hover:border-blue-400`}
              >
                {/* Glow effect for active card */}
                {index === 0 && (
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-blue-400 rounded-lg blur opacity-0 group-hover:opacity-20 transition duration-500" />
                )}

                <div className="relative">
                  {/* Icon */}
                  <motion.div
                    className="text-4xl mb-4 inline-block p-3 rounded-lg bg-slate-100 dark:bg-slate-700 group-hover:scale-110 transition-transform"
                    whileHover={{ rotate: 10 }}
                  >
                    {highlight.icon}
                  </motion.div>

                  {/* Title */}
                  <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                    {highlight.title}
                  </h3>

                  {/* Description */}
                  <p className="text-sm text-slate-600 dark:text-slate-400 leading-relaxed">
                    {highlight.description}
                  </p>
                </div>
              </motion.div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
