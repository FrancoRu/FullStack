import { createContext, useEffect, useState } from 'react'
import { ProviderProps } from '../../types/types'
import { AxiosError } from 'axios'

interface ErrorContextProp {
  errors: string[] | null
  setError: (value: unknown) => void
}

export const ErrorContext = createContext<ErrorContextProp | undefined>(
  undefined
)

export const ErrorProvider: React.FC<ProviderProps> = ({ children }) => {
  const [errors, setErrors] = useState<string[] | null>(null)

  const setError = (error: unknown) => {
    if (error instanceof AxiosError && error.response) {
      setErrors(error.response.data.error)
    } else {
      console.error('Error: ', error)
    }
  }

  useEffect(() => {
    if (errors !== null) {
      const timer = setTimeout(() => {
        setErrors(null)
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  return (
    <ErrorContext.Provider value={{ errors, setError }}>
      {children}
    </ErrorContext.Provider>
  )
}
