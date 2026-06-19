import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionHeader } from '../common/SectionWrapper'
import { FiCode, FiCloud, FiServer, FiZap } from 'react-icons/fi'

const INTERESTS = [
  { icon: FiCode, label: 'Full Stack Dev', desc: 'Building end-to-end web solutions with modern frameworks' },
  { icon: FiCloud, label: 'Cloud & AWS', desc: 'Deploying and managing scalable cloud infrastructure' },
  { icon: FiServer, label: 'DevOps', desc: 'CI/CD pipelines, Docker, and deployment automation' },
  { icon: FiZap, label: 'Problem Solving', desc: '100+ DSA problems solved on LeetCode and GFG' },
]

function InterestCard({ icon: Icon, label, desc, i, isDark }) {
  const [ref, inView] = useInView({ threshold: 0.3, triggerOnce: true })
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.1 }}
      className={`relative p-6 clip-corner card-hover group ${isDark ? 'glass border-white/5' : 'bg-white border border-gray-100 shadow-sm'}`}
    >
      {/* Corner accent */}
      <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-primary/40 group-hover:border-primary transition-colors" />

      <div className={`w-12 h-12 flex items-center justify-center mb-4 border transition-all duration-300 group-hover:border-primary group-hover:bg-primary/10 ${isDark ? 'border-white/10' : 'border-gray-200'}`}>
        <Icon className="text-primary" size={20} />
      </div>
      <h3 className={`font-display text-base font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>{label}</h3>
      <p className={`font-body text-sm leading-relaxed ${isDark ? 'text-white/40' : 'text-gray-500'}`}>{desc}</p>
    </motion.div>
  )
}

export default function About({ isDark }) {
  const [ref, inView] = useInView({ threshold: 0.2, triggerOnce: true })

  return (
    <section id="about" className={`relative py-24 ${isDark ? 'bg-dark-800' : 'bg-gray-50/50'}`}>
      <div className="absolute inset-0 grid-lines opacity-20" />
      <SectionWrapper className="!py-0">
        <SectionHeader
          subtitle="// who I am"
          title="About Me"
          isDark={isDark}
        />

        <div className="grid lg:grid-cols-2 gap-16 items-start">
          {/* Left: Text */}
          <div ref={ref}>
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{ duration: 0.6 }}
            >
              <div className="relative mb-8">
                <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary to-accent" />
                <div className="pl-6 space-y-4">
                  <p className={`font-body text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                    I'm <span className="text-primary font-semibold">Anubhav Poddar</span>, a passionate Full Stack Developer
                    with hands-on experience in building production-grade web applications. I specialize in the{' '}
                    <span className="text-accent font-semibold">MERN stack</span> and cloud services, with a strong focus
                    on writing clean, maintainable, and scalable code.
                  </p>
                  <p className={`font-body text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                    During my internships at <span className="text-primary font-semibold">CodeBeat</span> and{' '}
                    <span className="text-primary font-semibold">Ingeniour-TechWorld</span>, I've contributed to real-world
                    projects and learned the importance of collaboration, agile development, and continuous improvement.
                  </p>
                  <p className={`font-body text-base leading-relaxed ${isDark ? 'text-white/70' : 'text-gray-600'}`}>
                    Beyond coding, I actively participate in organizing tech events and represent my institution's
                    Entrepreneurship Development Cell, bridging the gap between technology and innovation.
                  </p>
                </div>
              </div>

              {/* Quick facts */}
              <div className="grid grid-cols-2 gap-3">
                {[
                  ['📍 Location', 'India'],
                  ['🎓 Education', 'B.Tech (CS)'],
                  ['💼 Status', 'Open to Work'],
                  ['🌐 Languages', 'En, Hi, Od'],
                ].map(([key, val]) => (
                  <div
                    key={key}
                    className={`p-3 border ${isDark ? 'border-white/5 bg-white/2' : 'border-gray-100 bg-white'}`}
                  >
                    <p className={`font-mono text-xs ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{key}</p>
                    <p className={`font-body text-sm font-medium mt-0.5 ${isDark ? 'text-white' : 'text-gray-800'}`}>{val}</p>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Right: Interest cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {INTERESTS.map((item, i) => (
              <InterestCard key={item.label} {...item} i={i} isDark={isDark} />
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  )
}
