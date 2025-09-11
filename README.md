# 🎵 IdolWorldStore - K-pop Merchandise Platform

**IdolWorldStore** es una plataforma móvil especializada en merchandise de K-pop, diseñada exclusivamente para fans hispanos. Combina la experiencia de navegación de TikTok con mecánicas de crowdfunding para crear una comunidad donde los fans pueden descubrir, comprar y participar en group orders de sus productos favoritos.

## 🌟 Características Principales

### 📱 Experiencia Mobile-First
- **Diseño exclusivo para móvil** - Optimizado para navegación vertical
- **Interfaz tipo TikTok** - Scroll infinito y interacciones por gestos
- **Navegación por swipe** - Carruseles táctiles para imágenes de productos
- **Sin soporte desktop** - Enfoque 100% en la experiencia móvil

### 🛍️ Tres Secciones Principales

#### 1. **GOs (Group Orders)**
- Órdenes grupales para reducir costos de envío
- Sistema de participación con "likes" estilo TikTok
- Barras de progreso tipo Kickstarter
- Indicadores de entrega bi-mensuales (1ro y 15 de cada mes)

#### 2. **STORE**
- Catálogo de productos disponibles inmediatamente
- Sistema de inventario en tiempo real
- Carrito flotante accesible con el pulgar
- Indicadores de stock dinámicos

#### 3. **WISHes**
- Lista de deseos comunitaria
- Sistema de likes para validar demanda
- Creación colaborativa de futuros productos
- Algoritmo de popularidad para mostrar tendencias

### 🎮 Sistema de Búsqueda Gamificada
- **Paso 1:** Selección de grupo K-pop favorito
- **Paso 2:** Elección de miembro específico o "Todos"
- **Paso 3:** Filtrado por categoría (Albums, Light Sticks, Vinyl)
- **Resultado:** Productos perfectamente filtrados y existentes

### 🔄 Sugerencias Automáticas Rotativas
- Lo Más Popular (por likes)
- Recién Llegados (por fecha)
- Solo Albums de miembros solistas
- Colecciones por grupo
- Light Sticks oficiales
- Vinilos especiales
- Mejores precios

## 🚀 Comenzar el Desarrollo

### Prerequisitos
- Node.js 18+ 
- npm, yarn, pnpm o bun
- Base de datos Supabase configurada

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/pjcdz/idolworldstore.git
cd idolworldstore

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase

# Ejecutar servidor de desarrollo
npm run dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador móvil o usa las herramientas de desarrollador en modo móvil.

## 🛠️ Stack Tecnológico

- **Framework:** Next.js 15.3.3 con App Router
- **React:** React 19
- **Styling:** Tailwind CSS v4
- **UI Components:** ShadCN/UI (29 componentes instalados)
- **Base de Datos:** Supabase (PostgreSQL)
- **Estado:** React Hooks nativos
- **Autenticación:** Supabase Auth
- **Deployment:** Vercel

## 📁 Estructura del Proyecto

```
src/
├── app/                    # App Router de Next.js
│   ├── api/               # Endpoints de API
│   │   ├── exchange-rate/ # Conversión de monedas
│   │   ├── groups/        # Grupos K-pop y miembros
│   │   ├── likes/         # Sistema de likes
│   │   ├── products/      # Gestión de productos
│   │   └── tags/          # Sistema de etiquetas
│   ├── globals.css        # Estilos globales
│   ├── layout.tsx         # Layout principal
│   └── page.tsx           # Página principal
├── components/            # Componentes React
│   ├── ui/               # Componentes ShadCN/UI
│   ├── gamified-search.tsx    # Búsqueda gamificada
│   ├── product-image-carousel.tsx # Carrusel de imágenes
│   ├── delivery-indicator.tsx     # Indicador de entregas
│   └── [otros componentes]
├── hooks/                # Custom React Hooks
│   ├── use-products.ts   # Hook para productos
│   ├── use-likes.ts      # Hook para sistema de likes
│   └── use-exchange-rate.ts # Hook para conversión
└── lib/                  # Utilidades y configuración
    ├── supabase.ts       # Cliente de Supabase
    ├── utils.ts          # Utilidades generales
    └── like-store.ts     # Store para likes
```

## 🎯 Características Implementadas

### ✅ Sistema de Group Orders (GOs)
- Cards móviles optimizadas con imágenes grandes
- Barras de progreso para participación
- Sistema de likes con animaciones
- Indicador de entrega bi-mensual
- Badges para productos populares

### ✅ Tienda de Productos
- Catálogo con sistema de stock dinámico
- Carrito flotante accesible
- Indicadores de inventario por colores
- Sistema de likes consistente
- Badges múltiples (Popular, Nuevo, Envío Gratis)

### ✅ Sistema de Búsqueda Gamificada
- APIs inteligentes para grupos y miembros
- Filtros que solo muestran contenido existente
- Estadísticas en tiempo real
- Sugerencias rotativas automáticas

### ✅ Componentes Móviles Avanzados
- Carrusel de imágenes con swipe nativo
- Navegación por gestos táctiles
- Indicadores visuales mejorados
- Animaciones suaves y feedback visual

## 📖 Documentación Adicional

- **[PROJECT_PLAN.md](./PROJECT_PLAN.md)** - Plan completo del proyecto y roadmap
- **[SISTEMA_COMPLETO.md](./SISTEMA_COMPLETO.md)** - Documentación del sistema gamificado
- **[SWIPE_CAROUSEL_UPDATE.md](./SWIPE_CAROUSEL_UPDATE.md)** - Actualización del carrusel móvil
- **[ShadCN-context.md](./ShadCN-context.md)** - Contexto de componentes UI
- **[PROMPT_PRODUCTOS.md](./PROMPT_PRODUCTOS.md)** - Guía para agregar productos

## 🔧 Scripts Disponibles

```bash
# Desarrollo
npm run dev          # Servidor de desarrollo
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linting con ESLint

# Base de datos
npm run db:reset     # Resetear base de datos
npm run db:seed      # Poblar con datos de ejemplo
```

## 🌍 Variables de Entorno

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key

# API Externa (opcional)
NEXT_PUBLIC_EXCHANGE_API=api_de_conversion_de_moneda
```

## 🚀 Deployment

Este proyecto está optimizado para deployment en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push a `main`

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🎵 Inspiración

Creado con amor para la comunidad K-pop hispana. Combina la adicción de TikTok con la pasión por coleccionar merchandise de nuestros grupos favoritos.

---

**¡Únete a la revolución del K-pop shopping! 🌟**
