import {
  Button,
  IconButton,
  Paper,
  Stack,
  Table,
  TableCell,
  TableContainer,
  TableRow,
  TextField,
} from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import MuiTableBody from '@mui/material/TableBody'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import { ChangeEvent, useState } from 'react'

import { Resource, ResToSubmit } from '../../types/data'
import { useAppDispatch } from '../../hooks/hooks'
import { deleteRes } from '../../redux/features/resSlice'
import TableHead from './TableHead'

type TableProps = {
  chosenRes: Resource[]
}

type FormData = {
  resource?: Resource
  quantity: number
}

type ToSubmitType = {
  product: Resource
  quantity: number
}

export default function MyTable({ chosenRes }: TableProps) {
  const dispatch = useAppDispatch()
  const [toSubmit, setToSubmit] = useState<ToSubmitType[]>([])
  const { handleSubmit } = useForm()

  function onSubmit() {
    console.log('Form', toSubmit)
  }

  function handleOnChange(elem: Resource, event: any) {
    const obj = {
      product: elem,
      quantity: event.target.value,
    }

    setToSubmit([...toSubmit, obj])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="flex-end">
        <TableContainer component={Paper} sx={{ width: '700px', mt: '50px' }}>
          <Table>
            <TableHead />
            <MuiTableBody>
              {chosenRes.map((elem) => (
                <TableRow key={elem.resourceId}>
                  <TableCell>{elem.name}</TableCell>
                  <TableCell>
                    <TextField
                      type="number"
                      size="small"
                      sx={{ width: '80px' }}
                      onChange={(event) => handleOnChange(elem, event)}
                    />
                  </TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>number</TableCell>
                  <TableCell>
                    <IconButton
                      title="delete"
                      color="error"
                      onClick={() => dispatch(deleteRes(elem.resourceId))}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </MuiTableBody>
          </Table>
        </TableContainer>
        <Button type="submit" variant="contained" color="success">
          Calculate
        </Button>
      </Stack>
    </form>
  )
}
