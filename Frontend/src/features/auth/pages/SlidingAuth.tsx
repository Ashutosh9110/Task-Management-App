import React, { useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useAuth } from "../../../hooks/useAuth"
import { Eye, EyeOff } from "lucide-react"
import "./SlidingAuth.css"

const loginSchema = z.object({
  email: z.string().email("Please enter a valid email"),
  password: z.string().min(1, "Password is required")
});

const registerSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email"),
  password: z.string()
    .min(8, "Password must be at least 8 characters")
    .regex(/[A-Z]/, "Must contain at least one uppercase letter")
    .regex(/[0-9]/, "Must contain at least one number")
})

type LoginForm = z.infer<typeof loginSchema>;
type RegisterForm = z.infer<typeof registerSchema>;

interface SlidingAuthProps {
  initialMode?: "signin" | "signup"
}

export default function SlidingAuth({ initialMode = "signin" }: SlidingAuthProps) {
  const [isSignUp, setIsSignUp] = useState(initialMode === "signup")
  const [signInVisible, setSignInVisible] = useState(initialMode !== "signup")
  const [signUpVisible, setSignUpVisible] = useState(initialMode === "signup")
  const [showPassword, setShowPassword] = useState(false)
  
  const { login, register: registerUser } = useAuth()
  const navigate = useNavigate()

  const { 
    register: registerLogin, 
    handleSubmit: handleLoginSubmit, 
    formState: { errors: loginErrors, isSubmitting: isLoginSubmitting },
    setError: setLoginError
  } = useForm<LoginForm>({ resolver: zodResolver(loginSchema) })

  const { 
    register: registerSignUp, 
    handleSubmit: handleSignUpSubmit, 
    formState: { errors: signUpErrors, isSubmitting: isSignUpSubmitting },
  } = useForm<RegisterForm>({ resolver: zodResolver(registerSchema) })

  useEffect(() => {
    setIsSignUp(initialMode === "signup")
    setSignInVisible(initialMode !== "signup")
    setSignUpVisible(initialMode === "signup")
  }, [initialMode])

  useEffect(() => {
    if (isSignUp) {
      const hideTimer = setTimeout(() => setSignInVisible(false), 700)
      const showTimer = setTimeout(() => setSignUpVisible(true), 200)
      return () => { clearTimeout(hideTimer); clearTimeout(showTimer); }
    } else {
      const hideTimer = setTimeout(() => setSignUpVisible(false), 700)
      const showTimer = setTimeout(() => setSignInVisible(true), 200)
      return () => { clearTimeout(hideTimer); clearTimeout(showTimer); }
    }
  }, [isSignUp])

  const handleToggle = (signUp: boolean) => {
    setIsSignUp(signUp)
    navigate(signUp ? "/register" : "/login", { replace: true })
  }

  const onLogin = async (data: LoginForm) => {
      try {
          await login(data.email, data.password)
          navigate("/app")
      } catch (err: any) {
          setLoginError("root", { message: err.message || "Invalid credentials" })
      }
  }

  const onRegister = async (data: RegisterForm) => {
      try {
          await registerUser(data.name, data.email, data.password)
          navigate("/app")
      } catch (err: any) {
           console.error("Registration failed:", err)
      }
  }

  const handleGithubLogin = () => {
    // @ts-ignore
    window.location.href = `${import.meta.env.VITE_API_URL}/auth/github`
  }

  const GitHubIcon = () => (
    <svg viewBox="0 0 24 24" className="w-6 h-6 fill-current">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  )

  return (
    <div className="min-h-screen bg-gray-900 flex items-center justify-center p-4">
      <div className="auth-container">
        <div className={`overlay ${isSignUp ? "open-sign-up" : "open-sign-in"}`}>
          <div className={`sign-in ${isSignUp ? "overlay-text-left-animation" : "overlay-text-left-animation-out"}`}>
            <h1>Welcome Back!</h1>
            <p>To keep connected with us please login with your personal info</p>
            <button 
              className="switch-button" 
              onClick={() => handleToggle(false)}
            >
              Sign In
            </button>
          </div>

          <div className={`sign-up ${isSignUp ? "overlay-text-right-animation-out" : "overlay-text-right-animation"}`}>
            <h1>Hello, Friend!</h1>
            <p>Enter your personal details and start a journey with us</p>
            <button 
              className="switch-button" 
              onClick={() => handleToggle(true)}
            >
              Sign Up
            </button>
          </div>
        </div>

        <div className="form">
          <div 
            className={`sign-in ${!isSignUp ? "form-right-slide-in" : "form-right-slide-out"}`}
            style={{ display: signInVisible ? 'flex' : 'none' }}
          >
            <h1>Sign In</h1>
            <div className="social-media-buttons">
              <div className="icon" title="Login with GitHub" onClick={handleGithubLogin}>
                <GitHubIcon />
              </div>
            </div>
            <p className="small">or use your email account:</p>
            
            <form className="flex flex-col items-center w-full" onSubmit={handleLoginSubmit(onLogin)}>
              <div className="w-full max-w-[260px]">
                  <input 
                    {...registerLogin("email")}
                    type="email" 
                    placeholder="Email" 
                  />
                  {loginErrors.email && <p className="text-xs text-red-400 mt-1 ml-2">{loginErrors.email.message}</p>}
              </div>
              <div className="w-full max-w-[260px] relative">
                  <input 
                    {...registerLogin("password")}
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  {loginErrors.password && <p className="text-xs text-red-400 mt-1 ml-2">{loginErrors.password.message}</p>}
              </div>
              {loginErrors.root && <p className="text-xs text-red-400 mt-2">{loginErrors.root.message}</p>}
              
              <p className="forgot-password mt-2">Forgot your password?</p>
              <button 
                type="submit" 
                className="control-button in"
                disabled={isLoginSubmitting}
              >
                {isLoginSubmitting ? "Signing In..." : "Sign In"}
              </button>
            </form>
          </div>

          <div 
            className={`sign-up ${isSignUp ? "form-left-slide-in" : "form-left-slide-out"}`}
            style={{ display: signUpVisible ? 'flex' : 'none' }}
          >
            <h1>Create Account</h1>
            <div className="social-media-buttons">
              <div className="icon" title="Sign up with GitHub" onClick={handleGithubLogin}>
                <GitHubIcon />
              </div>
            </div>
            <p className="small">or use your email for registration:</p>
            
            <form className="flex flex-col items-center w-full" onSubmit={handleSignUpSubmit(onRegister)}>
               <div className="w-full max-w-[260px]">
                  <input 
                    {...registerSignUp("name")}
                    type="text" 
                    placeholder="Name" 
                  />
                  {signUpErrors.name && <p className="text-xs text-red-400 mt-1 ml-2">{signUpErrors.name.message}</p>}
               </div>
               <div className="w-full max-w-[260px]">
                  <input 
                    {...registerSignUp("email")}
                    type="email" 
                    placeholder="Email" 
                  />
                  {signUpErrors.email && <p className="text-xs text-red-400 mt-1 ml-2">{signUpErrors.email.message}</p>}
               </div>
               <div className="w-full max-w-[260px] relative">
                  <input 
                    {...registerSignUp("password")}
                    type={showPassword ? "text" : "password"} 
                    placeholder="Password" 
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                  {signUpErrors.password && <p className="text-xs text-red-400 mt-1 ml-2">{signUpErrors.password.message}</p>}
               </div>

              <button 
                type="submit" 
                className="control-button up"
                disabled={isSignUpSubmitting}
              >
                 {isSignUpSubmitting ? "Signing Up..." : "Sign Up"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
