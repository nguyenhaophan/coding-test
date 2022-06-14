import { SyntheticEvent } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'

import { Data, Resource } from '../types/data'
import { useAppDispatch, useAppSelector } from '../hooks/hooks'
import { addRes } from '../redux/features/resSlice'
import MyTable from './Table/MyTable'

type SearchBarProps = {
  data: Data
}

export default function SearchBar({ data }: SearchBarProps) {
  const dispatch = useAppDispatch()
  const { chosenRes } = useAppSelector((state) => state.res)

  console.log(chosenRes)
  function handleSubmit(event: SyntheticEvent, newValue: Resource | null) {
    event.preventDefault()

    if (newValue) {
      dispatch(addRes(newValue))
    }
  }

  return (
    <Stack alignItems="center">
      <Autocomplete
        value={null}
        id="combo-box"
        options={data.resources}
        getOptionLabel={(option) => option.name}
        onChange={handleSubmit}
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
    </Stack>
  )
}
