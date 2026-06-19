import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionHeader } from '../common/SectionWrapper'
import { FiGithub, FiExternalLink, FiLock } from 'react-icons/fi'

const PROJECTS = [
  {
    id: 1,
    title: 'CaratLane Clone',
    subtitle: 'E-Commerce Platform',
    description:
      'A full-featured e-commerce platform inspired by CaratLane, the jewelry brand. Built with the MERN stack, it includes user authentication, product catalog, cart management, and order flow.',
    tech: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/anubhavpoddar',
    live: null,
    featured: true,
    color: '#00FF94',
    number: '01',
    status: 'completed',
  },
  {
    id: 2,
    title: 'Backend API System',
    subtitle: 'RESTful API Platform',
    description:
      'A robust backend API system built with Node.js and Express. Features modular architecture, JWT authentication, rate limiting, input validation, and comprehensive API documentation.',
    tech: ['Node.js', 'Express.js', 'MongoDB', 'JWT', 'Bcrypt', 'Postman'],
    github: 'https://github.com/anubhavpoddar',
    live: null,
    featured: true,
    color: '#00C2FF',
    number: '02',
    status: 'completed',
  },
  {
    id: 3,
    title: 'Portfolio v2',
    subtitle: 'This Website',
    description:
      'The very portfolio you\'re viewing right now. Built with React, Vite, Tailwind CSS, and Framer Motion. Features particle animations, theme toggle, and smooth section-based scrolling.',
    tech: ['React.js', 'Vite', 'Tailwind CSS', 'Framer Motion'],
    github: 'https://github.com/anubhavpoddar',
    live: null,
    featured: false,
    color: '#FFD93D',
    number: '03',
    status: 'completed',
  },
  {
    id: 4,
    title: 'Next Project',
    subtitle: 'Coming Soon',
    description:
      'Something exciting is being built. Stay tuned for my next project — pushing boundaries in full-stack development with modern cloud-native technologies.',
    tech: ['???', 'AWS', 'React', 'Node.js'],
    github: null,
    live: null,
    featured: false,
    color: '#FF6B6B',
    number: '04',
    status: 'in-progress',
  },
]

function ProjectCard({ project, i, isDark }) {
  const [ref, inView] = useInView({ threshold: 0.15, triggerOnce: true })
  const [hovered, setHovered] = useState(false)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.12 }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`relative clip-corner overflow-hidden group cursor-pointer ${
        isDark ? 'glass' : 'bg-white border border-gray-100 shadow-sm'
      } ${project.status === 'in-progress' ? 'opacity-70' : ''}`}
      style={{
        boxShadow: hovered ? `0 20px 60px -10px ${project.color}30` : 'none',
        transition: 'all 0.4s cubic-bezier(0.4,0,0.2,1)',
        transform: hovered ? 'translateY(-8px)' : 'translateY(0)',
      }}
    >
      {/* Top accent */}
      <div
        className="absolute top-0 left-0 right-0 h-0.5 transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, ${project.color}, transparent)`,
          opacity: hovered ? 1 : 0.4,
        }}
      />

      {/* Project number */}
      <div className="absolute top-4 right-4">
        <span
          className="font-display text-5xl font-black opacity-10 select-none"
          style={{ color: project.color }}
        >
          {project.number}
        </span>
      </div>

      <div className="p-7">
        {/* Status */}
        <div className="flex items-center gap-2 mb-4">
          <div
            className="w-1.5 h-1.5 rounded-full"
            style={{
              background: project.status === 'completed' ? project.color : '#FFD93D',
              boxShadow: `0 0 6px ${project.status === 'completed' ? project.color : '#FFD93D'}`,
            }}
          />
          <span className={`font-mono text-xs tracking-widest ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
            {project.status === 'completed' ? 'COMPLETED' : 'IN PROGRESS'}
          </span>
        </div>

        {/* Title */}
        <p className={`font-mono text-xs mb-1 ${isDark ? 'text-white/40' : 'text-gray-400'}`}>{project.subtitle}</p>
        <h3
          className={`font-display text-xl font-bold mb-4 transition-colors duration-300 ${isDark ? 'text-white' : 'text-gray-900'}`}
          style={{ color: hovered ? project.color : undefined }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p className={`font-body text-sm leading-relaxed mb-6 ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
          {project.description}
        </p>

        {/* Tech stack */}
        <div className="flex flex-wrap gap-2 mb-6">
          {project.tech.map(t => (
            <span
              key={t}
              className={`font-mono text-xs px-2.5 py-1 border ${
                isDark ? 'border-white/8 text-white/50 bg-white/3' : 'border-gray-200 text-gray-500 bg-gray-50'
              }`}
            >
              {t}
            </span>
          ))}
        </div>

        {/* Links */}
        <div className="flex items-center gap-3">
          {project.github ? (
            <a
              href={project.github}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center gap-2 font-mono text-xs px-4 py-2 border transition-all duration-300 hover:border-primary hover:text-primary ${
                isDark ? 'border-white/10 text-white/50' : 'border-gray-200 text-gray-500'
              }`}
            >
              <FiGithub size={13} /> GitHub
            </a>
          ) : (
            <span className={`flex items-center gap-2 font-mono text-xs px-4 py-2 border ${isDark ? 'border-white/5 text-white/20' : 'border-gray-100 text-gray-300'}`}>
              <FiLock size={13} /> Private
            </span>
          )}
          {project.live ? (
            <a
              href={project.live}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 font-mono text-xs px-4 py-2 bg-primary text-dark-900 transition-all hover:shadow-[0_0_20px_rgba(0,255,148,0.4)]"
            >
              <FiExternalLink size={13} /> Live Demo
            </a>
          ) : null}
        </div>
      </div>
    </motion.div>
  )
}

export default function Projects({ isDark }) {
  return (
    <section id="projects" className={`relative py-24 ${isDark ? 'bg-dark-800' : 'bg-gray-50/50'}`}>
      <div className="absolute inset-0 grid-lines opacity-20" />
      <SectionWrapper className="!py-0">
        <SectionHeader
          subtitle="// what I've built"
          title="Featured Projects"
          description="A showcase of production-ready applications and engineering experiments."
          isDark={isDark}
        />

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((project, i) => (
            <ProjectCard key={project.id} project={project} i={i} isDark={isDark} />
          ))}
        </div>

        {/* GitHub CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center"
        >
          <a
            href="https://github.com/anubhavpoddar"
            target="_blank"
            rel="noopener noreferrer"
            className={`inline-flex items-center gap-3 font-mono text-sm transition-colors hover:text-primary ${isDark ? 'text-white/40' : 'text-gray-400'}`}
          >
            <FiGithub size={16} />
            View all repositories on GitHub
            <span className="text-primary">→</span>
          </a>
        </motion.div>
      </SectionWrapper>
    </section>
  )
}
