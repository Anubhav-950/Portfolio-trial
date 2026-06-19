import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionHeader } from '../common/SectionWrapper'
import { FiBriefcase, FiUsers, FiStar } from 'react-icons/fi'

const EXPERIENCES = [
  {
    id: 1,
    role: 'Software Development Intern',
    company: 'CodeBeat',
    duration: '2024',
    type: 'Internship',
    icon: FiBriefcase,
    color: '#00FF94',
    points: [
      'Developed and maintained full-stack web features using the MERN stack',
      'Collaborated with senior engineers on REST API design and implementation',
      'Improved application performance through code optimization and refactoring',
      'Participated in agile sprints, daily standups, and code reviews',
    ],
  },
  {
    id: 2,
    role: 'Full Stack Developer Intern',
    company: 'Ingeniour-TechWorld',
    duration: '2024',
    type: 'Internship',
    icon: FiBriefcase,
    color: '#00C2FF',
    points: [
      'Built scalable backend services and RESTful APIs using Node.js & Express',
      'Integrated third-party APIs and managed MongoDB database architecture',
      'Deployed services on AWS EC2 and configured environments',
      'Contributed to frontend development using React.js',
    ],
  },
  {
    id: 3,
    role: 'Organizing Committee Member',
    company: 'E-Fest & GDG Summit',
    duration: '2023 – 2024',
    type: 'Leadership',
    icon: FiUsers,
    color: '#FFD93D',
    points: [
      'Co-organized technical and cultural fests with 1000+ participants',
      'Managed logistics, scheduling, and volunteer coordination for GDG Summit',
      'Led the tech team in building the event registration portal',
      'Facilitated speaker sessions and workshops from industry professionals',
    ],
  },
  {
    id: 4,
    role: 'ED-Cell Representative',
    company: 'Entrepreneurship Development Cell',
    duration: '2023 – Present',
    type: 'Leadership',
    icon: FiStar,
    color: '#FF6B6B',
    points: [
      'Represent the institution\'s startup and innovation ecosystem',
      'Organize entrepreneurship bootcamps and pitch competitions',
      'Mentor junior students on project ideation and development',
      'Bridge connections between students, mentors, and industry experts',
    ],
  },
]

function TimelineItem({ exp, i, isDark, isLast }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = exp.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: i % 2 === 0 ? -40 : 40 }}
      animate={inView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.1 }}
      className={`relative flex gap-6 md:gap-10 ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-start`}
    >
      {/* Left/Right content */}
      <div className="flex-1">
        <div
          className={`p-6 clip-corner card-hover relative group ${isDark ? 'glass' : 'bg-white border border-gray-100 shadow-sm'}`}
          style={{
            borderTop: `1px solid ${exp.color}30`,
          }}
        >
          {/* Top color accent */}
          <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${exp.color}, transparent)` }} />

          <div className="flex flex-wrap items-start justify-between gap-3 mb-4">
            <div>
              <span
                className="font-mono text-xs px-2 py-0.5 mb-2 inline-block"
                style={{ color: exp.color, background: `${exp.color}15`, border: `1px solid ${exp.color}30` }}
              >
                {exp.type}
              </span>
              <h3 className={`font-display text-lg font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{exp.role}</h3>
              <p className="text-primary font-mono text-sm">{exp.company}</p>
            </div>
            <span className={`font-mono text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{exp.duration}</span>
          </div>

          <ul className="space-y-2">
            {exp.points.map((point, pi) => (
              <li key={pi} className={`flex items-start gap-2 font-body text-sm ${isDark ? 'text-white/50' : 'text-gray-500'}`}>
                <span className="mt-1.5 w-1 h-1 rounded-full flex-shrink-0" style={{ background: exp.color }} />
                {point}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Center timeline */}
      <div className="flex flex-col items-center flex-shrink-0 w-12">
        <div
          className="w-10 h-10 flex items-center justify-center border-2 z-10 relative"
          style={{
            borderColor: exp.color,
            background: isDark ? '#0a0f1e' : '#fff',
            boxShadow: `0 0 20px ${exp.color}40`,
          }}
        >
          <Icon size={16} style={{ color: exp.color }} />
        </div>
        {!isLast && (
          <div
            className="w-0.5 flex-1 mt-2"
            style={{ background: `linear-gradient(to bottom, ${exp.color}60, transparent)`, minHeight: '40px' }}
          />
        )}
      </div>

      {/* Spacer for alternating layout */}
      <div className="flex-1 hidden md:block" />
    </motion.div>
  )
}

export default function Experience({ isDark }) {
  return (
    <section id="experience" className={`relative py-24 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      <div className="absolute inset-0 grid-lines opacity-20" />
      <SectionWrapper className="!py-0">
        <SectionHeader
          subtitle="// my journey"
          title="Experience"
          description="Professional internships, leadership roles, and community involvement that shaped my development career."
          isDark={isDark}
        />

        <div className="relative max-w-4xl mx-auto">
          {/* Vertical center line (desktop) */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2"
            style={{ background: `linear-gradient(to bottom, transparent, #00FF9430, #00C2FF30, transparent)` }}
          />

          <div className="space-y-12">
            {EXPERIENCES.map((exp, i) => (
              <TimelineItem
                key={exp.id}
                exp={exp}
                i={i}
                isDark={isDark}
                isLast={i === EXPERIENCES.length - 1}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
