import { IconButton, Stack, TextField, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

import { Resource } from '../types/data'
import { useAppDispatch } from '../hooks/hooks'
import { deleteRes } from '../redux/features/resSlice'

type CalProps = {
  chosenRes: Resource[]
}

export default function Calculation({ chosenRes }: CalProps) {
  const dispatch = useAppDispatch()
  const titles = ['Resource', 'Quantity', 'CO2e', 'SO2e', '']

  return (
    <Stack>
      <Stack direction="row" spacing={10} width={500}>
        {titles.map((title) => (
          <Typography key={title}>{title}</Typography>
        ))}
      </Stack>
      {chosenRes.map((elem) => (
        <Stack
          direction="row"
          key={elem.resourceId}
          spacing={10}
          width={800}
          alignItems="center"
          p="15px 0"
        >
          <Typography>{elem.name}</Typography>
          <TextField type="number" size="small" sx={{ width: '80px' }} />
          <Typography>number</Typography>
          <Typography>number</Typography>
          <IconButton
            title="delete"
            color="error"
            onClick={() => dispatch(deleteRes(elem.resourceId))}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      ))}
    </Stack>
  )
}
