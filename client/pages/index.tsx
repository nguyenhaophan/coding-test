import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'

import { getProfile } from '../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import LogoutBtn from '../components/Button/LogoutBtn'
import { Data } from '../types/data'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<Data>()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile())
    } else router.push('/login')

    async function getData() {
      try {
        const res = await axios.get('data/db.json')

        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [dispatch, isAuthenticated, router])

  return (
    <>
      <div>Welcome {user?.username}</div>
      <LogoutBtn />
    </>
  )
}

export default Home
