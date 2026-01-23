import React, { useState, useEffect, useCallback, useRef } from "react"
import "./TeamCarousel.css"

interface TeamMember {
  image: string
  name: string
  title: string
}

const TEAM_MEMBERS: TeamMember[] = [
    { image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d", name: "Anthony Lee", title: "Archetypal Professor of Recognition" },
    { image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2", name: "Alicia Chevalier", title: "Corporate Usability Analyst" },
    { image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e", name: "Nate Boucher", title: "Customer Impact Officer" },
    { image: "https://images.unsplash.com/photo-1614204424926-196a80bf0be8", name: "Leah Harris", title: "Designer and Bandit" },
    { image: "https://images.unsplash.com/photo-1536766768598-e09213fdcf22", name: "Angelina Laurent", title: "Oracle for Inspiration" },
    { image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330", name: "Gal Gadot", title: "Acting Designer and Consultant" },
    { image: "https://images.unsplash.com/photo-1590086782792-42dd2350140d", name: "Albert Sørensen", title: "Neural Big Shot of Anticipation" },
    { image: "https://images.unsplash.com/photo-1553514029-1318c9127859", name: "Candice Marchand", title: "Mindful Realist of Motion Laws" },
    { image: "https://images.unsplash.com/photo-1596813362035-3edcff0c2487", name: "Jennifer Salazar", title: "Design Habitué" },
    { image: "https://images.unsplash.com/photo-1552374196-c4e7ffc6e126", name: "Antonin Dufour", title: "Human-Centered Designer" },
    { image: "https://images.unsplash.com/photo-1530785602389-07594beb8b73", name: "Melissa Simon", title: "International Infrastructure Analyst" },
    { image: "https://images.unsplash.com/photo-1560250097-0b93528c311a", name: "Brandon Murray", title: "Central Functionality VP" }
]

export function TeamCarousel() {
  const [items, setItems] = useState(TEAM_MEMBERS)
  const [activeIndex, setActiveIndex] = useState(4) // Start with middle-ish item active
  
  const autoPlayRef = useRef<any>(null)

  const startAutoPlay = useCallback(() => {
    stopAutoPlay()
    autoPlayRef.current = setInterval(() => {
        handleNext()
    }, 4000) 
  }, [])

  const stopAutoPlay = useCallback(() => {
    if (autoPlayRef.current) {
        clearInterval(autoPlayRef.current)
        autoPlayRef.current = null
    }
  }, [])

  useEffect(() => {
    startAutoPlay()
    return () => stopAutoPlay()
  }, [startAutoPlay, stopAutoPlay])


  const moveFirstToLast = () => {
     setItems(prev => {
         const newItems = [...prev]
         const first = newItems.shift()
         if (first) newItems.push(first)
         return newItems
     })
  }

  const moveLastToFirst = () => {
    setItems(prev => {
        const newItems = [...prev]
        const last = newItems.pop()
        if (last) newItems.unshift(last)
        return newItems
    })
  }

  const handleNext = () => {
      moveFirstToLast()
  }

  const handlePrev = () => {
      moveLastToFirst()
  }

  const handleInteraction = (action: () => void) => {
      stopAutoPlay()
      action()
  }

  const handleItemClick = (index: number) => {
    stopAutoPlay()
    setActiveIndex(index)
  }

  return (
    <section className="carousel-section">
        <h2 className="section-title">Meet the team that makes it possible!!</h2>
        
        <div className="carousel">
            <ul className="carousel__list">
                {items.map((member, index) => (
                    <li 
                        key={`${member.name}-${index}`}
                        className="carousel__item"
                        data-active={index === activeIndex ? "true" : undefined}
                        onClick={() => handleItemClick(index)}
                        tabIndex={0}
                    >
                        <div className="carousel__box">
                            <div className="carousel__image">
                                <img 
                                    src={`${member.image}?fit=crop&h=720&q=80`} 
                                    width="480" 
                                    height="720" 
                                    alt={member.name}
                                    loading="lazy"
                                />
                            </div>
                            <div className="carousel__contents">
                                <h2 className="user__name">{member.name}</h2>
                                <h3 className="user__title">{member.title}</h3>
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
            <div className="carousel__nav">
                <button className="nav-button prev" onClick={() => handleInteraction(handlePrev)}>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M9.586 4l-6.586 6.586a2 2 0 0 0 0 2.828l6.586 6.586a2 2 0 0 0 2.18 .434l.145 -.068a2 2 0 0 0 1.089 -1.78v-2.586h7a2 2 0 0 0 2 -2v-4l-.005 -.15a2 2 0 0 0 -1.995 -1.85l-7 -.001v-2.585a2 2 0 0 0 -3.414 -1.414z"/>
                    </svg>
                    <span>prev</span>
                </button>
                <button className="nav-button next" onClick={() => handleInteraction(handleNext)}>
                    <span>next</span>
                    <svg width="24" height="24" viewBox="0 0 24 24">
                        <path d="M12.089 3.634a2 2 0 0 0 -1.089 1.78l-.001 2.586h-6.999a2 2 0 0 0 -2 2v4l.005 .15a2 2 0 0 0 1.995 1.85l6.999 -.001l.001 2.587a2 2 0 0 0 3.414 1.414l6.586 -6.586a2 2 0 0 0 0 -2.828l-6.586 -6.586a2 2 0 0 0 -2.18 -.434l-.145 .068z"/>
                    </svg>
                </button>
            </div>
        </div>
    </section>
  )
}
