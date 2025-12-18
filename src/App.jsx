import React from 'react'
import { Header } from './components/Header'
import { Hero } from './components/Hero'
import { About } from './components/About'
import { Projects } from './components/Projects'
import { Skills } from './components/Skills'
import { Education } from './components/Education'
import { Footer } from './components/Footer'
import { ThemeProvider } from './context/ThemeContext'
import './globals.css'

function App() {
  return (
    <ThemeProvider>
      <div className="min-h-screen bg-white dark:bg-slate-900 text-slate-900 dark:text-white transition-colors duration-300">
        <Header />
        <Hero />
        <About />
        <Projects />
        <Skills />
        <Education />
        <Footer />
      </div>
    </ThemeProvider>
  )
}

export default App
