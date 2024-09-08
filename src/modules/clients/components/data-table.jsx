'use client'

import ClientSheet from '@modules/clients/components/client-sheet'
import DataTableToolbar from '@modules/clients/components/data-table-toolbar'
import PropTypes from 'prop-types'
import { useState } from 'react'

import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/modules/commons/ui/table'

export default function DataTable({ data }) {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedClient, setSelectedClient] = useState(null)

  const handleRowClick = (client) => {
    setSelectedClient(client)
    setIsOpen(true)
  }

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
              <TableRow key={client.id} onClick={() => handleRowClick(client)}>
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
      <ClientSheet isOpen={isOpen} onOpenChange={setIsOpen} client={selectedClient} />
    </div>
  )
}

DataTable.propTypes = {
  data: PropTypes.array.isRequired,
}
