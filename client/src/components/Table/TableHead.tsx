import { TableCell, TableRow } from '@mui/material'
import MuiTableHead from '@mui/material/TableHead'

export default function TableHead() {
  const titles = ['Resource', 'Quantity', 'CO2e', 'SO2e', '']

  return (
    <MuiTableHead>
      <TableRow>
        {titles.map((title) => (
          <TableCell key={title} sx={{ fontWeight: '600' }}>
            {title}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  )
}
