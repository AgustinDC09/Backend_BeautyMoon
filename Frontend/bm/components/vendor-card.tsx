"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, MapPin, ShoppingCart, Heart, Verified, Calendar, TrendingUp } from "lucide-react"

interface Vendor {
  id: number
  name: string
  location: string
  rating: number
  reviews: number
  products: number
  specialties: string[]
  verified: boolean
  image: string
  description: string
  joinedDate: string
  totalSales: number
}

interface VendorCardProps {
  vendor: Vendor
  viewMode: "grid" | "list"
}

export function VendorCard({ vendor, viewMode }: VendorCardProps) {
  const [isFavorite, setIsFavorite] = useState(false)

  if (viewMode === "list") {
    return (
      <Card className="hover:shadow-lg transition-all duration-300 bg-card border-border">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-shrink-0">
              <img
                src={vendor.image || "/placeholder.svg"}
                alt={vendor.name}
                className="w-24 h-24 rounded-full object-cover mx-auto md:mx-0"
              />
            </div>

            <div className="flex-1 space-y-4">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-semibold text-card-foreground">{vendor.name}</h3>
                    {vendor.verified && <Verified className="h-5 w-5 text-primary" />}
                  </div>

                  <div className="flex items-center gap-1 text-muted-foreground mb-2">
                    <MapPin className="h-4 w-4" />
                    {vendor.location}
                  </div>

                  <div className="flex items-center gap-1 mb-3">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="font-medium text-card-foreground">{vendor.rating}</span>
                    <span className="text-sm text-muted-foreground">({vendor.reviews} reseñas)</span>
                  </div>
                </div>

                <Button variant="ghost" size="sm" onClick={() => setIsFavorite(!isFavorite)}>
                  <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
                </Button>
              </div>

              <p className="text-muted-foreground">{vendor.description}</p>

              <div className="flex flex-wrap gap-2">
                {vendor.specialties.map((specialty) => (
                  <Badge key={specialty} variant="secondary" className="text-xs">
                    {specialty}
                  </Badge>
                ))}
              </div>

              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                <div className="flex gap-6 text-sm text-muted-foreground">
                  <div className="flex items-center gap-1">
                    <ShoppingCart className="h-4 w-4" />
                    <span className="font-medium text-card-foreground">{vendor.products}</span> productos
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    Desde {vendor.joinedDate}
                  </div>
                  <div className="flex items-center gap-1">
                    <TrendingUp className="h-4 w-4" />
                    <span className="font-medium text-card-foreground">{vendor.totalSales}</span> ventas
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    Ver Puesto
                  </Button>
                  <Button size="sm">
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Comprar
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 bg-card border-border">
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
            onClick={() => setIsFavorite(!isFavorite)}
          >
            <Heart className={`h-4 w-4 ${isFavorite ? "fill-red-500 text-red-500" : "text-muted-foreground"}`} />
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
  )
}
