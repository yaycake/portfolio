import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [titleReveal, setTitleReveal] = useState(0)
  const [descReveal, setDescReveal] = useState(0)
  const [buttonReveals, setButtonReveals] = useState([0, 0, 0, 0])
  const [isTitleComplete, setIsTitleComplete] = useState(false)
  const [isDescComplete, setIsDescComplete] = useState(false)
  const [activeContent, setActiveContent] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [contentReveals, setContentReveals] = useState<Record<string, number>>({})
  const [clickedActions, setClickedActions] = useState<string[]>([])
  const [bottomButtonReveals, setBottomButtonReveals] = useState<number[]>([])
  const [selectedExperience, setSelectedExperience] = useState<number | null>(null)

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
      duration: "2+ years"
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
      company: "Viewabo",
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
      company: "Skyrock",
      duration: "1.5 + years"
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
      company: "Freelance",
      duration: "10 + years"
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
      text: "Understand what kind of designer I am"
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
    setBottomButtonReveals([])
    
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
    // Cascade the buttons after description is complete
    if (!isDescComplete) return

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
  }, [isDescComplete])

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
        setSelectedExperience(null)
      }
    }
    window.addEventListener('keydown', handleEsc)
    return () => window.removeEventListener('keydown', handleEsc)
  }, [selectedExperience])

  return (
    <div className="landing-page">
      {selectedExperience !== null && (
        <div className="experience-overlay" onClick={() => setSelectedExperience(null)}>
          <div className="overlay-content" onClick={(e) => e.stopPropagation()}>
            <div className="overlay-navigation">
              <button 
                className="nav-link nav-back"
                onClick={() => setSelectedExperience(null)}
              >
                Close
              </button>
              <div className="nav-group">
                <button 
                  className="nav-link"
                  onClick={() => {
                    const prevIndex = selectedExperience > 0 ? selectedExperience - 1 : experiences.length - 1
                    setSelectedExperience(prevIndex)
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
                    setSelectedExperience(nextIndex)
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
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[0].iconColor }}
                    >
                      {experiences[0].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[0].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[0].company}</span>
                    <span className="overlay-duration">{experiences[0].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[0].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Zero-to-one design lead for an AI-driven patent platform. I owned the loop: customer discovery → rapid prototyping → ship. Designed role-based, multi-stakeholder workflows; set patterns and decision gates; used generative AI to cut time-to-insight. My focus: keep complexity from becoming clutter—and make the hard parts feel obvious.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Patent teams work across fragmented tools—legacy databases, spreadsheets, PDFs, and email—creating slow, expensive, and inconsistent workflows. Prior art search, claim mapping, and comparative analysis are manual and duplicative, with low reuse of knowledge. The result: long cycle times, high cost per search, uneven quality across teams, and limited confidence in decisions.</p>
                </div>

                <div className="overlay-section">
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
                <div className="overlay-header">
                  <div className="overlay-header-left">
                    <div 
                      className="overlay-icon" 
                      style={{ backgroundColor: experiences[1].iconColor }}
                    >
                      {experiences[1].icon}
                    </div>
                    <h1 className="overlay-title">{experiences[1].role}</h1>
                  </div>
                  <div className="overlay-header-right">
                    <span className="overlay-company">@{experiences[1].company}</span>
                    <span className="overlay-duration">{experiences[1].duration}</span>
                  </div>
                </div>
                <p className="overlay-description">{experiences[1].description}</p>
                
                <div className="overlay-section">
                  <h2 className="overlay-section-title">Role & Scope</h2>
                  <p>Led end-to-end design for a real-time visual support platform and Zendesk integration. Shaped product strategy, defined the service blueprint, and built fast, reliable workflows for high-pressure support contexts. Partnered with engineering on WebRTC constraints, privacy-by-design guardrails, and low-bandwidth resiliency; collaborated with Sales/CS to align UX to measurable outcomes (resolution time, truck rolls, CSAT). Focus: turn messy field issues into clear, actionable evidence with minimal effort for non-technical users.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Problem</h2>
                  <p>Most support happens blind: text/email tickets, screenshots, and long back-and-forths. Agents can't see the issue, customers can't describe it, and resolution requires escalations or on-site visits. This drives slow ticket resolution, high operational cost, and frustrated customers—especially in hardware, home services, and field operations where context matters most.</p>
                </div>

                <div className="overlay-section">
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
                </div>

                <div className="overlay-section">
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
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Solution</h2>
                  <p>A streamlined, consent-forward visual support flow: agents send a secure link; customers join without installing an app, pass device checks, and share live video. The UI guides capture with overlays and prompts; agents annotate in real time, attach notes and parts, and generate a post-call summary. All artifacts land in a searchable case timeline that standardizes handoffs and accelerates repeat issues.</p>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Learnings</h2>
                  <ul className="overlay-list">
                    <li>Reliability beats bells and whistles: reconnect logic and guidance matter more than fancy tools.</li>
                    <li>Consent is UX: clear status, control over what's shared, and easy exits increase trust.</li>
                    <li>Design for constraints: glare, noise, shaky hands; the interface must compensate.</li>
                    <li>Structured evidence unlocks scale: standardized artifacts improve routing, QA, and training.</li>
                  </ul>
                </div>

                <div className="overlay-section">
                  <h2 className="overlay-section-title">Outcomes</h2>
                  <ul className="overlay-list">
                    <li>"Viewabo is a great product to interact with customers. I would say it's a positive experience and makes my life and the customer's lives easier...I am able to directly see what the customer is seeing and can help better navigate through troubleshooting steps. Sometimes it is very hard to explain something clearly just using words, so having a way to view the eyes through the customer has been very helpful."</li>
                    <li>"Overall, it takes out the guesswork on trying to figure out that the customer is trying to explain to us. We can literally see what there seeing in Realtime and not have to wait for emails to come in with pictures."</li>
                    <li>"Has helped many inexperienced customer locate components and troubleshoot their PCs"</li>
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
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
                              onClick={() => setSelectedExperience(index)}
                            >
                              <div 
                                className={`experience-icon ${ensureComplete(iconProgress) >= 100 ? 'fully-revealed' : ''}`}
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
          </div>
        )}
        {clickedActions.length > 0 && availableActions.length > 0 && activeContent.length > 0 && !isLoading && (
          <div className="suggested-actions-bottom">
            <div className="actions-list">
                {availableActions.map((action, index) => {
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
          </div>
        )}
      </div>
      </div>
  )
}

export default App
