import React from 'react'
import { motion } from 'framer-motion'
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme()

  return (
    <motion.button
      onClick={toggleTheme}
      className="relative inline-flex items-center gap-2 px-3 py-2 rounded-lg bg-slate-100 dark:bg-slate-700 text-slate-700 dark:text-slate-200 font-medium text-sm transition-colors hover:bg-slate-200 dark:hover:bg-slate-600"
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {theme === 'light' ? (
        <>
          <span>🌙</span>
          <span className="hidden sm:inline">Dark</span>
        </>
      ) : (
        <>
          <span>☀️</span>
          <span className="hidden sm:inline">Light</span>
        </>
      )}
    </motion.button>
  )
}
