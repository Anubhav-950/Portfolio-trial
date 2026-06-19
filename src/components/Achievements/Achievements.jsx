import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionHeader } from '../common/SectionWrapper'
import { FiAward, FiCode, FiBook, FiStar, FiUsers, FiZap } from 'react-icons/fi'

const ACHIEVEMENTS = [
  {
    icon: FiAward,
    title: 'MERN Stack Certified',
    desc: 'Completed official MERN Stack Development certification, demonstrating proficiency in MongoDB, Express.js, React, and Node.js.',
    color: '#00FF94',
    label: 'Certification',
    year: '2024',
  },
  {
    icon: FiCode,
    title: '100+ LeetCode Problems',
    desc: 'Solved over 100 algorithmic challenges on LeetCode covering arrays, trees, dynamic programming, and graph problems.',
    color: '#00C2FF',
    label: 'DSA',
    year: '2023–24',
  },
  {
    icon: FiBook,
    title: '100+ GFG Problems',
    desc: 'Completed 100+ problems on GeeksforGeeks, strengthening data structures, algorithms, and coding fundamentals.',
    color: '#FFD93D',
    label: 'DSA',
    year: '2023–24',
  },
  {
    icon: FiUsers,
    title: 'Event Management – E-Fest',
    desc: 'Successfully co-organized E-Fest, one of the largest college technical and cultural fests, managing 1000+ participants.',
    color: '#FF6B6B',
    label: 'Leadership',
    year: '2024',
  },
  {
    icon: FiStar,
    title: 'GDG Summit Organizer',
    desc: 'Core organizer at Google Developer Group Summit, facilitating workshops, speaker sessions, and community networking.',
    color: '#A855F7',
    label: 'Community',
    year: '2024',
  },
  {
    icon: FiZap,
    title: 'ED-Cell Representative',
    desc: 'Selected as representative for the Entrepreneurship Development Cell, mentoring student startups and innovation initiatives.',
    color: '#F59E0B',
    label: 'Leadership',
    year: '2023–Present',
  },
]

function AchievementCard({ item, i, isDark }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })
  const Icon = item.icon

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, scale: 0.9, y: 30 }}
      animate={inView ? { opacity: 1, scale: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.08 }}
      whileHover={{ y: -6 }}
      className={`relative p-6 clip-corner group overflow-hidden ${isDark ? 'glass' : 'bg-white border border-gray-100 shadow-sm'}`}
      style={{ transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)' }}
    >
      {/* Background glow on hover */}
      <div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
        style={{ background: `radial-gradient(circle at 0% 0%, ${item.color}08, transparent 60%)` }}
      />

      {/* Top line */}
      <div
        className="absolute top-0 left-0 w-12 h-0.5 group-hover:w-full transition-all duration-500"
        style={{ background: item.color }}
      />

      {/* Year badge */}
      <div className="absolute top-4 right-4">
        <span className={`font-mono text-xs ${isDark ? 'text-white/20' : 'text-gray-300'}`}>{item.year}</span>
      </div>

      {/* Icon */}
      <div
        className="w-12 h-12 flex items-center justify-center mb-5 transition-all duration-300 group-hover:scale-110"
        style={{
          background: `${item.color}15`,
          border: `1px solid ${item.color}30`,
        }}
      >
        <Icon size={20} style={{ color: item.color }} />
      </div>

      {/* Label */}
      <span
        className="font-mono text-xs px-2 py-0.5 mb-3 inline-block"
        style={{ color: item.color, background: `${item.color}10`, border: `1px solid ${item.color}20` }}
      >
        {item.label}
      </span>

      {/* Title */}
      <h3 className={`font-display text-base font-bold mb-3 leading-snug ${isDark ? 'text-white' : 'text-gray-900'}`}>
        {item.title}
      </h3>

      {/* Desc */}
      <p className={`font-body text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>
        {item.desc}
      </p>
    </motion.div>
  )
}

export default function Achievements({ isDark }) {
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  return (
    <section id="achievements" className={`relative py-24 ${isDark ? 'bg-dark-800' : 'bg-gray-50/50'}`}>
      <div className="absolute inset-0 grid-lines opacity-20" />

      {/* Glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(circle, #00FF94, transparent 70%)' }} />

      <SectionWrapper className="!py-0">
        <SectionHeader
          subtitle="// milestones"
          title="Achievements"
          description="Certifications, competitive programming milestones, and leadership accomplishments."
          isDark={isDark}
        />

        <div ref={ref} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ACHIEVEMENTS.map((item, i) => (
            <AchievementCard key={item.title} item={item} i={i} isDark={isDark} />
          ))}
        </div>

        {/* Stats banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className={`mt-16 p-8 clip-corner ${isDark ? 'glass border-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '100+', label: 'LeetCode Problems', color: '#00FF94' },
              { value: '100+', label: 'GFG Problems', color: '#00C2FF' },
              { value: '2', label: 'Internships', color: '#FFD93D' },
              { value: '1000+', label: 'Event Participants', color: '#FF6B6B' },
            ].map(({ value, label, color }) => (
              <div key={label}>
                <div className="font-display text-4xl font-black mb-1" style={{ color }}>
                  {value}
                </div>
                <div className={`font-mono text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{label}</div>
              </div>
            ))}
          </div>
        </motion.div>
      </SectionWrapper>
    </section>
  )
}
