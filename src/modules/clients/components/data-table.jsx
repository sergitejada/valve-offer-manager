import DataTableToolbar from '@modules/clients/components/data-table-toolbar'
import PropTypes from 'prop-types'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/commons/ui/table'

export default function DataTable({ data }) {
  return (
    <div className="space-y-4">
      <DataTableToolbar />
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-full">Name</TableHead>
              <TableHead className="whitespace-nowrap text-right">Active Orders</TableHead>
              <TableHead className="whitespace-nowrap text-right">Total Orders</TableHead>
              <TableHead className="whitespace-nowrap text-right">Last Order</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((client) => (
              <TableRow key={client.id}>
                <TableCell className="font-medium">{client.name}</TableCell>
                {/* <TableCell>{client.contact.size}</TableCell> */}
                <TableCell className="text-right">{client.active_order}</TableCell>
                <TableCell className="text-right">{client.total_order}</TableCell>
                <TableCell className="text-right text-blue-500 underline">{client.last_order}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
}
