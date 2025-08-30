import { supabase } from './supabase'

type LikeId = string;

export async function getLikes(id: LikeId): Promise<number> {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('count')
      .eq('item_id', id)
      .single()
    
    if (error && error.code !== 'PGRST116') {
      console.error('Error getting likes:', error)
      return 0
    }
    
    return data?.count ?? 0
  } catch (error) {
    console.error('Error getting likes:', error)
    return 0
  }
}

export async function incrementLikes(id: LikeId): Promise<number> {
  try {
    const { data, error } = await supabase
      .rpc('increment_likes', { p_item_id: id })
    
    if (error) {
      console.error('Error incrementing likes:', error)
      return 0
    }
    
    return data ?? 0
  } catch (error) {
    console.error('Error incrementing likes:', error)
    return 0
  }
}

export async function decrementLikes(id: LikeId): Promise<number> {
  try {
    const { data, error } = await supabase
      .rpc('decrement_likes', { p_item_id: id })
    
    if (error) {
      console.error('Error decrementing likes:', error)
      return 0
    }
    
    return data ?? 0
  } catch (error) {
    console.error('Error decrementing likes:', error)
    return 0
  }
}

// Función para obtener likes de múltiples items (batch)
export async function getBatchLikes(ids: LikeId[]): Promise<Record<LikeId, number>> {
  try {
    const { data, error } = await supabase
      .from('likes')
      .select('item_id, count')
      .in('item_id', ids)
    
    if (error) {
      console.error('Error getting batch likes:', error)
      return {}
    }
    
    const result: Record<LikeId, number> = {}
    
    // Inicializar todos los IDs con 0
    ids.forEach(id => {
      result[id] = 0
    })
    
    // Sobrescribir con los datos reales
    data?.forEach(item => {
      result[item.item_id] = item.count
    })
    
    return result
  } catch (error) {
    console.error('Error getting batch likes:', error)
    return {}
  }
}

