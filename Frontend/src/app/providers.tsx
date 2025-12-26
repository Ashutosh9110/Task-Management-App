import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { AuthProvider } from "../context/AuthContext"
import { SocketProvider } from "../context/SocketContext"

const queryClient = new QueryClient()

export function AppProviders({ children }: { children: React.ReactNode }) {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <SocketProvider>
          {children}
        </SocketProvider>
      </AuthProvider>
    </QueryClientProvider>
  )
}
