import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export default function Loader() {
  const [progress, setProgress] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer)
          return 100
        }
        return prev + Math.random() * 15
      })
    }, 150)
    return () => clearInterval(timer)
  }, [])

  return (
    <motion.div
      className="fixed inset-0 z-[9999] bg-dark-900 flex flex-col items-center justify-center"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.05 }}
      transition={{ duration: 0.6, ease: 'easeInOut' }}
    >
      {/* Scan line */}
      <div className="scan-line" />

      {/* Grid */}
      <div className="absolute inset-0 grid-lines opacity-30" />

      {/* Logo */}
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="mb-12 relative"
      >
        <div className="w-24 h-24 border border-primary/30 flex items-center justify-center clip-corner relative">
          <div className="absolute inset-0 bg-primary/5" />
          <span className="font-display text-5xl font-black gradient-text relative z-10">A</span>
          {/* Corner accents */}
          <div className="absolute top-0 left-0 w-3 h-3 border-t-2 border-l-2 border-primary" />
          <div className="absolute top-0 right-0 w-3 h-3 border-t-2 border-r-2 border-primary" />
          <div className="absolute bottom-0 left-0 w-3 h-3 border-b-2 border-l-2 border-primary" />
          <div className="absolute bottom-0 right-0 w-3 h-3 border-b-2 border-r-2 border-primary" />
        </div>
      </motion.div>

      {/* Name */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="text-center mb-8"
      >
        <p className="font-mono text-primary text-xs tracking-[0.4em] uppercase mb-2">Initializing</p>
        <h1 className="font-display text-2xl font-bold text-white tracking-wider">ANUBHAV PODDAR</h1>
      </motion.div>

      {/* Progress bar */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="w-64"
      >
        <div className="flex justify-between mb-2">
          <span className="font-mono text-xs text-white/40">Loading assets</span>
          <span className="font-mono text-xs text-primary">{Math.min(100, Math.round(progress))}%</span>
        </div>
        <div className="h-[2px] bg-white/10 w-full overflow-hidden">
          <motion.div
            className="h-full loader-bar"
            style={{ width: `${Math.min(100, progress)}%` }}
            transition={{ ease: 'easeOut' }}
          />
        </div>
        <div className="mt-3 font-mono text-xs text-white/20 flex gap-1">
          <span className="text-primary">{'>'}</span>
          <span>system.boot() → portfolio.init()</span>
        </div>
      </motion.div>
    </motion.div>
  )
}
