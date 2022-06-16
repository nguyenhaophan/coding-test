import { Button, Stack, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { Link } from 'react-router-dom'
import * as yup from 'yup'

import { loginSuccess } from '../../redux/features/authSlice'
import { useAppDispatch } from '../../hooks/hooks'
import { instance } from '../../axios/instance'
import { request } from '../../axios/requests'

type LoginFormData = {
  username: string
  password: string
}

const schema = yup
  .object({
    username: yup.string().required().min(4),
    password: yup.string().required(),
  })
  .required()

export default function LoginForm() {
  const dispatch = useAppDispatch()
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: LoginFormData) {
    try {
      const res = await instance.post(request('users', 'login'), {
        username: data.username,
        password: data.password,
      })

      if (res.status === 201) {
        const { user, access_token } = res.data

        localStorage.setItem('access_token', access_token)
        dispatch(loginSuccess(user))
      }
    } catch (error: any) {
      const message = error.response?.data.message

      if (message.includes('username'))
        setError('username', { message: message })
      if (message.includes('password'))
        setError('password', { message: message })
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
        <Button type="submit" variant="contained" color="success">
          Login
        </Button>
      </Stack>
      <Link to="/register" title="Sign up">
        <Typography>Sign up</Typography>
      </Link>
    </form>
  )
}
