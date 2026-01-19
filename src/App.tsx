import { useState, useEffect } from 'react'
import './App.css'
import FileMagnifyingGlassLine from './assets/icons/filemagnifyingglass-line.svg?react'
import FileMagnifyingGlassSolid from './assets/icons/filemagnifyingglass-solid.svg?react'
import VideocamLine from './assets/icons/videocam-line.svg?react'
import VideocamSolid from './assets/icons/videocam-solid.svg?react'
import AtomLine from './assets/icons/atom-line.svg?react'
import AtomSolid from './assets/icons/atom-solid.svg?react'
import BabyLine from './assets/icons/baby-line.svg?react'
import BabySolid from './assets/icons/baby-solid.svg?react'
import WechatLine from './assets/icons/wechat-line.svg?react'
import WechatSolid from './assets/icons/wechat-solid.svg?react'
import VinylLine from './assets/icons/vinyl-line.svg?react'
import VinylSolid from './assets/icons/vinyl-solid.svg?react'
import BriefcaseLine from './assets/icons/briefcase-line.svg?react'
import BriefcaseSolid from './assets/icons/briefcase-solid.svg?react'
import EyesLine from './assets/icons/eyes-line.svg?react'
import EyesSolid from './assets/icons/eyes-solid.svg?react'
import PaperPlaneTiltLine from './assets/icons/paperplanetilt-line.svg?react'
import PaperPlaneTiltSolid from './assets/icons/paperplanetilt-solid.svg?react'
import HandPeaceLine from './assets/icons/handpeace-line.svg?react'
import HandPeaceSolid from './assets/icons/handpeace-solid.svg?react'
import SparkleLine from './assets/icons/sparkle-line.svg?react'
import SparkleSolid from './assets/icons/sparkle-solid.svg?react'
import CaretDownLine from './assets/icons/caretdown-line.svg?react'
import MoonStarsFill from './assets/icons/moon-stars-fill.svg?react'
import MoonStarsLine from './assets/icons/moon-stars-line.svg?react'
import SunLine from './assets/icons/sun-line.svg?react'
import SunFill from './assets/icons/sun-fill.svg?react'
import RobotFill from './assets/icons/robot-fill.svg?react'
import RobotLine from './assets/icons/robot-line.svg?react'

// Ubisoft project images
import UbiBanner from './assets/images/ubibanner.png'
import UbiLucky from './assets/images/ubi_lucky.webp'
import UbiUI from './assets/images/ubi_ui.webp'

// Skyrock project images
import SkyrockBanner from './assets/images/skyrock-banner.png'
import SkyrockFlow from './assets/images/skyrock_flow.webp'
import SkyrockSummerLaunch from './assets/images/skyrock_summer_launch.webp'
import SkyrockDigiOps from './assets/images/skyrock-digiops.webp'

// Viewabo project images
import ViewaboBanner from './assets/images/viewabo-banner.png'
import ViewaboTestimonial from './assets/images/viewab-testimonial.png'
import ViewaboMobile from './assets/images/viewabo_mobile.png'
import ViewaboDesktopMobile from './assets/images/viewabo_desktop-mobile.png'
import ViewaboUICover from './assets/images/viewabo-ui-cover.png'

function App() {
  const [landingReveal, setLandingReveal] = useState(0)
  const [isDescComplete, setIsDescComplete] = useState(false)
  const [activeContent, setActiveContent] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [contentReveals, setContentReveals] = useState<Record<string, number>>({})
  const [clickedActions, setClickedActions] = useState<string[]>([])
  const [bottomButtonReveals, setBottomButtonReveals] = useState<number[]>([])
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)
  const [showMoreExperiences, setShowMoreExperiences] = useState(false)
  const [hoveredExperience, setHoveredExperience] = useState<number | null>(null)
  const [hoveredAction, setHoveredAction] = useState<string | null>(null)
  const [hoveredHowIWorkStep, setHoveredHowIWorkStep] = useState<number | null>(null)
  const [overlayContentReveal, setOverlayContentReveal] = useState(0)
  const [currentTestimonialIndex, setCurrentTestimonialIndex] = useState(0)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [theme, setTheme] = useState<'light' | 'dark' | 'robot'>('dark')
  const [showDarkModeTooltip, setShowDarkModeTooltip] = useState(false)
  const [hoveredTheme, setHoveredTheme] = useState<string | null>(null)

  const title = "Hi, I'm Grace Yang"
  const description = <>Cross-functional product designer combining design and code to craft AI-driven, user-friendly products.<br /><br />I prototype rapidly, validate with real users, and achieve measurable results—leading to increased engagement, streamlined workflows, and sleek interfaces.</>

  const experiences = [
    {
      iconColor: '#10b981', // green
      icon: (color: string) => <FileMagnifyingGlassLine width="20" height="20" fill={color} />,
      iconFill: (color: string) => <FileMagnifyingGlassSolid width="20" height="20" fill={color} />,
      role: "Founding Designer",
      description: "Built an AI powered patent platform to disrupt intellectual property workflows.",
      company: "Patlytics",
      duration: "2+ years"
    },
    {
      iconColor: '#3b82f6', // blue
      icon: (color: string) => <VideocamLine width="20" height="20" fill={color} />,
      iconFill: (color: string) => <VideocamSolid width="20" height="20" fill={color} />,
      role: "Founding Designer",
      description: "Design a way to instantly live stream to troubleshoot and instantly find solutions.",
      company: "Viewabo",
      duration: "1+ years"
    },
    {
      iconColor: '#ef4444', // red
      icon: (color: string) => <AtomLine width="20" height="20" fill={color} />,
      iconFill: (color: string) => <AtomSolid width="20" height="20" fill={color} />,
      role: "Digital Director",
      description: "Manage digital operations for STEAM education and camps (& during COVID!)",
      company: "Skyrock",
      duration: "1.5 + years"
    },
    {
      iconColor: '#f472b6', // pink
      icon: (color: string) => <BabyLine width="20" height="20" fill={color} />,
      iconFill: (color: string) => <BabySolid width="20" height="20" fill={color} />,
      role: "Design Engineer",
      description: "Design & development for ORM Fertility.",
      company: "ORM Fertility",
      duration: "3 months"
    },
    {
      iconColor: '#22c55e', // green
      icon: (color: string) => <WechatLine width="20" height="20" fill={color} />,
      iconFill: (color: string) => <WechatSolid width="20" height="20" fill={color} />,
      role: "Mini Program Designer",
      description: "Design & development for Ubisoft Shanghai.",
      company: "Ubisoft Shanghai",
      duration: "2 months"
    },
    {
      iconColor: '#06b6d4', // cyan
      icon: (color: string) => <VinylLine width="20" height="20" fill={color} />,
      iconFill: (color: string) => <VinylSolid width="20" height="20" fill={color} />,
      role: "Design Engineer",
      description: "Design & development for A Pure Person.",
      company: "A Pure Person",
      duration: "2 months"
    }
  ]

  const workingStyleTraits = [
    {
      title: "Learning as Play",
      description: "Hypothesis-driven design at startup speed: customer discovery, lightweight experiments, clear decision gates. "
    },
    {
      title: "Speedy iteration, Prioritize Feedback",
      description: "Insight-driven iteration with short feedback cycles across multi-stakeholder ecosystems."
    },
    {
      title: "Strong visual design fundamentals",
      description: "Information architecture, interaction design, and clean hierarchy/spacing/typography keep complexity from becoming clutter."
    }
  ]

  const suggestedActions = [
    {
      id: 'experiences',
      icon: <BriefcaseLine width="16" height="16" fill="white" />,
      iconFill: <BriefcaseSolid width="16" height="16" fill="white" />,
      text: "Explore work"
    },
    {
      id: 'working-style',
      icon: <EyesLine width="16" height="16" fill="white" />,
      iconFill: <EyesSolid width="16" height="16" fill="white" />,
      text: "View design approach"
    },
    {
      id: 'impact',
      icon: <SparkleLine width="16" height="16" fill="white" />,
      iconFill: <SparkleSolid width="16" height="16" fill="white" />,
      text: "My Impact"
    },
    {
      id: 'contact',
      icon: <PaperPlaneTiltLine width="16" height="16" fill="white" />,
      iconFill: <PaperPlaneTiltSolid width="16" height="16" fill="white" />,
      text: "Contact Me"
    }
  ]

  // Easing function for organic feel
  const easeOutCubic = (t: number): number => {
    return 1 - Math.pow(1 - t, 3)
  }

  // Helper function to calculate overlay section reveal progress
  const getOverlaySectionProgress = (sectionIndex: number, totalSections: number, descriptionProgress: number = 20) => {
    const sectionStart = descriptionProgress + (sectionIndex * ((100 - descriptionProgress) / totalSections))
    const sectionEnd = descriptionProgress + ((sectionIndex + 1) * ((100 - descriptionProgress) / totalSections))
    if (overlayContentReveal < sectionStart) return 0
    if (overlayContentReveal >= sectionEnd) return 100
    return ((overlayContentReveal - sectionStart) / (sectionEnd - sectionStart)) * 100
  }

  // Testimonials data
  const testimonials = [
    {
      text: "Her skill set, across research, design, and communication make her one of the one most complete product folks I've ever worked with and her ability to collaborate, think innovatively and speak her mind make her an invaluable asset to any team.",
      author: "GTM Lead at Patlytics"
    },
    {
      text: "Grace's ability to navigate and excel in a dynamic startup environment is truly impressive",
      author: "CTO of Viewabo"
    },
    {
      text: "Grace is a true creative spirit with strong ties to her community, friends and colleagues. Her dynamic personality and strong passion for her work have made her a strong asset",
      author: "Marketing Director of BKB"
    }
  ]

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
    setBottomButtonReveals([])
    
    // Add content block immediately to reserve space and prevent layout shift
    setActiveContent(prev => [...prev, actionId])
    
    // Set initial reveal to 0 (content will be hidden initially)
    setContentReveals(prev => ({
      ...prev,
      [actionId]: 0
    }))
    
    setIsLoading(true)
    
    // Simulate loading delay
    setTimeout(() => {
      setIsLoading(false)
      
      // Scroll to the content block smoothly
      const scrollToContent = () => {
        const element = document.getElementById(`content-${actionId}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // If element not found yet, try again after a short delay
          setTimeout(scrollToContent, 50)
        }
      }
      // Start scrolling after a brief delay to ensure DOM is updated
      setTimeout(scrollToContent, 100)
      
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
    // Smoothly reveal entire landing content as one unified gradient wipe
    const duration = 3200 // 3.2 seconds for everything (slightly slower)
    const startTime = Date.now()

    const animate = () => {
      const elapsed = Date.now() - startTime
      const rawProgress = Math.min(elapsed / duration, 1)
      const easedProgress = easeOutCubic(rawProgress) * 100
      
      // Use single progress for entire landing content
      setLandingReveal(easedProgress)
      
      if (rawProgress < 1) {
        requestAnimationFrame(animate)
      } else {
        // Mark as complete so suggested actions can show
        setIsDescComplete(true)
      }
    }

    requestAnimationFrame(animate)
  }, [])

  useEffect(() => {
    // Cascade bottom buttons when content is loaded and there are available actions
    if (activeContent.length === 0 || availableActions.length === 0 || isLoading) return

    // Initialize button reveals array
    setBottomButtonReveals(new Array(availableActions.length).fill(0))

    const buttonDuration = 1200
    const delayBetweenButtons = 300

    // Small delay before starting bottom buttons animation
    setTimeout(() => {
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
    }, 500) // Small delay after content starts loading
  }, [activeContent, availableActions.length, isLoading])

  // Handle ESC key to close overlay
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedExperience !== null) {
        if (document.startViewTransition) {
          document.startViewTransition(() => {
            setSelectedExperience(null)
          })
        } else {
          setSelectedExperience(null)
        }
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedExperience])

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement
      if (isMenuOpen && !target.closest('.floating-menu')) {
        setIsMenuOpen(false)
      }
    }

    if (isMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside)
      return () => document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isMenuOpen])

  // Menu items mapping
  const menuItems = [
    { id: 'experiences', label: 'Work' },
    { id: 'working-style', label: 'Design Approach' },
    { id: 'contact', label: 'Contact Me' },
    { id: 'impact', label: 'My Impact' },
    { id: 'linkedin', label: 'Visit LinkedIn', isLink: true, href: 'https://www.linkedin.com/in/ygrace/' }
  ]

  const handleMenuClick = (item: typeof menuItems[0]) => {
    setIsMenuOpen(false)
    
    // If it's a link, just open it
    if (item.isLink && item.href) {
      handleActionClick(item.id, true, item.href)
      return
    }
    
    // Check if content is already loaded
    if (activeContent.includes(item.id)) {
      // Content is already loaded, scroll to it
      setTimeout(() => {
        const element = document.getElementById(`content-${item.id}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        }
      }, 100) // Small delay to ensure menu closes first
    } else {
      // Content not loaded, load it and then scroll
      handleActionClick(item.id)
      // Wait for content to be added to DOM, then scroll
      // Use a polling approach to wait for element to appear
      const checkAndScroll = () => {
        const element = document.getElementById(`content-${item.id}`)
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        } else {
          // Check again after a short delay
          setTimeout(checkAndScroll, 100)
        }
      }
      // Start checking after loading animation begins
      setTimeout(checkAndScroll, 300)
    }
  }

  return (
    <div className={`landing-page ${theme}-theme`}>
      {/* Floating Menu Button */}
      <div className="floating-menu">
        <button
          className="menu-button"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Menu"
          aria-expanded={isMenuOpen}
        >
          <CaretDownLine width="16" height="16" fill="white" />
        </button>
        {isMenuOpen && (
          <div className="menu-dropdown">
            {menuItems.map((item) => (
              <button
                key={item.id}
                className="menu-item"
                onClick={() => handleMenuClick(item)}
              >
                {item.label}
              </button>
            ))}
            <div className="menu-mode-switcher">
              <div className="mode-switcher-container">
                <button
                  className={`mode-button ${theme === 'dark' ? 'active' : ''}`}
                  onClick={() => setTheme('dark')}
                  onMouseEnter={() => {
                    setHoveredTheme('dark')
                    setShowDarkModeTooltip(true)
                  }}
                  onMouseLeave={() => {
                    setHoveredTheme(null)
                    setShowDarkModeTooltip(false)
                  }}
                  aria-label="Dark mode"
                >
                  {(theme === 'dark' || hoveredTheme === 'dark') ? (
                    <MoonStarsFill width="16" height="16" fill="currentColor" />
                  ) : (
                    <MoonStarsLine width="16" height="16" fill="currentColor" />
                  )}
                  {showDarkModeTooltip && (
                    <div className="mode-tooltip">dark mode</div>
                  )}
                </button>
                <button
                  className={`mode-button ${theme === 'light' ? 'active' : ''}`}
                  onClick={() => setTheme('light')}
                  onMouseEnter={() => setHoveredTheme('light')}
                  onMouseLeave={() => setHoveredTheme(null)}
                  aria-label="Light mode"
                >
                  {(theme === 'light' || hoveredTheme === 'light') ? (
                    <SunFill width="16" height="16" fill="currentColor" />
                  ) : (
                    <SunLine width="16" height="16" fill="currentColor" />
                  )}
                </button>
                <button
                  className={`mode-button ${theme === 'robot' ? 'active' : ''}`}
                  onClick={() => setTheme('robot')}
                  onMouseEnter={() => setHoveredTheme('robot')}
                  onMouseLeave={() => setHoveredTheme(null)}
                  aria-label="Robot theme"
                >
                  {(theme === 'robot' || hoveredTheme === 'robot') ? (
                    <RobotFill width="16" height="16" fill="currentColor" />
                  ) : (
                    <RobotLine width="16" height="16" fill="currentColor" />
                  )}
                </button>
              </div>
            </div>
            <div className="menu-footer">
              <div className="menu-footer-content">
                <span className="menu-footer-text">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="copyright-icon">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                    <path d="M12 8C10.34 8 9 9.34 9 11s1.34 3 3 3c.89 0 1.68-.38 2.24-1h1.52c-.56 1.24-1.86 2-3.26 2-2.21 0-4-1.79-4-4s1.79-4 4-4c1.4 0 2.7.76 3.26 2h-1.52C13.68 8.38 12.89 8 12 8z" fill="currentColor"/>
                  </svg>
                  {' '}2026
                </span>
                <span className="menu-footer-text">Designed & generated by Grace, Cursor, & Claude Code </span>
              </div>
            </div>
          </div>
        )}
      </div>
      {selectedExperience !== null && (
        <div 
          className="experience-overlay" 
          onClick={() => {
            if (document.startViewTransition) {
              document.startViewTransition(() => {
                setSelectedExperience(null)
                setOverlayContentReveal(0)
              })
            } else {
              setSelectedExperience(null)
              setOverlayContentReveal(0)
            }
          }}
        >
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-navigation">
              <button 
                className="nav-link nav-back"
                onClick={() => {
                  if (document.startViewTransition) {
                    document.startViewTransition(() => {
                      setSelectedExperience(null)
                    })
                  } else {
                    setSelectedExperience(null)
                  }
                }}
              >
                Close
              </button>
              <div className="nav-group">
                <button 
                  className="nav-link"
                  onClick={() => {
                    const prevIndex = selectedExperience > 0 ? selectedExperience - 1 : experiences.length - 1
                    if (document.startViewTransition) {
                      document.startViewTransition(() => {
                        setSelectedExperience(prevIndex)
                      })
                    } else {
                      setSelectedExperience(prevIndex)
                    }
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  Previous
                </button>
                <button 
                  className="nav-link"
                  onClick={() => {
                    const nextIndex = selectedExperience < experiences.length - 1 ? selectedExperience + 1 : 0
                    if (document.startViewTransition) {
                      document.startViewTransition(() => {
                        setSelectedExperience(nextIndex)
                      })
                    } else {
                      setSelectedExperience(nextIndex)
                    }
                  }}
                >
                  Next
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </button>
              </div>
            </div>
            
            {selectedExperience === 0 && (
              <div className="overlay-project">
                <div 
                  className="overlay-header"
                  style={{ viewTransitionName: `experience-header-0` } as React.CSSProperties}
                >
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[0].iconColor }}
                    >
                      {(experiences[0].icon as any)(experiences[0].iconColor)}
                    </div>
                    <h1 
                      className="overlay-title"
                      style={{ viewTransitionName: `experience-title-0` } as React.CSSProperties}
                    >
                      {experiences[0].role}
                    </h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[0].company}</span>
                    <span className="overlay-duration">{experiences[0].duration}</span>
                  </div>
                </div>
                <p 
                  className="overlay-description"
                  style={{ 
                    '--reveal-progress': `${Math.min(overlayContentReveal, 20)}%`
                  } as React.CSSProperties}
                >
                  {experiences[0].description}
                </p>
                
                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(0, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Zero-to-one design lead for an AI-driven patent platform. I owned the loop: customer discovery → rapid prototyping → ship. Designed role-based, multi-stakeholder workflows; set patterns and decision gates; used generative AI to cut time-to-insight. My focus: keep complexity from becoming clutter—and make the hard parts feel obvious.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(1, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Patent teams work across fragmented tools—legacy databases, spreadsheets, PDFs, and email—creating slow, expensive, and inconsistent workflows. Prior art search, claim mapping, and comparative analysis are manual and duplicative, with low reuse of knowledge. The result: long cycle times, high cost per search, uneven quality across teams, and limited confidence in decisions.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(2, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Discovery</h2>
                  
                  <h3 className="overlay-subsection-title">Hypothesis</h3>
                  <p>If generative AI handles the heavy lifting—search, synthesis, and first-pass comparisons—patent teams can spend their time where it counts: reasoning through evidence and quickly exploring, testing, and iterating on IP strategies. With guided, role-based flows and structured, explainable outputs (citations, controls, provenance), we should cut time-to-insight, improve consistency across stakeholders, and keep legal rigor intact while accelerating decision-making.</p>

                  <h3 className="overlay-subsection-title">Stakeholders</h3>
                  <ul className="overlay-list">
                    <li>In-house counsel: manage portfolios, assess risk, and make defensible decisions under time pressure.</li>
                    <li>Law firm partners/associates: monetize IP, standardize quality across matters, and reduce costly manual research.</li>
                    <li>Corporate R&D/product teams: inform strategy and investment with fast, explainable insights tied to technical provenance.</li>
                    <li>Patent analysts/search specialists: execute prior art and claim comparisons efficiently, with reusable, citeable outputs.</li>
                    <li>Procurement/Operations (secondary): control cost, ensure consistency, and integrate workflows with existing tools.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Prototyping & methods</h3>
                  <ul className="overlay-list">
                    <li>Rapid, hypothesis-led prototyping in Figma to model search, analysis, and role-based flows; kept fidelity light to speed learning.</li>
                    <li>Generative AI/LLM prototypes to test auto-draft search, synthesis, and first-pass comparisons; instrumented prompts and guardrails for explainability.</li>
                    <li>Short feedback cycles with in-house counsel, firm attorneys, analysts, and R&D decision gates to pivot or deepen based on evidence.</li>
                    <li>Feasibility spikes with Engineering on ingestion, semantic comparison, and performance; aligned constraints early to de-risk builds.</li>
                    <li>Validation loops using real matters and edge cases; measured time-to-insight, reuse of outputs, and error rates to confirm direction.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Design Craft</h2>
                  
                  <h3 className="overlay-subsection-title">Principles</h3>
                  <ul className="overlay-list">
                    <li>Reduce cognitive load without hiding necessary complexity.</li>
                    <li>Keep provenance, citations, and explainability visible so outputs are trusted.</li>
                    <li>Let users move fluidly from search → analysis → synthesis with minimal friction.</li>
                    <li>Support fast scanning and deep dives; the UI should invite curiosity, not guesswork.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Systems & decisions</h3>
                  <ul className="overlay-list">
                    <li>Information architecture oriented around strategy, not keywords—role-based flows and decision gates.</li>
                    <li>Interaction patterns that make comparisons legible (claim charts, overlap maps, side-by-sides).</li>
                    <li>Clean hierarchy, spacing, and typography to keep complexity from becoming clutter.</li>
                    <li>Structured, exportable outputs users can cite and reuse; guardrails to steer generative AI rather than accept black-box results.</li>
                    <li>Lightweight design system: components tuned for multi-stakeholder workflows and zero-to-one iteration speed.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Solution</h2>
                  
                  <h3 className="overlay-subsection-title">Learnings</h3>
                  <ul className="overlay-list">
                    <li>Generative AI shines at first-pass synthesis and comparison; humans should own framing, exceptions, and judgment.</li>
                    <li>Explainability (citations, provenance, controls) is a feature, not a footer; trust increases when users can interrogate results.</li>
                    <li>Prompt design is product design; guardrails and interaction patterns matter as much as models.</li>
                    <li>Designing for reuse (structured outputs, exportability) compounds value across matters and teams. This is important for all stakeholders and how they collaborate within their team structures</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Outcomes</h3>
                  <ul className="overlay-list">
                    <li>"You've returned the three hits that took from 15 - $20,000 in search companies to find... I don't know how these search companies are going to complete"</li>
                    <li>"Clients are spending, you know, nine to $15,000 on that project alone. So if we can do it faster and cheaper with this tool, that's a huge win".</li>
                    <li>"I think it really contextualizes it to show that this is the result you would get in 1/100th of the time that it normally takes to get us here"</li>
                    <li>"You know, it can take tasks that typically take, you know, days or weeks, and you know, make it take one day."</li>
                    <li>"Honestly, I'm looking at [ COMPETITOR ] as a competitor of yours... they say they do the same thing... I like your product better, it looks really well organized and it's a great UI".</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 1 && (
              <div className="overlay-project">
                <div 
                  className="overlay-header"
                  style={{ viewTransitionName: `experience-header-1` } as React.CSSProperties}
                >
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[1].iconColor }}
                    >
                      {(experiences[1].icon as any)(experiences[1].iconColor)}
                    </div>
                    <h1 
                      className="overlay-title"
                      style={{ viewTransitionName: `experience-title-1` } as React.CSSProperties}
                    >
                      {experiences[1].role}
                    </h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[1].company}</span>
                    <span className="overlay-duration">{experiences[1].duration}</span>
                  </div>
                </div>
                <p 
                  className="overlay-description"
                  style={{ 
                    '--reveal-progress': `${Math.min(overlayContentReveal, 20)}%`
                  } as React.CSSProperties}
                >
                  {experiences[1].description}
                </p>
                
                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(0, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Led the design of a real-time visual support platform integrated with Zendesk, focusing on the synchronous and asynchronous user experience across agent desktop web apps and end-user mobile devices. Developed product strategy, defined the service blueprint, and created efficient workflows for high-pressure support. Collaborated with engineering on WebRTC constraints and privacy measures, while aligning user experience with key metrics like resolution time and customer satisfaction (CSAT). Goal: simplify complex field issues into actionable insights for non-technical users.</p>
                  <img src={ViewaboBanner} alt="Viewabo Platform Banner" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(1, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Most support happens blind: text/email tickets, screenshots, and long back-and-forths. Agents can't see the issue, customers can't describe it, and resolution requires escalations or on-site visits. This drives slow ticket resolution, high operational cost, and frustrated customers—especially in hardware, home services, and field operations where context matters most.</p>
                  <img src={ViewaboTestimonial} alt="Viewabo Customer Testimonials" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(2, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Discovery</h2>
                  
                  <h3 className="overlay-subsection-title">Hypothesis</h3>
                  <p>If we make it one-tap to share live video—with consent, guidance, and lightweight capture—agents can diagnose in minutes instead of days. Structured evidence (annotated clips, device metadata, steps taken) should compress triage, improve first-contact resolution, and reduce unnecessary truck rolls while preserving user privacy.</p>

                  <h3 className="overlay-subsection-title">Stakeholders</h3>
                  <ul className="overlay-list">
                    <li>Support agents and team leads: need fast, reliable context to resolve and standardize quality.</li>
                    <li>Field technicians: require clear remote guidance and a record of work.</li>
                    <li>End customers: want frictionless, safe, and private help on mobile.</li>
                    <li>Customer Success/Ops: care about CSAT, cost per ticket, and playbook consistency.</li>
                    <li>Security/Compliance (secondary): require consent flows, data retention controls, and auditability.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Prototyping & methods</h3>
                  <ul className="overlay-list">
                    <li>Figma flows simulating invite → join → capture → annotate → summarize; optimized for mobile first for the client's end-users.</li>
                    <li>WebRTC feasibility spikes: bandwidth adaptation, reconnect strategies, backups to guided photo capture.</li>
                    <li>Consent and privacy trials: explicit affordances, redaction, and opt-in data sharing.</li>
                    <li>Rapid hallway tests with agents/customers; time-to-diagnosis and error-rate instrumentation.</li>
                    <li>Service blueprinting across Support, CS, and Ops to align tooling and escalation paths.</li>
                  </ul>
                  <img src={ViewaboMobile} alt="Viewabo Mobile Interface" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(3, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Design Craft</h2>
                  
                  <h3 className="overlay-subsection-title">Principles</h3>
                  <ul className="overlay-list">
                    <li>Prioritize speed and clarity under stress; reduce steps without sacrificing safety.</li>
                    <li>Privacy-by-design: explicit consent, visible recording status, scoped data collection.</li>
                    <li>Mobile-first accessibility: large tap targets, readable UI in varied lighting, assistive prompts.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Systems & decisions</h3>
                  <ul className="overlay-list">
                    <li>Invite mechanics: SMS/email deep links; no-app joins; device checks before session.</li>
                    <li>Guided capture: checklists, on-screen arrows, auto-focus hints, and quick annotations.</li>
                    <li>Case timeline: structured artifacts (clips, notes, parts) that travel across teams.</li>
                    <li>Low-bandwidth modes: adaptive video quality, snapshot fallback, and resumable sessions.</li>
                    <li>Lightweight design system tuned for field use—robust, legible, and forgiving.</li>
                  </ul>
                  <img src={ViewaboUICover} alt="Viewabo UI Design System" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(4, 7)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Solution</h2>
                  <p>A streamlined, consent-forward visual support flow: agents send a secure link; customers join without installing an app, pass device checks, and share live video. The UI guides capture with overlays and prompts; agents annotate in real time, attach notes and parts, and generate a post-call summary. All artifacts land in a searchable case timeline that standardizes handoffs and accelerates repeat issues.</p>
                  <img src={ViewaboDesktopMobile} alt="Viewabo Desktop and Mobile Views" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(5, 7)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Learnings</h2>
                  <ul className="overlay-list">
                    <li>Reliability beats bells and whistles: reconnect logic and guidance matter more than fancy tools.</li>
                    <li>Consent is UX: clear status, control over what's shared, and easy exits increase trust.</li>
                    <li>Design for constraints: glare, noise, shaky hands; the interface must compensate.</li>
                    <li>Structured evidence unlocks scale: standardized artifacts improve routing, QA, and training.</li>
                  </ul>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(6, 7)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Outcomes</h2>
                  <ul className="overlay-list">
                    <li>"Viewabo is a great product to interact with customers. I would say it's a positive experience and makes my life and the customer's lives easier...I am able to directly see what the customer is seeing and can help better navigate through troubleshooting steps. Sometimes it is very hard to explain something clearly just using words, so having a way to view the eyes through the customer has been very helpful."</li>
                    <li>"Overall, it takes out the guesswork on trying to figure out that the customer is trying to explain to us. We can literally see what there seeing in Realtime and not have to wait for emails to come in with pictures."</li>
                    <li>"Has helped many inexperienced customer locate components and troubleshoot their PCs"</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 2 && (
              <div className="overlay-project">
                <div 
                  className="overlay-header"
                  style={{ viewTransitionName: `experience-header-2` } as React.CSSProperties}
                >
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[2].iconColor }}
                    >
                      {(experiences[2].icon as any)(experiences[2].iconColor)}
                    </div>
                    <h1 
                      className="overlay-title"
                      style={{ viewTransitionName: `experience-title-2` } as React.CSSProperties}
                    >
                      {experiences[2].role}
                    </h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[2].company}</span>
                    <span className="overlay-duration">{experiences[2].duration}</span>
                  </div>
                </div>
                <p 
                  className="overlay-description"
                  style={{ 
                    '--reveal-progress': `${Math.min(overlayContentReveal, 20)}%`
                  } as React.CSSProperties}
                >
                  {experiences[2].description}
                </p>
                
                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(0, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Led website architecture and end-to-end service design for a STEAM education program with a focus on conversion and smooth delivery. Own the funnel from marketing and sales through onboarding and attendance: crafted a high-converting website, mapped cross-functional workflows, and instrumented the digital infrastructure to reduce drop-off. During COVID, drove the pivot to a fully online summer camp experience—cohort scheduling, content packaging, and operational playbooks—so families could enroll and attend with confidence.</p>
                  <img src={SkyrockBanner} alt="Skyrock Summer Camp Banner" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(1, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Families struggled to understand offerings, compare camps, and complete enrollment across fragmented touchpoints (marketing site, forms, emails, payment). COVID also forced an abrupt shift to digital, introducing new friction: unclear schedules, tech setup, access links, and expectations. Without a cohesive funnel and service blueprint, conversion lagged, onboarding was error-prone, and class attendance suffered.</p>
                  <img src={SkyrockFlow} alt="Skyrock User Flow" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(2, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Discovery</h2>
                  
                  <h3 className="overlay-subsection-title">Hypothesis</h3>
                  <p>If we simplify decision-making on the website (clear value, age/skill filters, transparent schedules) and design a coherent service journey (guided checkout → onboarding steps → class access), we'll increase conversion, reduce pre-class confusion, and improve attendance/engagement—even in a fully online format.</p>

                  <h3 className="overlay-subsection-title">Stakeholders</h3>
                  <ul className="overlay-list">
                    <li>Parents/guardians: need clarity on curriculum, age fit, schedule, and price, plus simple enrollment and tech setup.</li>
                    <li>Students: need a simple, repeatable path to join daily—one tap in, no link or sign‑in confusion, materials ready at the right time.</li>
                    <li>Sales/Marketing: depend on a persuasive site, lead capture, and attribution to optimize spend.</li>
                    <li>Operations/Academics: need predictable rosters, automated communications, and reliable class workflows.</li>
                    <li>Instructors: benefit from standardized lesson kits, cohort info, and ready-to-run tech.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Prototyping & methods</h3>
                  <ul className="overlay-list">
                    <li>Conversion-focused site prototypes: value propositions, program comparison, filters, and clear CTAs; A/B tests on headlines and page structure.</li>
                    <li>Funnel instrumentation: UTM tracking, form analytics, and drop-off analysis to prioritize fixes.</li>
                    <li>Service blueprinting: mapped touchpoints from sign-up to attendance; identified failure points (links, time zones, materials).</li>
                    <li>Onboarding experiments: automated email sequences, pre-class checklists, and calendar invites; measured open/click/attendance.</li>
                    <li>Cohort scheduling trials: capacity planning, time-zone friendly slots, and load balancing across instructors.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Design Craft</h2>
                  
                  <h3 className="overlay-subsection-title">Principles</h3>
                  <ul className="overlay-list">
                    <li>Make choices easy: clear program tiers, outcomes, and prerequisites.</li>
                    <li>Reduce anxiety: visible schedules, transparent expectations, and tech readiness guidance.</li>
                    <li>Consistency beats novelty: repeatable patterns across pages, emails, and class access.</li>
                  </ul>

                  <h3 className="overlay-subsection-title">Systems & decisions</h3>
                  <ul className="overlay-list">
                    <li>Website information architecture built around parent goals: browse by age/interest, compare camps, enroll in fewer clicks.</li>
                    <li>Enrollment flow: simplified forms, progress indicators, payment clarity, immediate confirmation.</li>
                    <li>Onboarding kit: automated sequences with calendar invites, access links, materials, and FAQs.</li>
                    <li>Cohort and schedule system: reliable rosters, reminders, and rescheduling pathways.</li>
                    <li>Instructor packets: standardized lesson plans, tech checks, and classroom norms.</li>
                  </ul>
                  <img src={SkyrockDigiOps} alt="Skyrock Digital Operations" className="overlay-image" />
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Solution</h2>
                  <p>A conversion-first website paired with a robust service blueprint. The site clarifies offerings, streamlines enrollment, and sets expectations. Post-purchase, families receive a guided onboarding sequence with calendar invites, tech setup instructions, access links, and materials. Cohorts are scheduled to maximize attendance; instructors receive standardized kits. The result is a coherent journey from discovery to attendance, with instrumentation to monitor and improve every step.</p>
                  <img src={SkyrockSummerLaunch} alt="Skyrock Summer Camp Launch" className="overlay-image" />
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Learnings</h2>
                  <ul className="overlay-list">
                    <li>Clarity converts: program comparison and transparent schedules outperform clever copy.</li>
                    <li>Service design is product: onboarding and access flows determine perceived quality as much as curriculum.</li>
                    <li>Automations need empathy: reminders and checklists should reduce stress, not add noise.</li>
                    <li>Standardization scales: reusable packets and templates stabilize operations across cohorts and instructors.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Outcomes</h2>
                  <ul className="overlay-list">
                    <li>Increased website conversion and reduced form drop-off with clearer IA and CTAs.</li>
                    <li>Smooth operations through automated onboarding, calendar invites, and tech-readiness guidance.</li>
                    <li>Fewer support tickets related to access links, schedules, and materials.</li>
                    <li>Positive parent feedback on clarity of offerings and smooth pre-class experience.</li>
                    <li>We successfully had the most early bird sign ups for summer camp in Skyrock history.</li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 3 && (
              <div className="overlay-project">
                <div 
                  className="overlay-header"
                  style={{ viewTransitionName: `experience-header-3` } as React.CSSProperties}
                >
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[3].iconColor }}
                    >
                      {(experiences[3].icon as any)(experiences[3].iconColor)}
                    </div>
                    <h1 
                      className="overlay-title"
                      style={{ viewTransitionName: `experience-title-3` } as React.CSSProperties}
                    >
                      {experiences[3].role}
                    </h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[3].company}</span>
                    <span className="overlay-duration">{experiences[3].duration}</span>
                  </div>
                </div>
                <p 
                  className="overlay-description"
                  style={{ 
                    '--reveal-progress': `${Math.min(overlayContentReveal, 20)}%`
                  } as React.CSSProperties}
                >
                  {experiences[3].description}
                </p>
                
                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(0, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Mini Program + Web Development for ORM Fertility. Designed and developed a WeChat Mini Program to help ORM Fertility establish their marketing presence in Shanghai and take ownership over their community in the WeChat ecosystem.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(1, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>ORM Fertility was laying down roots in Shanghai; as they looked to grow their marketing arm independent of local partners, they wanted a way to take ownership over their community. They needed a direct way to market their services in the WeChat ecosystem that would significantly decrease friction for people to share information on ORM as well as provide valuable insights and analytics.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(2, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Product Design</h2>
                  <p>ORM Fertility already had a WeChat Official Account, so I had to work with them to figure out how the mini program would fit in with their current marketing workflow and team resources. We went through a discovery phase, where I provided examples of different information-heavy mini programs and illustrated certain strengths and weaknesses of the mini program framework. We coasted through three user experience design rounds and user interaction design rounds.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(3, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Front End Development</h2>
                  <p>One of the most exciting phases of the project is where I take my designs and step into the front-end developer role to bring them to life. Working in the WeChat IDE, the framework has evolved with "React" features, so I organized all the front-end code into functional and higher-order components.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(4, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Skills & Tools</h2>
                  <p><strong>Skills:</strong> Product design, user interaction design, user experience design, WeChat development, front end development</p>
                  <p><strong>Tools:</strong> WXML, WXSS, WeChat components, Ruby on Rails, HTML, CSS, Javascript</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(5, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Status</h2>
                  <p>Currently, the project is in the process of being deployed onto Chinese servers beyond the Great Firewall.</p>
                </div>
              </div>
            )}

            {selectedExperience === 4 && (
              <div className="overlay-project">
                <div 
                  className="overlay-header"
                  style={{ viewTransitionName: `experience-header-4` } as React.CSSProperties}
                >
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[4].iconColor }}
                    >
                      {(experiences[4].icon as any)(experiences[4].iconColor)}
                    </div>
                    <h1 
                      className="overlay-title"
                      style={{ viewTransitionName: `experience-title-4` } as React.CSSProperties}
                    >
                      {experiences[4].role}
                    </h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[4].company}</span>
                    <span className="overlay-duration">{experiences[4].duration}</span>
                  </div>
                </div>
                <p 
                  className="overlay-description"
                  style={{ 
                    '--reveal-progress': `${Math.min(overlayContentReveal, 20)}%`
                  } as React.CSSProperties}
                >
                  {experiences[4].description}
                </p>
                
                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(0, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Mini Program + Web Design for Ubisoft Shanghai's ChinaJoy Mini Program. Worked with the Ubisoft Shanghai creative, marketing, and mobile development teams to draft UX workflows, design UI elements, and provide front-end consulting for the WeChat framework.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(1, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Context</h2>
                  <p>Ubisoft Shanghai is the second largest Chinese development studio, and Ubisoft's second largest studio behind Ubisoft Montreal. Held annually in Shanghai, China, ChinaJoy or China Digital Entertainment Expo & Conference is a digital entertainment expo and the largest gaming and digital entertainment exhibition held in China and Asia.</p>
                  <p>ChinaJoy boasted 340,000+ visitors from all over the world. WeChat is the social, financial, and cultural infrastructure that everyday China relies on. With the advent of WeChat Mini Programs, Ubisoft Shanghai shared a vision of a community united through the excitement and passion of China Joy.</p>
                  <img src={UbiBanner} alt="Ubisoft ChinaJoy Banner" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(2, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">The User Stories</h2>
                  <p>Users would be able to:</p>
                  <ul className="overlay-list">
                    <li>Book demos</li>
                    <li>Enter in lucky draw lotteries for limited edition prizes</li>
                    <li>Share event posts</li>
                    <li>Look up and stream scheduled live shows and other events</li>
                  </ul>
                  <p>As for Ubisoft Shanghai, they would be able to collect information on attendees, and be able to reach out and connect the China community to their official WeChat page.</p>
                  <img src={UbiLucky} alt="Ubisoft Lucky Draw Feature" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(3, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">The Process</h2>
                  <p>I worked with the Ubisoft Shanghai creative, marketing, and mobile development teams to draft UX workflows, design UI elements, and provide some front-end consulting for the WeChat framework.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(4, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">The Deliverables</h2>
                  <p>I provided a full PDF UX map with labelled Sketch artboards & 3 edit rounds. I also provided all UI components and unique graphics specific to the Mini Program (i.e. icons for each of Ubisoft's games, the lucky draw backdrop).</p>
                  <img src={UbiUI} alt="Ubisoft UI Components" className="overlay-image" />
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(5, 6)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Skills & Tools</h2>
                  <p><strong>Skills:</strong> Product design, WeChat development</p>
                  <p><strong>Tools:</strong> Sketch, Figma, WeChat IDE, HTML, CSS, Javascript</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(6, 7)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Press Coverage</h2>
                  <ul className="overlay-list">
                    <li><a href="https://mp.weixin.qq.com/s/OhuxV5_XkIEuES5QgS2Vyg" target="_blank" rel="noopener noreferrer">Ubisoft Is Taking China Joy By Storm - WeChat Global</a></li>
                    <li><a href="http://blog.ubi.com/en-GB/ubisoft-brings-exciting-line-chinajoy/" target="_blank" rel="noopener noreferrer">Ubisoft Brings Exciting Line Up To ChinaJoy</a></li>
                    <li><a href="https://www.douyu.com/cms/new_list/201808/02/8373.shtml" target="_blank" rel="noopener noreferrer">Betta × Ubisoft ChinaJoy: Fish Le Direct Leads You To The New World Of Games</a></li>
                  </ul>
                </div>
              </div>
            )}

            {selectedExperience === 5 && (
              <div className="overlay-project">
                <div 
                  className="overlay-header"
                  style={{ viewTransitionName: `experience-header-5` } as React.CSSProperties}
                >
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[5].iconColor }}
                    >
                      {(experiences[5].icon as any)(experiences[5].iconColor)}
                    </div>
                    <h1 
                      className="overlay-title"
                      style={{ viewTransitionName: `experience-title-5` } as React.CSSProperties}
                    >
                      {experiences[5].role}
                    </h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[5].company}</span>
                    <span className="overlay-duration">{experiences[5].duration}</span>
                  </div>
                </div>
                <p 
                  className="overlay-description"
                  style={{ 
                    '--reveal-progress': `${Math.min(overlayContentReveal, 20)}%`
                  } as React.CSSProperties}
                >
                  {experiences[5].description}
                </p>
                
                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(0, 4)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Web Development for A Pure Person album website. Designed and developed an interactive audio-visual website to accompany the release of the Lin Qiang & Guests album, featuring minimal design aligned with the album cover and audio-visual interactivity for each track.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(1, 4)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">The Idea</h2>
                  <p>The Lin Qiang & Guests production team wanted a website to accompany the release of their album. Priorities for the site included:</p>
                  <ul className="overlay-list">
                    <li>A minimal design very close to the digital and physical album cover</li>
                    <li>A type of audio-visual interactivity for each track</li>
                  </ul>
                  <p>Inspirations included <em>Holodec.world</em>'s website by creative digital design and development agency Bureau Cool. The way the album was designed, however, begged a simpler design for the interactivity. Looking at the fairly minimal design, I proposed a type of audio visualization with the image associated with each track.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(2, 4)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Research, Tools, and Processes</h2>
                  <p>While I hadn't executed an interactive creative concept like this, I was very excited to dive in. Research and requirements led me to Web Audio API + CurtainsJS.</p>
                  <p>I initialized the project with Gatsby.js thinking we would have more pages to work with, but as the album cover design was finalized, I stripped the structure of the site down to match.</p>
                  <p>Combing through documentation for both Web Audio and CurtainsJS, I learned how to create a simple plane, loaded image textures, create audio analyzer nodes and accessed audio data. I connected audio data to the simple plane animation effects using audio frequencies and mouse delta values.</p>
                  <p>The team wanted to use the website animation effect for the visual of the streamers, so I also helped the team create screen recordings for "streamers", or audio previews to be posted on Instagram and Youtube.</p>
                  <p>Towards the end of the project, I tested and optimized the site for accessibility and improved performance with code-splitting and lazy loading.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(3, 4)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">The Site</h2>
                  <p>For the soft launch and teaser, the team requested that only certain tracks be available before October 15th, the hard launch of the album.</p>
                  <p>The project is currently live at apureperson.com.</p>
                </div>

                <div 
                  className="overlay-section"
                  style={{ 
                    '--reveal-progress': `${getOverlaySectionProgress(4, 5)}%`
                  } as React.CSSProperties}
                >
                  <h2 className="overlay-section-title">Skills & Tools</h2>
                  <p><strong>Skills:</strong> Product design, front-end development</p>
                  <p><strong>Tools:</strong> Javascript, HTML, CSS, Sass, GatsbyJS, CurtainsJS, Web Audio API</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
      <div 
        className="content"
        style={{
          '--reveal-progress': `${landingReveal}%`
        } as React.CSSProperties}
      >
        <h1 className="title">
          {title}
        </h1>
        <p className="description">
          {description}
        </p>
        {activeContent.map((contentId) => {
              const contentReveal = contentReveals[contentId] || 0
              
              if (contentId === 'experiences') {
                return (
                  <div key={contentId} id={`content-${contentId}`} className="content-block">
                    <div className="experiences-content">
                      <h2 className="content-title">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${Math.max(0, Math.min(100, (contentReveal / 25) * 100))}%`
                          } as React.CSSProperties}
                        >
                          What have I helped build lately?
                        </span>
                      </h2>
                      <p className="content-subtitle">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${Math.max(0, Math.min(100, ((contentReveal - 25) / 25) * 100))}%`
                          } as React.CSSProperties}
                        >
                          Here's a quick preview of my latest experiences:
                        </span>
                      </p>
                      <div className="experiences-list">
                        {(showMoreExperiences ? experiences : experiences.slice(0, 4)).map((exp, index) => {
                          // If showing more experiences and this is one of the newly added items (index >= 4),
                          // show immediately since content is already loaded
                          const isNewItem = showMoreExperiences && index >= 4
                          const shouldShowImmediately = isNewItem
                          
                          // Title: 0-25% of contentReveal (completes when contentReveal = 25)
                          // Description: 25-50% of contentReveal (starts at 25, completes at 50)
                          // First tile starts at 50% of contentReveal
                          // Each subsequent tile starts after previous completes
                          // We'll allocate remaining 50% of contentReveal for all tiles
                          const numTiles = showMoreExperiences ? experiences.length : 4
                          const tilesRange = 50 // Remaining 50% of contentReveal for all tiles
                          const tileProgressRange = tilesRange / numTiles // Progress range per tile
                          const itemStartPoint = 50 + (index * tileProgressRange)
                          
                          // Calculate item progress - each tile gets its own slice of the progress
                          const itemProgress = shouldShowImmediately 
                            ? 100 
                            : contentReveal >= itemStartPoint
                            ? Math.min(100, ((contentReveal - itemStartPoint) / tileProgressRange) * 100)
                            : 0
                          
                          // Ensure items complete when contentReveal reaches 100%
                          const finalProgress = shouldShowImmediately || (contentReveal >= 100 && itemProgress > 0)
                            ? 100 
                            : itemProgress
                          
                          // Calculate cascading progress for elements within this experience item
                          // Entire tile (including icon badge) loads together, then content cascades within
                          // Role starts when tile reaches 20%
                          const roleStartPoint = 20
                          const roleProgress = finalProgress >= roleStartPoint
                            ? Math.min(100, ((finalProgress - roleStartPoint) / (100 - roleStartPoint)) * 100)
                            : 0
                          // Description starts when role reaches 30%
                          const descStartPoint = 30
                          const descProgress = roleProgress >= descStartPoint
                            ? Math.min(100, ((roleProgress - descStartPoint) / (100 - descStartPoint)) * 100)
                            : 0
                          // Company starts when description reaches 50%
                          const companyStartPoint = 50
                          const companyProgress = descProgress >= companyStartPoint
                            ? Math.min(100, ((descProgress - companyStartPoint) / (100 - companyStartPoint)) * 100)
                            : 0
                          // Duration starts when company reaches 50%
                          const durationStartPoint = 50
                          const durationProgress = companyProgress >= durationStartPoint
                            ? Math.min(100, ((companyProgress - durationStartPoint) / (100 - durationStartPoint)) * 100)
                            : 0
                          
                          // Ensure all elements complete when item completes
                          const ensureComplete = (progress: number) => finalProgress >= 100 && progress > 0 ? 100 : progress
                          
                          return (
                            <div 
                              key={index}
                              className="experience-item"
                              style={{
                                '--reveal-progress': `${finalProgress}%`
                              } as React.CSSProperties}
                              onClick={() => {
                                if (document.startViewTransition) {
                                  document.startViewTransition(() => {
                                    setSelectedExperience(index)
                                    setOverlayContentReveal(0)
                                  })
                                } else {
                                  setSelectedExperience(index)
                                  setOverlayContentReveal(0)
                                }
                                // Start content reveal animation after a short delay
                                setTimeout(() => {
                                  const duration = 2000
                                  const startTime = Date.now()
                                  const animate = () => {
                                    const elapsed = Date.now() - startTime
                                    const rawProgress = Math.min(elapsed / duration, 1)
                                    const easedProgress = easeOutCubic(rawProgress) * 100
                                    setOverlayContentReveal(easedProgress)
                                    if (rawProgress < 1) {
                                      requestAnimationFrame(animate)
                                    }
                                  }
                                  requestAnimationFrame(animate)
                                }, 400) // Wait for header transition to start
                              }}
                              onMouseEnter={() => setHoveredExperience(index)}
                              onMouseLeave={() => setHoveredExperience(null)}
                            >
                              <div 
                                className="experience-icon"
                                style={{ 
                                  backgroundColor: exp.iconColor
                                } as React.CSSProperties}
                              >
                                {(hoveredExperience === index && (exp as any).iconFill) 
                                  ? (exp as any).iconFill(exp.iconColor) 
                                  : (exp as any).icon(exp.iconColor)}
                              </div>
                              <div 
                                className="experience-content"
                                style={{ viewTransitionName: `experience-header-${index}` } as React.CSSProperties}
                              >
                                <div className="experience-main">
                                  <h3 
                                    className="experience-role"
                                    style={{ 
                                      '--reveal-progress': `${ensureComplete(roleProgress)}%`,
                                      viewTransitionName: `experience-title-${index}`
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
                      {!showMoreExperiences && (
                        <button 
                          className="see-more-button"
                          onClick={() => setShowMoreExperiences(true)}
                        >
                          See more
                        </button>
                      )}
                    </div>
                  </div>
                )
              }
              
              if (contentId === 'working-style') {
                const howIWorkSteps = [
                  {
                    iconColor: '#10b981', // green
                    iconLine: <HandPeaceLine width="20" height="20" />,
                    iconFill: <HandPeaceSolid width="20" height="20" />,
                    title: "How I work",
                    description: "Product design & development guidelines"
                  },
                  {
                    iconColor: '#3b82f6', // blue
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M18.75 7.5V10.5C18.75 10.6989 18.671 10.8897 18.5303 11.0303C18.3897 11.171 18.1989 11.25 18 11.25C17.8011 11.25 17.6103 11.171 17.4697 11.0303C17.329 10.8897 17.25 10.6989 17.25 10.5V8.25H15C14.8011 8.25 14.6103 8.17098 14.4697 8.03033C14.329 7.88968 14.25 7.69891 14.25 7.5C14.25 7.30109 14.329 7.11032 14.4697 6.96967C14.6103 6.82902 14.8011 6.75 15 6.75H18C18.1989 6.75 18.3897 6.82902 18.5303 6.96967C18.671 7.11032 18.75 7.30109 18.75 7.5ZM9 15.75H6.75V13.5C6.75 13.3011 6.67098 13.1103 6.53033 12.9697C6.38968 12.829 6.19891 12.75 6 12.75C5.80109 12.75 5.61032 12.829 5.46967 12.9697C5.32902 13.1103 5.25 13.3011 5.25 13.5V16.5C5.25 16.6989 5.32902 16.8897 5.46967 17.0303C5.61032 17.171 5.80109 17.25 6 17.25H9C9.19891 17.25 9.38968 17.171 9.53033 17.0303C9.67098 16.8897 9.75 16.6989 9.75 16.5C9.75 16.3011 9.67098 16.1103 9.53033 15.9697C9.38968 15.829 9.19891 15.75 9 15.75ZM21.75 5.25V18.75C21.75 19.1478 21.592 19.5294 21.3107 19.8107C21.0294 20.092 20.6478 20.25 20.25 20.25H3.75C3.35218 20.25 2.97064 20.092 2.68934 19.8107C2.40804 19.5294 2.25 19.1478 2.25 18.75V5.25C2.25 4.85218 2.40804 4.47064 2.68934 4.18934C2.97064 3.90804 3.35218 3.75 3.75 3.75H20.25C20.6478 3.75 21.0294 3.90804 21.3107 4.18934C21.592 4.47064 21.75 4.85218 21.75 5.25ZM20.25 18.75V5.25H3.75V18.75H20.25Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM8.25 18H5.25C5.05109 18 4.86032 17.921 4.71967 17.7803C4.57902 17.6397 4.5 17.4489 4.5 17.25V14.25C4.5 14.0511 4.57902 13.8603 4.71967 13.7197C4.86032 13.579 5.05109 13.5 5.25 13.5C5.44891 13.5 5.63968 13.579 5.78033 13.7197C5.92098 13.8603 6 14.0511 6 14.25V16.5H8.25C8.44891 16.5 8.63968 16.579 8.78033 16.7197C8.92098 16.8603 9 17.0511 9 17.25C9 17.4489 8.92098 17.6397 8.78033 17.7803C8.63968 17.921 8.44891 18 8.25 18ZM19.5 9.75C19.5 9.94891 19.421 10.1397 19.2803 10.2803C19.1397 10.421 18.9489 10.5 18.75 10.5C18.5511 10.5 18.3603 10.421 18.2197 10.2803C18.079 10.1397 18 9.94891 18 9.75V7.5H15.75C15.5511 7.5 15.3603 7.42098 15.2197 7.28033C15.079 7.13968 15 6.94891 15 6.75C15 6.55109 15.079 6.36032 15.2197 6.21967C15.3603 6.07902 15.5511 6 15.75 6H18.75C18.9489 6 19.1397 6.07902 19.2803 6.21967C19.421 6.36032 19.5 6.55109 19.5 6.75V9.75Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Frame",
                    description: "Define the problem, users, and constraints with data and interviews."
                  },
                  {
                    iconColor: '#ef4444', // red
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM20.25 18.75H3.75V5.25H20.25V18.75ZM7.5 7.875C7.5 8.0975 7.43402 8.31501 7.3104 8.50002C7.18679 8.68502 7.01109 8.82922 6.80552 8.91436C6.59995 8.99951 6.37375 9.02179 6.15552 8.97838C5.93729 8.93498 5.73684 8.82783 5.5795 8.6705C5.42217 8.51316 5.31502 8.31271 5.27162 8.09448C5.22821 7.87625 5.25049 7.65005 5.33564 7.44448C5.42078 7.23891 5.56498 7.06321 5.74998 6.9396C5.93499 6.81598 6.1525 6.75 6.375 6.75C6.67337 6.75 6.95952 6.86853 7.1705 7.0795C7.38147 7.29048 7.5 7.57663 7.5 7.875ZM11.25 7.875C11.25 8.0975 11.184 8.31501 11.0604 8.50002C10.9368 8.68502 10.7611 8.82922 10.5555 8.91436C10.35 8.99951 10.1238 9.02179 9.90552 8.97838C9.68729 8.93498 9.48684 8.82783 9.3295 8.6705C9.17217 8.51316 9.06502 8.31271 9.02162 8.09448C8.97821 7.87625 9.00049 7.65005 9.08564 7.44448C9.17078 7.23891 9.31498 7.06321 9.49998 6.9396C9.68499 6.81598 9.9025 6.75 10.125 6.75C10.4234 6.75 10.7095 6.86853 10.9205 7.0795C11.1315 7.29048 11.25 7.57663 11.25 7.875Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M20.25 3.75H3.75C3.35218 3.75 2.97064 3.90804 2.68934 4.18934C2.40804 4.47064 2.25 4.85218 2.25 5.25V18.75C2.25 19.1478 2.40804 19.5294 2.68934 19.8107C2.97064 20.092 3.35218 20.25 3.75 20.25H20.25C20.6478 20.25 21.0294 20.092 21.3107 19.8107C21.592 19.5294 21.75 19.1478 21.75 18.75V5.25C21.75 4.85218 21.592 4.47064 21.3107 4.18934C21.0294 3.90804 20.6478 3.75 20.25 3.75ZM6.375 9C6.1525 9 5.93499 8.93402 5.74998 8.8104C5.56498 8.68679 5.42078 8.51109 5.33564 8.30552C5.25049 8.09995 5.22821 7.87375 5.27162 7.65552C5.31502 7.43729 5.42217 7.23684 5.5795 7.0795C5.73684 6.92217 5.93729 6.81502 6.15552 6.77162C6.37375 6.72821 6.59995 6.75049 6.80552 6.83564C7.01109 6.92078 7.18679 7.06498 7.3104 7.24998C7.43402 7.43499 7.5 7.6525 7.5 7.875C7.5 8.17337 7.38147 8.45952 7.1705 8.6705C6.95952 8.88147 6.67337 9 6.375 9ZM10.125 9C9.9025 9 9.68499 8.93402 9.49998 8.8104C9.31498 8.68679 9.17078 8.51109 9.08564 8.30552C9.00049 8.09995 8.97821 7.87375 9.02162 7.65552C9.06502 7.43729 9.17217 7.23684 9.3295 7.0795C9.48684 6.92217 9.68729 6.81502 9.90552 6.77162C10.1238 6.72821 10.35 6.75049 10.5555 6.83564C10.7611 6.92078 10.9368 7.06498 11.0604 7.24998C11.184 7.43499 11.25 7.6525 11.25 7.875C11.25 8.17337 11.1315 8.45952 10.9205 8.6705C10.7095 8.88147 10.4234 9 10.125 9Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Prototype",
                    description: "Code high-fidelity prototypes to test real interactions early."
                  },
                  {
                    iconColor: '#f97316', // orange
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M23.25 10.5H20.6325L16.1794 4.36781C16.0444 4.18253 15.8688 4.03065 15.666 3.92381C15.4632 3.81698 15.2387 3.75804 15.0095 3.75152C14.7804 3.745 14.5529 3.79108 14.3443 3.88621C14.1358 3.98135 13.9518 4.12301 13.8066 4.30031L12.6019 5.69719L12.5831 5.71875C12.5133 5.80644 12.4246 5.87726 12.3237 5.92594C12.2227 5.97461 12.1121 5.99989 12 5.99989C11.8879 5.99989 11.7773 5.97461 11.6763 5.92594C11.5754 5.87726 11.4867 5.80644 11.4169 5.71875L11.3981 5.69719L10.1934 4.30031C10.0482 4.12301 9.86422 3.98135 9.65568 3.88621C9.44714 3.79108 9.21958 3.745 8.99046 3.75152C8.76134 3.75804 8.53676 3.81698 8.33397 3.92381C8.13118 4.03065 7.95557 4.18253 7.82062 4.36781L3.3675 10.5H0.75C0.551088 10.5 0.360322 10.579 0.21967 10.7197C0.0790176 10.8603 0 11.0511 0 11.25C0 11.4489 0.0790176 11.6397 0.21967 11.7803C0.360322 11.921 0.551088 12 0.75 12H23.25C23.4489 12 23.6397 11.921 23.7803 11.7803C23.921 11.6397 24 11.4489 24 11.25C24 11.0511 23.921 10.8603 23.7803 10.7197C23.6397 10.579 23.4489 10.5 23.25 10.5ZM9.03187 5.25L9.04969 5.27156L10.2544 6.6675C10.4654 6.92693 10.7315 7.13607 11.0335 7.27971C11.3354 7.42336 11.6656 7.49789 12 7.49789C12.3344 7.49789 12.6646 7.42336 12.9665 7.27971C13.2685 7.13607 13.5346 6.92693 13.7456 6.6675L14.9503 5.27156C14.9559 5.26406 14.9597 5.2575 14.9662 5.25L18.7781 10.5H5.22094L9.03187 5.25ZM16.875 13.5C16.0449 13.5002 15.2441 13.8062 14.6254 14.3596C14.0068 14.9131 13.6138 15.6751 13.5216 16.5H10.4784C10.386 15.6758 9.99334 14.9146 9.37539 14.3614C8.75745 13.8083 7.95748 13.5021 7.12815 13.5012C6.29882 13.5003 5.49819 13.8048 4.87904 14.3565C4.25989 14.9083 3.86557 15.6687 3.77133 16.4927C3.67709 17.3166 3.88953 18.1465 4.3681 18.8238C4.84667 19.5011 5.55788 19.9785 6.36599 20.1649C7.17411 20.3512 8.02256 20.2336 8.74944 19.8343C9.47632 19.435 10.0307 18.782 10.3069 18H13.6931C13.8994 18.5834 14.262 19.0988 14.7414 19.49C15.2209 19.8811 15.7986 20.133 16.4115 20.218C17.0243 20.303 17.6488 20.2179 18.2166 19.972C18.7843 19.726 19.2736 19.3287 19.6308 18.8235C19.988 18.3183 20.1995 17.7246 20.2421 17.1073C20.2847 16.49 20.1568 15.8729 19.8723 15.3234C19.5879 14.774 19.1578 14.3132 18.6292 13.9916C18.1006 13.6701 17.4938 13.5 16.875 13.5ZM7.125 18.75C6.75416 18.75 6.39165 18.64 6.08331 18.434C5.77496 18.228 5.53464 17.9351 5.39273 17.5925C5.25081 17.2499 5.21368 16.8729 5.28603 16.5092C5.35837 16.1455 5.53695 15.8114 5.79917 15.5492C6.0614 15.287 6.39549 15.1084 6.75921 15.036C7.12292 14.9637 7.49992 15.0008 7.84253 15.1427C8.18514 15.2846 8.47798 15.525 8.68401 15.8333C8.89003 16.1416 9 16.5042 9 16.875C9 17.1212 8.9515 17.365 8.85727 17.5925C8.76305 17.82 8.62494 18.0267 8.45083 18.2008C8.27672 18.3749 8.07002 18.513 7.84253 18.6073C7.61505 18.7015 7.37123 18.75 7.125 18.75ZM16.875 18.75C16.5042 18.75 16.1416 18.64 15.8333 18.434C15.525 18.228 15.2846 17.9351 15.1427 17.5925C15.0008 17.2499 14.9637 16.8729 15.036 16.5092C15.1084 16.1455 15.287 15.8114 15.5492 15.5492C15.8114 15.287 16.1455 15.1084 16.5092 15.036C16.8729 14.9637 17.2499 15.0008 17.5925 15.1427C17.9351 15.2846 18.228 15.525 18.434 15.8333C18.64 16.1416 18.75 16.5042 18.75 16.875C18.75 17.3723 18.5525 17.8492 18.2008 18.2008C17.8492 18.5525 17.3723 18.75 16.875 18.75Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M24 11.25C24 11.4489 23.921 11.6397 23.7803 11.7803C23.6397 11.921 23.4489 12 23.25 12H0.75C0.551088 12 0.360322 11.921 0.21967 11.7803C0.0790176 11.6397 0 11.4489 0 11.25C0 11.0511 0.0790176 10.8603 0.21967 10.7197C0.360322 10.579 0.551088 10.5 0.75 10.5H3.3675L7.82062 4.36781C7.95557 4.18253 8.13118 4.03065 8.33397 3.92381C8.53676 3.81698 8.76134 3.75804 8.99046 3.75152C9.21958 3.745 9.44714 3.79108 9.65568 3.88621C9.86422 3.98135 10.0482 4.12301 10.1934 4.30031L11.3981 5.69719L11.4169 5.71875C11.4867 5.80644 11.5754 5.87726 11.6763 5.92594C11.7773 5.97461 11.8879 5.99989 12 5.99989C12.1121 5.99989 12.2227 5.97461 12.3237 5.92594C12.4246 5.87726 12.5133 5.80644 12.5831 5.71875L12.6019 5.69719L13.8066 4.30031C13.9518 4.12301 14.1358 3.98135 14.3443 3.88621C14.5529 3.79108 14.7804 3.745 15.0095 3.75152C15.2387 3.75804 15.4632 3.81698 15.666 3.92381C15.8688 4.03065 16.0444 4.18253 16.1794 4.36781L20.6325 10.5H23.25C23.4489 10.5 23.6397 10.579 23.7803 10.7197C23.921 10.8603 24 11.0511 24 11.25ZM16.875 13.5C16.0449 13.5002 15.2441 13.8062 14.6254 14.3596C14.0068 14.9131 13.6138 15.6751 13.5216 16.5H10.4784C10.386 15.6758 9.99334 14.9146 9.37539 14.3614C8.75745 13.8083 7.95748 13.5021 7.12815 13.5012C6.29882 13.5003 5.49819 13.8048 4.87904 14.3565C4.25989 14.9083 3.86557 15.6687 3.77133 16.4927C3.67709 17.3166 3.88953 18.1465 4.3681 18.8238C4.84667 19.5011 5.55788 19.9785 6.36599 20.1649C7.17411 20.3512 8.02256 20.2336 8.74944 19.8343C9.47632 19.435 10.0307 18.782 10.3069 18H13.6931C13.8994 18.5834 14.262 19.0988 14.7414 19.49C15.2209 19.8811 15.7986 20.133 16.4115 20.218C17.0243 20.303 17.6488 20.2179 18.2166 19.972C18.7843 19.726 19.2736 19.3287 19.6308 18.8235C19.988 18.3183 20.1995 17.7246 20.2421 17.1073C20.2847 16.49 20.1568 15.8729 19.8723 15.3234C19.5879 14.774 19.1578 14.3132 18.6292 13.9916C18.1006 13.6701 17.4938 13.5 16.875 13.5Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Validate",
                    description: "Run usability tests; iterate quickly on signal, not noise."
                  },
                  {
                    iconColor: '#f472b6', // pink
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.1625 6.62346L12.2062 3.77909C12.1049 3.75003 11.9985 3.74268 11.8941 3.75753L2.03812 5.16565C1.68127 5.21814 1.35506 5.39683 1.11871 5.6693C0.882364 5.94178 0.751544 6.28996 0.75 6.65065V17.3494C0.751544 17.7101 0.882364 18.0583 1.11871 18.3307C1.35506 18.6032 1.68127 18.7819 2.03812 18.8344L11.8941 20.2406C11.9291 20.2461 11.9645 20.2493 12 20.25C12.0698 20.2502 12.1392 20.2404 12.2062 20.221L22.1625 17.3766C22.4748 17.2862 22.7494 17.0972 22.9454 16.8378C23.1414 16.5784 23.2483 16.2626 23.25 15.9375V8.06253C23.2483 7.73743 23.1414 7.42163 22.9454 7.16226C22.7494 6.90289 22.4748 6.71389 22.1625 6.62346ZM9 11.25H7.5V5.90065L11.25 5.3644V18.6357L7.5 18.0994V12.75H9C9.19891 12.75 9.38968 12.671 9.53033 12.5304C9.67098 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.67098 11.6103 9.53033 11.4697C9.38968 11.329 9.19891 11.25 9 11.25ZM2.25 6.65065L6 6.1144V11.25H4.5C4.30109 11.25 4.11032 11.329 3.96967 11.4697C3.82902 11.6103 3.75 11.8011 3.75 12C3.75 12.1989 3.82902 12.3897 3.96967 12.5304C4.11032 12.671 4.30109 12.75 4.5 12.75H6V17.8857L2.25 17.3494V6.65065ZM12.75 18.5053V5.49471L21.75 8.06253V15.9375L12.75 18.5053Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.1625 6.62346L12.2062 3.77909C12.1049 3.75003 11.9985 3.74268 11.8941 3.75753L2.03812 5.16565C1.68127 5.21814 1.35506 5.39683 1.11871 5.6693C0.882364 5.94178 0.751544 6.28996 0.75 6.65065V17.3494C0.751544 17.7101 0.882364 18.0583 1.11871 18.3307C1.35506 18.6032 1.68127 18.7819 2.03812 18.8344L11.8941 20.2406C11.9291 20.2461 11.9645 20.2493 12 20.25C12.0698 20.2502 12.1392 20.2404 12.2062 20.221L22.1625 17.3766C22.4748 17.2862 22.7494 17.0972 22.9454 16.8378C23.1414 16.5784 23.2483 16.2626 23.25 15.9375V8.06253C23.2483 7.73743 23.1414 7.42163 22.9454 7.16226C22.7494 6.90289 22.4748 6.71389 22.1625 6.62346ZM6 11.25H4.5C4.30109 11.25 4.11032 11.329 3.96967 11.4697C3.82902 11.6103 3.75 11.8011 3.75 12C3.75 12.1989 3.82902 12.3897 3.96967 12.5304C4.11032 12.671 4.30109 12.75 4.5 12.75H6V17.8857L2.25 17.3494V6.65065L6 6.1144V11.25ZM11.25 18.6357L7.5 18.0994V12.75H9C9.19891 12.75 9.38968 12.671 9.53033 12.5304C9.67098 12.3897 9.75 12.1989 9.75 12C9.75 11.8011 9.67098 11.6103 9.53033 11.4697C9.38968 11.329 9.19891 11.25 9 11.25H7.5V5.90065L11.25 5.3644V18.6357Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Ship",
                    description: "Partner with engineering to deliver accessible, performant UI."
                  },
                  {
                    iconColor: '#22c55e', // green
                    iconLine: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0612 6.87846L17.1216 1.93971C16.9823 1.80038 16.8169 1.68986 16.6349 1.61446C16.4529 1.53905 16.2578 1.50024 16.0608 1.50024C15.8638 1.50024 15.6687 1.53905 15.4867 1.61446C15.3047 1.68986 15.1393 1.80038 15 1.93971L1.93874 15C1.79942 15.1393 1.6889 15.3047 1.6135 15.4867C1.53809 15.6687 1.49928 15.8638 1.49928 16.0608C1.49928 16.2578 1.53809 16.4529 1.6135 16.6349C1.6889 16.8169 1.79942 16.9823 1.93874 17.1216L6.87843 22.0603C7.01772 22.1997 7.1831 22.3102 7.36511 22.3856C7.54712 22.461 7.7422 22.4998 7.93921 22.4998C8.13622 22.4998 8.33131 22.461 8.51332 22.3856C8.69533 22.3102 8.8607 22.1997 8.99999 22.0603L22.0612 9.00002C22.2006 8.86073 22.3111 8.69535 22.3865 8.51334C22.4619 8.33133 22.5007 8.13625 22.5007 7.93924C22.5007 7.74222 22.4619 7.54714 22.3865 7.36513C22.3111 7.18312 22.2006 7.01775 22.0612 6.87846ZM7.93874 21L2.99999 16.0603L5.99999 13.0603L8.46937 15.5306C8.53905 15.6003 8.62178 15.6556 8.71282 15.6933C8.80387 15.731 8.90145 15.7504 8.99999 15.7504C9.09854 15.7504 9.19612 15.731 9.28717 15.6933C9.37821 15.6556 9.46094 15.6003 9.53062 15.5306C9.6003 15.461 9.65558 15.3782 9.69329 15.2872C9.731 15.1961 9.75041 15.0986 9.75041 15C9.75041 14.9015 9.731 14.8039 9.69329 14.7128C9.65558 14.6218 9.6003 14.5391 9.53062 14.4694L7.06031 12L8.99999 10.0603L11.4694 12.5306C11.6101 12.6714 11.801 12.7504 12 12.7504C12.199 12.7504 12.3899 12.6714 12.5306 12.5306C12.6714 12.3899 12.7504 12.199 12.7504 12C12.7504 11.801 12.6714 11.6101 12.5306 11.4694L10.0603 9.00002L12 7.06033L14.4694 9.53064C14.5391 9.60033 14.6218 9.6556 14.7128 9.69331C14.8039 9.73102 14.9014 9.75043 15 9.75043C15.0985 9.75043 15.1961 9.73102 15.2872 9.69331C15.3782 9.6556 15.4609 9.60033 15.5306 9.53064C15.6003 9.46096 15.6556 9.37823 15.6933 9.28719C15.731 9.19614 15.7504 9.09856 15.7504 9.00002C15.7504 8.90147 15.731 8.80389 15.6933 8.71285C15.6556 8.6218 15.6003 8.53907 15.5306 8.46939L13.0603 6.00002L16.0603 3.00002L21 7.93971L7.93874 21Z" fill="currentColor"/>
                      </svg>
                    ),
                    iconFill: (
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M22.0612 9.00002L8.99999 22.0603C8.8607 22.1997 8.69533 22.3102 8.51332 22.3856C8.33131 22.461 8.13622 22.4998 7.93921 22.4998C7.7422 22.4998 7.54712 22.461 7.36511 22.3856C7.1831 22.3102 7.01772 22.1997 6.87843 22.0603L1.93874 17.1216C1.79942 16.9823 1.6889 16.8169 1.6135 16.6349C1.53809 16.4529 1.49928 16.2578 1.49928 16.0608C1.49928 15.8638 1.53809 15.6687 1.6135 15.4867C1.6889 15.3047 1.79942 15.1393 1.93874 15L4.67343 12.2653C4.70826 12.2305 4.74962 12.2028 4.79514 12.1839C4.84067 12.1651 4.88946 12.1553 4.93874 12.1553C4.98802 12.1553 5.03682 12.1651 5.08235 12.1839C5.12787 12.2028 5.16923 12.2305 5.20406 12.2653L8.46937 15.5306C8.54229 15.6035 8.62944 15.6606 8.72539 15.6983C8.82135 15.7359 8.92404 15.7534 9.02706 15.7496C9.13008 15.7459 9.23121 15.7209 9.32414 15.6763C9.41707 15.6316 9.49981 15.5684 9.56718 15.4903C9.69035 15.3417 9.75297 15.1522 9.74255 14.9595C9.73212 14.7668 9.64941 14.5851 9.51093 14.4506L6.26437 11.2041C6.19424 11.1338 6.15485 11.0385 6.15485 10.9392C6.15485 10.8399 6.19424 10.7447 6.26437 10.6744L7.67062 9.26814C7.70545 9.23328 7.74681 9.20562 7.79233 9.18674C7.83785 9.16787 7.88665 9.15816 7.93593 9.15816C7.98521 9.15816 8.03401 9.16787 8.07953 9.18674C8.12506 9.20562 8.16642 9.23328 8.20124 9.26814L11.4666 12.5335C11.5395 12.6063 11.6266 12.6634 11.7226 12.7011C11.8185 12.7387 11.9212 12.7562 12.0242 12.7525C12.1273 12.7487 12.2284 12.7237 12.3213 12.6791C12.4143 12.6345 12.497 12.5712 12.5644 12.4931C12.6875 12.3446 12.7502 12.155 12.7397 11.9623C12.7293 11.7696 12.6466 11.5879 12.5081 11.4535L9.26531 8.20408C9.19518 8.13378 9.15579 8.03853 9.15579 7.93924C9.15579 7.83994 9.19518 7.74469 9.26531 7.67439L10.6716 6.26814C10.7419 6.19801 10.8371 6.15863 10.9364 6.15863C11.0357 6.15863 11.1309 6.19801 11.2012 6.26814L14.4666 9.53346C14.5395 9.60648 14.6267 9.66366 14.7227 9.70143C14.8188 9.7392 14.9216 9.75674 15.0247 9.75296C15.1279 9.74918 15.2291 9.72415 15.3221 9.67944C15.4151 9.63474 15.4979 9.57131 15.5653 9.49314C15.6884 9.34445 15.7508 9.15482 15.7402 8.96211C15.7296 8.76939 15.6467 8.58776 15.5081 8.45345L12.2653 5.20408C12.1952 5.13378 12.1558 5.03854 12.1558 4.93924C12.1558 4.83994 12.1952 4.74469 12.2653 4.67439L15 1.93971C15.1393 1.80038 15.3047 1.68986 15.4867 1.61446C15.6687 1.53905 15.8638 1.50024 16.0608 1.50024C16.2578 1.50024 16.4529 1.53905 16.6349 1.61446C16.8169 1.68986 16.9823 1.80038 17.1216 1.93971L22.0612 6.87846C22.2006 7.01775 22.3111 7.18312 22.3865 7.36513C22.4619 7.54714 22.5007 7.74222 22.5007 7.93924C22.5007 8.13625 22.4619 8.33133 22.3865 8.51334C22.3111 8.69535 22.2006 8.86073 22.0612 9.00002Z" fill="currentColor"/>
                      </svg>
                    ),
                    title: "Measure",
                    description: "Track activation, conversion, and task success; refine post-launch."
                  }
                ]

                return (
                  <div key={contentId} id={`content-${contentId}`} className="content-block">
                    <div className="working-style-content">
                      <h2 className="content-title">
                        <span
                          className="reveal-text"
                          style={{
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          My Design Approach
                        </span>
                      </h2>
                      <p 
                        className="how-i-work-intro"
                        style={{
                          '--reveal-progress': `${contentReveal >= 55 ? Math.min(100, ((contentReveal - 55) / (100 - 55)) * 100) : 0}%`
                        } as React.CSSProperties}
                      >
                        A super IC founding/solo designer owning product discovery, rapid prototyping, and delivery, tracing business outcomes back to early problem framing, first-principles decisions, and validation loops.
                      </p>
                      <div className="how-i-work-list">
                        {howIWorkSteps.map((step, index) => {
                          const stepStartPoint = 50 + (index * 5)
                          const stepProgress = contentReveal >= stepStartPoint
                            ? Math.min(100, ((contentReveal - stepStartPoint) / (100 - stepStartPoint)) * 100)
                            : 0
                          const finalStepProgress = contentReveal >= 100 && stepProgress > 0 ? 100 : stepProgress

                          return (
                            <div
                              key={index}
                              className="how-i-work-item"
                              style={{
                                '--reveal-progress': `${finalStepProgress}%`
                              } as React.CSSProperties}
                              onMouseEnter={() => setHoveredHowIWorkStep(index)}
                              onMouseLeave={() => setHoveredHowIWorkStep(null)}
                            >
                              <div 
                                className="how-i-work-icon"
                                style={{
                                  backgroundColor: hoveredHowIWorkStep === index ? (step as any).iconColor : 'transparent',
                                  color: '#ffffff'
                                } as React.CSSProperties}
                              >
                                {hoveredHowIWorkStep === index && (step as any).iconFill
                                  ? (step as any).iconFill
                                  : step.iconLine}
                              </div>
                              <div className="how-i-work-text">
                                <span className="how-i-work-title">{step.title}</span>
                                <span className="how-i-work-description">{step.description}</span>
                              </div>
                            </div>
                          )
                        })}
                      </div>

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
                              {'icon' in trait && (trait as any).icon && (
                                <div className="working-style-icon">
                                  {(trait as any).icon}
                                </div>
                              )}
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
                  <div key={contentId} id={`content-${contentId}`} className="content-block">
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

              if (contentId === 'impact') {
                return (
                  <div key={contentId} id={`content-${contentId}`} className="content-block">
                    <div className="impact-content">
                      <h2 className="content-title">
                        <span 
                          className="reveal-text"
                          style={{ 
                            '--reveal-progress': `${contentReveal}%`
                          } as React.CSSProperties}
                        >
                          My Impact
                        </span>
                      </h2>
                      <div className="testimonial-carousel">
                        <div className="testimonial-cards-wrapper">
                          <button
                            className="carousel-button prev"
                            onClick={() => setCurrentTestimonialIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))}
                            aria-label="Previous testimonial"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M10 12L6 8L10 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                          {testimonials.map((testimonial, index) => (
                            <div
                              key={index}
                              className={`testimonial-card ${index === currentTestimonialIndex ? 'active' : ''}`}
                              style={{
                                '--reveal-progress': `${contentReveal}%`
                              } as React.CSSProperties}
                            >
                              <p className="testimonial-text">"{testimonial.text}"</p>
                              <p className="testimonial-author">— {testimonial.author}</p>
                            </div>
                          ))}
                          <button
                            className="carousel-button next"
                            onClick={() => setCurrentTestimonialIndex((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))}
                            aria-label="Next testimonial"
                          >
                            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M6 4L10 8L6 12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </button>
                        </div>
                        <div className="carousel-indicators">
                          {testimonials.map((_, index) => (
                            <button
                              key={index}
                              className={`carousel-indicator ${index === currentTestimonialIndex ? 'active' : ''}`}
                              onClick={() => setCurrentTestimonialIndex(index)}
                              aria-label={`Go to testimonial ${index + 1}`}
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                )
              }
              
              return null
            })}
        {isLoading && activeContent.length === 0 && (
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
        <div className={`suggested-actions ${isDescComplete && clickedActions.length === 0 ? 'visible' : 'hidden'}`}>
          <div className="actions-list">
            {suggestedActions.map((action) => {
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
                        onMouseEnter={() => setHoveredAction(action.id)}
                        onMouseLeave={() => setHoveredAction(null)}
                      >
                        <span className="action-icon">
                          {(hoveredAction === action.id && 'iconFill' in action && (action as any).iconFill) 
                            ? (action as any).iconFill 
                            : action.icon}
                        </span>
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
                      onMouseEnter={() => setHoveredAction(action.id)}
                      onMouseLeave={() => setHoveredAction(null)}
                    >
                      <span className="action-icon">
                        {(hoveredAction === action.id && 'iconFill' in action && action.iconFill) 
                          ? action.iconFill 
                          : action.icon}
                      </span>
                      <span className="action-text">{action.text}</span>
                      <span className="action-arrow">→</span>
                    </button>
                  )
                })}
          </div>
        </div>
        {clickedActions.length > 0 && availableActions.length > 0 && activeContent.length > 0 && !isLoading && (
          <div className="suggested-actions-bottom">
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
                        onMouseEnter={() => setHoveredAction(action.id)}
                        onMouseLeave={() => setHoveredAction(null)}
                        style={{ 
                          '--reveal-progress': `${bottomButtonReveals[index] || 0}%`
                        } as React.CSSProperties}
                      >
                        <span className="action-icon">
                          {(hoveredAction === action.id && 'iconFill' in action && (action as any).iconFill) 
                            ? (action as any).iconFill 
                            : action.icon}
                        </span>
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
                      onMouseEnter={() => setHoveredAction(action.id)}
                      onMouseLeave={() => setHoveredAction(null)}
                      style={{ 
                        '--reveal-progress': `${bottomButtonReveals[index] || 0}%`
                      } as React.CSSProperties}
                    >
                      <span className="action-icon">
                        {(hoveredAction === action.id && 'iconFill' in action && action.iconFill) 
                          ? action.iconFill 
                          : action.icon}
                      </span>
                      <span className="action-text">{action.text}</span>
                      <span className="action-arrow">→</span>
                    </button>
                  )
                })}
              </div>
          </div>
        )}
      </div>
      </div>
  )
}

export default App
