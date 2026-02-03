import React from 'react'
import { motion } from 'framer-motion'
import { Reveal } from './Reveal'
import { TiltCard } from './TiltCard'
import { WordHoverHeader } from './WordHoverHeader'

export function Projects() {
  const projects = [
    {
      id: 1,
      title: 'Decentralized Blockchain Voting System',
      dates: 'Oct 2025 -- Dec 2025',
      description: 'Tamper-proof voting application with Solidity smart contract backend and responsive React frontend',
      tech: ['Solidity', 'React', 'Ethers.js', 'Hardhat', 'Tailwind'],
      highlights: [
        'Secure voting logic with one-vote-per-address validation',
        'Metamask/Ethers.js integration for seamless blockchain interaction',
        'Hardhat for local development, testing, and contract deployment',
        'Real-time voting results fetched directly from blockchain'
      ],
      link: 'https://blockchain-voting-frontend-eta.vercel.app/',
    },
    {
      id: 2,
      title: 'QR + Face Recognition Attendance System',
      dates: 'July 2025 -- Nov 2025',
      description: 'Full-stack system with React Native mobile app and teacher web portal for secure attendance',
      tech: ['React Native', 'React', 'Node.js', 'MongoDB', 'AWS'],
      highlights: [
        'AWS Rekognition for biometric verification against S3 images',
        'Secure QR code rotation algorithm to prevent proxy attendance',
        'Global state management with Zustand',
        'Multi-part form data and image uploads with Multer'
      ],
      link: 'https://teacher-website-pi.vercel.app/login',
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
    hidden: { opacity: 0, y: 20, scale: 0.95 },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      transition: { duration: 0.5 },
    },
  }

  return (
    <section id="projects" className="pt-6 pb-10 px-4 sm:px-6 lg:px-8 bg-white dark:bg-slate-800">
      <div className="max-w-6xl mx-auto">
        {/* Section heading */}
        <div className="mb-16">
          <Reveal>
            <WordHoverHeader
              as="h2"
              text="Featured Projects"
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
            Showcase of my recent work and creative projects
          </motion.p>
        </div>

        {/* Projects grid */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-20 lg:gap-32"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false, amount: 0.2 }}
        >
          {projects.map((project) => (
            <TiltCard
              key={project.id}
              className="group"
              variants={cardVariants}
            >
              <div
                className="relative h-full"
              >
                {/* Glow Effect Background */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg blur opacity-0 group-hover:opacity-25 transition duration-500" />
                
                <div
                  className="relative h-full p-6 rounded-lg border border-blue-500 dark:border-blue-400 bg-gradient-to-br from-blue-500/5 to-transparent dark:from-blue-600/10 transition-all duration-300 flex flex-col hover:shadow-xl group-hover:border-blue-500 dark:group-hover:border-blue-400"
                >
                  {/* Header */}
                  <div className="mb-4 pb-4 border-b border-slate-200 dark:border-slate-700">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-lg font-semibold text-slate-900 dark:text-white">
                        {project.title}
                      </h3>
                      <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                        {project.dates}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 dark:text-slate-400">
                      {project.description}
                    </p>
                  </div>

                  {/* Highlights */}
                  <ul className="mb-4 space-y-2">
                    {project.highlights.map((highlight, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600 dark:text-slate-400">
                        <span className="text-blue-600 dark:text-blue-400 font-bold mt-0.5">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>

                  {/* Tech stack */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.tech.map((tech) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 text-xs font-medium rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400"
                        whileHover={{ scale: 1.1, backgroundColor: "rgba(37, 99, 235, 0.2)" }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* Link */}
                  <div className="mt-auto">
                    <motion.a
                      href={project.link}
                      className="inline-flex items-center gap-2 text-sm font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 transition-colors"
                      whileHover={{ x: 4 }}
                    >
                      View Project →
                    </motion.a>
                  </div>
                </div>
              </div>
            </TiltCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
