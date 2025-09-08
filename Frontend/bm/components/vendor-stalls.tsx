"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ShoppingCart, Heart, Verified } from "lucide-react"

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
  },
  {
    id: 2,
    name: "Ana Rodríguez",
    location: "Roma Norte, CDMX",
    rating: 4.9,
    reviews: 89,
    products: 38,
    specialties: ["Maquillaje", "Skincare", "Fragancias"],
    verified: true,
    image: "/professional-woman-vendor.jpg",
    description: "Consultora de belleza certificada, productos originales garantizados",
  },
  {
    id: 3,
    name: "Carmen López",
    location: "Polanco, CDMX",
    rating: 4.7,
    reviews: 156,
    products: 52,
    specialties: ["Anti-edad", "Hidratantes", "Protección Solar"],
    verified: true,
    image: "/mature-woman-vendor-professional.jpg",
    description: "15 años vendiendo Avón, experta en cuidado de la piel",
  },
  {
    id: 4,
    name: "Sofía Martínez",
    location: "Condesa, CDMX",
    rating: 4.6,
    reviews: 73,
    products: 29,
    specialties: ["Juvenil", "Colores Vibrantes", "Tendencias"],
    verified: false,
    image: "/young-woman-vendor-trendy.jpg",
    description: "Vendedora joven especializada en las últimas tendencias de Avón",
  },
  {
    id: 5,
    name: "Patricia Hernández",
    location: "Coyoacán, CDMX",
    rating: 4.9,
    reviews: 203,
    products: 67,
    specialties: ["Productos Naturales", "Orgánicos", "Sensibles"],
    verified: true,
    image: "/middle-aged-woman-vendor-natural-products.jpg",
    description: "Especialista en productos naturales y para pieles sensibles",
  },
  {
    id: 6,
    name: "Lucía Torres",
    location: "Insurgentes Sur, CDMX",
    rating: 4.8,
    reviews: 94,
    products: 41,
    specialties: ["Perfumes", "Colonias", "Desodorantes"],
    verified: true,
    image: "/elegant-woman-vendor-perfumes.jpg",
    description: "Experta en fragancias Avón, amplio catálogo de perfumes",
  },
]

export function VendorStalls() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (vendorId: number) => {
    setFavorites((prev) => (prev.includes(vendorId) ? prev.filter((id) => id !== vendorId) : [...prev, vendorId]))
  }

  return (
    <section className="py-16 px-4 bg-background">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Nuestros Vendedores</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Cada puesto digital representa años de experiencia y pasión por la belleza. Conoce a nuestros vendedores
            verificados.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor) => (
            <Card key={vendor.id} className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
              <CardHeader className="pb-4">
                <div className="relative">
                  <img
                    src={vendor.image || "/placeholder.svg"}
                    alt={vendor.name}
                    className="w-20 h-20 rounded-full mx-auto mb-4 object-cover"
                  />
                  <Button
                    variant="ghost"
                    size="sm"
                    className="absolute top-0 right-0 p-2"
                    onClick={() => toggleFavorite(vendor.id)}
                  >
                    <Heart
                      className={`h-4 w-4 ${
                        favorites.includes(vendor.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                      }`}
                    />
                  </Button>
                </div>

                <div className="text-center">
                  <div className="flex items-center justify-center gap-2 mb-2">
                    <h3 className="text-lg font-semibold text-card-foreground">{vendor.name}</h3>
                    {vendor.verified && <Verified className="h-4 w-4 text-primary" />}
                  </div>

                  <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                    <MapPin className="h-3 w-3" />
                    {vendor.location}
                  </div>

                  <div className="flex items-center justify-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-card-foreground">{vendor.rating}</span>
                    <span className="text-sm text-muted-foreground">({vendor.reviews} reseñas)</span>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="pt-0">
                <p className="text-sm text-muted-foreground mb-4 text-center">{vendor.description}</p>

                <div className="mb-4">
                  <div className="flex flex-wrap gap-1 justify-center">
                    {vendor.specialties.map((specialty) => (
                      <Badge key={specialty} variant="secondary" className="text-xs">
                        {specialty}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="text-center text-sm text-muted-foreground mb-4">
                  <span className="font-medium text-card-foreground">{vendor.products}</span> productos disponibles
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" className="flex-1 bg-transparent" size="sm">
                    Ver Puesto
                  </Button>
                  <Button className="flex-1" size="sm">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Comprar
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todos los Vendedores
          </Button>
        </div>
      </div>
    </section>
  )
}
