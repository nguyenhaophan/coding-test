import { Stack } from '@mui/material'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import { instance } from '../axios/instance'
import { request } from '../axios/requests'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { getProfile } from '../redux/features/authSlice'
import SearchBar from '../components/SearchBar'
import LogoutBtn from '../components/Button/LogoutBtn'
import { Data } from '../types/data'

export default function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<Data>()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile())
    } else navigate('/login')

    async function getData() {
      try {
        const res = await instance.get(request('store', 'all'))

        setData(res.data)
      } catch (error) {
        console.log(error)
      }
    }

    getData()
  }, [dispatch, isAuthenticated, navigate])

  return (
    <Stack gap={2}>
      <Stack
        direction="row"
        gap={2}
        justifyContent="center"
        alignItems="center"
        p="50px 0"
      >
        <div>Welcome {user?.username}</div>
        <LogoutBtn />
      </Stack>
      {data && <SearchBar data={data} />}
    </Stack>
  )
}
