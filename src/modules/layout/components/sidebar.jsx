'use client'

import Separator from '@modules/commons/components/separator'
import { Button } from '@modules/commons/ui/button'
import { ArrowLeftToLine, ArrowRightFromLine, Search } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import PropTypes from 'prop-types'
import { useContext, createContext, useState } from 'react'

const SidebarContext = createContext()

export default function Sidebar({ children }) {
  const [expanded, setExpanded] = useState(true)

  return (
    <aside className="h-screen min-w-[50px]">
      <nav
        className={`flex h-full flex-col border-black bg-neutral-950 shadow-sm transition-all ${expanded ? 'w-64' : 'w-[56px]'}`}
      >
        <div className={`flex h-[50px] items-center ${expanded ? 'justify-between' : 'justify-center'}`}>
          <Image
            src="https://img.logoipsum.com/288.svg"
            className={`overflow-hidden transition-all ${expanded ? 'w-32' : 'w-0'}`}
            alt=""
            width={128}
            height={32}
          />

          <div className="flex items-center">
            <Button
              variant="ghost"
              disabled
              type="button"
              className={`group rounded-lg p-1.5 transition-opacity duration-700 ${expanded ? 'opacity-100' : 'hidden'}`}
            >
              <Search className="h-5 w-5 text-neutral-500 group-hover:text-neutral-400" />
            </Button>

            <Button
              variant="ghost"
              onClick={() => setExpanded((curr) => !curr)}
              className="group rounded-lg p-1.5 hover:bg-current"
            >
              {expanded ? (
                <ArrowLeftToLine className="h-5 w-5 text-neutral-500 group-hover:text-neutral-400" />
              ) : (
                <ArrowRightFromLine className="h-5 w-5 text-neutral-500" />
              )}
            </Button>
          </div>
        </div>

        <SidebarContext.Provider value={{ expanded }}>
          <div className="flex flex-1 flex-col gap-1 px-2">{children}</div>
        </SidebarContext.Provider>

        <div className="flex flex-col items-center p-3">
          <div className="mt-4 flex items-center">
            <Image
              src="https://ui-avatars.com/api/?background=c7d2fe&color=3730a3&bold=true"
              alt=""
              className="h-8 w-8 rounded-full"
              width={32}
              height={32}
            />
            <div className={`ml-3 overflow-hidden ${expanded ? 'w-40' : 'w-0'}`}>
              <div className="leading-4">
                <h4 className="font-semibold text-neutral-300">John Doe</h4>
                <span className="text-xs text-neutral-500">johndoe@gmail.com</span>
              </div>
            </div>
          </div>
        </div>
      </nav>
    </aside>
  )
}

Sidebar.propTypes = {
  children: PropTypes.node,
}

export function SidebarItem({ icon, text, alert, href }) {
  const { expanded } = useContext(SidebarContext)
  const pathname = usePathname()
  const active = pathname === href

  return (
    <Link
      href={href}
      className={`group inline-flex h-9 cursor-pointer items-center justify-center rounded-md font-semibold text-neutral-50 transition-colors ${
        active ? 'bg-neutral-800' : 'hover:bg-neutral-800'
      } ${expanded ? 'w-full' : 'w-9'}`}
    >
      {icon}
      <span className={`overflow-hidden text-sm font-medium ${expanded ? 'ml-3 w-52' : 'w-0'}`}>{text}</span>
      {alert && <div className={`absolute right-2 h-2 w-2 rounded bg-indigo-400 ${expanded ? '' : 'top-2'}`} />}
    </Link>
  )
}

SidebarItem.propTypes = {
  icon: PropTypes.node,
  text: PropTypes.string,
  alert: PropTypes.bool,
  href: PropTypes.string,
}
