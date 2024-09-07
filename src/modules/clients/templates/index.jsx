import DataTable from '@modules/clients/components/data-table'
import Text from '@modules/commons/components/text'
import { Button } from '@modules/commons/ui/button'
import { Card } from '@modules/commons/ui/card'
import { Plus, Users } from 'lucide-react'

const clients = [
  {
    id: 1,
    name: 'ACME Inc.',
    contact: [
      {
        name: 'John Doe',
        email: 'john@acme.com',
        phone: '123456789',
      },
      {
        name: 'Jane Doe',
        email: 'jane@acme.com',
        phone: '987654321',
      },
    ],
    active_order: 5,
    total_order: 10,
    last_order: '#123467',
  },
  {
    id: 2,
    name: 'TechCorp',
    contact: [
      {
        name: 'Alice Johnson',
        email: 'alice@techcorp.com',
        phone: '555123456',
      },
    ],
    active_order: 3,
    total_order: 8,
    last_order: '#789012',
  },
  {
    id: 3,
    name: 'Global Solutions',
    contact: [
      {
        name: 'Bob Smith',
        email: 'bob@globalsolutions.com',
        phone: '444555666',
      },
      {
        name: 'Carol White',
        email: 'carol@globalsolutions.com',
        phone: '777888999',
      },
    ],
    active_order: 7,
    total_order: 15,
    last_order: '#345678',
  },
  {
    id: 4,
    name: 'Innovate Co.',
    contact: [
      {
        name: 'David Brown',
        email: 'david@innovateco.com',
        phone: '111222333',
      },
    ],
    active_order: 2,
    total_order: 6,
    last_order: '#901234',
  },
  {
    id: 5,
    name: 'EcoFriendly Ltd.',
    contact: [
      {
        name: 'Emma Green',
        email: 'emma@ecofriendly.com',
        phone: '999000111',
      },
    ],
    active_order: 4,
    total_order: 9,
    last_order: '#567890',
  },
  {
    id: 6,
    name: 'MegaCorp',
    contact: [
      {
        name: 'Frank Wilson',
        email: 'frank@megacorp.com',
        phone: '222333444',
      },
      {
        name: 'Grace Lee',
        email: 'grace@megacorp.com',
        phone: '555666777',
      },
    ],
    active_order: 10,
    total_order: 25,
    last_order: '#123789',
  },
  {
    id: 7,
    name: 'SmartSystems',
    contact: [
      {
        name: 'Henry Taylor',
        email: 'henry@smartsystems.com',
        phone: '888999000',
      },
    ],
    active_order: 1,
    total_order: 3,
    last_order: '#456123',
  },
  {
    id: 8,
    name: 'FutureTech',
    contact: [
      {
        name: 'Ivy Chen',
        email: 'ivy@futuretech.com',
        phone: '333444555',
      },
    ],
    active_order: 6,
    total_order: 12,
    last_order: '#789456',
  },
  {
    id: 9,
    name: 'GreenEnergy',
    contact: [
      {
        name: 'Jack Black',
        email: 'jack@greenenergy.com',
        phone: '666777888',
      },
      {
        name: 'Kelly White',
        email: 'kelly@greenenergy.com',
        phone: '111000999',
      },
    ],
    active_order: 8,
    total_order: 20,
    last_order: '#234567',
  },
  {
    id: 10,
    name: 'DataDynamics',
    contact: [
      {
        name: "Liam O'Connor",
        email: 'liam@datadynamics.com',
        phone: '777666555',
      },
    ],
    active_order: 3,
    total_order: 7,
    last_order: '#890123',
  },
  {
    id: 11,
    name: 'CloudNine',
    contact: [
      {
        name: 'Mia Rodriguez',
        email: 'mia@cloudnine.com',
        phone: '444333222',
      },
    ],
    active_order: 5,
    total_order: 11,
    last_order: '#567234',
  },
  {
    id: 12,
    name: 'Quantum Ltd.',
    contact: [
      {
        name: 'Nathan Kim',
        email: 'nathan@quantumltd.com',
        phone: '999888777',
      },
      {
        name: 'Olivia Park',
        email: 'olivia@quantumltd.com',
        phone: '222111000',
      },
    ],
    active_order: 9,
    total_order: 18,
    last_order: '#901456',
  },
  {
    id: 13,
    name: 'AI Solutions',
    contact: [
      {
        name: 'Peter Wang',
        email: 'peter@aisolutions.com',
        phone: '555444333',
      },
    ],
    active_order: 2,
    total_order: 5,
    last_order: '#345901',
  },
  {
    id: 14,
    name: 'RoboTech',
    contact: [
      {
        name: 'Quinn Foster',
        email: 'quinn@robotech.com',
        phone: '888777666',
      },
    ],
    active_order: 4,
    total_order: 9,
    last_order: '#678345',
  },
  {
    id: 15,
    name: 'SecureNet',
    contact: [
      {
        name: 'Rachel Adams',
        email: 'rachel@securenet.com',
        phone: '333222111',
      },
      {
        name: 'Sam Thompson',
        email: 'sam@securenet.com',
        phone: '666555444',
      },
    ],
    active_order: 7,
    total_order: 14,
    last_order: '#234890',
  },
  {
    id: 16,
    name: 'BioTech Inc.',
    contact: [
      {
        name: 'Tina Chen',
        email: 'tina@biotechinc.com',
        phone: '777888999',
      },
    ],
    active_order: 1,
    total_order: 4,
    last_order: '#567012',
  },
  {
    id: 17,
    name: 'VR Dynamics',
    contact: [
      {
        name: 'Ulysses Grant',
        email: 'ulysses@vrdynamics.com',
        phone: '111222333',
      },
    ],
    active_order: 3,
    total_order: 6,
    last_order: '#890567',
  },
  {
    id: 18,
    name: 'WebWizards',
    contact: [
      {
        name: 'Victoria Lee',
        email: 'victoria@webwizards.com',
        phone: '444555666',
      },
      {
        name: 'William Choi',
        email: 'william@webwizards.com',
        phone: '999000111',
      },
    ],
    active_order: 6,
    total_order: 13,
    last_order: '#123678',
  },
  {
    id: 19,
    name: 'Nano Systems',
    contact: [
      {
        name: 'Xander Jones',
        email: 'xander@nanosystems.com',
        phone: '555666777',
      },
    ],
    active_order: 2,
    total_order: 5,
    last_order: '#456901',
  },
  {
    id: 20,
    name: 'EcoSmart',
    contact: [
      {
        name: 'Yara Ali',
        email: 'yara@ecosmart.com',
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
          <div className="rounded-full border border-black bg-white p-3">
            <Users />
          </div>
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
