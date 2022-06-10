import { Button, TextField, Typography } from '@mui/material'
import { Controller, useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from 'yup'

import { instance } from '../../axios/instance'
import { request } from '../../axios/requests'

type FormData = {
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
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm<FormData>({
    mode: 'onBlur',
    defaultValues: {
      username: '',
      password: '',
    },
    resolver: yupResolver(schema),
  })

  async function onSubmit(data: FormData) {
    try {
      const res = await instance.post(request('users', 'login'), {
        username: data.username,
        password: data.password,
      })
      // console.log(res.data)
    } catch (e) {
      const error = e as Error

      if (error.message.includes('username'))
        setError('username', { message: error.message })

      if (error.message.includes('password'))
        setError('password', { message: error.message })
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
        Submit
      </Button>
    </form>
  )
}
