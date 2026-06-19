import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'

export default function SectionWrapper({ children, id, className = '' }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <motion.section
      ref={ref}
      id={id}
      className={`relative py-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto ${className}`}
      initial={{ opacity: 0 }}
      animate={inView ? { opacity: 1 } : {}}
      transition={{ duration: 0.6 }}
    >
      {children}
    </motion.section>
  )
}

export function SectionHeader({ subtitle, title, description, isDark }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <div ref={ref} className="mb-16 text-center">
      <motion.p
        className="section-subtitle"
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4 }}
      >
        {subtitle}
      </motion.p>
      <motion.h2
        className={`section-title ${isDark ? 'text-white' : 'text-gray-900'}`}
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        {title}
      </motion.h2>
      {description && (
        <motion.p
          className={`max-w-2xl mx-auto font-body text-base leading-relaxed ${isDark ? 'text-white/50' : 'text-gray-500'}`}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          {description}
        </motion.p>
      )}
      <motion.div
        className="mt-4 flex items-center justify-center gap-2"
        initial={{ opacity: 0, scaleX: 0 }}
        animate={inView ? { opacity: 1, scaleX: 1 } : {}}
        transition={{ duration: 0.6, delay: 0.3 }}
      >
        <div className="h-px w-12 bg-primary/40" />
        <div className="h-1 w-1 rounded-full bg-primary" />
        <div className="h-px w-24 bg-gradient-to-r from-primary to-accent" />
        <div className="h-1 w-1 rounded-full bg-accent" />
        <div className="h-px w-12 bg-accent/40" />
      </motion.div>
    </div>
  )
}
