import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import { WordHoverHeader } from './WordHoverHeader'

export function Skills() {
  const skillCategories = [
    {
      name: 'Languages',
      items: ['JavaScript (ES6+)', 'TypeScript', 'Solidity', 'SQL', 'Java'],
    },
    {
      name: 'Frontend',
      items: ['React', 'Tailwind CSS', 'Shadcn/UI', 'HTML/CSS'],
    },
    {
      name: 'Backend & Blockchain',
      items: ['Node.js', 'Express', 'Ethers.js & Hardhat', 'Smart Contracts (ERC-20)'],
    },
    {
      name: 'Database & Cloud',
      items: ['MongoDB (Mongoose)', 'MySQL', 'AWS (Rekognition, S3)', 'Vercel'],
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

  const categoryVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="skills" className="py-20 px-4 sm:px-6 lg:px-8 bg-slate-50 dark:bg-slate-900">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <Reveal>
            <WordHoverHeader
              as="h2"
              text="Technical Skills"
              className="text-3xl md:text-4xl font-bold mb-4"
            />
          </Reveal>
        </div>

        {/* Skills grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-14"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {skillCategories.map((category) => (
            <TiltCard key={category.name} variants={categoryVariants} className="group">
              <div
                className="h-full p-6 rounded-lg border border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-600/10 transition-all duration-300 hover:shadow-lg group-hover:border-blue-500 dark:group-hover:border-blue-400"
              >
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
                  {category.name}
                </h3>
                <div className="space-y-2">
                  {category.items.map((skill) => (
                    <motion.p
                      key={skill}
                      className="text-sm text-slate-600 dark:text-slate-400 flex items-center gap-2"
                      whileHover={{ x: 4, color: "#2563eb" }}
                    >
                      <span className="text-blue-600 dark:text-blue-400">•</span>
                      {skill}
                    </motion.p>
                  ))}
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>

        {/* Additional skills as badges */}
        <motion.div
          className="mt-16 p-6 rounded-lg border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Other Skills
          </h3>
          <div className="flex flex-wrap gap-2">
            {['REST APIs', 'WebSockets', 'JWT', 'Git', 'Responsive Design', 'Problem Solving', 'Team Collaboration', 'Testing'].map((skill) => (
              <motion.span
                key={skill}
                className="px-4 py-2 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-medium"
                whileHover={{ scale: 1.1, rotate: [0, -2, 2, 0] }}
                whileTap={{ scale: 0.95 }}
              >
                {skill}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
