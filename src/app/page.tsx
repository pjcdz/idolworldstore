import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

export default function Home() {
  return (
    <div className="container mx-auto p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tighter">IdolWorldStore</h1>
        <p className="text-xl text-muted-foreground">
          Next.js 15 + Tailwind CSS v4 + ShadCN/UI + React 19
        </p>
        <div className="flex gap-2 justify-center">
          <Badge variant="default">Next.js 15</Badge>
          <Badge variant="secondary">Tailwind v4</Badge>
          <Badge variant="outline">ShadCN/UI</Badge>
          <Badge variant="destructive">React 19</Badge>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Card con formulario */}
        <Card>
          <CardHeader>
            <CardTitle>Formulario de Ejemplo</CardTitle>
            <CardDescription>
              Prueba los componentes de formulario instalados
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input id="email" type="email" placeholder="tu@email.com" />
            </div>
            <div className="space-y-2">
              <Label htmlFor="name">Nombre</Label>
              <Input id="name" type="text" placeholder="Tu nombre" />
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Enviar</Button>
          </CardFooter>
        </Card>

        {/* Card con botones */}
        <Card>
          <CardHeader>
            <CardTitle>Variantes de Botones</CardTitle>
            <CardDescription>
              Diferentes estilos de botones disponibles
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <Button className="w-full" variant="default">
              Default
            </Button>
            <Button className="w-full" variant="secondary">
              Secondary
            </Button>
            <Button className="w-full" variant="outline">
              Outline
            </Button>
            <Button className="w-full" variant="ghost">
              Ghost
            </Button>
          </CardContent>
        </Card>

        {/* Card con dialog */}
        <Card>
          <CardHeader>
            <CardTitle>Modal Dialog</CardTitle>
            <CardDescription>
              Ejemplo de componente dialog (modal)
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" className="w-full">
                  Abrir Modal
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>¿Estás seguro?</DialogTitle>
                  <DialogDescription>
                    Este es un ejemplo de modal usando el componente Dialog de
                    ShadCN. Funciona perfectamente con React 19 y Tailwind CSS
                    v4.
                  </DialogDescription>
                </DialogHeader>
                <div className="flex gap-2 justify-end pt-4">
                  <Button variant="outline">Cancelar</Button>
                  <Button>Confirmar</Button>
                </div>
              </DialogContent>
            </Dialog>
          </CardContent>
        </Card>
      </div>

      {/* Status del proyecto */}
      <Card>
        <CardHeader>
          <CardTitle>Estado del Proyecto</CardTitle>
          <CardDescription>
            Configuración completada exitosamente
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Next.js 15.3.3</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>Tailwind CSS v4</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>ShadCN/UI</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full"></div>
              <span>React 19</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
