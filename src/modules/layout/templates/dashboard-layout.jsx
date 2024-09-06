import ClientsIcon from '@modules/commons/icons/clients-icon'
import DashboardIcon from '@modules/commons/icons/dashboard-icon'
import OffersIcon from '@modules/commons/icons/offers-icon'
import Sidebar, { SidebarItem } from '@modules/layout/components/sidebar'
import PropTypes from 'prop-types'

export default function DashboardLayout({ children }) {
  return (
    <div className="flex h-screen w-full bg-gray-100">
      <div className="h-screen">
        <Sidebar>
          <SidebarItem icon={<DashboardIcon />} text="Dashboard" href="/" />
          <SidebarItem icon={<ClientsIcon />} text="Clients" href="/clients" />
          <SidebarItem icon={<OffersIcon />} text="Offers" href="/offers" />
        </Sidebar>
      </div>
      <div className="w-full bg-gray-100 px-16 py-8">{children}</div>
    </div>
  )
}

DashboardLayout.propTypes = {
  children: PropTypes.node,
}
