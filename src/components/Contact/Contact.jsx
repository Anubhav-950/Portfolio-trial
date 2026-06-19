import { useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from 'react-intersection-observer'
import SectionWrapper, { SectionHeader } from '../common/SectionWrapper'
import { FiMail, FiPhone, FiGithub, FiLinkedin, FiSend, FiCheck } from 'react-icons/fi'

const CONTACT_INFO = [
  {
    icon: FiMail,
    label: 'Email',
    value: 'anubhavpoddar1@gmail.com',
    href: 'mailto:anubhavpoddar1@gmail.com',
    color: '#00FF94',
  },
  {
    icon: FiPhone,
    label: 'Phone',
    value: '+91 9508787130',
    href: 'tel:+919508787130',
    color: '#00C2FF',
  },
  {
    icon: FiGithub,
    label: 'GitHub',
    value: 'github.com/anubhavpoddar',
    href: 'https://github.com/Anubhav-950',
    color: '#FFD93D',
  },
  {
    icon: FiLinkedin,
    label: 'LinkedIn',
    value: 'linkedin.com/in/anubhavpoddar',
    href: 'https://www.linkedin.com/in/anubhav-poddar-8a6945290/',
    color: '#FF6B6B',
  },
]

function ContactInfoCard({ item, i, isDark }) {
  const Icon = item.icon
  return (
    <motion.a
      href={item.href}
      target={item.href.startsWith('http') ? '_blank' : undefined}
      rel="noopener noreferrer"
      initial={{ opacity: 0, x: -30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: i * 0.1 }}
      whileHover={{ x: 6 }}
      className={`flex items-center gap-4 p-4 border transition-all duration-300 group ${
        isDark
          ? 'border-white/5 hover:border-primary/30 bg-white/2 hover:bg-white/4'
          : 'border-gray-100 hover:border-primary/30 bg-white hover:bg-primary/5'
      }`}
    >
      <div
        className="w-10 h-10 flex items-center justify-center flex-shrink-0 transition-all duration-300"
        style={{
          background: `${item.color}15`,
          border: `1px solid ${item.color}30`,
        }}
      >
        <Icon size={16} style={{ color: item.color }} />
      </div>
      <div className="min-w-0">
        <p className={`font-mono text-xs mb-0.5 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>{item.label}</p>
        <p className={`font-body text-sm font-medium truncate transition-colors group-hover:text-primary ${isDark ? 'text-white/70' : 'text-gray-700'}`}>
          {item.value}
        </p>
      </div>
      <div className={`ml-auto opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-primary' : 'text-primary'}`}>
        →
      </div>
    </motion.a>
  )
}

export default function Contact({ isDark }) {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState('idle') // idle | sending | sent | error
  const [ref, inView] = useInView({ threshold: 0.1, triggerOnce: true })

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }))
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!form.name || !form.email || !form.message) return
    setStatus('sending')
    // Simulate send (frontend only)
    setTimeout(() => {
      setStatus('sent')
      setForm({ name: '', email: '', subject: '', message: '' })
      setTimeout(() => setStatus('idle'), 4000)
    }, 1500)
  }

  const inputClass = `w-full px-4 py-3 font-mono text-sm border bg-transparent outline-none transition-all duration-300 focus:border-primary placeholder-white/20 ${
    isDark
      ? 'border-white/8 text-white focus:bg-primary/5'
      : 'border-gray-200 text-gray-800 focus:bg-primary/5 placeholder-gray-400'
  }`

  return (
    <section id="contact" className={`relative py-24 ${isDark ? 'bg-dark-900' : 'bg-white'}`}>
      <div className="absolute inset-0 grid-lines opacity-20" />

      {/* Glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[300px] opacity-5 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, #00FF94, transparent 70%)' }} />

      <SectionWrapper className="!py-0">
        <SectionHeader
          subtitle="// let's connect"
          title="Get In Touch"
          description="I'm actively looking for new opportunities. Whether you have a project in mind or just want to say hi — my inbox is open!"
          isDark={isDark}
        />

        <div ref={ref} className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Left: Info */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              className={`font-body text-sm leading-relaxed mb-8 ${isDark ? 'text-white/50' : 'text-gray-500'}`}
            >
              I'm a <span className="text-primary font-semibold">Full Stack Developer</span> passionate about building
              impactful products. If you're looking for someone who can bridge backend logic with beautiful frontends —
              let's talk!
            </motion.p>

            {/* Contact cards */}
            <div className="space-y-3 mb-10">
              {CONTACT_INFO.map((item, i) => (
                <ContactInfoCard key={item.label} item={item} i={i} isDark={isDark} />
              ))}
            </div>

            {/* Availability */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={inView ? { opacity: 1 } : {}}
              transition={{ delay: 0.5 }}
              className={`p-4 border ${isDark ? 'border-primary/20 bg-primary/5' : 'border-primary/20 bg-primary/5'}`}
            >
              <div className="flex items-center gap-2 mb-1">
                <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                <span className="font-mono text-xs text-primary tracking-widest">OPEN TO WORK</span>
              </div>
              <p className={`font-body text-sm ${isDark ? 'text-white/50' : 'text-gray-600'}`}>
                Available for full-time roles, internships, and freelance projects.
              </p>
            </motion.div>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className={`p-8 clip-corner relative ${isDark ? 'glass' : 'bg-gray-50 border border-gray-100'}`}>
              {/* Corner accents */}
              <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-primary/40" />
              <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-primary/40" />

              <h3 className={`font-display text-lg font-bold mb-6 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                Send a Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div>
                    <label className={`font-mono text-xs block mb-2 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Name *</label>
                    <input
                      type="text"
                      name="name"
                      value={form.name}
                      onChange={handleChange}
                      placeholder="John Doe"
                      className={inputClass}
                      required
                    />
                  </div>
                  <div>
                    <label className={`font-mono text-xs block mb-2 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Email *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="john@example.com"
                      className={inputClass}
                      required
                    />
                  </div>
                </div>

                <div>
                  <label className={`font-mono text-xs block mb-2 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Subject</label>
                  <input
                    type="text"
                    name="subject"
                    value={form.subject}
                    onChange={handleChange}
                    placeholder="Project Inquiry / Collaboration"
                    className={inputClass}
                  />
                </div>

                <div>
                  <label className={`font-mono text-xs block mb-2 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>Message *</label>
                  <textarea
                    name="message"
                    value={form.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows={5}
                    className={`${inputClass} resize-none`}
                    required
                  />
                </div>

                <motion.button
                  type="submit"
                  disabled={status === 'sending' || status === 'sent'}
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-3.5 font-mono text-sm tracking-wider flex items-center justify-center gap-3 transition-all duration-300 ${
                    status === 'sent'
                      ? 'bg-primary/20 text-primary border border-primary/30'
                      : status === 'sending'
                      ? 'bg-primary/50 text-dark-900 cursor-not-allowed'
                      : 'bg-primary text-dark-900 hover:shadow-[0_0_30px_rgba(0,255,148,0.4)]'
                  }`}
                >
                  {status === 'sent' ? (
                    <><FiCheck size={14} /> Message Sent!</>
                  ) : status === 'sending' ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                        className="w-4 h-4 border-2 border-dark-900/30 border-t-dark-900 rounded-full"
                      />
                      Sending...
                    </>
                  ) : (
                    <><FiSend size={14} /> Send Message</>
                  )}
                </motion.button>

                <p className={`font-mono text-xs text-center ${isDark ? 'text-white/20' : 'text-gray-400'}`}>
                  This is a frontend-only demo form
                </p>
              </form>
            </div>
          </motion.div>
        </div>
      </SectionWrapper>
    </section>
  )
}
