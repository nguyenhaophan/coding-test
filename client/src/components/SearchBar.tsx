import { SyntheticEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { Button } from '@mui/material'
import cloneDeep from 'lodash/cloneDeep'

import { Data, Resource } from '../types/data'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { addRes } from '../redux/features/resSlice'
import MyTable from './Table/MyTable'

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
      // const cloned = cloneDeep(newValue)

      // console.log('clone new value', newValue)
      dispatch(addRes(newValue))
    }
  }

  // function onQuantityChange(resourceId: string, quantity: number) {
  //   chosenRes.forEach((elem) => {
  //     if (elem.resourceId === resourceId) {
  //       elem.quantity = quantity
  //     }
  //   })
  // }

  const { control, handleSubmit, register } = useForm<FormData>({
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
              multiple
              id="combo-box"
              options={data.resources}
              getOptionLabel={(option) => option.name}
              onChange={(_, data) => {
                if (data) {
                  onChange(data)
                  console.log(data)
                  // dispatch(addR
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
        // multiple
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
      {/* <MyTable chosenRes={chosenRes} onQuantityChange={onQuantityChange} /> */}
      {/* <Button type="submit" variant="contained" color="success">
          Calculate
        </Button> */}
      {/* </form> */}
    </Stack>
  )
}
