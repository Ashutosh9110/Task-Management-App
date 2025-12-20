import { useState } from "react"
// import Navbar from "./Navbar"
// import Sidebar from "./Sidebar"

export function DashboardLayout({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white">
      <Navbar />

      <div className="flex pt-16 md:pt-20">
        {sidebarOpen && (
          <div
            className="fixed inset-0 bg-black/60 z-40 md:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        <aside
          className={`fixed z-50 top-0 left-0 h-full w-64 bg-black transform transition-transform
          md:relative md:translate-x-0
          ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}`}
        >
          <Sidebar />
        </aside>

        <main className="flex-1 p-4 sm:p-6 md:p-8">
          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden mb-4 px-4 py-2 border border-white/30 rounded-lg"
          >
            ☰ Menu
          </button>

          <h1 className="text-2xl sm:text-3xl font-bold mb-6">
            {title}
          </h1>

          {children}
        </main>
      </div>
    </div>
  )
}
