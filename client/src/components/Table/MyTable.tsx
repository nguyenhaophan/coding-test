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
import cloneDeep from 'lodash/cloneDeep'

import { Resource, ResToSubmit } from '../../types/data'
import { useAppDispatch } from '../../hooks/hooks'
import { deleteRes } from '../../redux/features/resSlice'
import TableHead from './TableHead'

type TableProps = {
  chosenRes: Resource[]
  // onQuantityChange: (resourceId: string, quantity: number) => void
}

type ToSubmit = {
  quantity: number
}

export default function MyTable({ chosenRes }: TableProps) {
  // clone the obj to later add quantity
  // chosenRen is a props => cant add property
  // const cloned = cloneDeep(chosenRes)

  const dispatch = useAppDispatch()
  const [toSubmit, setToSubmit] = useState<ToSubmit[]>([])
  const { handleSubmit, control } = useForm<Resource[]>()
  // console.log(cloned)
  function onSubmit() {
    if (toSubmit.length) {
      console.log(toSubmit)
    }
  }

  function handleOnChange(res: Resource, event: any) {
    const newValue = {
      resourceId: res.resourceId,
      quantity: event.target.value,
    }
    setToSubmit([...toSubmit, newValue])
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Stack alignItems="flex-end">
        <TableContainer component={Paper} sx={{ width: '700px', mt: '50px' }}>
          <Table>
            <TableHead />
            <MuiTableBody>
              {chosenRes.map((elem, index) => (
                <TableRow key={elem.resourceId}>
                  <TableCell>{elem.name}</TableCell>

                  <TableCell>
                    <TextField
                      value={elem.quantity}
                      InputProps={{ inputProps: { min: 1 } }}
                      type="number"
                      size="small"
                      sx={{ width: '80px' }}
                      // onChange={(event) =>
                      //   dispatch(
                      //     addQuan({
                      //       index: index,
                      //       selected: elem,
                      //       quantity: Number(event.target.value),
                      //     }),
                      //   )
                      // }
                      onChange={(event) => handleOnChange(elem, event)}
                    />
                  </TableCell>

                  <TableCell>x</TableCell>
                  <TableCell>x</TableCell>
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
