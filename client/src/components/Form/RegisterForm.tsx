import { Button, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link, useNavigate } from 'react-router-dom'
import * as yup from 'yup'

import { instance } from '../../axios/instance'
import { request } from '../../axios/requests'
import { useAppDispatch } from '../../hooks/hooks'
import { loginSuccess } from '../../redux/features/authSlice'

type RegisterFormData = {
  username: string
  password: string
  email?: string
}

const schema = yup
  .object({
    username: yup.string().required().min(4),
    password: yup.string().required().min(4).max(30),
    email: yup.string().email().optional(),
  })
  .required()

export default function RegisterForm() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<RegisterFormData>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
      email: '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: RegisterFormData) {
    try {
      const res = await instance.post(request('users', 'register'), {
        username: data.username,
        password: data.password,
        email: data.email,
      })

      if (res.status === 201) {
        const { user, access_token } = res.data

        localStorage.setItem('access_token', access_token)
        dispatch(loginSuccess(user))
        navigate('/')
      }
    } catch (error: any) {
      const message = error.response?.data.message

      if (message.toLowerCase().includes('username')) {
        setError('username', { message: message })
      }
      if (message.toLowerCase().includes('email')) {
        setError('email', { message: message })
      }
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={1}>
        <Typography>Username</Typography>
        <Controller
          name="username"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.username)}
              helperText={errors.username?.message}
              // fullWidth
              size="small"
            />
          )}
        />
        <Typography>Password</Typography>
        <Controller
          name="password"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.password)}
              helperText={errors.password?.message}
              type="password"
              // fullWidth
              size="small"
            />
          )}
        />
        <Typography>{'Email: (optional)'}</Typography>
        <Controller
          name="email"
          control={control}
          render={({ field }) => (
            <TextField
              {...field}
              error={Boolean(errors.email)}
              helperText={errors.email?.message}
              type="email"
              // fullWidth
              size="small"
            />
          )}
        />
        <Button type="submit" variant="contained" color="success">
          Register
        </Button>
      </Stack>
      <Link to="/" title="Home">
        <Typography>Home</Typography>
      </Link>
    </form>
  )
}
