import { Button } from '@mui/material'
import React from 'react'

import { useAppDispatch } from '../../hooks/hooks'
import { logout } from '../../redux/features/authSlice'

export default function LogoutBtn() {
  const dispatch = useAppDispatch()

  function handleLogout() {
    dispatch(logout())
  }

  return (
    <Button
      type="submit"
      variant="contained"
      color="success"
      onClick={handleLogout}
    >
      Logout
    </Button>
  )
}
