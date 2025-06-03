# IdolWorldStore - Project Plan & Vision

## 🎯 Project Overview

**IdolWorldStore** is a mobile-first webapp inspired by TikTok's engagement mechanics and crowdfunding platforms like Kickstarter. It's designed specifically for K-pop fans to participate in group orders, browse merchandise, and express their wishlist desires.

### 🌎 Language & Localization

- **Primary Language**: Spanish
- **Target Market**: Spanish-speaking K-pop fans
- **Future Plans**: Potential expansion to other languages
- **UI/UX**: All interface elements in Spanish
- **Content**: Product descriptions and notifications in Spanish

## 📱 Platform & Design Philosophy

- **Mobile-Only Experience**: Exclusively designed for vertical/portrait mobile view
- **No Desktop/Horizontal Support**: Optimized entirely for mobile interaction patterns
- **TikTok-Inspired UX**: Infinite scroll, heart/like interactions, engagement-driven content
- **Crowdfunding Mechanics**: Community-driven purchasing and wishlist validation

## 🎨 Visual Identity

### Brand Elements

- **Logo Design**: 
  - Minimalista y moderno con fuente monoespaciada
  - "IWS" con 'W' prominente y efectos de gradiente
  - Fondo decorativo con glow y línea de acento
  - Mantiene coherencia con la identidad visual global

### Brand Personality

- **Friendly & Approachable**: Welcoming to all K-pop fans
- **Girlish Aesthetic**: Soft, cute, and appealing design language
- **Community-Focused**: Emphasizes social interaction and shared experiences

### Color System

- **Primary Accent**: `#7f23fd` (Purple)
- **Gradient Scheme**: 
  - Primary: `from-purple-600 to-pink-600`
  - Secondary: `from-purple-600 via-purple-700 to-pink-600`
  - Emphasis: `from-white to-purple-100`
- **Supporting Elements**:
  - Glass Effects: `backdrop-blur-md` con opacidades variables
  - Decorative Patterns: Círculos translúcidos superpuestos
  - Shadow System: Múltiples capas para profundidad visual

### UI Components

#### Headers & Banners
- Fondos con gradientes dinámicos
- Patrones decorativos con círculos
- Efectos de glassmorphism
- Elementos interactivos con hover states

#### Botones & Controles
- Estilo floating para elementos principales
- Gradientes consistentes en estados activos
- Shadows adaptativas según estado
- Animaciones de feedback

#### Estados & Badges
- Sistema de colores semánticos (success, warning, error)
- Badges con animaciones contextuales
- Indicadores de stock dinámicos
- Efectos de pulso para urgencia

### Design Consistency

- Sistema de diseño unificado en todas las secciones
- Patrones de interacción coherentes
- Sistema de espaciado y layout consistente
- Jerarquía visual clara y establecida

## 🏗️ App Structure

### Navigation

- **Bottom Navigation Bar** (Fixed Footer)
  - **Position**: Fixed at bottom of screen
  - **Layout**: Three-section horizontal layout
    - **GOs**: Left position
    - **STORE**: Center position
    - **WISHes**: Right position
  - **Always Visible**: Persistent across all screens
  - **Purple Accent**: `#7f23fd` for active states and interactions

## 📑 Main Sections

### 1. GOs (Group Orders)

**Purpose**: Community-driven bulk purchasing to reduce shipping costs

#### What is a K-pop GO?

A Group Order (GO) is when multiple fans collaborate on a bulk purchase of K-pop merchandise. By ordering together, participants can:

- Split expensive international shipping costs
- Access bulk pricing discounts
- Purchase items that would be too expensive individually
- Build community around shared interests

#### Features

- **Catalog View**: Infinite scroll of available group orders
- **Admin-Created GOs**: Curated and managed by platform administrators
- **Participation System**: TikTok-style "heart" button to join a GO
- **Smart Sorting**: Most popular/participated GOs appear at the top
- **Kickstarter-Style UI**:
  - Progress bars showing participation levels
  - Time remaining indicators
  - Goal thresholds (minimum participants needed)
  - Funding progress visualization

#### User Experience

- Swipe through available GOs
- Tap heart to participate
- See real-time participation numbers
- Visual feedback when joining/leaving

### 2. STORE

**Purpose**: Browse and purchase in-stock merchandise

#### Features

- **Product Catalog**: Items currently available for immediate purchase
- **Inventory Management**: Real-time stock levels
- **Quick Purchase**: Streamlined buying process
- **Product Discovery**: Easy browsing and searching

#### Integration

- Seamless transition from GOs to individual purchases
- Consistent visual design with other sections
- Same interaction patterns as other sections

### 3. WISHes

**Purpose**: Community wishlist and demand validation

#### Features

##### Top Section

- **"What u wish for" Button**: Primary CTA to create new wishes
- Prominent placement encouraging user participation

##### Wishlist Catalog

- **Community Wishes**: All user-submitted wishlist items
- **TikTok-Style Likes**: Heart button for showing support
- **Popularity Sorting**: Most-liked wishes appear at top
- **Infinite Scroll**: Continuous browsing experience
- **Demand Validation**: Helps identify popular items for future GOs

#### User Experience

- Create wishes with product images and descriptions
- Like/unlike other users' wishes
- Discover trending products through community desires
- Potential path from wish → GO → purchase

## 🔄 User Flow Integration

### Cross-Section Synergy

1. **Wish → GO**: Popular wishes can become new group orders
2. **GO → Store**: Successful GOs may lead to stock purchases
3. **Store → Wish**: Out-of-stock items can be wished for

### Engagement Loop

1. User discovers wish they support
2. Likes wish to show demand
3. High-demand wishes become GOs
4. User participates in relevant GOs
5. Successful GOs add items to store
6. Cycle continues with new wishes

## 🎯 Core User Experience Principles

### Mobile-First Interactions

- **Thumb-Friendly Navigation**: All interactions within easy thumb reach
- **Gesture-Based**: Swipe, tap, hold interactions
- **One-Handed Operation**: Designed for single-hand use

### Social Engagement

- **Visual Feedback**: Immediate response to all interactions
- **Community Building**: Foster connections through shared interests
- **Gamification**: Like counts, participation badges, progress indicators

### Discovery & Exploration

- **Infinite Scroll**: Endless content discovery
- **Algorithmic Sorting**: Most engaging content rises to top
- **Visual-First**: Image-heavy, scannable content layout

## 🛠️ Technical Considerations

### Framework

- **Next.js 15**: Current project foundation
- **React 19**: Modern React features
- **Tailwind CSS v4**: Styling system
- **ShadCN/UI**: Component library

### Mobile Optimization

- **Responsive Design**: Portrait-only layouts
- **Touch Interactions**: Optimized for finger navigation
- **Performance**: Fast loading for mobile networks
- **Progressive Web App**: App-like experience in browser

### State Management

- Real-time like counts and participation numbers
- Optimistic UI updates for immediate feedback
- Offline capability for browsing

## 📝 Development Progress

### June 2, 2025 - First Version of GOs Section

#### ✅ Completed Features

**🎯 GO Cards Implementation**

- Implemented mobile-optimized GO cards with:
  - Large product image display
  - Product title with truncation
  - Progress bar showing participation percentage
  - Price display with original/discounted prices
  - Popular badge for trending items
  - Interactive like button with animation effects
  - Join button with celebratory animations

**⏱️ Delivery System**

- Developed sophisticated delivery tracking system:
  - Top-level delivery indicator component
  - Real-time countdown for participation windows
  - Clear visual states for open/closed participation
  - Informative dropdown with delivery schedule
  - Bi-monthly delivery system (1st and 15th)
  - 8-day participation windows

**🎨 Visual Design & Interactions**

- Implemented light mode design with:
  - Clean white cards with subtle shadows
  - Purple accent color (#7f23fd) for key elements
  - Smooth hover and click animations
  - Progress bars with gradient fill
  - Celebratory animations for engagement
  - Mobile-first layout and spacing

**📱 Navigation**

- Bottom navigation bar with:
  - Three main sections (GOs, STORE, WISHes)
  - Active state indicators
  - Smooth transitions
  - Emoji indicators for current section

**💜 Engagement Features**

- Like system implementation:
  - Heart button with animation
  - Floating hearts effect
  - State persistence
  - Visual feedback

**🔄 UI/UX Patterns**

- Card hover effects
- Touch-friendly interaction areas
- Clear visual hierarchy
- Responsive layout
- Loading states
- Error handling

#### 🎯 Key Achievements

1. Successfully implemented the core GO browsing experience
2. Created an intuitive delivery tracking system
3. Established consistent design language
4. Implemented engaging interaction patterns
5. Built foundation for future features

#### 📊 Current Status

- **Phase 1**: ✅ Completed (Core Structure)
- **Phase 2**: 🟡 In Progress (GOs Section)
  - ✅ GO catalog implementation
  - ✅ Basic participation system
  - ✅ Progress indicators
  - 🔄 Infinite scroll (pending)
  - 🔄 Advanced sorting (pending)

### June 2, 2025 - First Version of STORE Section

#### ✅ Completed Features

**🛍️ Product Cards Implementation**

- Implemented mobile-optimized product cards with:
  - High-quality product image display
  - Product title with truncation
  - Brand and category information
  - Dynamic stock level indicators
  - Price display with original/discounted prices
  - Interactive like button with animation effects
  - Adaptive "Buy Now" button with states
  - Multiple badge types (Popular, New, Free Shipping)

**📊 Stock System**

- Developed intelligent stock tracking display:
  - Color-coded stock levels (red, orange, green)
  - Animated indicators for low stock
  - Clear stock quantity visualization
  - Dynamic messaging based on availability
  - Visual urgency for limited quantities

**🎨 Visual Design & Interactions**

- Enhanced light mode design maintaining consistency:
  - Clean white product cards with subtle shadows
  - Purple accent color (#7f23fd) for key elements
  - Smooth hover and click animations
  - Gradient buttons with celebratory effects
  - Mobile-first layout and spacing

**🛒 Cart Integration**

- Floating cart button implementation:
  - Fixed position for thumb accessibility
  - Badge counter for items in cart
  - Gradient background matching theme
  - Hover and active state animations
  - Elevated shadow for emphasis

**💜 Engagement Features**

- Like system implementation matching GOs:
  - Heart button with animation
  - Floating hearts effect
  - State persistence
  - Visual feedback

**🔄 UI/UX Patterns**

- Consistent card hover effects
- Touch-optimized buttons and controls
- Clear product information hierarchy
- Responsive layout adaptation
- Multiple badge system
- Status indicators

#### 🎯 Key Achievements

1. Successfully implemented product browsing experience
2. Created intuitive stock level system
3. Maintained design consistency with GOs section
4. Implemented engaging product interactions
5. Built user-friendly cart access
6. Established clear product information display

#### 📊 Current Status

- **Phase 1**: ✅ Completed (Core Structure)
- **Phase 2**: ✅ Completed (GOs Section Base)
- **Phase 3**: 🟡 In Progress (STORE Section)
  - ✅ Product catalog implementation
  - ✅ Basic stock system
  - ✅ Cart button integration
  - 🔄 Cart functionality (pending)
  - 🔄 Checkout flow (pending)
  - 🔄 Advanced filtering (pending)

---

## 🚀 Development Phases

### Phase 1: Core Structure ✅

- [x] Bottom navigation implementation
- [x] Basic routing between sections
- [x] Purple theme integration
- [x] Mobile-responsive layouts

### Phase 2: GOs Section 🟡

- [x] GO catalog implementation
- [x] Participation system (heart buttons)
- [x] Progress indicators & delivery system
- [ ] Infinite scroll
- [ ] Advanced sorting

### Phase 3: STORE Section 🟡

- [x] Product catalog
- [x] Inventory display
- [x] Cart button integration
- [ ] Cart functionality
- [ ] Checkout flow
- [ ] Advanced filtering

### Phase 4: WISHes Section ⏳

- [ ] Wish creation flow
- [ ] Community wishlist catalog
- [ ] Like system implementation
- [ ] Popularity-based sorting

### Phase 5: Enhancement ⏳

- [ ] Real-time updates
- [ ] Advanced filtering
- [ ] User profiles
- [ ] Admin panel for GO creation

## 🎯 Success Metrics

- **Engagement**: Daily active users, session duration
- **Community**: Wishes created, likes given, GO participation
- **Commerce**: Conversion from GO to purchase, revenue
- **Retention**: User return rate, feature adoption

---

**Vision Statement**: To create the most engaging and community-driven platform for K-pop merchandise discovery and group purchasing, where fans can connect, discover, and acquire their favorite items together.
