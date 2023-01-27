'use client'
import Footer from 'components/Footer'
import MobileMenu from 'components/MobileMenu'
import { Author } from 'lib/types'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

import { useSupabase } from '../providers/supabase-provider'
import LoginDialog from '../SignInDialog'
import ButtonThemeSwitch from './ButtonThemeSwitch'
import NavItem from './NavItem'

interface ContainerProps {
  children: React.ReactNode
  siteOwner: Author
}

export default function Container(props: ContainerProps) {
  const { children, siteOwner } = props
  const pathName = usePathname()
  const [isOpen, setIsOpen] = useState(false)
  const { supabase, session } = useSupabase()

  if (pathName.startsWith('/studio')) return <>{children}</>

  return (
    <div className="mx-auto max-w-3xl px-4 sm:px-6 xl:max-w-5xl xl:px-0">
      <div className="flex flex-col justify-center px-8">
        <nav className="relative flex w-full flex-1 items-center justify-between border-gray-200 bg-gray-50 bg-opacity-60 pt-8 pb-8 text-gray-900 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100 sm:pb-16">
          <div className="ml-[-0.60rem]">
            <MobileMenu />
            <NavItem href="/" text="Home" />
            <NavItem href="/posts" text="Blog" />
            <NavItem href="/tags" text="Tag" />
            <NavItem href="/about" text="About" />
          </div>
          <div className="flex">
            {!session ? (
              <button className="mr-2" onClick={() => setIsOpen(true)}>
                Sign In
              </button>
            ) : (
              <div className="flex items-center">
                <span className="mr-2">{session.user.email}</span>
                <button className="mr-2" onClick={() => supabase.auth.signOut()}>
                  Sign Out
                </button>
              </div>
            )}

            <ButtonThemeSwitch />
          </div>
        </nav>
      </div>
      <main className="flex flex-col justify-center bg-gray-50 px-8 dark:bg-gray-900">
        <LoginDialog isOpen={isOpen} onClose={() => setIsOpen(false)} />
        {children}
        <Footer owner={siteOwner} />
      </main>
    </div>
  )
}
