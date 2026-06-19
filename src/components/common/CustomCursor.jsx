import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)

  useEffect(() => {
    const dot = dotRef.current
    const ring = ringRef.current

    let mouseX = 0, mouseY = 0
    let ringX = 0, ringY = 0

    const onMouseMove = (e) => {
      mouseX = e.clientX
      mouseY = e.clientY

      if (dot) {
        dot.style.left = mouseX + 'px'
        dot.style.top = mouseY + 'px'
      }
    }

    const animate = () => {
      ringX += (mouseX - ringX) * 0.12
      ringY += (mouseY - ringY) * 0.12

      if (ring) {
        ring.style.left = ringX + 'px'
        ring.style.top = ringY + 'px'
      }

      requestAnimationFrame(animate)
    }

    const onMouseEnterLink = () => {
      if (ring) {
        ring.style.transform = 'translate(-50%, -50%) scale(2)'
        ring.style.borderColor = '#00FF94'
        ring.style.opacity = '0.6'
      }
    }

    const onMouseLeaveLink = () => {
      if (ring) {
        ring.style.transform = 'translate(-50%, -50%) scale(1)'
        ring.style.borderColor = '#00FF9460'
        ring.style.opacity = '1'
      }
    }

    window.addEventListener('mousemove', onMouseMove)

    const raf = requestAnimationFrame(animate)

    const addLinkListeners = () => {
      document.querySelectorAll('a, button, [role="button"]').forEach(el => {
        el.addEventListener('mouseenter', onMouseEnterLink)
        el.addEventListener('mouseleave', onMouseLeaveLink)
      })
    }

    addLinkListeners()
    const observer = new MutationObserver(addLinkListeners)
    observer.observe(document.body, { childList: true, subtree: true })

    // Hide on mobile
    const isMobile = window.matchMedia('(max-width: 768px)').matches
    if (isMobile) {
      if (dot) dot.style.display = 'none'
      if (ring) ring.style.display = 'none'
    }

    return () => {
      window.removeEventListener('mousemove', onMouseMove)
      cancelAnimationFrame(raf)
      observer.disconnect()
    }
  }, [])

  return (
    <>
      <div ref={dotRef} className="cursor-dot" />
      <div ref={ringRef} className="cursor-ring" />
    </>
  )
}
