import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import LoginForm from '../components/Form/LoginForm'
import { useAppSelector } from '../hooks/hooks'

export default function Login() {
  const navigate = useNavigate()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/')
    }
  }, [isAuthenticated, navigate])

  return <LoginForm />
}
