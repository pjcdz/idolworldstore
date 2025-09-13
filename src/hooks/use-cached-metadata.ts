import { useMemo } from 'react';
import { Product } from './use-products';

interface Group {
  group_name: string;
  product_count: number;
}

interface Member {
  member_name: string;
  product_count: number;
}

interface CategoryCount {
  category: string;
  count: number;
}

interface CachedMetadata {
  groups: Group[];
  members: Member[];
  categories: CategoryCount[];
  isReady: boolean;
}

// Lista de grupos K-pop conocidos
const KNOWN_GROUPS = [
  'TWICE', 'BLACKPINK', 'RED VELVET', 'ITZY', 'AESPA', 'IVE', 
  'NEW JEANS', 'LE SSERAFIM', 'GIRLS GENERATION', 'SNSD',
  'BTS', 'STRAY KIDS', 'SEVENTEEN', 'TOMORROW X TOGETHER', 'TXT',
  'ENHYPEN', 'ATEEZ', 'NCT', 'EXO', 'SHINEE',
  'GIDLE', '(G)I-DLE', 'MAMAMOO', 'OH MY GIRL', 'WEEEKLY',
  'FROMIS_9', 'PURPLE KISS', 'DREAMCATCHER', 'LOONA',
  'NMIXX', 'KARD', 'EVERGLOW', 'GFRIEND', 'APINK'
];

// Función para normalizar nombres de grupos
const normalizeGroupName = (name: string): string => {
  const normalized = name.toUpperCase().trim();
  
  // Casos especiales de normalización
  if (normalized === 'TXT' || normalized === 'TOMORROW X TOGETHER') {
    return 'TOMORROW X TOGETHER';
  }
  if (normalized === 'SNSD' || normalized === 'GIRLS GENERATION') {
    return 'GIRLS GENERATION';
  }
  if (normalized === 'G-IDLE' || normalized === 'GIDLE' || normalized === '(G)I-DLE') {
    return '(G)I-DLE';
  }
  
  return normalized;
};

// Función para detectar si un tag es un grupo conocido
const isKnownGroup = (tag: string): boolean => {
  const normalizedTag = normalizeGroupName(tag);
  return KNOWN_GROUPS.some(group => normalizeGroupName(group) === normalizedTag);
};

// Función para detectar si un tag es probablemente un miembro
const isProbablyMember = (tag: string, groups: Set<string>): boolean => {
  // Si es un grupo conocido, no es un miembro
  if (isKnownGroup(tag)) return false;
  
  // Si el tag es muy corto (1-2 caracteres), probablemente no es un miembro
  if (tag.length <= 2) return false;
  
  // Si el tag es muy largo (más de 15 caracteres), probablemente no es un miembro
  if (tag.length > 15) return false;
  
  // Si contiene números al final, podría ser una versión/edición, no un miembro
  if (/\d+$/.test(tag)) return false;
  
  // Si es todo mayúsculas y no es un grupo, podría ser una categoría
  if (tag === tag.toUpperCase() && tag.length > 6) return false;
  
  // Patrones que indican que NO es un miembro
  const nonMemberPatterns = [
    /^(LIMITED|SPECIAL|EDITION|VERSION|ALBUM|SINGLE|EP|PHOTOBOOK|POSTER|STICKER|BADGE|KEYCHAIN)$/i,
    /^(OFFICIAL|UNOFFICIAL|RARE|SEALED|SIGNED|AUTOGRAPH)$/i,
    /^(KOREA|KOREAN|JAPAN|JAPANESE|USA|US|AMERICA)$/i,
    /^(NEW|OLD|VINTAGE|RETRO|CLASSIC)$/i
  ];
  
  if (nonMemberPatterns.some(pattern => pattern.test(tag))) {
    return false;
  }
  
  // Si llegamos aquí y no es un grupo conocido, probablemente es un miembro
  return true;
};

export function useCachedMetadata(products: Product[]): CachedMetadata {
  return useMemo(() => {
    if (!products.length) {
      return {
        groups: [],
        members: [],
        categories: [],
        isReady: false
      };
    }

    // Contadores para grupos, miembros y categorías
    const groupCounts = new Map<string, number>();
    const memberCounts = new Map<string, number>();
    const categoryCounts = new Map<string, number>();
    
    // Set para tracking de grupos conocidos
    const knownGroupsInData = new Set<string>();

    // Procesar todos los productos
    products.forEach(product => {
      // Contar categorías
      if (product.category) {
        const category = product.category;
        categoryCounts.set(category, (categoryCounts.get(category) || 0) + 1);
      }

      // Procesar tags
      if (product.tags && product.tags.length > 0) {
        product.tags.forEach(tag => {
          const cleanTag = tag.trim();
          if (!cleanTag) return;

          // Detectar grupos
          if (isKnownGroup(cleanTag)) {
            const normalizedGroup = normalizeGroupName(cleanTag);
            groupCounts.set(normalizedGroup, (groupCounts.get(normalizedGroup) || 0) + 1);
            knownGroupsInData.add(normalizedGroup);
          }
        });
      }
    });

    // Segunda pasada para detectar miembros (ahora que conocemos los grupos)
    products.forEach(product => {
      if (product.tags && product.tags.length > 0) {
        product.tags.forEach(tag => {
          const cleanTag = tag.trim();
          if (!cleanTag) return;

          // Detectar miembros
          if (isProbablyMember(cleanTag, knownGroupsInData)) {
            memberCounts.set(cleanTag, (memberCounts.get(cleanTag) || 0) + 1);
          }
        });
      }
    });

    // Convertir a arrays y ordenar
    const groups: Group[] = Array.from(groupCounts.entries())
      .map(([group_name, product_count]) => ({ group_name, product_count }))
      .sort((a, b) => b.product_count - a.product_count);

    const members: Member[] = Array.from(memberCounts.entries())
      .map(([member_name, product_count]) => ({ member_name, product_count }))
      .filter(member => member.product_count >= 2) // Solo miembros con al menos 2 productos
      .sort((a, b) => b.product_count - a.product_count);

    const categories: CategoryCount[] = Array.from(categoryCounts.entries())
      .map(([category, count]) => ({ category, count }))
      .sort((a, b) => b.count - a.count);

    // Agregar opción "ALL" para categorías si hay productos
    if (categories.length > 0) {
      const totalProducts = categories.reduce((sum, cat) => sum + cat.count, 0);
      categories.unshift({ category: 'ALL', count: totalProducts });
    }

    return {
      groups,
      members,
      categories,
      isReady: true
    };
  }, [products]);
}

// Hook para obtener miembros de un grupo específico desde el cache
export function useCachedGroupMembers(products: Product[], groupName: string): Member[] {
  return useMemo(() => {
    if (!products.length || !groupName) return [];

    const memberCounts = new Map<string, number>();
    const normalizedGroupName = normalizeGroupName(groupName);

    // Buscar productos que contengan este grupo en sus tags
    const groupProducts = products.filter(product => 
      product.tags?.some(tag => normalizeGroupName(tag) === normalizedGroupName)
    );

    // Contar miembros en esos productos
    groupProducts.forEach(product => {
      if (product.tags) {
        product.tags.forEach(tag => {
          const cleanTag = tag.trim();
          if (!cleanTag) return;
          
          // Si no es el grupo mismo y parece ser un miembro
          if (normalizeGroupName(cleanTag) !== normalizedGroupName && isProbablyMember(cleanTag, new Set([normalizedGroupName]))) {
            memberCounts.set(cleanTag, (memberCounts.get(cleanTag) || 0) + 1);
          }
        });
      }
    });

    // Convertir a array, filtrar y ordenar
    const members: Member[] = Array.from(memberCounts.entries())
      .map(([member_name, product_count]) => ({ member_name, product_count }))
      .filter(member => member.product_count >= 1) // Al menos 1 producto del grupo
      .sort((a, b) => b.product_count - a.product_count);

    // Agregar opción "ALL" al principio
    if (members.length > 0) {
      const totalGroupProducts = groupProducts.length;
      members.unshift({ member_name: 'ALL', product_count: totalGroupProducts });
    }

    return members;
  }, [products, groupName]);
}
