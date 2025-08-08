import { supabase } from '../config/database.js';

export class Favorite {
  static async findByUserId(userId) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select(`
          *,
          product:products(
            *,
            seller:sellers(*)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }

  static async create(userId, productId) {
    try {
      // Check if favorite already exists
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (existing) {
        throw new Error('Product is already in favorites');
      }

      const { data, error } = await supabase
        .from('favorites')
        .insert([{
          user_id: userId,
          product_id: productId
        }])
        .select(`
          *,
          product:products(
            *,
            seller:sellers(*)
          )
        `)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  }

  static async delete(userId, productId) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('user_id', userId)
        .eq('product_id', productId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  static async isFavorite(userId, productId) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
        .eq('user_id', userId)
        .eq('product_id', productId)
        .single();

      if (error && error.code !== 'PGRST116') throw error;
      return !!data;
    } catch (error) {
      console.error('Error checking favorite status:', error);
      throw error;
    }
  }
}



