import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [titleReveal, setTitleReveal] = useState(0)
  const [descReveal, setDescReveal] = useState(0)
  const [isTitleComplete, setIsTitleComplete] = useState(false)

  const title = "Hi, I'm Grace Yang"
  const description = "Cross-functional product designer who loves to use (+ design) (+ code). I work with humans and like to experiment, test, and build products for other humans."

  // Easing function for organic feel
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  useEffect(() => {
    // Smoothly reveal the title from top to bottom
    const duration = 1800 // 1.8 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      
      setTitleReveal(easedProgress)
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsTitleComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Smoothly reveal the description after title is complete
    if (!isTitleComplete) return

    const duration = 2500 // 2.5 seconds
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      
      setDescReveal(easedProgress)
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      }
    }

    requestAnimationFrame(animate)
  }, [isTitleComplete])

  return (
    <div className="landing-page">
      <div className="content">
        <h1 className="title">
          <span 
            className="reveal-text"
            style={{ 
              '--reveal-progress': `${titleReveal}%`
            } as React.CSSProperties}
          >
            {title}
          </span>
        </h1>
        {isTitleComplete && (
          <p className="description">
            <span 
              className="reveal-text"
              style={{ 
                '--reveal-progress': `${descReveal}%`
              } as React.CSSProperties}
            >
              {description}
            </span>
          </p>
        )}
      </div>
    </div>
  )
}

export default App
