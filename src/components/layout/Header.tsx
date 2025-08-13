'use client'

import { useState } from 'react'
import Link from 'next/link'
import { Menu, X, TrendingUp, Bell, Settings } from 'lucide-react'
import { cn } from '@/lib/utils'

const navigation = [
  { name: 'Dashboard', href: '/', icon: TrendingUp },
  { name: 'Alerts', href: '/alerts', icon: Bell },
  { name: 'Settings', href: '/settings', icon: Settings },
]

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <header className="glass-effect border-b border-border/40 sticky top-0 z-50 backdrop-blur-md">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-105">
                <TrendingUp className="w-7 h-7 text-white" />
              </div>
              <span className="text-3xl font-bold bg-gradient-to-r from-white to-blue-400 bg-clip-text text-transparent">
                BloxStock
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="flex items-center space-x-2 text-muted-foreground hover:text-white transition-all duration-200 px-4 py-2 rounded-lg hover:bg-white/10 group"
              >
                <item.icon className="w-4 h-4 group-hover:scale-110 transition-transform duration-200" />
                <span className="font-medium">{item.name}</span>
              </Link>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              type="button"
              className="text-muted-foreground hover:text-white p-2 rounded-lg hover:bg-white/10 transition-all duration-200"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 border-t border-border/40">
            <div className="flex flex-col space-y-2 pt-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="flex items-center space-x-3 text-muted-foreground hover:text-white transition-all duration-200 px-4 py-3 rounded-lg hover:bg-white/10 group"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <item.icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                  <span className="font-medium">{item.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}
      </nav>
    </header>
  )
}

