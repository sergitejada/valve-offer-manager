import Text from '@modules/commons/components/text'
import { Avatar, AvatarFallback } from '@modules/commons/ui/avatar'
import { Button } from '@modules/commons/ui/button'
import { Card } from '@modules/commons/ui/card'
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle } from '@modules/commons/ui/sheet'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@modules/commons/ui/table'
import PropTypes from 'prop-types'

export default function ClientSheet({ isOpen, onOpenChange, client }) {
  console.log(client)
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[600px] max-w-none p-6">
        <div className="h-full w-full overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="p-6">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left text-2xl font-bold">{client?.name}</SheetTitle>
            </SheetHeader>
            <Card className="p-2">
              <Text as="h5">Contacts</Text>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="">Name</TableHead>
                    <TableHead className="">Email</TableHead>
                    <TableHead className="text-right">Phone</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {client?.contact.map((contact) => (
                    <TableRow key={contact.email}>
                      <TableCell className="flex items-center">
                        <Avatar className="size-6 bg-red-300">
                          <AvatarFallback className="bg-red-50 text-red-500">JD</AvatarFallback>
                        </Avatar>
                        <span className="ml-2 font-medium">{contact.name}</span>
                      </TableCell>
                      <TableCell className="">{contact.email}</TableCell>
                      <TableCell className="text-right">{contact.phone}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </Card>
          </div>
          <SheetFooter className="bg-gray-50 p-6">
            <Button type="submit" className="w-full">
              Save changes
            </Button>
          </SheetFooter>
        </div>
      </SheetContent>
    </Sheet>
  )
}

ClientSheet.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onOpenChange: PropTypes.func.isRequired,
  client: PropTypes.object,
}
