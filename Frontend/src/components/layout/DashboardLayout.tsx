
export function DashboardLayout({
  title,
  children
}: {
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-white p-4 sm:p-6 md:p-8">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6">
        {title}
      </h1>

      {children}
    </div>
  )
}

