import { SyntheticEvent, useState } from 'react'
import TextField from '@mui/material/TextField'
import Stack from '@mui/material/Stack'
import Autocomplete from '@mui/material/Autocomplete'
import { IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { Data } from '../types/data'

type SearchBarProps = {
  data: Data
}

export default function SearchBar({ data }: SearchBarProps) {
  const [chosenRes, setChosenRes] = useState<string[]>([])
  const [value, setValue] = useState<string | null>(null)

  function handleSubmit(event: SyntheticEvent, newValue: string | null) {
    event.preventDefault()

    // Check to prevent user input non-existed value
    // This return an array of true or false
    // Check again below if there's any true value
    if (newValue) {
      // const selected = data.resources.map((res) => res.name.includes(newValue))
      // console.log(selected)
      if (!chosenRes.includes(newValue)) {
        setChosenRes([...chosenRes, newValue])

        // console.log([...chosenRes, newValue])
      }
      // if (!chosenRes.includes(newValue) && selected.includes(true)) {
      //   setChosenRes([...chosenRes, newValue])
      //   console.log([...chosenRes, newValue])
      // }
    }
  }

  function handleDelete(value: string) {
    setChosenRes(chosenRes.filter((res) => res !== value))
  }

  // function handleOnClose(event: SyntheticEvent, reason: string) {
  //   setValue(null)
  // }

  return (
    <Stack sx={{ width: 300, margin: 'auto' }}>
      {/* <Autocomplete
        freeSolo
        value=""
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
      /> */}

      <Autocomplete
        disablePortal
        value={value}
        // onClose={handleOnClose}
        id="combo-box"
        options={data.resources.map((res) => res.name)}
        onChange={handleSubmit}
        sx={{ width: 300 }}
        renderInput={(params) => (
          <TextField {...params} label="Start typing or click the bar" />
        )}
      />

      {chosenRes.map((elem) => (
        <Stack
          key={elem}
          gap="15px"
          direction="row"
          width="550px"
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography width="100%">{elem}</Typography>
          <TextField type="number" size="small" />
          <Typography minWidth="50px">{''}</Typography>
          <Typography minWidth="50px">{''}</Typography>
          <IconButton
            title="delete"
            color="error"
            onClick={() => handleDelete(elem)}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  )
}
