import Sidebar, { SidebarItem } from '@modules/layout/components/sidebar'
import { Calculator, LayoutDashboard, Users } from 'lucide-react'
import PropTypes from 'prop-types'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-neutral-50">
      <div className="h-full">
        <Sidebar className="h-full">
          <SidebarItem icon={<LayoutDashboard className="h-5 w-5 text-neutral-50" />} text="Dashboard" href="/" />
          <SidebarItem icon={<Users className="h-5 w-5 text-neutral-100" />} text="Clients" href="/clients" />
          <SidebarItem icon={<Calculator className="h-5 w-5 text-neutral-200" />} text="Offers" href="/offers" />
          <SidebarItem icon={<Calculator className="h-5 w-5 text-neutral-200" />} text="Processor" href="/processor" />
        </Sidebar>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="p-8">{children}</div>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
}
