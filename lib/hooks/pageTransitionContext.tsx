'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { usePathname, useRouter } from 'next/navigation'

interface PageTransitionContextValue {
  navigate: (href: string) => void
  isTransitioning: boolean
  displayChildren: ReactNode
  visible: boolean
  displayPathname: string
  onExitComplete: () => void
  onEnterComplete: () => void
}

const PageTransitionContext = createContext<PageTransitionContextValue | null>(
  null
)

export function usePageTransition() {
  const context = useContext(PageTransitionContext)
  if (!context) {
    throw new Error('usePageTransition must be used within PageTransitionProvider')
  }
  return context
}

interface PageTransitionProviderProps {
  pageChildren: ReactNode
  children: ReactNode
}

export function PageTransitionProvider({
  pageChildren,
  children,
}: PageTransitionProviderProps) {
  const pathname = usePathname()
  const router = useRouter()
  const [displayChildren, setDisplayChildren] = useState(pageChildren)
  const [displayPathname, setDisplayPathname] = useState(pathname)
  const [visible, setVisible] = useState(true)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const pendingHrefRef = useRef<string | null>(null)
  const awaitingNavigationRef = useRef(false)

  useEffect(() => {
    if (
      !isTransitioning &&
      !awaitingNavigationRef.current &&
      pathname === displayPathname
    ) {
      setDisplayChildren(pageChildren)
    }
  }, [pageChildren, pathname, displayPathname, isTransitioning])

  useEffect(() => {
    if (!awaitingNavigationRef.current || !pendingHrefRef.current) return
    if (pathname !== pendingHrefRef.current) return

    pendingHrefRef.current = null
    awaitingNavigationRef.current = false
    setDisplayChildren(pageChildren)
    setDisplayPathname(pathname)
    setVisible(true)
  }, [pathname, pageChildren])

  const navigate = useCallback(
    (href: string) => {
      if (href === pathname || isTransitioning) return

      pendingHrefRef.current = href
      setIsTransitioning(true)
      setVisible(false)
    },
    [pathname, isTransitioning]
  )

  const onExitComplete = useCallback(() => {
    const href = pendingHrefRef.current
    if (!href) {
      setIsTransitioning(false)
      return
    }

    awaitingNavigationRef.current = true
    router.push(href)
  }, [router])

  const onEnterComplete = useCallback(() => {
    setIsTransitioning(false)
  }, [])

  return (
    <PageTransitionContext.Provider
      value={{
        navigate,
        isTransitioning,
        displayChildren,
        visible,
        displayPathname,
        onExitComplete,
        onEnterComplete,
      }}
    >
      {children}
    </PageTransitionContext.Provider>
  )
}
