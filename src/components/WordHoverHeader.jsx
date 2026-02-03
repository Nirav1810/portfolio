import React, { useMemo } from 'react'
import { motion } from 'framer-motion'
import clsx from 'clsx'
import { twMerge } from 'tailwind-merge'

function BaseWordHoverHeader({ text, as = 'h2', className, accentClassName, ...motionProps }) {
  const words = useMemo(() => {
    if (typeof text !== 'string') return []
    return text.trim().split(/\s+/)
  }, [text])

  const MotionTag = motion[as] || motion.h2

  const baseClassName = twMerge(
    clsx('font-bold text-slate-900 dark:text-white pl-1'),
    className
  )

  const wordClassName = twMerge(
    'inline-block cursor-default transition-colors duration-150 mr-3',
    'hover:text-blue-600 dark:hover:text-blue-400',
    accentClassName
  )

  return (
    <MotionTag className={baseClassName} {...motionProps}>
      {words.map((word, index) => (
        <motion.span
          key={`${word}-${index}`}
          className={wordClassName}
          whileHover={{ scale: 1.04 }}
          transition={{ type: 'spring', stiffness: 220, damping: 20 }}
        >
          {word}
          {index < words.length - 1 && ' '}
        </motion.span>
      ))}
    </MotionTag>
  )
}

export const WordHoverHeader = React.memo(BaseWordHoverHeader)
