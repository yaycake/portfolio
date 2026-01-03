import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [titleReveal, setTitleReveal] = useState(0)
  const [descReveal, setDescReveal] = useState(0)
  const [headingReveal, setHeadingReveal] = useState(0)
  const [buttonReveals, setButtonReveals] = useState([0, 0, 0])
  const [isTitleComplete, setIsTitleComplete] = useState(false)
  const [isDescComplete, setIsDescComplete] = useState(false)
  const [isHeadingComplete, setIsHeadingComplete] = useState(false)
  const [activeContent, setActiveContent] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [contentReveal, setContentReveal] = useState(0)
  const [clickedActions, setClickedActions] = useState<string[]>([])
  const [bottomHeadingReveal, setBottomHeadingReveal] = useState(0)
  const [bottomButtonReveals, setBottomButtonReveals] = useState<number[]>([])
  const [isBottomHeadingComplete, setIsBottomHeadingComplete] = useState(false)

  const title = "Hi, I'm Grace Yang"
  const description = "Cross-functional product designer who loves to vibe (+design) (+code). I work with humans and AI to experiment, test, and build products for other humans."

  const experiences = [
    {
      iconColor: '#10b981', // green
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L12 7L16 8L13 11L13.5 15L10 13L6.5 15L7 11L4 8L8 7L10 3Z" fill="white"/>
        </svg>
      ),
      role: "Founding Designer",
      description: "Built an AI powered patent platform to disrupt intellectual property workflows.",
      company: "Patlytics",
      duration: "15+ years"
    },
    {
      iconColor: '#a855f7', // purple
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M10 3L12 7L16 8L13 11L13.5 15L10 13L6.5 15L7 11L4 8L8 7L10 3Z" fill="white"/>
        </svg>
      ),
      role: "Founding Designer",
      description: "Design a way to instantly live stream to troubleshoot and instantly find solutions.",
      company: "Patlytics",
      duration: "1+ years"
    },
    {
      iconColor: '#ec4899', // pink
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4H15V16H5V4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 4L10 9L15 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      role: "Digital Director",
      description: "Manage digital operations for STEAM education and camps (& during COVID!)",
      company: "Patlytics",
      duration: "15+ years"
    },
    {
      iconColor: '#f97316', // orange
      icon: (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5 4H15V16H5V4Z" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M5 4L10 9L15 4" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      role: "Design & Code",
      description: "Design & development for Ubisoft Shanghai, ORM Fertility, and more.",
      company: "Patlytics",
      duration: "10+ years"
    }
  ]

  const suggestedActions = [
    {
      id: 'experiences',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H7L8 4H13V13H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M8 4V3H3V13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Review my latest experiences"
    },
    {
      id: 'working-style',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M5.5 6.5C5.5 7.05228 5.94772 7.5 6.5 7.5C7.05228 7.5 7.5 7.05228 7.5 6.5C7.5 5.94772 7.05228 5.5 6.5 5.5C5.94772 5.5 5.5 5.94772 5.5 6.5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8.5 9.5C8.5 10.0523 8.94772 10.5 9.5 10.5C10.0523 10.5 10.5 10.0523 10.5 9.5C10.5 8.94772 10.0523 8.5 9.5 8.5C8.94772 8.5 8.5 8.94772 8.5 9.5Z" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M4 10.5L6 8.5M12 5.5L10 7.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      text: "Understand my working style"
    },
    {
      id: 'contact',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6C3 4.89543 3.89543 4 5 4H11C12.1046 4 13 4.89543 13 6V10C13 11.1046 12.1046 12 11 12H7L4 14V12H5C3.89543 12 3 11.1046 3 10V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "Contact me"
    }
  ]

  // Easing function for organic feel
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  // Filter out clicked actions
  const availableActions = suggestedActions.filter(action => !clickedActions.includes(action.id))

  const handleActionClick = (actionId: string) => {
    if (activeContent === actionId || clickedActions.includes(actionId)) return
    
    // Add to clicked actions
    setClickedActions(prev => [...prev, actionId])
    
    // Reset bottom section states
    setBottomHeadingReveal(0)
    setBottomButtonReveals([])
    setIsBottomHeadingComplete(false)
    
    setIsLoading(true)
    setActiveContent(null)
    setContentReveal(0)
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
      setActiveContent(actionId)
      
      // Start content reveal animation
      const duration = 2000
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const rawProgress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(rawProgress) * 100
        
        setContentReveal(easedProgress)
        
        if (rawProgress < 1) {
          requestAnimationFrame(animate)
        }
      }
      
      requestAnimationFrame(animate)
    }, 800) // 0.8s loading delay
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
      } else {
        setIsDescComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [isTitleComplete])

  useEffect(() => {
    // Smoothly reveal the heading first, after description is complete
    if (!isDescComplete) return

    const duration = 1500 // 1.5 seconds for heading
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      
      setHeadingReveal(easedProgress)
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsHeadingComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [isDescComplete])

  useEffect(() => {
    // Cascade the buttons after heading is complete
    if (!isHeadingComplete) return

    const buttonDuration = 1200 // 1.2 seconds per button
    const delayBetweenButtons = 300 // 0.3s delay between each button

    suggestedActions.forEach((_, index) => {
      setTimeout(() => {
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const rawProgress = Math.min(elapsed / buttonDuration, 1)
          const easedProgress = easeOutCubic(rawProgress) * 100
          
          setButtonReveals(prev => {
            const newReveals = [...prev]
            newReveals[index] = easedProgress
            return newReveals
          })
          
          if (rawProgress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }, index * delayBetweenButtons)
    })
  }, [isHeadingComplete])

  useEffect(() => {
    // Animate bottom section when content is loaded and there are available actions
    if (!activeContent || availableActions.length === 0 || isLoading) return

    // Start with heading animation after a short delay
    setTimeout(() => {
      const headingDuration = 1500
      const startTime = Date.now()

      const animateHeading = () => {
        const elapsed = Date.now() - startTime
        const rawProgress = Math.min(elapsed / headingDuration, 1)
        const easedProgress = easeOutCubic(rawProgress) * 100
        
        setBottomHeadingReveal(easedProgress)
        
        if (rawProgress < 1) {
          requestAnimationFrame(animateHeading)
        } else {
          setIsBottomHeadingComplete(true)
        }
      }

      requestAnimationFrame(animateHeading)
    }, 500) // Small delay after content starts loading
  }, [activeContent, availableActions.length, isLoading])

  useEffect(() => {
    // Cascade bottom buttons after heading is complete
    if (!isBottomHeadingComplete || availableActions.length === 0) return

    // Initialize button reveals array
    setBottomButtonReveals(new Array(availableActions.length).fill(0))

    const buttonDuration = 1200
    const delayBetweenButtons = 300

    availableActions.forEach((_, index) => {
      setTimeout(() => {
        const startTime = Date.now()
        
        const animate = () => {
          const elapsed = Date.now() - startTime
          const rawProgress = Math.min(elapsed / buttonDuration, 1)
          const easedProgress = easeOutCubic(rawProgress) * 100
          
          setBottomButtonReveals(prev => {
            const newReveals = [...prev]
            newReveals[index] = easedProgress
            return newReveals
          })
          
          if (rawProgress < 1) {
            requestAnimationFrame(animate)
          }
        }

        requestAnimationFrame(animate)
      }, index * delayBetweenButtons)
    })
  }, [isBottomHeadingComplete, availableActions.length])

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
        {(isLoading || activeContent) && (
          <div className="content-block">
            {isLoading && (
              <div className="loading-state">
                <div className="loading-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            {activeContent === 'experiences' && !isLoading && (
              <div className="experiences-content">
                <h2 className="content-title">
                  <span 
                    className="reveal-text"
                    style={{ 
                      '--reveal-progress': `${contentReveal}%`
                    } as React.CSSProperties}
                  >
                    What have I helped build lately?
                  </span>
                </h2>
                <p className="content-subtitle">
                  <span 
                    className="reveal-text"
                    style={{ 
                      '--reveal-progress': `${contentReveal}%`
                    } as React.CSSProperties}
                  >
                    Here's a quick preview of my latest experiences:
                  </span>
                </p>
                <div className="experiences-list">
                  {experiences.map((exp, index) => {
                    // Stagger each experience item
                    const staggerDelay = index * 15
                    const baseProgress = Math.max(0, contentReveal - staggerDelay)
                    // Ensure items that have started revealing continue to 100% when contentReveal completes
                    const itemProgress = contentReveal >= 100 && baseProgress > 0 
                      ? 100 
                      : Math.min(100, baseProgress)
                    
                    return (
                      <div 
                        key={index}
                        className="experience-item"
                        style={{ 
                          '--reveal-progress': `${itemProgress}%`
                        } as React.CSSProperties}
                      >
                        <div className="experience-icon" style={{ backgroundColor: exp.iconColor }}>
                          {exp.icon}
                        </div>
                        <div className="experience-content">
                          <div className="experience-main">
                            <h3 className="experience-role">{exp.role}</h3>
                            <p className="experience-description">{exp.description}</p>
                          </div>
                          <div className="experience-meta">
                            <span className="experience-company">{exp.company}</span>
                            <span className="experience-duration">
                              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <circle cx="7" cy="7" r="6" stroke="currentColor" strokeWidth="1.5"/>
                                <path d="M7 4V7L9 9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                              </svg>
                              {exp.duration}
                            </span>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </div>
            )}
          </div>
        )}
        {isDescComplete && clickedActions.length === 0 && (
          <div className="suggested-actions">
            <h2 className="actions-heading">
              <span 
                className="reveal-text"
                style={{ 
                  '--reveal-progress': `${headingReveal}%`
                } as React.CSSProperties}
              >
                Would you like to:
              </span>
            </h2>
            {isHeadingComplete && (
              <div className="actions-list">
                {suggestedActions.map((action, index) => (
                  <button
                    key={action.id}
                    className="action-button"
                    onClick={() => handleActionClick(action.id)}
                    style={{ 
                      '--reveal-progress': `${buttonReveals[index]}%`
                    } as React.CSSProperties}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-text">{action.text}</span>
                    <span className="action-arrow">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
        {clickedActions.length > 0 && availableActions.length > 0 && activeContent && !isLoading && (
          <div className="suggested-actions-bottom">
            <h2 className="actions-heading">
              <span 
                className="reveal-text"
                style={{ 
                  '--reveal-progress': `${bottomHeadingReveal}%`
                } as React.CSSProperties}
              >
                Would you like to:
              </span>
            </h2>
            {isBottomHeadingComplete && (
              <div className="actions-list">
                {availableActions.map((action, index) => (
                  <button
                    key={action.id}
                    className="action-button"
                    onClick={() => handleActionClick(action.id)}
                    style={{ 
                      '--reveal-progress': `${bottomButtonReveals[index] || 0}%`
                    } as React.CSSProperties}
                  >
                    <span className="action-icon">{action.icon}</span>
                    <span className="action-text">{action.text}</span>
                    <span className="action-arrow">→</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
