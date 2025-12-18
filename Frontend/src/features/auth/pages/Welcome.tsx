import { Link } from "react-router-dom"

export default function Welcome() {
  return (
    <div className="relative h-screen w-full overflow-hidden">

      <video
        autoPlay
        muted
        loop
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source
          src="https://res.cloudinary.com/YOUR_CLOUD/video/upload/YOUR_VIDEO.mp4"
          type="video/mp4"
        />
      </video>


      <div className="absolute inset-0 bg-black/60" />
      <div className="relative z-10 h-full flex flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Task Management System
        </h1>
        <p className="text-lg text-gray-200 mb-8 max-w-xl">
          Organize tasks, collaborate with your team, and stay productive.
        </p>

        <div className="flex gap-4">
          <Link
            to="/login"
            className="px-6 py-3 rounded bg-white text-black font-medium hover:bg-gray-200"
          >
            Login
          </Link>

          <Link
            to="/register"
            className="px-6 py-3 rounded border border-white font-medium hover:bg-white hover:text-black"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
