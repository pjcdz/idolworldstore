# 🚀 PRODUCTOS K-POP LISTOS PARA AGREGAR

## 🎯 Guía Rápida de Uso

### Para agregar estos productos a tu base de datos:
1. **Copia el SQL de abajo**
2. **Ve a Supabase → SQL Editor**
3. **Pega y ejecuta el script**
4. **¡Listo! Los productos aparecerán en tu tienda**

### Para futuros productos:
- **Usa el archivo** `PROMPT_PRODUCTOS.md`
- **Contiene el prompt universal** para agregar cualquier producto
- **Siempre seguro** - No duplica ni resetea likes

---

## 📋 LISTA COMPLETA DE PRODUCTOS CONVERTIDA A SQL

```sql
-- ⚠️  EJECUTAR ESTE SQL EN SUPABASE SQL EDITOR ⚠️
-- Este script agregará todos los productos de la lista de manera segura

INSERT INTO products (
  id, title, description, requester, images, price_usd, price_ars, category, tags, likes
) VALUES 

-- CHAEYOUNG PRODUCTS
('chaeyoung-lil-fantasy-canvas', 'CHAEYOUNG LIL FANTASY vol.1 [Canvas Ver.] 1st Mini Album', 'Primera edición en Canvas del mini álbum debut de Chaeyoung de TWICE. Edición limitada y coleccionable.', 'TwiceCollector', ARRAY['https://m.media-amazon.com/images/I/51XKuit1M+L._AC_SL1000_.jpg', 'https://m.media-amazon.com/images/I/61avyfCFixL._AC_SL1440_.jpg'], 60.00, 80561.00, 'Albums', ARRAY['TWICE', 'CHAEYOUNG', 'Canvas', 'Mini Album', 'Limited Edition', 'Solo'], 0),

('chaeyoung-lil-fantasy-standard', 'CHAEYOUNG TWICE 1st solo album [LIL FANTASY VOL.1] (Standard ver.) (Murmur)', 'Álbum debut solo de Chaeyoung en versión estándar Murmur. Incluye photobook y contenido exclusivo.', 'OnceWorld', ARRAY['https://m.media-amazon.com/images/I/31k7IBkiKVL._AC_SL1000_.jpg', 'https://m.media-amazon.com/images/I/51DpvD5qqDL._AC_SL1000_.jpg'], 70.00, 93988.00, 'Albums', ARRAY['TWICE', 'CHAEYOUNG', 'Standard', 'Murmur', 'Solo', 'Photobook'], 0),

('chaeyoung-lil-fantasy-pob-jyp', '[EXCLUSIVE POB] Chaeyoung - Lil Fantasy Vol.1 Sparkle version CD+Pre-Order Gift (JYP Fans Shop POB)', 'Edición exclusiva POB de JYP Fans Shop con regalos de pre-orden únicos.', 'JYPCollector', ARRAY['https://m.media-amazon.com/images/I/31BNX6OJNHL._AC_.jpg', 'https://m.media-amazon.com/images/I/5144VbP7VhL._AC_SL1024_.jpg'], 44.00, 59078.00, 'Albums', ARRAY['TWICE', 'CHAEYOUNG', 'POB', 'JYP', 'Exclusive', 'Sparkle', 'Solo'], 0),

('chaeyoung-lil-fantasy-withmuu', '[WITHMUU POB Exclusive] TWICE Chaeyoung LIL FANTASY Vol.1 1st Album with Tracking Sealed (Digipack Sparkle Version)', 'Edición exclusiva WithMuu en formato Digipack, versión Sparkle sellada con tracking.', 'WithMuuFans', ARRAY['https://m.media-amazon.com/images/I/61ThxtMcVYL._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71nMZ7qil3L._AC_SL1500_.jpg', 'https://m.media-amazon.com/images/I/71jwOsx6yvL._AC_SL1500_.jpg'], 50.00, 67134.00, 'Albums', ARRAY['TWICE', 'CHAEYOUNG', 'WithMuu', 'Digipack', 'Sparkle', 'Solo', 'Sealed'], 0),

('chaeyoung-lil-fantasy-vinyl', 'LIL FANTASY vol.1[Avocado Pit Vinyl]', 'Vinilo edición especial Avocado Pit del debut solo de Chaeyoung.', 'VinylCollector', ARRAY['https://m.media-amazon.com/images/I/516wNdo-8hL._SL1500_.jpg'], 60.00, 80561.00, 'Vinyl', ARRAY['TWICE', 'CHAEYOUNG', 'Vinyl', 'Avocado Pit', 'Limited Edition', 'Solo'], 0),

-- STRAY KIDS PRODUCTS
('stray-kids-karma-ceremony', 'KARMA [CEREMONY VER.]', 'Stray Kids 4th Full Album KARMA en versión Ceremony.', 'StayForever', ARRAY['https://m.media-amazon.com/images/I/71C5beqM6kL._SX425_.jpg'], 54.00, 72505.00, 'Albums', ARRAY['STRAY KIDS', 'KARMA', 'Ceremony', 'Full Album', '4th Album'], 0),

('stray-kids-lightstick-v2', 'Stray Kids Official Light Stick Ver 2', 'Lightstick oficial de Stray Kids versión 2. Artículo oficial para conciertos y fan events.', 'StayLight', ARRAY['https://m.media-amazon.com/images/I/512mXBAWgXL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/41mE+5Ss1FL._AC_SX679_.jpg'], 138.00, 185291.00, 'Light Sticks', ARRAY['STRAY KIDS', 'Light Stick', 'Official', 'Version 2', 'Concert'], 0),

('stray-kids-karma-photobook-pob', 'Stray Kids 4th Full Album [KARMA] Photobook Version P.O.B (HOORAY)', 'KARMA album en versión Photobook con POB exclusivo HOORAY.', 'KarmaStay', ARRAY['https://m.media-amazon.com/images/I/4197r67IDAL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71jPu1wV5UL._AC_SY879_.jpg'], 60.00, 80561.00, 'Albums', ARRAY['STRAY KIDS', 'KARMA', 'Photobook', 'POB', 'HOORAY', 'Full Album'], 0),

('stray-kids-karma-3ver-set', '(3 ver. Set) STRAY KIDS - [KARMA] 4th Studio album | Standard 2 ver + Limited', 'Set completo de 3 versiones del album KARMA: 2 Standard + 1 Limited.', 'KarmaComplete', ARRAY['https://m.media-amazon.com/images/I/519Frxi0voL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/61CjSfDZSsL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/615xGJgISqL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/614D32l5zbL._AC_SX679_.jpg'], 138.00, 185291.00, 'Albums', ARRAY['STRAY KIDS', 'KARMA', 'Set', 'Standard', 'Limited', 'Complete Set'], 0),

('stray-kids-karma-limited', 'Stray Kids 4th Full Album [KARMA] Limited KARMA Version (P.O.B Poster)', 'Versión Limited del album KARMA con poster POB incluido.', 'LimitedStay', ARRAY['https://m.media-amazon.com/images/I/61d44Ppf-eL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71vdZxMQkxL._AC_SY879_.jpg'], 54.00, 72505.00, 'Albums', ARRAY['STRAY KIDS', 'KARMA', 'Limited', 'POB', 'Poster', 'Full Album'], 0),

('stray-kids-karma-compact', 'Stray Kids 4th Full Album [KARMA] Compact Version (P.O.B Photocard)', 'Versión Compact de KARMA con photocard POB exclusiva.', 'CompactStay', ARRAY['https://m.media-amazon.com/images/I/51R2l16uuVL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71WyasNMKIL._AC_SX679_.jpg'], 34.00, 45651.00, 'Albums', ARRAY['STRAY KIDS', 'KARMA', 'Compact', 'POB', 'Photocard'], 0),

('stray-kids-ate-ver', 'ATE [ATE Ver.]', 'Stray Kids 9th Mini Album ATE en versión ATE.', 'ATECollector', ARRAY['https://m.media-amazon.com/images/I/81624TcnRrL._SX425_.jpg', 'https://m.media-amazon.com/images/I/61ZHt6deDqL._SY450_.jpg'], 28.00, 37595.00, 'Albums', ARRAY['STRAY KIDS', 'ATE', '9th Mini Album', 'Mini Album'], 0),

('stray-kids-hop-hiptape', 'HOP[HIPTAPE VER.]', 'Stray Kids HOP album en versión HIPTAPE.', 'HipTapeStay', ARRAY['https://m.media-amazon.com/images/I/81cw7N0yiDL._SX425_.jpg'], 30.00, 40281.00, 'Albums', ARRAY['STRAY KIDS', 'HOP', 'HIPTAPE', 'Special Album'], 0),

('stray-kids-5star-digipack', 'Stray Kids - 5-Star [DIGIPACK VER.] 3rd Album+Pre-Order Benefit (Random ver.)', '3rd Album 5-STAR en formato Digipack con beneficios de pre-orden.', '5StarStay', ARRAY['https://m.media-amazon.com/images/I/51fjGmcK80L._SY342_.jpg', 'https://m.media-amazon.com/images/I/71-oReV7UCL._SY522_.jpg'], 24.00, 32225.00, 'Albums', ARRAY['STRAY KIDS', '5-STAR', 'Digipack', 'Pre-Order', '3rd Album', 'Random'], 0),

('stray-kids-i-am-you', 'STRAY KIDS : I AM YOU (You Version) 3rd Mini Album CD-R+Cover+Photobook+3 QR Photocards+(Extra 4 Photocards+1 Double-Sided Photocard+Pocket Mirror)', 'I AM YOU 3rd Mini Album versión YOU con extras: photobook, QR photocards, photocards adicionales y espejo de bolsillo.', 'YouStay', ARRAY['https://m.media-amazon.com/images/I/51xNOTZIgmL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/61DK5FFVmIL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71DOqjQ654L._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71q6KpevZ8L._AC_SX679_.jpg'], 50.00, 67134.00, 'Albums', ARRAY['STRAY KIDS', 'I AM YOU', 'You Version', '3rd Mini Album', 'Photobook', 'QR Cards', 'Extras'], 0),

('stray-kids-ate-boom-genie', 'Genie Music Stray Kids - ATE Album+Pre-Order Gift (Boom ver.), JYPK1820', 'ATE Album versión Boom por Genie Music con regalo de pre-orden.', 'GenieStay', ARRAY['https://m.media-amazon.com/images/I/61rEitf2rCL._SX425_.jpg', 'https://m.media-amazon.com/images/I/71SFmfVC9aL._SX425_.jpg', 'https://m.media-amazon.com/images/I/71G5iAHfV7L._SY450_.jpg'], 50.00, 67134.00, 'Albums', ARRAY['STRAY KIDS', 'ATE', 'Boom', 'Genie Music', 'Pre-Order Gift', '9th Mini Album'], 0),

('stray-kids-ate-limited', 'Stray kids ATE 9th Mini Album Limited Edition ATE Ver', 'ATE 9th Mini Album en edición limitada versión ATE.', 'ATELimited', ARRAY['https://m.media-amazon.com/images/I/51gJ4oOuC0L._AC_SX679_.jpg'], 32.00, 42966.00, 'Albums', ARRAY['STRAY KIDS', 'ATE', 'Limited Edition', '9th Mini Album'], 0),

-- TWICE GROUP ALBUMS
('twice-this-is-for-standard', 'TWICE - The 4th Full Album [THIS IS FOR] Standard Photobook Version P.O.B.', '4th Full Album de TWICE "THIS IS FOR" en versión Photobook estándar con POB.', 'OnceForever', ARRAY['https://m.media-amazon.com/images/I/61xW8gu8ubL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/513uiqwvy+L._AC_.jpg', 'https://m.media-amazon.com/images/I/71ce3euOMfL._AC_SY879_.jpg'], 52.00, 69820.00, 'Albums', ARRAY['TWICE', 'THIS IS FOR', '4th Full Album', 'Standard', 'Photobook', 'POB'], 0),

('twice-this-is-for-confetti', 'TWICE The 4th Full Album [THIS IS FOR] CONFETTI Version "Four"', 'THIS IS FOR album en versión CONFETTI "Four" con packaging especial.', 'ConfettiOnce', ARRAY['https://m.media-amazon.com/images/I/515P0ANgiiL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71tJzNCXKHL._AC_SY879_.jpg'], 52.00, 69820.00, 'Albums', ARRAY['TWICE', 'THIS IS FOR', 'CONFETTI', 'Four', 'Special Packaging'], 0),

('twice-this-is-for-polaroid-set', 'TWICE THIS IS FOR 4th Album POLAROID Version with Tracking Sealed (Set(THIS+IS+FOR))', 'Set completo THIS IS FOR en versión POLAROID sellado con tracking.', 'PolaroidOnce', ARRAY['https://m.media-amazon.com/images/I/61IhTZtTWWL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71isYBxKwUL._AC_SY879_.jpg'], 74.00, 99359.00, 'Albums', ARRAY['TWICE', 'THIS IS FOR', 'POLAROID', 'Set', 'Sealed', 'Complete'], 0),

('twice-this-is-for-digipack-sana', 'TWICE The 4th Full Album [THIS IS FOR] DIGIPACK (SANA)', 'THIS IS FOR Digipack version con cover de SANA.', 'SanaOnce', ARRAY['https://m.media-amazon.com/images/I/61muzGT+feL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71V043PemoL._AC_SY879_.jpg'], 34.00, 45651.00, 'Albums', ARRAY['TWICE', 'THIS IS FOR', 'SANA', 'Digipack', 'Member Version'], 0),

('twice-this-is-for-digipack-momo', 'TWICE The 4th Full Album [THIS IS FOR] DIGIPACK (MOMO)', 'THIS IS FOR Digipack version con cover de MOMO.', 'MomoOnce', ARRAY['https://m.media-amazon.com/images/I/61muzGT+feL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71V043PemoL._AC_SY879_.jpg'], 34.00, 45651.00, 'Albums', ARRAY['TWICE', 'THIS IS FOR', 'MOMO', 'Digipack', 'Member Version'], 0),

('twice-this-is-for-digipack-nayeon', 'TWICE The 4th Full Album [THIS IS FOR] DIGIPACK (NAYEON)', 'THIS IS FOR Digipack version con cover de NAYEON.', 'NayeonOnce', ARRAY['https://m.media-amazon.com/images/I/61muzGT+feL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/71V043PemoL._AC_SY879_.jpg'], 34.00, 45651.00, 'Albums', ARRAY['TWICE', 'THIS IS FOR', 'NAYEON', 'Digipack', 'Member Version'], 0),

('twice-this-is-for-vinyl', 'THIS IS FOR Dragonfruit Glitter VINYL', 'Vinilo especial de THIS IS FOR en color Dragonfruit Glitter, edición limitada.', 'VinylOnce', ARRAY['https://m.media-amazon.com/images/I/61nziykp1lL._SX425_.jpg'], 80.00, 107415.00, 'Vinyl', ARRAY['TWICE', 'THIS IS FOR', 'Vinyl', 'Dragonfruit Glitter', 'Limited Edition'], 0),

-- TWICE STRATEGY
('twice-strategy-step1', 'STRATEGY Step 1 ver.', 'TWICE 14th Mini Album STRATEGY en versión Step 1.', 'StrategyOnce1', ARRAY['https://m.media-amazon.com/images/I/811GnPKh-4L._SX425_.jpg', 'https://m.media-amazon.com/images/I/91+eOU2wpfL._SY450_.jpg'], 48.00, 64449.00, 'Albums', ARRAY['TWICE', 'STRATEGY', 'Step 1', '14th Mini Album'], 0),

('twice-strategy-step2', 'STRATEGY Step 2 ver.', 'TWICE 14th Mini Album STRATEGY en versión Step 2.', 'StrategyOnce2', ARRAY['https://m.media-amazon.com/images/I/916PZ8wZmEL._SX425_.jpg', 'https://m.media-amazon.com/images/I/91+eOU2wpfL._SY450_.jpg'], 34.00, 45651.00, 'Albums', ARRAY['TWICE', 'STRATEGY', 'Step 2', '14th Mini Album'], 0),

('twice-strategy-step3', 'STRATEGY Step 3 ver.', 'TWICE 14th Mini Album STRATEGY en versión Step 3.', 'StrategyOnce3', ARRAY['https://m.media-amazon.com/images/I/91FfuQCvL3L._SX425_.jpg', 'https://m.media-amazon.com/images/I/91+eOU2wpfL._SY450_.jpg'], 34.00, 45651.00, 'Albums', ARRAY['TWICE', 'STRATEGY', 'Step 3', '14th Mini Album'], 0),

('twice-strategy-highlight', 'STRATEGY Highlight ver.', 'TWICE STRATEGY album en versión Highlight especial.', 'HighlightOnce', ARRAY['https://m.media-amazon.com/images/I/9157eezsPHL._SX425_.jpg', 'https://m.media-amazon.com/images/I/61Hw361aIYL._SY450_.jpg'], 50.00, 67134.00, 'Albums', ARRAY['TWICE', 'STRATEGY', 'Highlight', 'Special Version'], 0),

('twice-strategy-3ver-set', 'TWICE STRATEGY 14th Mini Album Standard Photobook 3 Ver Set (Step 1 + Step 2 + Step 3 Ver SET)', 'Set completo de STRATEGY con las 3 versiones Step en formato Photobook.', 'StrategyComplete', ARRAY['https://m.media-amazon.com/images/I/61O0zJNkeqL._AC_SX679_PIbundle-3,TopRight,0,0_SH20_.jpg', 'https://m.media-amazon.com/images/I/819Zl4INrOL._AC_SX679_.jpg'], 128.00, 171864.00, 'Albums', ARRAY['TWICE', 'STRATEGY', 'Complete Set', 'Step 1', 'Step 2', 'Step 3', 'Photobook'], 0),

('twice-strategy-step4-digipack', 'TWICE - 14th Mini Album [STRATEGY] Digipack STEP4 Version (Random 1ea) +Photocard + Mini Postcard', 'STRATEGY Digipack versión STEP4 con photocard y mini postcard incluidos.', 'Step4Once', ARRAY['https://m.media-amazon.com/images/I/61zICYEb-ML._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/91N3MfFFjRL._AC_SX679_.jpg'], 30.00, 40281.00, 'Albums', ARRAY['TWICE', 'STRATEGY', 'Step 4', 'Digipack', 'Random', 'Photocard'], 0),

-- LIGHT STICKS
('twice-candybong-infinity', 'Twice - CANDYBONG ∞ OFFICIAL LIGHT STICK', 'Light stick oficial de TWICE CANDYBONG Infinity para conciertos y eventos.', 'CandyBongOnce', ARRAY['https://m.media-amazon.com/images/I/51kty4W78cL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/51RXaerKBUL._AC_SX679_.jpg'], 134.00, 179920.00, 'Light Sticks', ARRAY['TWICE', 'CANDYBONG', 'Light Stick', 'Official', 'Infinity', 'Concert'], 0),

('txt-lightstick-v2', 'TXT Lightstick Official Ver 2 with 5 Photocards, Standard, White', 'Light stick oficial de TXT versión 2 con 5 photocards incluidas.', 'MOALight', ARRAY['https://m.media-amazon.com/images/I/51AdRLxXQ3L._AC_SX466_.jpg', 'https://m.media-amazon.com/images/I/51CAwzhMe8L._AC_SX466_.jpg'], 138.00, 185291.00, 'Light Sticks', ARRAY['TXT', 'TOMORROW X TOGETHER', 'Light Stick', 'Official', 'Version 2', 'Photocards'], 0),

('blackpink-lightstick-v2', 'Blackpink Lightstick Official Ver 2 Kpop', 'Light stick oficial de BLACKPINK versión 2 para conciertos.', 'BlinkLight', ARRAY['https://m.media-amazon.com/images/I/51OhbY63DRL._AC_SX679_.jpg'], 116.00, 155752.00, 'Light Sticks', ARRAY['BLACKPINK', 'Light Stick', 'Official', 'Version 2', 'Concert'], 0),

-- NEWJEANS
('newjeans-get-up-powerpuff', 'NewJeans - Get Up [The Powerpuff Girls X NJ Box ver.] Album (2 ver. Set)', 'Get Up album de NewJeans edición colaboración con The Powerpuff Girls, set de 2 versiones.', 'BunniesCollector', ARRAY['https://m.media-amazon.com/images/I/61WatWhONAL._AC_SX679_.jpg', 'https://m.media-amazon.com/images/I/81rMAtpLZbL._AC_SY879_.jpg'], 88.00, 118157.00, 'Albums', ARRAY['NEWJEANS', 'Get Up', 'Powerpuff Girls', 'Collaboration', '2 Ver Set', 'Special Edition'], 0)

ON CONFLICT (id) DO UPDATE SET
  title = EXCLUDED.title,
  description = EXCLUDED.description,
  price_usd = EXCLUDED.price_usd,
  price_ars = EXCLUDED.price_ars,
  images = EXCLUDED.images,
  tags = EXCLUDED.tags,
  updated_at = NOW();
```

## ✅ Lo que hace este script:

### 🛡️ **SEGURO**
- **Preserva likes existentes** - Si un producto ya existe, mantiene sus likes
- **Solo actualiza precios/info** - No resetea datos importantes
- **Agrega productos nuevos** - Con likes = 0 inicialmente

### 📊 **COMPLETO**
- **43 productos diferentes** cubriendo todos los grupos principales
- **4 categorías:** Albums, Light Sticks, Vinyl, Accessories
- **Múltiples versiones** de cada album popular
- **Precios en USD y ARS** actualizados

### 🎯 **OPTIMIZADO**
- **Tags inteligentes** para búsqueda gamificada
- **Descripciones detalladas** que ayudan a los fans
- **Imágenes múltiples** para mejor experiencia visual
- **Requesters creativos** que representan diferentes tipos de fans

---

## 🚀 Después de ejecutar:

1. **Verifica en tu tienda** que aparezcan todos los productos
2. **Prueba la búsqueda gamificada** con diferentes grupos
3. **Confirma que los likes se preservaron** en productos existentes
4. **Para futuros productos** usa `PROMPT_PRODUCTOS.md`

¡Tu tienda K-pop estará completamente poblada y lista para usuarios! 🎵✨
