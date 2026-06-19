import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiSun, FiMoon, FiMenu, FiX } from 'react-icons/fi'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Achievements', href: '#achievements' },
  { label: 'Contact', href: '#contact' },
]

export default function Navbar({ isDark, setIsDark }) {
  const [scrolled, setScrolled] = useState(false)
  const [active, setActive] = useState('')
  const [mobileOpen, setMobileOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50)

      const sections = NAV_LINKS.map(l => l.href.slice(1))
      let current = ''
      for (const id of sections) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 120) current = id
      }
      setActive(current)
    }
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const handleNavClick = (e, href) => {
    e.preventDefault()
    const target = document.querySelector(href)
    if (target) {
      target.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
    setMobileOpen(false)
  }

  return (
    <>
      <motion.nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled
            ? isDark
              ? 'bg-dark-900/90 backdrop-blur-xl border-b border-white/5 shadow-lg shadow-black/20'
              : 'bg-white/90 backdrop-blur-xl border-b border-gray-200/50 shadow-lg'
            : 'bg-transparent'
        }`}
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <motion.a
              href="#hero"
              onClick={(e) => handleNavClick(e, '#hero')}
              className="relative group"
              whileHover={{ scale: 1.05 }}
            >
              <span className="font-display text-2xl font-black gradient-text">AP</span>
              <span className={`font-mono text-xs absolute -bottom-1 left-0 transition-colors ${isDark ? 'text-white/30 group-hover:text-primary' : 'text-gray-400 group-hover:text-primary'}`}>
                .dev
              </span>
            </motion.a>

            {/* Desktop links */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map(({ label, href }) => {
                const id = href.slice(1)
                const isActive = active === id
                return (
                  <a
                    key={label}
                    href={href}
                    onClick={(e) => handleNavClick(e, href)}
                    className={`relative px-4 py-2 font-mono text-xs tracking-wider uppercase transition-colors duration-200 group ${
                      isActive
                        ? 'text-primary'
                        : isDark
                        ? 'text-white/50 hover:text-white'
                        : 'text-gray-500 hover:text-gray-900'
                    }`}
                  >
                    {isActive && (
                      <motion.span
                        layoutId="nav-active"
                        className="absolute inset-0 bg-primary/10 border-b border-primary"
                        transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                      />
                    )}
                    <span className="relative z-10">{label}</span>
                  </a>
                )
              })}
            </div>

            {/* Right controls */}
            <div className="flex items-center gap-3">
              {/* Theme toggle */}
              <motion.button
                onClick={() => setIsDark(!isDark)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className={`w-9 h-9 flex items-center justify-center border transition-all duration-300 ${
                  isDark
                    ? 'border-white/10 text-white/60 hover:border-primary hover:text-primary'
                    : 'border-gray-200 text-gray-500 hover:border-primary hover:text-primary'
                }`}
              >
                <AnimatePresence mode="wait">
                  {isDark ? (
                    <motion.span key="sun" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiSun size={15} />
                    </motion.span>
                  ) : (
                    <motion.span key="moon" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }} transition={{ duration: 0.2 }}>
                      <FiMoon size={15} />
                    </motion.span>
                  )}
                </AnimatePresence>
              </motion.button>

              {/* CTA */}
              <a
                href="#contact"
                onClick={(e) => handleNavClick(e, '#contact')}
                className="hidden md:flex btn-primary text-xs py-2 px-5"
              >
                Hire Me
              </a>

              {/* Mobile menu toggle */}
              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`md:hidden w-9 h-9 flex items-center justify-center ${isDark ? 'text-white/60' : 'text-gray-500'}`}
              >
                {mobileOpen ? <FiX size={18} /> : <FiMenu size={18} />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className={`fixed top-16 left-0 right-0 z-40 border-b ${
              isDark ? 'bg-dark-800/95 backdrop-blur-xl border-white/5' : 'bg-white/95 backdrop-blur-xl border-gray-200'
            }`}
          >
            <div className="px-4 py-6 flex flex-col gap-1">
              {NAV_LINKS.map(({ label, href }, i) => (
                <motion.a
                  key={label}
                  href={href}
                  onClick={(e) => handleNavClick(e, href)}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`px-4 py-3 font-mono text-sm tracking-wider border-b transition-colors ${
                    isDark ? 'border-white/5 text-white/60 hover:text-primary' : 'border-gray-100 text-gray-500 hover:text-primary'
                  }`}
                >
                  <span className="text-primary mr-2">0{i + 1}.</span>{label}
                </motion.a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
