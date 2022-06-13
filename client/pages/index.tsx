import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import axios from 'axios'
import { Button, Stack, Typography } from '@mui/material'

import { getProfile } from '../redux/features/authSlice'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import LogoutBtn from '../components/Button/LogoutBtn'
import { Data } from '../types/data'
import SearchBar from '../components/SearchBar'
import Link from 'next/link'

const Home: NextPage = () => {
  const dispatch = useAppDispatch()
  const router = useRouter()
  const { user, isAuthenticated } = useAppSelector((state) => state.auth)
  const [data, setData] = useState<Data>()

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getProfile())
    }

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

  return isAuthenticated ? (
    <Stack gap={2}>
      <Stack direction="row" gap={2}>
        <div>Welcome {user?.username}</div>
        <LogoutBtn />
      </Stack>
      {data && <SearchBar data={data} />}
    </Stack>
  ) : (
    <Stack m="auto" alignItems="center">
      <Typography>Please login first</Typography>
      <Link href="/login">
        <Button variant="contained" color="success">
          Home
        </Button>
      </Link>
    </Stack>
  )
}

export default Home
