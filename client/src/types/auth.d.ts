interface User {
  id: string
  username: string
  email: string
}

interface AuthContextProps {
  signup: (value: object) => Promise<void>
  sigIn: (value: object) => Promise<void>
  logOut: () => Promise<void>
  user: User | null
  isAuthenticated: boolean
  // errors: string[] | null
}
