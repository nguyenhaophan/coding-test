import { useRouter } from 'next/router'

import LoginForm from '../components/Form/LoginForm'
import { useAppSelector } from '../hooks/hooks'

export default function Login() {
  const router = useRouter()
  const { isAuthenticated } = useAppSelector((state) => state.auth)

  if (isAuthenticated) {
    router.push('/')
  }

  return <LoginForm />
}
