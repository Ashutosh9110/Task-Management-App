import { Link } from "react-router-dom"
import { useState } from "react"
import { CheckCircle, Users, Clock, TrendingUp } from "lucide-react"

export default function Welcome() {
  const [hoveredCard, setHoveredCard] = useState<number | null>(null)

  const features = [
    {
      icon: <CheckCircle className="w-8 h-8" />,
      title: "Task Organization",
      description: "Create, categorize, and prioritize tasks with ease",
      color: "from-blue-500 to-cyan-500"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Team Collaboration",
      description: "Assign tasks and collaborate in real-time",
      color: "from-purple-500 to-pink-500"
    },
    {
      icon: <Clock className="w-8 h-8" />,
      title: "Deadline Tracking",
      description: "Never miss a deadline with smart notifications",
      color: "from-amber-500 to-orange-500"
    },
    {
      icon: <TrendingUp className="w-8 h-8" />,
      title: "Productivity Insights",
      description: "Track progress with detailed analytics",
      color: "from-green-500 to-emerald-500"
    }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
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

      <main className="container mx-auto px-4 py-12 md:py-24">
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
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/register"
                className="px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold hover:from-blue-700 hover:to-purple-700 transition-all transform hover:scale-105 cursor-pointer"
              >
                Start Free Trial
              </Link>
              <Link
                to="/login"
                className="px-8 py-4 rounded-lg border border-white/20 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition cursor-pointer"
              >
                Login to Dashboard
              </Link>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
            {features.map((feature, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl border border-white/10 bg-gradient-to-br from-gray-900/50 to-black/50 backdrop-blur-sm transition-all duration-300 cursor-pointer
                  ${hoveredCard === index ? 'transform -translate-y-2 border-white/20' : ''}`}
                onMouseEnter={() => setHoveredCard(index)}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div className={`w-14 h-14 rounded-lg bg-gradient-to-r ${feature.color} flex items-center justify-center mb-4`}>
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-400">{feature.description}</p>
              </div>
            ))}
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
  )
}