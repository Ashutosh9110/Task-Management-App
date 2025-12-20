export function TaskSkeleton() {
  return (
    <div className="rounded-xl bg-white/10 backdrop-blur-xl p-4 animate-pulse">
      <div className="h-4 w-2/3 bg-white/20 rounded mb-3" />
      <div className="h-3 w-full bg-white/10 rounded mb-2" />
      <div className="h-3 w-5/6 bg-white/10 rounded mb-4" />
      <div className="flex justify-between">
        <div className="h-4 w-24 bg-white/10 rounded" />
        <div className="h-4 w-16 bg-white/10 rounded" />
      </div>
    </div>
  )
}
