import { supabase } from '../config/database.js';

export class Seller {
  static async findAll() {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .order('name');

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching sellers:', error);
      throw error;
    }
  }

  static async findById(id) {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .select('*')
        .eq('id', id)
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error fetching seller by ID:', error);
      throw error;
    }
  }

  static async create(sellerData) {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .insert([sellerData])
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error creating seller:', error);
      throw error;
    }
  }

  static async update(id, sellerData) {
    try {
      const { data, error } = await supabase
        .from('sellers')
        .update(sellerData)
        .eq('id', id)
        .select()
        .single();

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error updating seller:', error);
      throw error;
    }
  }

  static async delete(id) {
    try {
      const { error } = await supabase
        .from('sellers')
        .delete()
        .eq('id', id);

      if (error) throw error;
      return true;
    } catch (error) {
      console.error('Error deleting seller:', error);
      throw error;
    }
  }
}