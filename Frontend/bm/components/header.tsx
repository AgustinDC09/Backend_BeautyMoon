"use client"

import { useState } from "react"
import { Search, ShoppingCart, User, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
              <span className="text-primary-foreground font-bold text-lg">BM</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-foreground">Beauty Moon</h1>
              <p className="text-xs text-muted-foreground">Feria Digital Avón</p>
            </div>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar productos o vendedores..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-input border-border"
              />
            </div>
          </div>

          {/* Navigation - Desktop */}
          <nav className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm">
              Vendedores
            </Button>
            <Button variant="ghost" size="sm">
              Productos
            </Button>
            <Button variant="ghost" size="sm" className="relative">
              <ShoppingCart className="h-5 w-5" />
              <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
            </Button>
            <Button variant="ghost" size="sm">
              <User className="h-5 w-5" />
            </Button>
            <Button size="sm">Vender</Button>
          </nav>

          {/* Mobile Menu Button */}
          <Button variant="ghost" size="sm" className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border">
            <div className="space-y-4">
              {/* Mobile Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Buscar productos o vendedores..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10 bg-input border-border"
                />
              </div>

              {/* Mobile Navigation */}
              <div className="flex flex-col space-y-2">
                <Button variant="ghost" className="justify-start">
                  Vendedores
                </Button>
                <Button variant="ghost" className="justify-start">
                  Productos
                </Button>
                <Button variant="ghost" className="justify-start">
                  <ShoppingCart className="h-5 w-5 mr-2" />
                  Carrito (3)
                </Button>
                <Button variant="ghost" className="justify-start">
                  <User className="h-5 w-5 mr-2" />
                  Mi Cuenta
                </Button>
                <Button className="justify-start">Vender</Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
