# 🛍️ Idol World Store

Una tienda online especializada en productos K-pop con panel administrativo completo.

## ✨ Características

- 🎯 **Búsqueda gamificada** con filtros por grupo, miembro y categoría
- 📱 **Totalmente responsivo** (móvil y escritorio) 
- 💰 **Conversión automática** USD/ARS
- 📊 **Panel administrativo** completo con estadísticas
- 🔐 **Sistema de autenticación** seguro
- 🚀 **Performance optimizada** con Next.js 15

## 🛠️ Tecnologías

- **Frontend**: Next.js 15, React 18, TypeScript, Tailwind CSS
- **UI**: shadcn/ui, Lucide React, Recharts
- **Backend**: Next.js API Routes, Supabase (PostgreSQL)
- **Auth**: bcryptjs, JWT
- **Testing**: Playwright

## 🚀 Instalación

1. **Clonar el repositorio**
```bash
git clone https://github.com/pjcdz/idolworldstore.git
cd idolworldstore
```

2. **Instalar dependencias**
```bash
npm install
```

3. **Configurar variables de entorno**
```bash
cp .env.example .env.local
# Editar .env.local con tus credenciales de Supabase
```

4. **Ejecutar en desarrollo**
```bash
npm run dev
```

## 📱 Panel Administrativo

Accede a `/admin` con las credenciales:
- **Usuario**: `zaki`
- **Contraseña**: `sanailoveusomuch`

### Funcionalidades del Admin:
- ✅ Dashboard con estadísticas en tiempo real
- ✅ CRUD completo de productos
- ✅ Gestión de imágenes y tags
- ✅ Filtros avanzados
- ✅ Borrado lógico con restauración
- ✅ Gráficos interactivos

## 📂 Estructura del Proyecto

```
src/
├── app/
│   ├── admin/              # Panel administrativo
│   ├── api/               # API Routes
│   ├── layout.tsx         # Layout principal
│   └── page.tsx          # Página principal
├── components/
│   ├── admin-*.tsx       # Componentes del admin
│   ├── ui/              # Componentes de UI (shadcn)
│   └── *.tsx           # Componentes públicos
├── hooks/
│   ├── use-products.ts   # Hook para productos
│   └── use-exchange-rate.ts # Hook para tipo de cambio
├── lib/
│   ├── supabase.ts      # Cliente de Supabase
│   └── utils.ts         # Utilidades
└── middleware.ts        # Middleware de autenticación
```

## 🔒 Seguridad

- ✅ Contraseñas hasheadas con bcrypt
- ✅ Tokens JWT con expiración
- ✅ Middleware de protección
- ✅ Validación de datos
- ✅ Sanitización de inputs

## 🧪 Testing

```bash
# Ejecutar tests
npm run test

# Tests específicos
npx playwright test desktop-store.spec.ts
npx playwright test mobile-store.spec.ts
```

## 📦 Scripts Disponibles

```bash
npm run dev          # Desarrollo con Turbopack
npm run build        # Build de producción
npm run start        # Servidor de producción
npm run lint         # Linter
npm run test         # Tests con Playwright
```

## 🔧 Configuración

### Supabase
Asegúrate de tener las siguientes tablas en tu base de datos:

- `products` - Productos de la tienda
- `product_likes` - Sistema de likes
- Funciones RPC para likes

### Variables de Entorno

```env
NEXT_PUBLIC_SUPABASE_URL=tu_url_de_supabase
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_clave_anonima
ADMIN_USERNAME=tu_usuario_admin
```

## 🚀 Deployment

Este proyecto está optimizado para deployar en Vercel:

1. Conecta tu repositorio a Vercel
2. Configura las variables de entorno
3. Deploy automático en cada push

## 📄 Licencia

MIT License - ver [LICENSE](LICENSE) para más detalles.

## 🤝 Contribuir

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

**🎉 ¡Hecho con 💜 para la comunidad K-pop!**
