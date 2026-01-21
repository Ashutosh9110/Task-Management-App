import { Link } from "react-router-dom"
import { useState, useEffect } from "react"
import { CheckCircle, Users, Clock, TrendingUp } from "lucide-react"
import { AnimatedButton } from "../components/AnimatedButton"
// @ts-ignore
import TubesCursor from 'threejs-components/build/cursors/tubes1.min.js'

export default function Welcome() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  useEffect(() => {
    const canvas = document.getElementById('canvas')
    if (!canvas) return

    const app = TubesCursor(canvas, {
      tubes: {
        colors: ["#f967fb", "#53bc28", "#6958d5"],
        lights: {
          intensity: 200,
          colors: ["#83f36e", "#fe8a2e", "#ff008a", "#60aed5"]
        }
      }
    })

    const handleClick = () => {
      const colors = randomColors(3)
      const lightsColors = randomColors(4)
      console.log(colors, lightsColors)
      app.tubes.setColors(colors)
      app.tubes.setLightsColors(lightsColors)
    }

    document.body.addEventListener('click', handleClick)

    return () => {
      document.body.removeEventListener('click', handleClick)
    }
  }, [])

  function randomColors (count: number) {
      return new Array(count)
          .fill(0)
          .map(() => "#" + Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0'))
  }



  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white relative overflow-hidden">
      <canvas id="canvas" className="absolute top-0 left-0 w-full h-full z-0" />
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <header className="container mx-auto px-4 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="text-xl font-bold">TaskFlow</span>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="px-4 py-2 text-sm font-medium text-gray-300 hover:text-white transition cursor-pointer"
              >
                Sign In
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 text-sm font-medium bg-white/10 hover:bg-white/20 backdrop-blur-sm rounded-lg border border-white/20 transition cursor-pointer"
              >
                Get Started
              </Link>
            </div>
          </div>
        </header>

        <main className="container mx-auto px-4 py-12 md:py-24 flex-grow">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-16">
              <h1 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-white via-gray-200 to-gray-400 bg-clip-text text-transparent">
                Streamline Your
                <span className="block">Task Management</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-2xl mx-auto mb-10">
                Organize tasks, collaborate with your team, and boost productivity 
                with our intuitive task management platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-8 justify-center mt-8">
                <AnimatedButton to="/register" hueRotate={270}>
                  Start Free Trial
                </AnimatedButton>
                <AnimatedButton to="/login" hueRotate={110}>
                  Login to Dashboard
                </AnimatedButton>
              </div>
            </div>

            <div className="text-center">
              <div className="inline-block p-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-pink-600/20 backdrop-blur-sm">
                <div className="px-8 py-6 rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/80 to-black/80">
                  <h2 className="text-2xl font-bold mb-3">Ready to get started?</h2>
                  <p className="text-gray-300 mb-6">
                    Join thousands of teams already using TaskFlow
                  </p>
                  <Link
                    to="/register"
                    className="px-6 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition cursor-pointer inline-flex items-center gap-2"
                  >
                    Create Free Account
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>

        <footer className="container mx-auto px-4 py-8 border-t border-white/10">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center gap-2 mb-4 md:mb-0">
              <div className="w-6 h-6 rounded bg-gradient-to-r from-blue-500 to-purple-500" />
              <span className="font-bold">TaskFlow</span>
            </div>
            <div className="text-gray-400 text-sm">
              © {new Date().getFullYear()} TaskFlow. All rights reserved.
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}











