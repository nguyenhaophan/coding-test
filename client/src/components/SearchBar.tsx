import { SyntheticEvent } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

import { Data, Resource } from '../types/data'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { addRes } from '../redux/features/resSlice'
import MyTable from './Table/MyTable'
import { Controller, useForm } from 'react-hook-form'
import { Button } from '@mui/material'

type SearchBarProps = {
  data: Data
}

type FormData = {
  calculation: Resource[]
}

export default function SearchBar({ data }: SearchBarProps) {
  const dispatch = useAppDispatch()
  const { chosenRes } = useAppSelector((state) => state.res)

  console.log(chosenRes)
  function handleOnChange(event: SyntheticEvent, newValue: Resource | null) {
    event.preventDefault()

    if (newValue) {
      dispatch(addRes(newValue))
    }
  }

  const { control, handleSubmit } = useForm<FormData>({
    defaultValues: {
      calculation: [],
    },
  })

  function onSubmit(data: FormData) {
    console.log(data)
  }

  return (
    <Stack alignItems="center">
      {/* <form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          control={control}
          name="calculation"
          render={({ field: { onChange } }) => (
            <Autocomplete
              // value={null}
              // multiple
              id="combo-box"
              options={data.resources}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => {
                if (data) {
                  onChange(data)
                  console.log(data)
                  dispatch(addRes(data))
                }
              }}
              sx={{ width: 300 }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Start typing or click the bar"
                  size="small"
                />
              )}
            />
          )}
        /> */}
      <Autocomplete
        value={null}
        id="combo-box"
        options={data.resources}
        getOptionLabel={(option) => option.name}
        onChange={handleOnChange}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Start typing or click the bar"
            size="small"
          />
        )}
      />
      <MyTable chosenRes={chosenRes} />
      {/* <Button type="submit" variant="contained" color="success">
          Calculate
        </Button>
      </form> */}
    </Stack>
  )
}
