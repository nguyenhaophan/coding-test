import type { NextPage } from 'next'
import { useEffect } from 'react'

import LoginForm from '../components/Form/LoginForm'
import { useAppDispatch } from '../hooks/hooks'
import { getProfile } from '../redux/features/authSlice'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getProfile())
  }, [dispatch])

  return (
    <>
      <div>Hello</div>
      <LoginForm />
    </>
  )
}

export default Home
