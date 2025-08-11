import { supabase } from '../config/database.js';

export class Favorite {
  static async findFavourites() {
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
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  }

  static async create(productId) {
    try {
      const { data: existing } = await supabase
        .from('favorites')
        .select('id')
        .eq('product_id', productId)
        .single();

      if (existing) {
        throw new Error('Product is already in favorites');
      }

      const { data, error } = await supabase
        .from('favorites')
        .insert([{
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

  static async delete(productId) {
    try {
      const { error } = await supabase
        .from('favorites')
        .delete()
        .eq('product_id', productId);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }

  static async isFavorite(productId) {
    try {
      const { data, error } = await supabase
        .from('favorites')
        .select('id')
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



