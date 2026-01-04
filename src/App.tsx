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
  const [activeContent, setActiveContent] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [contentReveals, setContentReveals] = useState<Record<string, number>>({})
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

  const workingStyleTraits = [
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 4C10 4 8 6 8 8C8 10 10 12 12 12C14 12 16 10 16 8C16 6 14 4 12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 12V20M8 16H16" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M6 20H18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
      ),
      title: "Super IC",
      description: "Senior Product Designer shipping zero-to-one (greenfield) products end-to-end as a founding/solo designer. I own product discovery, rapid prototyping, and delivery, tracing business outcomes back to early problem framing, first-principles decisions, and validation loops."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="6" y="8" width="12" height="8" rx="2" stroke="currentColor" strokeWidth="1.5"/>
          <path d="M8 10H16M10 12H14" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M12 8V6M12 16V18" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <circle cx="9" cy="13" r="1" fill="currentColor"/>
          <circle cx="15" cy="13" r="1" fill="currentColor"/>
        </svg>
      ),
      title: "Learning as Play",
      description: "Hypothesis-driven design at startup speed: customer discovery, lightweight experiments, clear decision gates. New domains (B2B SaaS, AI-powered workflows) become fuel to simplify complex, multi-step processes—reducing time-to-value and de-risking builds."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M21 15C21 15.5304 20.7893 16.0391 20.4142 16.4142C20.0391 16.7893 19.5304 17 19 17H7L3 21V5C3 4.46957 3.21071 3.96086 3.58579 3.58579C3.96086 3.21071 4.46957 3 5 3H19C19.5304 3 20.0391 3.21071 20.4142 3.58579C20.7893 3.96086 21 4.46957 21 5V15Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 8L14 11L18 7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M12 4L14 6L12 8L10 6L12 4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Speedy iteration, Prioritize Feedback",
      description: "Insight-driven iteration with short feedback cycles across multi-stakeholder ecosystems. I pivot when evidence changes, using prototypes (including generative AI/LLM prototypes) as truth-finding tools to save engineering effort and accelerate learning per hour."
    },
    {
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H21M3 7H21M3 11H21M3 15H21M3 19H21" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M5 2V22M19 2V22" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
          <path d="M8 1L10 3L8 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      title: "Strong visual design fundamentals",
      description: "Information architecture, interaction design, and clean hierarchy/spacing/typography keep complexity from becoming clutter. I align PM, Engineering, Sales, and Support around competing needs so platform experiences work across role-based users with different levels of sophistication."
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
    },
    {
      id: 'linkedin',
      icon: (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 3H13V13H3V3Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          <path d="M6 6V10M10 6V10M6 6H10M6 10H10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      text: "View my LinkedIn",
      isLink: true,
      href: "https://www.linkedin.com/in/ygrace/"
    }
  ]

  // Easing function for organic feel
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  // Filter out clicked actions
  const availableActions = suggestedActions.filter(action => !clickedActions.includes(action.id))

  const handleActionClick = (actionId: string, isLink?: boolean, href?: string) => {
    // If it's a link, just open it (don't add to clicked actions or load content)
    if (isLink && href) {
      window.open(href, '_blank', 'noopener,noreferrer')
      return
    }
    
    // Prevent clicking the same action twice
    if (activeContent.includes(actionId) || clickedActions.includes(actionId)) return
    
    // Add to clicked actions (removes it from available actions list)
    setClickedActions(prev => [...prev, actionId])
    
    // Reset bottom section states for re-animation
    setBottomHeadingReveal(0)
    setBottomButtonReveals([])
    setIsBottomHeadingComplete(false)
    
    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
      // Append to active content array - this allows multiple content blocks
      // to be displayed in the order they were clicked (e.g., working-style before experiences)
      setActiveContent(prev => [...prev, actionId])
      
      // Start content reveal animation for this specific content
      const duration = 2000
      const startTime = Date.now()
      
      const animate = () => {
        const elapsed = Date.now() - startTime
        const rawProgress = Math.min(elapsed / duration, 1)
        const easedProgress = easeOutCubic(rawProgress) * 100
        
        setContentReveals(prev => ({
          ...prev,
          [actionId]: easedProgress
        }))
        
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
      // For LinkedIn (index 3), wait until contact (index 2) has started revealing
      const delay = index === 3 
        ? 2 * delayBetweenButtons + 200 // Wait for contact to start, then add small delay
        : index * delayBetweenButtons
      
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
      }, delay)
    })
  }, [isHeadingComplete])

  useEffect(() => {
    // Animate bottom section when content is loaded and there are available actions
    if (activeContent.length === 0 || availableActions.length === 0 || isLoading) return

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
    // Exclude LinkedIn from bottom section (it only appears in initial section)
    const bottomActions = availableActions.filter(action => action.id !== 'linkedin')
    if (!isBottomHeadingComplete || bottomActions.length === 0) return

    // Initialize button reveals array
    setBottomButtonReveals(new Array(bottomActions.length).fill(0))

    const buttonDuration = 1200
    const delayBetweenButtons = 300

    bottomActions.forEach((_, index) => {
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
        {activeContent.map((contentId) => {
              const contentReveal = contentReveals[contentId] || 0
              
              if (contentId === 'experiences') {
                return (
                  <div key={contentId} className="content-block">
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
                            '--reveal-progress': `${Math.max(0, Math.min(100, (contentReveal - 80) * 5))}%`
                          } as React.CSSProperties}
                        >
                          Here's a quick preview of my latest experiences:
                        </span>
                      </p>
                      <div className="experiences-list">
                        {experiences.map((exp, index) => {
                          // First item starts when subtitle is at 80% (subtitleProgress = 80)
                          // Subtitle reaches 80% when: (contentReveal - 80) * 5 = 80
                          // So: contentReveal = 80 + 16 = 96
                          // Each subsequent item starts when previous is at 80%
                          // Since we have limited range, compress the timing
                          const firstItemStart = 85 // Start first item earlier
                          const itemSpacing = 3 // Space between items (compressed)
                          const itemStartPoint = firstItemStart + (index * itemSpacing)
                          
                          // Calculate item progress with faster animation to fit in remaining range
                          const remainingRange = 100 - itemStartPoint
                          const itemProgress = contentReveal >= itemStartPoint
                            ? Math.min(100, ((contentReveal - itemStartPoint) / remainingRange) * 100)
                            : 0
                          
                          // Ensure items complete when contentReveal reaches 100%
                          const finalProgress = contentReveal >= 100 && itemProgress > 0 
                            ? 100 
                            : itemProgress
                          
                          // Calculate cascading progress for elements within this experience item
                          // Icon starts first, then role at 80%, description at 80% of role, etc.
                          const iconProgress = finalProgress
                          const roleStartPoint = 80
                          const roleProgress = iconProgress >= roleStartPoint
                            ? Math.min(100, ((iconProgress - roleStartPoint) / (100 - roleStartPoint)) * 100)
                            : 0
                          const descStartPoint = 80
                          const descProgress = roleProgress >= descStartPoint
                            ? Math.min(100, ((roleProgress - descStartPoint) / (100 - descStartPoint)) * 100)
                            : 0
                          const companyStartPoint = 80
                          const companyProgress = descProgress >= companyStartPoint
                            ? Math.min(100, ((descProgress - companyStartPoint) / (100 - companyStartPoint)) * 100)
                            : 0
                          const durationStartPoint = 80
                          const durationProgress = companyProgress >= durationStartPoint
                            ? Math.min(100, ((companyProgress - durationStartPoint) / (100 - durationStartPoint)) * 100)
                            : 0
                          
                          // Ensure all elements complete when item completes
                          const ensureComplete = (progress: number) => finalProgress >= 100 && progress > 0 ? 100 : progress
                          
                          return (
                            <div 
                              key={index}
                              className="experience-item"
                            >
                              <div 
                                className="experience-icon" 
                                style={{ 
                                  backgroundColor: exp.iconColor,
                                  '--reveal-progress': `${ensureComplete(iconProgress)}%`
                                } as React.CSSProperties}
                              >
                                {exp.icon}
                              </div>
                              <div className="experience-content">
                                <div className="experience-main">
                                  <h3 
                                    className="experience-role"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(roleProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    {exp.role}
                                  </h3>
                                  <p 
                                    className="experience-description"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(descProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    {exp.description}
                                  </p>
                                </div>
                                <div className="experience-meta">
                                  <span 
                                    className="experience-company"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(companyProgress)}%`
                                    } as React.CSSProperties}
                                  >
                                    {exp.company}
                                  </span>
                                  <span 
                                    className="experience-duration"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(durationProgress)}%`
                                    } as React.CSSProperties}
                                  >
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
                  </div>
                )
              }
              
              if (contentId === 'working-style') {
                return (
                  <div key={contentId} className="content-block">
                    <div className="working-style-content">
                      <h2 className="content-title">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          What kind of designer am I?
                        </span>
                      </h2>
                      <div className="working-style-list">
                        {workingStyleTraits.map((trait, index) => {
                          // First item starts when title is at 80% (contentReveal = 80)
                          // Each subsequent item starts when previous is at 80%
                          // Compress timing to fit all items
                          const firstItemStart = 80
                          const itemSpacing = 6 // Space between items
                          const itemStartPoint = firstItemStart + (index * itemSpacing)
                          
                          // Calculate item progress with faster animation to fit in remaining range
                          const remainingRange = 100 - itemStartPoint
                          const itemProgress = contentReveal >= itemStartPoint
                            ? Math.min(100, ((contentReveal - itemStartPoint) / remainingRange) * 100)
                            : 0
                          
                          // Ensure items complete when contentReveal reaches 100%
                          const finalProgress = contentReveal >= 100 && itemProgress > 0 
                            ? 100 
                            : itemProgress
                          
                          return (
                            <div 
                              key={index}
                              className="working-style-item"
                              style={{ 
                                '--reveal-progress': `${finalProgress}%`
                              } as React.CSSProperties}
                            >
                              <div className="working-style-icon">
                                {trait.icon}
                              </div>
                              <div className="working-style-text">
                                <h3 className="working-style-title">{trait.title}</h3>
                                <p className="working-style-description">{trait.description}</p>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                )
              }
              
              if (contentId === 'contact') {
                return (
                  <div key={contentId} className="content-block">
                    <div className="contact-content">
                      <h2 className="content-title">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          Contact Me
                        </span>
                      </h2>
                      <form className="contact-form">
                        <div className="form-field">
                          <label className="form-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M2 4L8 8L14 4M2 4H14V12H2V4Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Email
                          </label>
                          <input
                            type="email"
                            className="form-input"
                            placeholder="Where should I follow up?"
                          />
                        </div>
                        <div className="form-field">
                          <label className="form-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M3 6C3 4.89543 3.89543 4 5 4H11C12.1046 4 13 4.89543 13 6V10C13 11.1046 12.1046 12 11 12H7L4 14V12H5C3.89543 12 3 11.1046 3 10V6Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                            Message
                          </label>
                          <textarea
                            className="form-textarea"
                            placeholder="What's up? Ask me anything"
                            rows={5}
                          />
                        </div>
                        <div className="form-field">
                          <label className="form-label">
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5"/>
                              <path d="M8 1V3M8 13V15M15 8H13M3 8H1M13.07 3.93L11.66 5.34M4.34 11.66L2.93 13.07M13.07 13.07L11.66 11.66M4.34 4.34L2.93 2.93" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                            </svg>
                            How did you find me?
                          </label>
                          <div className="form-select-wrapper">
                            <select className="form-select">
                              <option value="">This would be helpful to know</option>
                              <option value="linkedin">LinkedIn</option>
                              <option value="twitter">Twitter</option>
                              <option value="github">GitHub</option>
                              <option value="portfolio">Portfolio</option>
                              <option value="referral">Referral</option>
                              <option value="other">Other</option>
                            </select>
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="select-arrow">
                              <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                        </div>
                        <div className="form-actions">
                          <button type="submit" className="form-submit-button">
                            Send
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                )
              }
              
              return null
            })}
        {isLoading && (
          <div className="content-block">
            <div className="loading-state">
              <div className="loading-dots">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
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
                {suggestedActions.map((action, index) => {
                  // Only start LinkedIn animation after contact (index 2) has reached 50% progress
                  if (action.id === 'linkedin' && buttonReveals[2] < 50) {
                    return null
                  }
                  
                  if ('isLink' in action && action.isLink && 'href' in action && action.href) {
                    const linkAction = action as { id: string; icon: React.ReactElement; text: string; isLink: boolean; href: string }
                    return (
                      <a
                        key={action.id}
                        href={linkAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleActionClick(action.id, linkAction.isLink, linkAction.href)
                        }}
                        style={{ 
                          '--reveal-progress': `${buttonReveals[index]}%`
                        } as React.CSSProperties}
                      >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-text">{action.text}</span>
                        <span className="action-arrow">→</span>
                      </a>
                    )
                  }
                  return (
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
                  )
                })}
              </div>
            )}
          </div>
        )}
        {clickedActions.length > 0 && availableActions.length > 0 && activeContent.length > 0 && !isLoading && (
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
                {availableActions.filter(action => action.id !== 'linkedin').map((action, index) => {
                  if ('isLink' in action && action.isLink && 'href' in action && action.href) {
                    const linkAction = action as { id: string; icon: React.ReactElement; text: string; isLink: boolean; href: string }
                    return (
                      <a
                        key={action.id}
                        href={linkAction.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="action-button"
                        onClick={(e) => {
                          e.preventDefault()
                          handleActionClick(action.id, linkAction.isLink, linkAction.href)
                        }}
                        style={{ 
                          '--reveal-progress': `${bottomButtonReveals[index] || 0}%`
                        } as React.CSSProperties}
                      >
                        <span className="action-icon">{action.icon}</span>
                        <span className="action-text">{action.text}</span>
                        <span className="action-arrow">→</span>
                      </a>
                    )
                  }
                  return (
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
                  )
                })}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

export default App
