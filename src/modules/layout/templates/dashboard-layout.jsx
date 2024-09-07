// import ClientsIcon from '@modules/commons/icons/clients-icon'
// import DashboardIcon from '@modules/commons/icons/dashboard-icon'
// import OffersIcon from '@modules/commons/icons/offers-icon'
import Sidebar, { SidebarItem } from '@modules/layout/components/sidebar'
import { Calculator, LayoutDashboard, Users } from 'lucide-react'
import PropTypes from 'prop-types'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-zinc-50">
      <div className="h-full">
        <Sidebar className="h-full">
          <SidebarItem icon={<LayoutDashboard />} text="Dashboard" href="/" />
          <SidebarItem icon={<Users />} text="Clients" href="/clients" />
          <SidebarItem icon={<Calculator />} text="Offers" href="/offers" />
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
