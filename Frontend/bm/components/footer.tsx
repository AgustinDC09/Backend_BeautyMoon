import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-card border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                <span className="text-primary-foreground font-bold">BM</span>
              </div>
              <div>
                <h3 className="text-lg font-bold text-card-foreground">Beauty Moon</h3>
                <p className="text-xs text-muted-foreground">Feria Digital Avón</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              Conectamos vendedores ambulantes de Avón con clientes que buscan productos auténticos de belleza.
            </p>
            <div className="flex space-x-2">
              <Button variant="ghost" size="sm" className="p-2">
                <Facebook className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Instagram className="h-4 w-4" />
              </Button>
              <Button variant="ghost" size="sm" className="p-2">
                <Twitter className="h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-card-foreground">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Vendedores
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Productos
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Categorías
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ofertas
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Ayuda
                </a>
              </li>
            </ul>
          </div>

          {/* For Vendors */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-card-foreground">Para Vendedores</h4>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Crear Puesto
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Guía de Ventas
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Comisiones
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Soporte
                </a>
              </li>
              <li>
                <a href="#" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Políticas
                </a>
              </li>
            </ul>
          </div>

          {/* Contact & Newsletter */}
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-card-foreground">Contacto</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4" />
                <span>hola@beautymoon.mx</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4" />
                <span>+52 55 1234 5678</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4" />
                <span>Ciudad de México, México</span>
              </div>
            </div>

            <div className="space-y-2">
              <h5 className="text-sm font-medium text-card-foreground">Newsletter</h5>
              <div className="flex space-x-2">
                <Input type="email" placeholder="Tu email" className="text-sm bg-background" />
                <Button size="sm">Suscribir</Button>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 Beauty Moon. Todos los derechos reservados. |
            <a href="#" className="hover:text-primary transition-colors ml-1">
              Términos de Servicio
            </a>{" "}
            |
            <a href="#" className="hover:text-primary transition-colors ml-1">
              Privacidad
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
