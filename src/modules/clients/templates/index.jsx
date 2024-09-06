import DataTable from '@modules/clients/components/data-table'
import Text from '@modules/commons/components/text'
import ClientsIcon from '@modules/commons/icons/clients-icon'
import PlusIcon from '@modules/commons/icons/plus-icon'
import { Button } from '@modules/commons/ui/button'
import { Card } from '@modules/commons/ui/card'

const clients = [
  {
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
    paymentStatus: 'Paid',
    totalAmount: '$250.00',
    paymentMethod: 'Credit Card',
  },
]

export default function ClientLayoutIndex() {
  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <div className="rounded-full border border-black bg-white p-3">
            <ClientsIcon />
          </div>
          <div className="flex flex-col">
            <Text as="h1">Clients</Text>
            <Text className="text-gray-500">Here is the list of our clients</Text>
          </div>
        </div>
        <Button>
          <div className="mr-2 h-4 w-4">
            <PlusIcon />
          </div>
          Create
        </Button>
      </div>

      <Card className="p-5">
        <DataTable data={clients} />
      </Card>
    </div>
  )
}
