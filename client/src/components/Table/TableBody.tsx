import { IconButton, TableCell, TableRow, TextField } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiTableBody from '@mui/material/TableBody'

import { Resource } from '../../types/data'
import { useAppDispatch } from '../../hooks/hooks'
import { deleteRes } from '../../redux/features/resSlice'

type TableBodyProps = {
  chosenRes: Resource[]
}

export default function TableBody({ chosenRes }: TableBodyProps) {
  const dispatch = useAppDispatch()

  function handleDelete(value: string) {
    dispatch(deleteRes(value))
  }

  return (
    <MuiTableBody>
      {chosenRes.map((elem) => (
        <TableRow key={elem.resourceId}>
          <TableCell>{elem.name}</TableCell>
          <TableCell>
            <TextField type="number" size="small" sx={{ width: '80px' }} />
          </TableCell>
          <TableCell>number</TableCell>
          <TableCell>number</TableCell>
          <TableCell>
            <IconButton
              title="delete"
              color="error"
              onClick={() => handleDelete(elem.resourceId)}
            >
              <DeleteIcon />
            </IconButton>
          </TableCell>
        </TableRow>
      ))}
    </MuiTableBody>
  )
}
