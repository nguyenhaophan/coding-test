import { useEffect, useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import { Typography } from '@mui/material'

import { Data } from '../types/data'

type SearchBarProps = {
  data: Data
}

export default function SearchBar({ data }: SearchBarProps) {
  const [chosenRes, setChosenRes] = useState<string[]>([])

  function handleSubmit(event: any, value: string) {
    event.preventDefault()

    if (!chosenRes.includes(value)) {
      setChosenRes([...chosenRes, value])
    }
  }

  return (
    <Stack spacing={2} sx={{ width: 300 }}>
      <Autocomplete
        freeSolo
        id="search-resources"
        disableClearable
        options={data.resources.map((res) => res.name)}
        onChange={handleSubmit}
        renderInput={(params) => (
          <TextField
            {...params}
            label="Start typing or click the bar"
            InputProps={{
              ...params.InputProps,
              type: 'search',
            }}
            size="small"
          />
        )}
      />
      {chosenRes.map((elem) => (
        <Typography key={elem}>{elem}</Typography>
      ))}
    </Stack>
  )
}
