"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, Heart, Eye } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Labial Mate Ultra Duración",
    brand: "Avón True",
    price: 189,
    originalPrice: 249,
    rating: 4.7,
    reviews: 89,
    vendor: "María González",
    vendorLocation: "Centro, CDMX",
    image: "/red-lipstick-avon-cosmetic-product.jpg",
    category: "Labiales",
    inStock: true,
    discount: 24,
  },
  {
    id: 2,
    name: "Perfume Far Away Rebel",
    brand: "Avón",
    price: 459,
    originalPrice: 599,
    rating: 4.9,
    reviews: 156,
    vendor: "Ana Rodríguez",
    vendorLocation: "Roma Norte, CDMX",
    image: "/elegant-perfume-bottle-avon-far-away.jpg",
    category: "Perfumes",
    inStock: true,
    discount: 23,
  },
  {
    id: 3,
    name: "Crema Anti-Edad Anew",
    brand: "Avón Anew",
    price: 329,
    originalPrice: 429,
    rating: 4.8,
    reviews: 203,
    vendor: "Carmen López",
    vendorLocation: "Polanco, CDMX",
    image: "/anti-aging-cream-jar-avon-anew.jpg",
    category: "Skincare",
    inStock: true,
    discount: 23,
  },
  {
    id: 4,
    name: "Máscara de Pestañas SuperShock",
    brand: "Avón True",
    price: 149,
    originalPrice: 199,
    rating: 4.6,
    reviews: 127,
    vendor: "Sofía Martínez",
    vendorLocation: "Condesa, CDMX",
    image: "/black-mascara-tube-avon-supershock.jpg",
    category: "Maquillaje",
    inStock: true,
    discount: 25,
  },
  {
    id: 5,
    name: "Protector Solar Planet Spa",
    brand: "Avón Planet Spa",
    price: 219,
    originalPrice: 289,
    rating: 4.5,
    reviews: 94,
    vendor: "Patricia Hernández",
    vendorLocation: "Coyoacán, CDMX",
    image: "/sunscreen-bottle-avon-planet-spa.jpg",
    category: "Protección Solar",
    inStock: true,
    discount: 24,
  },
  {
    id: 6,
    name: "Colonia Mesmerize Black",
    brand: "Avón",
    price: 389,
    originalPrice: 499,
    rating: 4.7,
    reviews: 78,
    vendor: "Lucía Torres",
    vendorLocation: "Insurgentes Sur, CDMX",
    image: "/black-cologne-bottle-avon-mesmerize.jpg",
    category: "Fragancias",
    inStock: true,
    discount: 22,
  },
]

export function FeaturedProducts() {
  const [favorites, setFavorites] = useState<number[]>([])

  const toggleFavorite = (productId: number) => {
    setFavorites((prev) => (prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]))
  }

  return (
    <section className="py-16 px-4 bg-muted/30">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">Productos Destacados</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Los productos más populares de nuestros vendedores verificados. Calidad garantizada y precios especiales.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.map((product) => (
            <Card
              key={product.id}
              className="group hover:shadow-lg transition-all duration-300 bg-card border-border overflow-hidden"
            >
              <CardHeader className="p-0 relative">
                <div className="relative overflow-hidden">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Discount Badge */}
                  {product.discount > 0 && (
                    <Badge className="absolute top-3 left-3 bg-destructive text-destructive-foreground">
                      -{product.discount}%
                    </Badge>
                  )}

                  {/* Action Buttons */}
                  <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Button
                      variant="secondary"
                      size="sm"
                      className="p-2 h-8 w-8"
                      onClick={() => toggleFavorite(product.id)}
                    >
                      <Heart
                        className={`h-4 w-4 ${
                          favorites.includes(product.id) ? "fill-red-500 text-red-500" : "text-muted-foreground"
                        }`}
                      />
                    </Button>
                    <Button variant="secondary" size="sm" className="p-2 h-8 w-8">
                      <Eye className="h-4 w-4" />
                    </Button>
                  </div>

                  {/* Stock Status */}
                  {!product.inStock && (
                    <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                      <Badge variant="destructive">Agotado</Badge>
                    </div>
                  )}
                </div>
              </CardHeader>

              <CardContent className="p-4">
                <div className="mb-2">
                  <Badge variant="outline" className="text-xs mb-2">
                    {product.category}
                  </Badge>
                  <h3 className="font-semibold text-card-foreground text-lg mb-1 line-clamp-2">{product.name}</h3>
                  <p className="text-sm text-muted-foreground mb-2">{product.brand}</p>
                </div>

                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium text-card-foreground text-sm">{product.rating}</span>
                  <span className="text-xs text-muted-foreground">({product.reviews})</span>
                </div>

                <div className="mb-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xl font-bold text-primary">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Vendido por <span className="font-medium text-card-foreground">{product.vendor}</span>
                  </div>
                  <div className="text-xs text-muted-foreground">{product.vendorLocation}</div>
                </div>

                <Button className="w-full" disabled={!product.inStock} size="sm">
                  <ShoppingCart className="h-4 w-4 mr-2" />
                  {product.inStock ? "Agregar al Carrito" : "Agotado"}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button variant="outline" size="lg">
            Ver Todos los Productos
          </Button>
        </div>
      </div>
    </section>
  )
}
