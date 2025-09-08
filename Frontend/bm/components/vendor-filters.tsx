"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { X } from "lucide-react"

export function VendorFilters() {
  const [selectedLocations, setSelectedLocations] = useState<string[]>([])
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([])
  const [ratingRange, setRatingRange] = useState([4.0])
  const [verifiedOnly, setVerifiedOnly] = useState(false)

  const locations = [
    "Centro, CDMX",
    "Roma Norte, CDMX",
    "Polanco, CDMX",
    "Condesa, CDMX",
    "Coyoacán, CDMX",
    "Insurgentes Sur, CDMX",
  ]

  const specialties = [
    "Labiales",
    "Perfumes",
    "Cremas",
    "Maquillaje",
    "Skincare",
    "Fragancias",
    "Anti-edad",
    "Hidratantes",
    "Protección Solar",
  ]

  const toggleLocation = (location: string) => {
    setSelectedLocations((prev) => (prev.includes(location) ? prev.filter((l) => l !== location) : [...prev, location]))
  }

  const toggleSpecialty = (specialty: string) => {
    setSelectedSpecialties((prev) =>
      prev.includes(specialty) ? prev.filter((s) => s !== specialty) : [...prev, specialty],
    )
  }

  const clearAllFilters = () => {
    setSelectedLocations([])
    setSelectedSpecialties([])
    setRatingRange([4.0])
    setVerifiedOnly(false)
  }

  const activeFiltersCount =
    selectedLocations.length + selectedSpecialties.length + (ratingRange[0] > 4.0 ? 1 : 0) + (verifiedOnly ? 1 : 0)

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-card-foreground">Filtros</h3>
          {activeFiltersCount > 0 && (
            <Button variant="ghost" size="sm" onClick={clearAllFilters}>
              <X className="h-4 w-4 mr-1" />
              Limpiar ({activeFiltersCount})
            </Button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Location Filter */}
          <div>
            <h4 className="font-medium text-card-foreground mb-3">Ubicación</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {locations.map((location) => (
                <div key={location} className="flex items-center space-x-2">
                  <Checkbox
                    id={`location-${location}`}
                    checked={selectedLocations.includes(location)}
                    onCheckedChange={() => toggleLocation(location)}
                  />
                  <label htmlFor={`location-${location}`} className="text-sm text-muted-foreground cursor-pointer">
                    {location}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Specialties Filter */}
          <div>
            <h4 className="font-medium text-card-foreground mb-3">Especialidades</h4>
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {specialties.map((specialty) => (
                <div key={specialty} className="flex items-center space-x-2">
                  <Checkbox
                    id={`specialty-${specialty}`}
                    checked={selectedSpecialties.includes(specialty)}
                    onCheckedChange={() => toggleSpecialty(specialty)}
                  />
                  <label htmlFor={`specialty-${specialty}`} className="text-sm text-muted-foreground cursor-pointer">
                    {specialty}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Rating Filter */}
          <div>
            <h4 className="font-medium text-card-foreground mb-3">Calificación mínima: {ratingRange[0].toFixed(1)}</h4>
            <div className="px-2">
              <Slider
                value={ratingRange}
                onValueChange={setRatingRange}
                max={5}
                min={1}
                step={0.1}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>1.0</span>
                <span>5.0</span>
              </div>
            </div>
          </div>

          {/* Additional Filters */}
          <div>
            <h4 className="font-medium text-card-foreground mb-3">Otros</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox
                  id="verified-only"
                  checked={verifiedOnly}
                  onCheckedChange={(checked) => setVerifiedOnly(checked === true)}
                />
                <label htmlFor="verified-only" className="text-sm text-muted-foreground cursor-pointer">
                  Solo vendedores verificados
                </label>
              </div>
            </div>
          </div>
        </div>

        {/* Active Filters */}
        {activeFiltersCount > 0 && (
          <div className="mt-6 pt-6 border-t border-border">
            <h4 className="font-medium text-card-foreground mb-3">Filtros activos:</h4>
            <div className="flex flex-wrap gap-2">
              {selectedLocations.map((location) => (
                <Badge key={location} variant="secondary" className="cursor-pointer">
                  {location}
                  <X className="h-3 w-3 ml-1" onClick={() => toggleLocation(location)} />
                </Badge>
              ))}
              {selectedSpecialties.map((specialty) => (
                <Badge key={specialty} variant="secondary" className="cursor-pointer">
                  {specialty}
                  <X className="h-3 w-3 ml-1" onClick={() => toggleSpecialty(specialty)} />
                </Badge>
              ))}
              {ratingRange[0] > 4.0 && (
                <Badge variant="secondary" className="cursor-pointer">
                  Rating ≥ {ratingRange[0].toFixed(1)}
                  <X className="h-3 w-3 ml-1" onClick={() => setRatingRange([4.0])} />
                </Badge>
              )}
              {verifiedOnly && (
                <Badge variant="secondary" className="cursor-pointer">
                  Verificados
                  <X className="h-3 w-3 ml-1" onClick={() => setVerifiedOnly(false)} />
                </Badge>
              )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
