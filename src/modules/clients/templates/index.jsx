import DataTable from '@modules/clients/components/data-table'
import Text from '@modules/commons/components/text'
import { Avatar, AvatarFallback } from '@modules/commons/ui/avatar'
import { Button } from '@modules/commons/ui/button'
import { Card } from '@modules/commons/ui/card'
import { Plus, Users } from 'lucide-react'

const clients = [
  {
    id: 1,
    name: 'Aramco',
    contact: [
      {
        name: 'John Doe',
        email: 'john@aramco.com',
        phone: '123456789',
      },
      {
        name: 'Jane Doe',
        email: 'jane@aramco.com',
        phone: '987654321',
      },
    ],
    active_order: 5,
    total_order: 10,
    last_order: '#123467',
  },
  {
    id: 2,
    name: 'IVM',
    contact: [
      {
        name: 'Alice Johnson',
        email: 'alice@IVM.com',
        phone: '555123456',
      },
    ],
    active_order: 3,
    total_order: 8,
    last_order: '#789012',
  },
  {
    id: 3,
    name: 'UBSCO',
    contact: [
      {
        name: 'Bob Smith',
        email: 'bob@ubsco.com',
        phone: '444555666',
      },
      {
        name: 'Carol White',
        email: 'carol@ubsco.com',
        phone: '777888999',
      },
    ],
    active_order: 7,
    total_order: 15,
    last_order: '#345678',
  },
  {
    id: 4,
    name: 'Lamprell',
    contact: [
      {
        name: 'David Brown',
        email: 'david@Lamprell.com',
        phone: '111222333',
      },
    ],
    active_order: 2,
    total_order: 6,
    last_order: '#901234',
  },
  {
    id: 5,
    name: 'VCF',
    contact: [
      {
        name: 'Emma Green',
        email: 'emma@VCF.com',
        phone: '999000111',
      },
    ],
    active_order: 4,
    total_order: 9,
    last_order: '#567890',
  },
  {
    id: 6,
    name: 'Measurement+',
    contact: [
      {
        name: 'Frank Wilson',
        email: 'frank@measurementplus.com',
        phone: '222333444',
      },
      {
        name: 'Grace Lee',
        email: 'grace@measurementplus.com',
        phone: '555666777',
      },
    ],
    active_order: 10,
    total_order: 25,
    last_order: '#123789',
  },
  {
    id: 7,
    name: 'Petronash',
    contact: [
      {
        name: 'Henry Taylor',
        email: 'henry@petronash.com',
        phone: '888999000',
      },
    ],
    active_order: 1,
    total_order: 3,
    last_order: '#456123',
  },
  {
    id: 8,
    name: 'Petrotech',
    contact: [
      {
        name: 'Ivy Chen',
        email: 'ivy@petrotech.com',
        phone: '333444555',
      },
    ],
    active_order: 6,
    total_order: 12,
    last_order: '#789456',
  },
  {
    id: 9,
    name: 'Saudi Fal',
    contact: [
      {
        name: 'Jack Black',
        email: 'jack@saudifal.com',
        phone: '666777888',
      },
      {
        name: 'Kelly White',
        email: 'kelly@saudifal.com',
        phone: '111000999',
      },
    ],
    active_order: 8,
    total_order: 20,
    last_order: '#234567',
  },
  {
    id: 10,
    name: 'Ras Al-Hamra',
    contact: [
      {
        name: "Liam O'Connor",
        email: 'liam@rasalhamra.com',
        phone: '777666555',
      },
    ],
    active_order: 3,
    total_order: 7,
    last_order: '#890123',
  },
  {
    id: 11,
    name: 'Veolia',
    contact: [
      {
        name: 'Mia Rodriguez',
        email: 'mia@veolia.com',
        phone: '444333222',
      },
    ],
    active_order: 5,
    total_order: 11,
    last_order: '#567234',
  },
  {
    id: 12,
    name: 'Inoxcva',
    contact: [
      {
        name: 'Nathan Kim',
        email: 'nathan@inoxcva.com',
        phone: '999888777',
      },
      {
        name: 'Olivia Park',
        email: 'olivia@inoxcva.com',
        phone: '222111000',
      },
    ],
    active_order: 9,
    total_order: 18,
    last_order: '#901456',
  },
  {
    id: 13,
    name: 'AVA',
    contact: [
      {
        name: 'Peter Wang',
        email: 'peter@ava.com',
        phone: '555444333',
      },
    ],
    active_order: 2,
    total_order: 5,
    last_order: '#345901',
  },
  {
    id: 14,
    name: 'NPCC',
    contact: [
      {
        name: 'Quinn Foster',
        email: 'quinn@npcc.com',
        phone: '888777666',
      },
    ],
    active_order: 4,
    total_order: 9,
    last_order: '#678345',
  },
  {
    id: 15,
    name: 'Global Trade Solutions',
    contact: [
      {
        name: 'Rachel Adams',
        email: 'rachel@globaltradesolutions.com',
        phone: '333222111',
      },
      {
        name: 'Sam Thompson',
        email: 'sam@globaltradesolutions.com',
        phone: '666555444',
      },
    ],
    active_order: 7,
    total_order: 14,
    last_order: '#234890',
  },
  {
    id: 16,
    name: 'Petrorabigh',
    contact: [
      {
        name: 'Tina Chen',
        email: 'tina@petrorabigh.com',
        phone: '777888999',
      },
    ],
    active_order: 1,
    total_order: 4,
    last_order: '#567012',
  },
  {
    id: 17,
    name: 'Shell',
    contact: [
      {
        name: 'Ulysses Grant',
        email: 'ulysses@shell.com',
        phone: '111222333',
      },
    ],
    active_order: 3,
    total_order: 6,
    last_order: '#890567',
  },
  {
    id: 18,
    name: 'MRC Global',
    contact: [
      {
        name: 'Victoria Lee',
        email: 'victoria@mrc.com',
        phone: '444555666',
      },
      {
        name: 'William Choi',
        email: 'william@mrc.com',
        phone: '999000111',
      },
    ],
    active_order: 6,
    total_order: 13,
    last_order: '#123678',
  },
  {
    id: 19,
    name: 'Hiunday',
    contact: [
      {
        name: 'Xander Jones',
        email: 'xander@hiunday.com',
        phone: '555666777',
      },
    ],
    active_order: 2,
    total_order: 5,
    last_order: '#456901',
  },
  {
    id: 20,
    name: 'Total Energy',
    contact: [
      {
        name: 'Yara Ali',
        email: 'yara@totalenergy.com',
        phone: '888999000',
      },
    ],
    active_order: 5,
    total_order: 10,
    last_order: '#789234',
  },
]

export default function ClientLayoutIndex() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <Avatar>
            <AvatarFallback>
              <Users />
            </AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <Text as="h1">Clients</Text>
            <Text className="text-gray-500">Here is the list of our clients</Text>
          </div>
        </div>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Create
        </Button>
      </div>

      <Card className="p-6">
        <DataTable data={clients} />
      </Card>
    </div>
  )
}
