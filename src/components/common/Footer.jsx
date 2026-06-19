import { FiGithub, FiLinkedin, FiMail } from 'react-icons/fi'

export default function Footer({ isDark }) {
  return (
    <footer className={`relative border-t ${isDark ? 'border-white/5 bg-dark-800' : 'border-gray-200 bg-white'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <span className="font-display text-2xl font-black gradient-text">AP</span>
            <p className={`font-mono text-xs mt-1 ${isDark ? 'text-white/30' : 'text-gray-400'}`}>
              Full Stack Developer
            </p>
          </div>
          <div className="flex items-center gap-6">
            {[
              { icon: FiGithub, href: 'https://github.com/anubhavpoddar', label: 'GitHub' },
              { icon: FiLinkedin, href: 'https://linkedin.com/in/anubhavpoddar', label: 'LinkedIn' },
              { icon: FiMail, href: 'mailto:anubhavpoddar1@gmail.com', label: 'Email' },
            ].map(({ icon: Icon, href, label }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={label}
                className={`w-10 h-10 flex items-center justify-center border transition-all duration-300 hover:border-primary hover:text-primary hover:shadow-[0_0_15px_rgba(0,255,148,0.3)] ${isDark ? 'border-white/10 text-white/40' : 'border-gray-200 text-gray-400'}`}
              >
                <Icon size={16} />
              </a>
            ))}
          </div>
          <p className={`font-mono text-xs ${isDark ? 'text-white/20' : 'text-gray-400'}`}>
            © 2025 Anubhav Poddar. Built with React.
          </p>
        </div>
      </div>
    </footer>
  )
}
