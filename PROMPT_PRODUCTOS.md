# 🚀 PROMPT UNIVERSAL PARA AGREGAR PRODUCTOS K-POP

## 📋 Instrucción Principal:
Convierte la siguiente información de productos en un script SQL seguro que NO duplicará productos existentes ni reseteará likes.

## 🛡️ Estructura de Datos SEGURA:
```sql
INSERT INTO products (id, title, description, requester, images, price_usd, price_ars, category, tags, likes) VALUES 
(
  '[id-unico-kebab-case]',
  '[TITULO_COMPLETO]',
  '[DESCRIPCION_DETALLADA]',
  '[NOMBRE_REQUESTER]',
  ARRAY['[URL_IMAGEN_1]', '[URL_IMAGEN_2]', ...],
  [PRECIO_USD],
  [PRECIO_ARS],
  '[CATEGORIA]',
  ARRAY['[TAG1]', '[TAG2]', '[TAG3]', ...]
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price_usd = EXCLUDED.price_usd,
  price_ars = EXCLUDED.price_ars,
  images = EXCLUDED.images,
  tags = EXCLUDED.tags,
  updated_at = NOW();
```

## ✅ GARANTÍAS DE SEGURIDAD:
- **NO duplicará productos existentes**
- **NO reseteará likes existentes** 
- **Solo actualiza precios/info sin tocar likes**
- **Agrega productos nuevos con likes = 0**

## Reglas de Conversión:

### 1. ID único (kebab-case):
- Formato: `grupo-album/producto-version-especifica`
- Ejemplos: 
  - `twice-strategy-step1`
  - `stray-kids-karma-limited`
  - `blackpink-lightstick-v2`

### 2. Tags OBLIGATORIOS por orden de prioridad:
1. **GRUPO PRINCIPAL** (PRIMERA posición): 'TWICE', 'STRAY KIDS', 'TXT', 'BLACKPINK', 'NEWJEANS', etc.
2. **MIEMBRO** (si aplica): 'CHAEYOUNG', 'SANA', 'BANG CHAN', 'FELIX', etc.
3. **ALBUM/PRODUCTO**: 'STRATEGY', 'KARMA', 'LIL FANTASY', etc.
4. **VERSION**: 'Step 1', 'Limited', 'Standard', 'POB', etc.
5. **TIPO ESPECIAL**: 'Photobook', 'Digipack', 'Vinyl', 'Light Stick', etc.
6. **EXTRAS**: 'Exclusive', 'Set', 'Official', 'Limited Edition', etc.

### 3. Categorías válidas:
- `Albums` - Para todos los álbumes (mini, full, solo)
- `Light Sticks` - Para lightsticks oficiales
- `Vinyl` - Para vinilos especiales
- `Accessories` - Para otros artículos (photocards, pósters, etc.)

### 4. Requester naming convention:
- Usa nombres creativos que reflejen el tipo de fan
- Ejemplos: `OnceCollector`, `StayForever`, `MOALight`, `BlinkVinyl`

### 5. Descripción template:
"[Descripción técnica del producto]. [Detalles especiales de la versión]. [Contenido incluido o extras]."

## Datos de entrada requeridos:
```
Título: [TITULO_DEL_PRODUCTO]
Precio USD: $[PRECIO]
Precio ARS: $[PRECIO_ARS]
URL: [URL_AMAZON] 
Imágenes: [URL1], [URL2], [URL3]...
```

## Ejemplo de uso:
**INPUT:**
```
CHAEYOUNG LIL FANTASY vol.1 [Canvas Ver.] 1st Mini Album
$60 USD, $80,561 ARS
URL: https://a.co/d/1h3nm17
Imágenes: https://m.media-amazon.com/images/I/51XKuit1M+L._AC_SL1000_.jpg, https://m.media-amazon.com/images/I/61avyfCFixL._AC_SL1440_.jpg
```

**OUTPUT SEGURO:**
```sql
INSERT INTO products (id, title, description, requester, images, price_usd, price_ars, category, tags, likes) VALUES 
(
  'chaeyoung-lil-fantasy-canvas',
  'CHAEYOUNG LIL FANTASY vol.1 [Canvas Ver.] 1st Mini Album',
  'Primera edición en Canvas del mini álbum debut de Chaeyoung de TWICE. Edición limitada y coleccionable.',
  'TwiceCollector',
  ARRAY[
    'https://m.media-amazon.com/images/I/51XKuit1M+L._AC_SL1000_.jpg',
    'https://m.media-amazon.com/images/I/61avyfCFixL._AC_SL1440_.jpg'
  ],
  60.00,
  80561.00,
  'Albums',
  ARRAY['TWICE', 'CHAEYOUNG', 'Canvas', 'Mini Album', 'Limited Edition', 'Solo']
)
ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price_usd = EXCLUDED.price_usd,
  price_ars = EXCLUDED.price_ars,
  images = EXCLUDED.images,
  tags = EXCLUDED.tags,
  updated_at = NOW();
```

## Mapeo de Grupos a Miembros:

### TWICE:
'NAYEON', 'JEONGYEON', 'MOMO', 'SANA', 'JIHYO', 'MINA', 'DAHYUN', 'CHAEYOUNG', 'TZUYU'

### STRAY KIDS:
'BANG CHAN', 'LEE KNOW', 'CHANGBIN', 'HYUNJIN', 'HAN', 'FELIX', 'SEUNGMIN', 'I.N'

### TXT / TOMORROW X TOGETHER:
'YEONJUN', 'SOOBIN', 'BEOMGYU', 'TAEHYUN', 'HUENINGKAI'

### BLACKPINK:
'JISOO', 'JENNIE', 'ROSÉ', 'LISA'

### NEWJEANS:
'MINJI', 'HANNI', 'DANIELLE', 'HAERIN', 'HYEIN'

### ITZY:
'YEJI', 'LIA', 'RYUJIN', 'CHAERYEONG', 'YUNA'

### AESPA:
'KARINA', 'WINTER', 'GISELLE', 'NINGNING'

### IVE:
'YUJIN', 'GAEUL', 'REI', 'WONYOUNG', 'LIZ', 'LEESEO'

### (G)I-DLE:
'MIYEON', 'MINNIE', 'SOYEON', 'YUQI', 'SHUHUA'

### LE SSERAFIM:
'SAKURA', 'CHAEWON', 'YUNJIN', 'KAZUHA', 'EUNCHAE'

### NMIXX:
'LILY', 'HAEWON', 'SULLYOON', 'JINNI', 'BAE', 'JIWOO', 'KYUJIN'

## 🔧 Instrucción Final:
Toma los productos que te proporcione y conviértelos usando el formato SQL con `ON CONFLICT` para garantizar seguridad. Genera el SQL completo listo para ejecutar en Supabase.

---

## 📖 USAR ESTE PROMPT ASÍ:
1. **Copia este prompt completo**
2. **Agrega al final**: "Convierte estos productos de forma SEGURA: [PEGAR_LISTA_DE_PRODUCTOS]"
3. **El AI generará el SQL** usando `ON CONFLICT` para máxima seguridad
4. **Ejecuta el SQL en Supabase** sin miedo a duplicar o resetear likes

## 🎯 Beneficios:
- ✅ **100% Seguro** - Preserva datos existentes
- ✅ **Escalable** - Funciona con cualquier cantidad de productos  
- ✅ **Reutilizable** - Usar infinitas veces
- ✅ **Inteligente** - Tags automáticos optimizados para búsqueda
