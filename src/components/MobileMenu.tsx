'use client'
import cn from 'classnames'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import styles from 'styles/mobile-menu.module.css'
import useDelayedRender from 'use-delayed-render'

export default function MobileMenu({
  items,
}: {
  items: { text: string; href: string; transitionDelay: string }[]
}) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { mounted: isMenuMounted, rendered: isMenuRendered } = useDelayedRender(isMenuOpen, {
    enterDelay: 20,
    exitDelay: 300,
  })

  function toggleMenu() {
    if (isMenuOpen) {
      setIsMenuOpen(false)
      document.body.style.overflow = ''
    } else {
      setIsMenuOpen(true)
      document.body.style.overflow = 'hidden'
    }
  }

  useEffect(() => {
    return function cleanup() {
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <>
      <button
        className={cn(styles.burger, 'visible md:hidden')}
        aria-label="Toggle menu"
        type="button"
        onClick={toggleMenu}
      >
        <MenuIcon data-hide={isMenuOpen} />
        <CrossIcon data-hide={!isMenuOpen} />
      </button>
      {isMenuMounted && (
        <ul
          className={cn(
            styles.menu,
            'absolute flex flex-col bg-gray-100 dark:bg-gray-900',
            isMenuRendered && styles.menuRendered
          )}
        >
          {items.map((item) => (
            <li
              key={item.href}
              className="border-b border-gray-300 text-sm font-semibold text-gray-900 dark:border-gray-700 dark:text-gray-100"
              style={{ transitionDelay: item.transitionDelay }}
            >
              <Link href={item.href} className="flex w-auto pb-4" onClick={toggleMenu}>
                {item.text}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </>
  )
}

function MenuIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
      width="20"
      height="20"
      viewBox="0 0 20 20"
      fill="none"
      {...props}
    >
      <path
        d="M2.5 7.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M2.5 12.5H17.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function CrossIcon(props: JSX.IntrinsicElements['svg']) {
  return (
    <svg
      className="absolute h-5 w-5 text-gray-900 dark:text-gray-100"
      viewBox="0 0 24 24"
      width="24"
      height="24"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      fill="none"
      shapeRendering="geometricPrecision"
      {...props}
    >
      <path d="M18 6L6 18" />
      <path d="M6 6l12 12" />
    </svg>
  )
}
