import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Search, Sparkles, Users, ShoppingBag } from "lucide-react"

export function HeroSection() {
  return (
    <section className="relative bg-gradient-to-br from-card to-background py-20 px-4">
      <div className="container mx-auto text-center">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-2 bg-primary/10 px-4 py-2 rounded-full">
              <Sparkles className="h-5 w-5 text-primary" />
              <span className="text-primary font-medium">Feria Digital de Belleza</span>
            </div>
          </div>

          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-6 text-balance">
            Descubre productos de <span className="text-primary">belleza únicos</span> en nuestra feria digital
          </h1>

          <p className="text-xl text-muted-foreground mb-8 text-pretty max-w-2xl mx-auto">
            Conectamos vendedores ambulantes de Avón con clientes que buscan productos auténticos. Cada puesto digital
            es una oportunidad de encontrar tu producto perfecto.
          </p>

          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
              <Input
                type="text"
                placeholder="¿Qué producto de belleza buscas hoy?"
                className="pl-12 pr-4 py-4 text-lg bg-background border-2 border-border focus:border-primary rounded-xl"
              />
              <Button className="absolute right-2 top-1/2 transform -translate-y-1/2 px-6">Buscar</Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">150+</div>
              <div className="text-muted-foreground">Vendedores Activos</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <ShoppingBag className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">2,500+</div>
              <div className="text-muted-foreground">Productos Disponibles</div>
            </div>
            <div className="text-center">
              <div className="flex justify-center mb-2">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <div className="text-3xl font-bold text-foreground">98%</div>
              <div className="text-muted-foreground">Satisfacción Cliente</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
