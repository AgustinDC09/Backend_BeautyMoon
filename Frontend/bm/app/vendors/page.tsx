"use client"

import { useState } from "react"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { VendorCard } from "@/components/vendor-card"
import { VendorFilters } from "@/components/vendor-filters"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Filter, Grid, List } from "lucide-react"

// Mock data - en producción esto vendría de su API
const vendors = [
  {
    id: 1,
    name: "María González",
    location: "Centro, CDMX",
    rating: 4.8,
    reviews: 127,
    products: 45,
    specialties: ["Labiales", "Perfumes", "Cremas"],
    verified: true,
    image: "/beautiful-woman-vendor-smiling.jpg",
    description: "Especialista en productos Avón con 8 años de experiencia",
    joinedDate: "2016",
    totalSales: 1250,
  },
  // ... más vendedores
]

export default function VendorsPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [showFilters, setShowFilters] = useState(false)

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="container mx-auto px-4 py-8">
        {/* Page Header */}
        <div className="mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Vendedores</h1>
          <p className="text-lg text-muted-foreground">Descubre vendedores verificados de productos Avón en tu zona</p>
        </div>

        {/* Search and Filters */}
        <div className="mb-8 space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                type="text"
                placeholder="Buscar vendedores por nombre o ubicación..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>
            <div className="flex gap-2">
              <Button variant="outline" onClick={() => setShowFilters(!showFilters)}>
                <Filter className="h-4 w-4 mr-2" />
                Filtros
              </Button>
              <div className="flex border border-border rounded-md">
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "list" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("list")}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>

          {showFilters && <VendorFilters />}
        </div>

        {/* Results */}
        <div className="mb-4 text-sm text-muted-foreground">Mostrando {vendors.length} vendedores</div>

        <div
          className={`grid gap-6 ${viewMode === "grid" ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3" : "grid-cols-1"}`}
        >
          {vendors.map((vendor) => (
            <VendorCard key={vendor.id} vendor={vendor} viewMode={viewMode} />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  )
}
