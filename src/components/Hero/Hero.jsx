import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { FiArrowDown, FiGithub, FiLinkedin } from 'react-icons/fi'

const TITLES = [
  'Full Stack Developer',
  'MERN Stack Engineer',
  'AWS Cloud Enthusiast',
  'DevOps Practitioner',
  'Problem Solver',
]

function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    let animId
    let particles = []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      particles = []
      const count = Math.floor((canvas.width * canvas.height) / 12000)
      for (let i = 0; i < count; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          r: Math.random() * 1.5 + 0.3,
          dx: (Math.random() - 0.5) * 0.4,
          dy: (Math.random() - 0.5) * 0.4,
          opacity: Math.random() * 0.5 + 0.1,
        })
      }
    }

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)

      particles.forEach(p => {
        p.x += p.dx
        p.y += p.dy

        if (p.x < 0) p.x = canvas.width
        if (p.x > canvas.width) p.x = 0
        if (p.y < 0) p.y = canvas.height
        if (p.y > canvas.height) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(0, 255, 148, ${p.opacity})`
        ctx.fill()
      })

      // Draw connections
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx = particles[i].x - particles[j].x
          const dy = particles[i].y - particles[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < 100) {
            ctx.beginPath()
            ctx.moveTo(particles[i].x, particles[i].y)
            ctx.lineTo(particles[j].x, particles[j].y)
            ctx.strokeStyle = `rgba(0, 255, 148, ${0.08 * (1 - dist / 100)})`
            ctx.lineWidth = 0.5
            ctx.stroke()
          }
        }
      }

      animId = requestAnimationFrame(draw)
    }

    resize()
    draw()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(animId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 pointer-events-none"
      style={{ opacity: isDark ? 0.6 : 0.2 }}
    />
  )
}

function TypingText() {
  const [titleIdx, setTitleIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)
  const [pause, setPause] = useState(false)

  useEffect(() => {
    if (pause) {
      const t = setTimeout(() => setPause(false), 1500)
      return () => clearTimeout(t)
    }
    const current = TITLES[titleIdx]
    if (!deleting) {
      if (displayed.length < current.length) {
        const t = setTimeout(() => setDisplayed(current.slice(0, displayed.length + 1)), 70)
        return () => clearTimeout(t)
      } else {
        setPause(true)
        setTimeout(() => setDeleting(true), 500)
      }
    } else {
      if (displayed.length > 0) {
        const t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
        return () => clearTimeout(t)
      } else {
        setDeleting(false)
        setTitleIdx((titleIdx + 1) % TITLES.length)
      }
    }
  }, [displayed, deleting, pause, titleIdx])

  return (
    <span className="gradient-text">
      {displayed}
      <span className="typing-cursor text-primary">|</span>
    </span>
  )
}

export default function Hero({ isDark }) {
  const handleScroll = (href) => {
    const el = document.querySelector(href)
    if (el) el.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      className={`relative min-h-screen flex items-center overflow-hidden ${isDark ? 'bg-dark-900' : 'bg-light-50'}`}
    >
      {/* Background */}
      <ParticleCanvas isDark={isDark} />

      {/* Grid */}
      <div className={`absolute inset-0 grid-lines ${isDark ? 'opacity-100' : 'opacity-30'}`} />

      {/* Gradient orbs */}
      <div className="absolute top-1/4 -left-40 w-[500px] h-[500px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00FF94 0%, transparent 70%)' }} />
      <div className="absolute bottom-1/4 -right-40 w-[400px] h-[400px] rounded-full opacity-10"
        style={{ background: 'radial-gradient(circle, #00C2FF 0%, transparent 70%)' }} />

      {/* Scan line */}
      <div className="scan-line" />

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24">
        <div className="max-w-4xl">
          {/* Status badge */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 border border-primary/20 mb-8"
          >
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="font-mono text-xs text-primary tracking-widest">AVAILABLE FOR OPPORTUNITIES</span>
          </motion.div>

          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className={`font-mono text-sm tracking-widest mb-4 ${isDark ? 'text-white/40' : 'text-gray-400'}`}
          >
            Hello, World! I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
            className={`font-display text-6xl sm:text-7xl lg:text-8xl font-black leading-none mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}
          >
            ANUBHAV
            <br />
            <span className="gradient-text glow-text">PODDAR</span>
          </motion.h1>

          {/* Typing title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="font-display text-2xl sm:text-3xl font-bold mb-8 h-10"
          >
            <TypingText />
          </motion.div>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.7 }}
            className={`font-body text-base sm:text-lg max-w-2xl leading-relaxed mb-10 ${isDark ? 'text-white/50' : 'text-gray-500'}`}
          >
            Passionate Full Stack Developer specializing in building scalable web applications
            with the MERN stack. Cloud-native mindset with AWS expertise and a love for
            clean architecture and DevOps workflows.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.8 }}
            className="flex flex-wrap items-center gap-4 mb-12"
          >
            <button
              onClick={() => handleScroll('#projects')}
              className="btn-primary clip-corner"
            >
              View Projects
            </button>
            <button
              onClick={() => handleScroll('#contact')}
              className="btn-outline"
            >
              Contact Me
            </button>
            <div className="flex items-center gap-3 ml-2">
              {[
                { icon: FiGithub, href: 'https://github.com/anubhavpoddar' },
                { icon: FiLinkedin, href: 'https://linkedin.com/in/anubhavpoddar' },
              ].map(({ icon: Icon, href }) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 hover:border-primary hover:text-primary ${isDark ? 'border-white/10 text-white/40' : 'border-gray-200 text-gray-400'}`}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.9 }}
            className="flex flex-wrap gap-8"
          >
            {[
              { value: '2+', label: 'Years Coding' },
              { value: '100+', label: 'LeetCode Solved' },
              { value: '5+', label: 'Projects Built' },
              { value: '2', label: 'Internships' },
            ].map(({ value, label }) => (
              <div key={label} className="relative">
                <div className={`absolute -top-1 -left-1 w-2 h-2 border-t border-l ${isDark ? 'border-primary/40' : 'border-primary/30'}`} />
                <p className="font-display text-3xl font-black gradient-text">{value}</p>
                <p className={`font-mono text-xs tracking-wider ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{label}</p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.button
        onClick={() => handleScroll('#about')}
        className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 ${isDark ? 'text-white/30' : 'text-gray-400'} hover:text-primary transition-colors`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span className="font-mono text-xs tracking-widest">SCROLL</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: 'easeInOut' }}
        >
          <FiArrowDown size={16} />
        </motion.div>
      </motion.button>

      {/* Right side decoration */}
      <motion.div
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.8, duration: 0.8 }}
        className="absolute right-8 top-1/2 -translate-y-1/2 hidden xl:flex flex-col items-center gap-6"
      >
        <div className={`w-px h-24 ${isDark ? 'bg-gradient-to-b from-primary/40 to-transparent' : 'bg-gradient-to-b from-primary/30 to-transparent'}`} />
        <div className="flex flex-col gap-3">
          {['R', 'E', 'A', 'C', 'T'].map((l, i) => (
            <motion.span
              key={l}
              className={`font-mono text-xs ${isDark ? 'text-white/20' : 'text-gray-300'}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1 + i * 0.1 }}
            >
              {l}
            </motion.span>
          ))}
        </div>
        <div className={`w-px h-24 ${isDark ? 'bg-gradient-to-b from-transparent to-accent/40' : 'bg-gradient-to-b from-transparent to-accent/30'}`} />
      </motion.div>
    </section>
  )
}
