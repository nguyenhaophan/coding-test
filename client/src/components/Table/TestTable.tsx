import { Paper, Table, TableContainer } from '@mui/material'

import { Resource } from '../../types/data'
import TableBody from './MyTable'
import TableHead from './TableHead'

type MyTableProps = {
  chosenRes: Resource[]
}

export default function MyTable({ chosenRes }: MyTableProps) {
  return (
    // <TableContainer component={Paper} sx={{ width: '700px', mt: '50px' }}>
    //   <Table>
    //     <TableHead />
    //     <TableBody chosenRes={chosenRes} />
    //   </Table>
    // </TableContainer>
    <>Hello</>
  )
}
