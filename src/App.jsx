import { useState, useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import Navbar from './components/Navbar/Navbar'
import Hero from './components/Hero/Hero'
import About from './components/About/About'
import Skills from './components/Skills/Skills'
import Projects from './components/Projects/Projects'
import Experience from './components/Experience/Experience'
import Achievements from './components/Achievements/Achievements'
import Contact from './components/Contact/Contact'
import Loader from './components/common/Loader'
import CustomCursor from './components/common/CustomCursor'
import Footer from './components/common/Footer'

export default function App() {
  const [isDark, setIsDark] = useState(true)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2800)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.classList.toggle('light', !isDark)
  }, [isDark])

  return (
    <div className={isDark ? 'dark' : 'light'}>
      <AnimatePresence mode="wait">
        {loading && <Loader key="loader" />}
      </AnimatePresence>

      {!loading && (
        <>
          <CustomCursor />
          <div className="noise" />
          <div className={`min-h-screen ${isDark ? 'bg-dark-900 text-white' : 'bg-light-50 text-gray-900'}`}>
            <Navbar isDark={isDark} setIsDark={setIsDark} />
            <main>
              <Hero isDark={isDark} />
              <About isDark={isDark} />
              <Skills isDark={isDark} />
              <Projects isDark={isDark} />
              <Experience isDark={isDark} />
              <Achievements isDark={isDark} />
              <Contact isDark={isDark} />
            </main>
            <Footer isDark={isDark} />
          </div>
        </>
      )}
    </div>
  )
}
