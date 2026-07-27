'use client'

import { useState, useEffect } from 'react'
import { useAuth } from '@/lib/auth-context'
import { useRouter, usePathname } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Menu, X, LogOut, Settings, Home, Package, MessageCircle, Receipt } from 'lucide-react'
import Link from 'next/link'

interface DashboardLayoutProps {
  children: React.ReactNode
  currentPage?: string
}

export function DashboardLayout({ children, currentPage: currentPageProp = 'dashboard' }: DashboardLayoutProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const { user, logout } = useAuth()
  const router = useRouter()
  const pathname = usePathname()
  const [currentPage, setCurrentPage] = useState(currentPageProp)

  // Auto-detect current page from pathname
  useEffect(() => {
    if (pathname.includes('bill-upload')) setCurrentPage('bill-upload')
    else if (pathname.includes('ai-chat')) setCurrentPage('ai-chat')
    else if (pathname.includes('inventory')) setCurrentPage('inventory')
    else if (pathname.includes('profile')) setCurrentPage('profile')
    else if (pathname.includes('dashboard')) setCurrentPage('dashboard')
  }, [pathname])

  const handleLogout = () => {
    logout()
    router.push('/')
  }

  const navItems = [
    { icon: Home, label: 'Dashboard', href: '/dashboard', id: 'dashboard' },
    { icon: Package, label: 'Inventory', href: '/inventory', id: 'inventory' },
    { icon: Receipt, label: 'Bill Upload', href: '/bill-upload', id: 'bill-upload' },
    { icon: MessageCircle, label: 'AI Assistant', href: '/ai-chat', id: 'ai-chat' },
    { icon: Settings, label: 'Profile', href: '/profile', id: 'profile' },
  ]

  return (
    <div className="flex h-screen bg-background">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 md:hidden z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed md:static left-0 top-0 h-screen w-64 bg-white border-r border-border transition-transform duration-300 z-50 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Logo */}
          <div className="p-6 border-b border-border">
            <h1 className="text-2xl font-bold text-primary">Kirana</h1>
            <p className="text-xs text-muted-foreground">Inventory Manager</p>
          </div>

          {/* Navigation */}
          <nav className="flex-1 p-4 space-y-2">
            {navItems.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id
              return (
                <Link key={item.id} href={item.href}>
                  <button
                    className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                      isActive
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-secondary'
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    <Icon className="w-5 h-5" />
                    <span className="font-medium">{item.label}</span>
                  </button>
                </Link>
              )
            })}
          </nav>

          {/* User Section */}
          <div className="p-4 border-t border-border space-y-3">
            <div className="px-4 py-2 bg-secondary rounded-lg">
              <p className="text-xs text-muted-foreground">Logged in as</p>
              <p className="font-semibold text-foreground text-sm truncate">{user?.email}</p>
            </div>
            <Button
              onClick={handleLogout}
              variant="outline"
              className="w-full gap-2 border-border text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Bar */}
        <header className="bg-white border-b border-border px-4 py-3 flex items-center justify-between">
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="md:hidden p-2 hover:bg-secondary rounded-lg"
          >
            {sidebarOpen ? (
              <X className="w-6 h-6 text-foreground" />
            ) : (
              <Menu className="w-6 h-6 text-foreground" />
            )}
          </button>

          <h2 className="text-lg font-semibold text-foreground">
            {navItems.find((item) => item.id === currentPage)?.label || 'Dashboard'}
          </h2>

          <div className="w-10" /> {/* Spacer for centering */}
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-auto">
          <div className="p-4 md:p-6">{children}</div>
        </main>
      </div>
    </div>
  )
}
