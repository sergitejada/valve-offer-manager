// import ClientsIcon from '@modules/commons/icons/clients-icon'
// import DashboardIcon from '@modules/commons/icons/dashboard-icon'
// import OffersIcon from '@modules/commons/icons/offers-icon'
import Sidebar, { SidebarItem } from '@modules/layout/components/sidebar'
import { Calculator, LayoutDashboard, Users } from 'lucide-react'
import PropTypes from 'prop-types'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white">
      <div className="h-full">
        <Sidebar className="h-full">
          <SidebarItem icon={<LayoutDashboard className="h-5 w-5 text-neutral-50" />} text="Dashboard" href="/" />
          <SidebarItem icon={<Users className="h-5 w-5 text-neutral-100" />} text="Clients" href="/clients" />
          <SidebarItem icon={<Calculator className="h-5 w-5 text-neutral-200" />} text="Offers" href="/offers" />
        </Sidebar>
      </div>
      <div className="flex-1 overflow-auto">
        <div className="px-16 py-8">{children}</div>
      </div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
}
