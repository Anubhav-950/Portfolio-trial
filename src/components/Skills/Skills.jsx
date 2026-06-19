import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionHeader } from '../common/SectionWrapper'

const SKILL_CATEGORIES = [
  {
    label: 'Languages',
    color: '#00FF94',
    skills: [
      { name: 'JavaScript', level: 88 },
      { name: 'Java', level: 75 },
      { name: 'C', level: 70 },
    ],
  },
  {
    label: 'Web Technologies',
    color: '#00C2FF',
    skills: [
      { name: 'React.js', level: 85 },
      { name: 'Node.js', level: 82 },
      { name: 'HTML & CSS', level: 92 },
    ],
  },
  {
    label: 'Cloud & Backend',
    color: '#FF6B6B',
    skills: [
      { name: 'AWS', level: 72 },
      { name: 'MongoDB', level: 80 },
      { name: 'Express.js', level: 83 },
    ],
  },
  {
    label: 'Tools & Workflow',
    color: '#FFD93D',
    skills: [
      { name: 'Git & GitHub', level: 88 },
      { name: 'Postman', level: 82 },
      { name: 'VS Code', level: 90 },
    ],
  },
]

const TECH_ICONS = [
  { name: 'JavaScript', emoji: '⚡' },
  { name: 'React', emoji: '⚛️' },
  { name: 'Node.js', emoji: '🟢' },
  { name: 'MongoDB', emoji: '🍃' },
  { name: 'AWS', emoji: '☁️' },
  { name: 'Git', emoji: '🔀' },
  { name: 'HTML5', emoji: '🌐' },
  { name: 'CSS3', emoji: '🎨' },
  { name: 'Java', emoji: '☕' },
  { name: 'Express', emoji: '🚀' },
  { name: 'Postman', emoji: '📮' },
  { name: 'GitHub', emoji: '🐙' },
]

function SkillBar({ name, level, color, i, inView }) {
  return (
    <div className="mb-5">
      <div className="flex justify-between mb-2">
        <span className="font-mono text-sm text-white/70">{name}</span>
        <span className="font-mono text-xs" style={{ color }}>{level}%</span>
      </div>
      <div className="h-1.5 bg-white/5 overflow-hidden">
        <motion.div
          className="h-full"
          style={{
            background: `linear-gradient(90deg, ${color}, ${color}80)`,
            boxShadow: `0 0 8px ${color}60`,
          }}
          initial={{ width: 0 }}
          animate={inView ? { width: `${level}%` } : { width: 0 }}
          transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: 'easeOut' }}
        />
      </div>
    </div>
  )
}

function SkillCategory({ label, color, skills, idx, isDark }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: idx * 0.1 }}
      className={`p-6 clip-corner relative group card-hover ${isDark ? 'glass' : 'bg-white border border-gray-100 shadow-sm'}`}
    >
      {/* Color accent top */}
      <div className="absolute top-0 left-0 right-0 h-0.5" style={{ background: `linear-gradient(90deg, ${color}, transparent)` }} />

      <div className="flex items-center gap-3 mb-6">
        <div className="w-3 h-3 rounded-full" style={{ background: color, boxShadow: `0 0 8px ${color}` }} />
        <h3 className={`font-display text-base font-bold ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</h3>
      </div>

      {skills.map((skill, i) => (
        <SkillBar key={skill.name} {...skill} color={color} i={i} inView={inView} />
      ))}
    </motion.div>
  )
}

export default function Skills({ isDark }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="skills" className={`relative py-24 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      <div className="absolute inset-0 grid-lines opacity-20" />
      <SectionWrapper className="!py-0">
        <SectionHeader
          subtitle="// what I work with"
          title="Skills & Technologies"
          description="A curated collection of technologies I've worked with, ranging from frontend frameworks to cloud services."
          isDark={isDark}
        />

        {/* Skill categories */}
        <div className="grid sm:grid-cols-2 xl:grid-cols-4 gap-6 mb-16">
          {SKILL_CATEGORIES.map((cat, i) => (
            <SkillCategory key={cat.label} {...cat} idx={i} isDark={isDark} />
          ))}
        </div>

        {/* Tech icon cloud */}
        <div ref={ref} className="text-center">
          <p className={`font-mono text-xs tracking-widest uppercase mb-8 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
            Technologies in my toolkit
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {TECH_ICONS.map(({ name, emoji }, i) => (
              <motion.div
                key={name}
                initial={{ opacity: 0, scale: 0.5 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                whileHover={{ scale: 1.1, y: -4 }}
                className={`px-4 py-2.5 border flex items-center gap-2 transition-all duration-300 cursor-default ${
                  isDark
                    ? 'border-white/8 bg-white/3 hover:border-primary/50 hover:bg-primary/5'
                    : 'border-gray-200 bg-gray-50 hover:border-primary/50 hover:bg-primary/5'
                }`}
              >
                <span className="text-base">{emoji}</span>
                <span className={`font-mono text-xs ${isDark ? 'text-white/60' : 'text-gray-600'}`}>{name}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
