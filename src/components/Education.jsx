import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import { WordHoverHeader } from './WordHoverHeader'

export function Education() {
  const education = [
    {
      id: 1,
      degree: 'Bachelor of Technology',
      field: 'Computer Science & Engineering',
      institution: 'Sarvajanik College of Engineering & Technology',
      year: '2022 - 2026',
      details: 'Pursuing B.Tech with focus on full-stack development, blockchain, and software engineering',
      gpa: 'Surat, Gujarat',
    },
  ]

  const experiences = [
    {
      id: 1,
      title: 'Web Development Intern',
      company: 'Growlity Pvt Ltd',
      location: 'Surat, Gujarat',
      period: 'Feb 2026 - May 2026',
      details: 'Maintaining and improving design and SEO for websites.',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.2,
      },
    },
  }

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="education" className="py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <Reveal>
            <WordHoverHeader
              as="h2"
              text="Education and Work"
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
            Academic background and learning journey
          </motion.p>
        </div>

        {/* Timeline */}
        <motion.div
          className="space-y-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {education.map((edu) => (
            <motion.div
              key={edu.id}
              variants={itemVariants}
              className="relative pl-8 md:pl-0 md:grid md:grid-cols-12 gap-16 items-stretch"
            >
              {/* Timeline line for mobile */}
              <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-blue-600 dark:bg-blue-500 md:hidden" />

              {/* Timeline dot */}
              <motion.div
                className="absolute left-0 top-4 -translate-x-2 w-4 h-4 rounded-full bg-blue-600 dark:bg-blue-500 border-4 border-white dark:border-slate-800 md:col-span-1 md:relative md:left-auto md:top-auto md:translate-x-0 md:flex md:justify-center md:items-start md:pt-2"
                whileHover={{ scale: 1.5, backgroundColor: '#3b82f6' }}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: false }}
              />

              {/* Content */}
              <div className="md:col-span-11">
                <div className="grid gap-10 lg:gap-14 md:grid-cols-2">
                  <TiltCard variants={itemVariants} className="h-full">
                    <div className="h-full min-h-56 p-6 rounded-lg border border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-600/10 hover:shadow-lg transition-all duration-300">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                          {edu.degree}
                        </h3>
                        <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                          {edu.year}
                        </span>
                      </div>
                      <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                        {edu.field}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {edu.institution}
                      </p>
                      <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                        {edu.details}
                      </p>
                      <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                        {edu.gpa}
                      </p>
                    </div>
                  </TiltCard>

                  {experiences[0] && (
                    <TiltCard variants={itemVariants} className="h-full">
                      <div className="h-full min-h-56 p-6 rounded-lg border border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-600/10 hover:shadow-lg transition-all duration-300">
                        <div className="flex justify-between items-start mb-2">
                          <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                            Internship
                          </h3>
                          <span className="text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-100 dark:bg-blue-900/30 px-3 py-1 rounded-full">
                            {experiences[0].period}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-1">
                          {experiences[0].title}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-1">
                          {experiences[0].company}
                        </p>
                        <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
                          {experiences[0].details}
                        </p>
                        <p className="text-sm font-medium text-blue-600 dark:text-blue-400">
                          {experiences[0].location}
                        </p>
                      </div>
                    </TiltCard>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
