# ShadCN Components Used

This file tracks all ShadCN/UI components installed and used in this project.

## Project Information

- **Project Name**: IdolWorldStore
- **Framework**: Next.js 15.3.3 with App Router
- **Styling**: Tailwind CSS v4 with PostCSS
- **UI Library**: ShadCN/UI
- **React Version**: React 19
- **TypeScript**: Enabled
- **Target**: Mobile-First/Mobile-Only K-pop Store
- **Last Updated**: June 1, 2025

## Installed Components

### Core Utilities

- **utils.ts** (`src/lib/utils.ts`) - Core utility functions for ShadCN components (automatically installed during init)
- **use-toast.ts** (`src/hooks/use-toast.ts`) - Hook for managing toast notifications

### UI Components - Complete Mobile-First E-commerce Suite

#### ✅ Basic Components

- **button** (`src/components/ui/button.tsx`) - Basic button component with variants (default, destructive, outline, secondary, ghost, link)
- **badge** (`src/components/ui/badge.tsx`) - Badge/tag component with variants (default, secondary, destructive, outline)
- **input** (`src/components/ui/input.tsx`) - Form input component with proper styling and focus states
- **label** (`src/components/ui/label.tsx`) - Form label component with proper accessibility attributes

#### ✅ Layout & Navigation

- **card** (`src/components/ui/card.tsx`) - Card component for content containers (Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent)
- **navigation-menu** (`src/components/ui/navigation-menu.tsx`) - Advanced navigation menu component for site navigation
- **dropdown-menu** (`src/components/ui/dropdown-menu.tsx`) - ✅ USED - Dropdown menu component for user menus, filters, and actions. Used in DeliveryIndicator for chronogram details.
- **tabs** (`src/components/ui/tabs.tsx`) - Tab navigation component for product details, descriptions, and categories
- **sheet** (`src/components/ui/sheet.tsx`) - Sheet/drawer component for mobile cart, filters sidebar, and overlay panels
- **drawer** (`src/components/ui/drawer.tsx`) - ✅ NEW - Native mobile drawer for enhanced mobile UX (bottom sheets, slide-up panels)
- **breadcrumb** (`src/components/ui/breadcrumb.tsx`) - Breadcrumb navigation for hierarchical product categories
- **separator** (`src/components/ui/separator.tsx`) - ✅ USED - Visual separator component for clean content division. Used in DeliveryIndicator dropdown for section separation.

#### ✅ Data Display

- **table** (`src/components/ui/table.tsx`) - Data table component for product listings, orders, and admin panels
- **avatar** (`src/components/ui/avatar.tsx`) - User avatar component for profiles, reviews, and testimonials
- **accordion** (`src/components/ui/accordion.tsx`) - Accordion component for FAQs, product specifications, and expandable content
- **skeleton** (`src/components/ui/skeleton.tsx`) - Loading skeleton for better UX while content loads
- **progress** (`src/components/ui/progress.tsx`) - Progress bars for checkout steps, uploads, and loading states
- **carousel** (`src/components/ui/carousel.tsx`) - ✅ NEW - Touch-friendly carousel for mobile product galleries, featured albums

#### ✅ Forms & Input

- **form** (`src/components/ui/form.tsx`) - Complete form components with validation (essential for checkout and user registration)
- **select** (`src/components/ui/select.tsx`) - Select dropdown component for product options, sizes, colors, and filters
- **dialog** (`src/components/ui/dialog.tsx`) - Modal dialog component for confirmations, product quick views, and forms
- **checkbox** (`src/components/ui/checkbox.tsx`) - Checkbox component for filters, terms acceptance, and multi-selections
- **calendar** (`src/components/ui/calendar.tsx`) - Calendar component for delivery dates, events, and date selection
- **slider** (`src/components/ui/slider.tsx`) - Slider component for price ranges, quantity selectors, and interactive controls
- **radio-group** (`src/components/ui/radio-group.tsx`) - Radio button groups for payment methods, shipping options, album versions

#### ✅ Feedback & Notifications

- **toast** (`src/components/ui/toast.tsx`) - Toast notification component for user feedback
- **toaster** (`src/components/ui/toaster.tsx`) - Global toast container for displaying notifications
- **alert** (`src/components/ui/alert.tsx`) - Alert component for important messages and system notifications
- **alert-dialog** (`src/components/ui/alert-dialog.tsx`) - Alert dialog for critical confirmations and destructive actions

#### ✅ Advanced Components

- **popover** (`src/components/ui/popover.tsx`) - Popover component for tooltips, quick info, and contextual menus
- **command** (`src/components/ui/command.tsx`) - Command palette for advanced search with keyboard shortcuts

## Component File Structure

```
src/
├── components/
│   └── ui/
│       ├── accordion.tsx        ✅
│       ├── alert.tsx           ✅
│       ├── alert-dialog.tsx    ✅
│       ├── avatar.tsx          ✅
│       ├── badge.tsx           ✅
│       ├── breadcrumb.tsx      ✅
│       ├── button.tsx          ✅
│       ├── calendar.tsx        ✅
│       ├── card.tsx            ✅
│       ├── carousel.tsx        ✅ NEW - Mobile-first product sliders
│       ├── checkbox.tsx        ✅
│       ├── command.tsx         ✅
│       ├── dialog.tsx          ✅
│       ├── drawer.tsx          ✅ NEW - Native mobile navigation
│       ├── dropdown-menu.tsx   ✅ USED - Used in DeliveryIndicator for chronogram details.
│       ├── form.tsx            ✅
│       ├── input.tsx           ✅
│       ├── label.tsx           ✅
│       ├── navigation-menu.tsx ✅
│       ├── popover.tsx         ✅
│       ├── progress.tsx        ✅
│       ├── radio-group.tsx     ✅
│       ├── select.tsx          ✅
│       ├── separator.tsx       ✅ USED - Used in DeliveryIndicator dropdown for section separation.
│       ├── sheet.tsx           ✅
│       ├── skeleton.tsx        ✅
│       ├── slider.tsx          ✅
│       ├── table.tsx           ✅
│       ├── tabs.tsx            ✅
│       ├── toast.tsx           ✅
│       └── toaster.tsx         ✅
├── hooks/
│   └── use-toast.ts            ✅
└── lib/
    └── utils.ts                ✅
```

## Installation Status

✅ **29 components installed** successfully with React 19 using `--force` flag
✅ Next.js configuration updated to use stable Turbopack
✅ Tailwind CSS v4 properly configured with PostCSS
✅ All components working with TypeScript and React 19
✅ **Complete Mobile-First K-pop E-commerce Suite Ready**

## Mobile-First K-pop Store Specific Use Cases

### 📱 Drawer Component Examples - Native Mobile UX

#### 🛒 Mobile Shopping Cart

```tsx
// Carrito deslizable desde abajo - UX nativa móvil
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

export function MobileCart() {
  const [cartItems, setCartItems] = useState([]);
  const cartTotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button
          className="fixed bottom-4 right-4 rounded-full h-14 w-14"
          size="icon"
        >
          <ShoppingBag className="h-6 w-6" />
          {cartItems.length > 0 && (
            <Badge className="absolute -top-2 -right-2 h-6 w-6 rounded-full">
              {cartItems.length}
            </Badge>
          )}
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[80vh]">
        <DrawerHeader>
          <DrawerTitle>Tu Carrito K-pop 🛍️</DrawerTitle>
          <DrawerDescription>
            {cartItems.length} productos • ${cartTotal.toFixed(2)}
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 overflow-y-auto">
          {cartItems.length === 0 ? (
            <div className="text-center py-8">
              <ShoppingBag className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
              <p className="text-muted-foreground">Tu carrito está vacío</p>
              <p className="text-sm text-muted-foreground">
                ¡Agrega algunos albums increíbles!
              </p>
            </div>
          ) : (
            <div className="space-y-4">
              {cartItems.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center space-x-3 bg-muted/50 rounded-lg p-3"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="h-16 w-16 rounded-lg object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium truncate">{item.name}</h4>
                    <p className="text-sm text-muted-foreground">
                      {item.group}
                    </p>
                    <p className="text-sm font-medium">${item.price}</p>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center text-sm">
                      {item.quantity}
                    </span>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cartItems.length > 0 && (
          <DrawerFooter>
            <div className="space-y-3">
              <div className="flex justify-between items-center text-lg font-semibold">
                <span>Total:</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <Button className="w-full" size="lg">
                Proceder al Checkout 🎵
              </Button>
              <DrawerTrigger asChild>
                <Button variant="outline" className="w-full">
                  Continuar Comprando
                </Button>
              </DrawerTrigger>
            </div>
          </DrawerFooter>
        )}
      </DrawerContent>
    </Drawer>
  );
}
```

#### 🎛️ Mobile Filters Drawer

```tsx
// Filtros deslizables para búsqueda móvil
export function MobileFilters() {
  const [priceRange, setPriceRange] = useState([0, 100]);
  const [selectedGroups, setSelectedGroups] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  return (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="w-full">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </DrawerTrigger>
      <DrawerContent className="max-h-[90vh]">
        <DrawerHeader>
          <DrawerTitle>Filtros de Búsqueda</DrawerTitle>
          <DrawerDescription>
            Encuentra exactamente lo que buscas
          </DrawerDescription>
        </DrawerHeader>

        <div className="px-4 pb-4 space-y-6 overflow-y-auto">
          {/* Price Range */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Rango de Precio</Label>
            <Slider
              value={priceRange}
              onValueChange={setPriceRange}
              max={200}
              step={5}
              className="w-full"
            />
            <div className="flex justify-between text-sm text-muted-foreground">
              <span>${priceRange[0]}</span>
              <span>${priceRange[1]}</span>
            </div>
          </div>

          {/* Groups */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Grupos</Label>
            <div className="grid grid-cols-2 gap-2">
              {["BTS", "BLACKPINK", "NewJeans", "TWICE", "aespa", "ITZY"].map(
                (group) => (
                  <div key={group} className="flex items-center space-x-2">
                    <Checkbox
                      id={group}
                      checked={selectedGroups.includes(group)}
                      onCheckedChange={(checked) => {
                        if (checked) {
                          setSelectedGroups([...selectedGroups, group]);
                        } else {
                          setSelectedGroups(
                            selectedGroups.filter((g) => g !== group)
                          );
                        }
                      }}
                    />
                    <Label htmlFor={group} className="text-sm">
                      {group}
                    </Label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Categories */}
          <div className="space-y-3">
            <Label className="text-base font-medium">Categorías</Label>
            <div className="space-y-2">
              {[
                "Albums",
                "Photocards",
                "Merchandise",
                "Lightsticks",
                "Posters",
              ].map((category) => (
                <div key={category} className="flex items-center space-x-2">
                  <Checkbox
                    id={category}
                    checked={selectedCategories.includes(category)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setSelectedCategories([
                          ...selectedCategories,
                          category,
                        ]);
                      } else {
                        setSelectedCategories(
                          selectedCategories.filter((c) => c !== category)
                        );
                      }
                    }}
                  />
                  <Label htmlFor={category} className="text-sm">
                    {category}
                  </Label>
                </div>
              ))}
            </div>
          </div>
        </div>

        <DrawerFooter>
          <div className="flex space-x-3">
            <Button variant="outline" className="flex-1">
              Limpiar Filtros
            </Button>
            <DrawerTrigger asChild>
              <Button className="flex-1">Aplicar Filtros</Button>
            </DrawerTrigger>
          </div>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
}
```

### 🎠 Carousel Component Examples - Touch-Friendly Sliders

#### 🌟 Featured Albums Carousel

```tsx
// Carousel principal de albums destacados
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

export function FeaturedAlbumsCarousel() {
  const featuredAlbums = [
    {
      id: 1,
      title: "NewJeans - Get Up",
      group: "NewJeans",
      image: "/albums/newjeans-getup.jpg",
      price: 29.99,
      isPreorder: true,
      releaseDate: "2024-07-21",
    },
    {
      id: 2,
      title: "aespa - MY WORLD",
      group: "aespa",
      image: "/albums/aespa-myworld.jpg",
      price: 34.99,
      isSigned: true,
    },
    // ... más albums
  ];

  return (
    <div className="px-4 py-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold">Albums Destacados 🔥</h2>
        <Button variant="ghost" size="sm">
          Ver Todos
          <ChevronRight className="h-4 w-4 ml-1" />
        </Button>
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-2 md:-ml-4">
          {featuredAlbums.map((album) => (
            <CarouselItem
              key={album.id}
              className="pl-2 md:pl-4 basis-4/5 sm:basis-1/2 md:basis-1/3"
            >
              <Card className="overflow-hidden">
                <div className="relative">
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-48 object-cover"
                  />
                  {album.isPreorder && (
                    <Badge
                      className="absolute top-2 left-2"
                      variant="destructive"
                    >
                      Pre-order
                    </Badge>
                  )}
                  {album.isSigned && (
                    <Badge className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500">
                      ✨ Firmado
                    </Badge>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold truncate">{album.title}</h3>
                  <p className="text-sm text-muted-foreground mb-2">
                    {album.group}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold">${album.price}</span>
                    <Button size="sm">
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-2" />
        <CarouselNext className="right-2" />
      </Carousel>
    </div>
  );
}
```

#### 📷 Product Image Gallery

```tsx
// Galería de imágenes del producto con thumbnails
export function ProductImageCarousel({ images, productName }) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image Carousel */}
      <Carousel
        opts={{ align: "center" }}
        className="w-full"
        setApi={(api) => {
          api?.on("select", () => {
            setSelectedImage(api.selectedScrollSnap());
          });
        }}
      >
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative aspect-square">
                <img
                  src={image.url}
                  alt={`${productName} - Imagen ${index + 1}`}
                  className="w-full h-full object-cover rounded-lg"
                />
                {image.label && (
                  <Badge className="absolute bottom-2 right-2">
                    {image.label}
                  </Badge>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      {/* Thumbnail Navigation */}
      <div className="flex space-x-2 overflow-x-auto pb-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={cn(
              "flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-colors",
              selectedImage === index ? "border-primary" : "border-muted"
            )}
          >
            <img
              src={image.url}
              alt={`Thumbnail ${index + 1}`}
              className="w-full h-full object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
```

#### 🎵 Groups Showcase

```tsx
// Showcase de grupos K-pop populares
export function PopularGroupsCarousel() {
  const popularGroups = [
    { name: "BTS", image: "/groups/bts.jpg", albums: 15, color: "purple" },
    {
      name: "BLACKPINK",
      image: "/groups/blackpink.jpg",
      albums: 8,
      color: "pink",
    },
    {
      name: "NewJeans",
      image: "/groups/newjeans.jpg",
      albums: 3,
      color: "blue",
    },
    { name: "aespa", image: "/groups/aespa.jpg", albums: 6, color: "green" },
    { name: "TWICE", image: "/groups/twice.jpg", albums: 20, color: "orange" },
    { name: "ITZY", image: "/groups/itzy.jpg", albums: 12, color: "yellow" },
  ];

  return (
    <div className="px-4 py-6">
      <h2 className="text-2xl font-bold mb-4">Grupos Populares 🌟</h2>

      <Carousel
        opts={{
          align: "start",
          dragFree: true,
        }}
        className="w-full"
      >
        <CarouselContent className="-ml-3">
          {popularGroups.map((group) => (
            <CarouselItem
              key={group.name}
              className="pl-3 basis-1/3 sm:basis-1/4"
            >
              <Card className="overflow-hidden cursor-pointer hover:scale-105 transition-transform">
                <div className="relative">
                  <div className="aspect-square relative">
                    <img
                      src={group.image}
                      alt={group.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-2 left-2 right-2">
                      <h3 className="text-white font-bold text-sm truncate">
                        {group.name}
                      </h3>
                      <p className="text-white/80 text-xs">
                        {group.albums} albums
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
```

### 📱 Complete Mobile Navigation Example

```tsx
// Navegación principal móvil combinando Drawer + Carousel
export function MobileNavigation() {
  return (
    <div className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="ghost" size="icon">
              <Menu className="h-6 w-6" />
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Menu Principal</DrawerTitle>
            </DrawerHeader>
            <div className="px-4 pb-4 space-y-2">
              <Button variant="ghost" className="w-full justify-start">
                <Home className="h-4 w-4 mr-2" />
                Inicio
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Music className="h-4 w-4 mr-2" />
                Albums
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Users className="h-4 w-4 mr-2" />
                Grupos
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Star className="h-4 w-4 mr-2" />
                Merchandise
              </Button>
              <Button variant="ghost" className="w-full justify-start">
                <Heart className="h-4 w-4 mr-2" />
                Wishlist
              </Button>
            </div>
          </DrawerContent>
        </Drawer>

        <h1 className="text-xl font-bold">IdolWorld 🎵</h1>

        <Button variant="ghost" size="icon">
          <Search className="h-6 w-6" />
        </Button>
      </div>
    </div>
  );
}
```
