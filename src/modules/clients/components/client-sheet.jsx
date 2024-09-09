import { Button } from '@modules/commons/ui/button'
import { Input } from '@modules/commons/ui/input'
import { Label } from '@modules/commons/ui/label'
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@modules/commons/ui/sheet'
import PropTypes from 'prop-types'

export default function ClientSheet({ isOpen, onOpenChange, client }) {
  return (
    <Sheet open={isOpen} onOpenChange={onOpenChange}>
      <SheetContent className="w-[400px] p-6 sm:w-[540px] sm:max-w-[90vw]">
        <div className="h-full w-full overflow-hidden rounded-lg bg-white shadow-lg">
          <div className="p-6">
            <SheetHeader className="mb-6">
              <SheetTitle className="text-left text-2xl font-bold">Payment</SheetTitle>
              <div className="mt-2 flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-3 flex h-10 w-10 items-center justify-center rounded-full bg-purple-500 text-xl font-bold text-white">
                    $
                  </div>
                  <span className="text-3xl font-bold">$7,104.24</span>
                </div>
                <Button variant="outline" size="sm">
                  Export
                </Button>
              </div>
              <div className="mt-2 text-sm text-gray-500">31 May, 2023, 09:42 AM</div>
            </SheetHeader>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="iban" className="text-sm font-medium text-gray-600">
                    IBAN
                  </Label>
                  <Input id="iban" value="**** **** 2364 10" readOnly className="mt-1 bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="bic" className="text-sm font-medium text-gray-600">
                    BIC
                  </Label>
                  <Input id="bic" value="CITIXX2X" readOnly className="mt-1 bg-gray-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="reference" className="text-sm font-medium text-gray-600">
                    Reference
                  </Label>
                  <Input id="reference" value="STRIPE" readOnly className="mt-1 bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="emitter" className="text-sm font-medium text-gray-600">
                    Emitter
                  </Label>
                  <Input id="emitter" value="Stripe" readOnly className="mt-1 bg-gray-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="tag" className="text-sm font-medium text-gray-600">
                    Tag
                  </Label>
                  <Input id="tag" value="Stripe" readOnly className="mt-1 bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="date" className="text-sm font-medium text-gray-600">
                    Date
                  </Label>
                  <Input id="date" value="05/31/2023" readOnly className="mt-1 bg-gray-100" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="status" className="text-sm font-medium text-gray-600">
                    Status
                  </Label>
                  <Input id="status" value="Initiated" readOnly className="mt-1 bg-gray-100" />
                </div>
                <div>
                  <Label htmlFor="amount" className="text-sm font-medium text-gray-600">
                    Amount
                  </Label>
                  <Input id="amount" value="$7,104.24" readOnly className="mt-1 bg-gray-100" />
                </div>
              </div>
              <div>
                <Label htmlFor="category" className="text-sm font-medium text-gray-600">
                  Category
                </Label>
                <select id="category" className="mt-1 w-full rounded-md border bg-gray-100 p-2">
                  <option>Automated Cashout</option>
                </select>
              </div>
              <div>
                <Label className="text-sm font-medium text-gray-600">Receipts</Label>
                <div className="mt-1 rounded-md border-2 border-dashed p-4 text-center">
                  <p className="text-sm text-gray-700">Click to select or drop files.</p>
                  <p className="text-xs text-gray-500">We accept PDF, JPG and PNG files up to 10MB.</p>
                </div>
              </div>
            </div>
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
