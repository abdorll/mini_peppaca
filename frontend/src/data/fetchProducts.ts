
import { Product } from '../types';
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('🔄 Fetching products via REST API...');
    const response = await axios.get(`${API_BASE_URL}/products`);
    const products = response.data.data;
    console.log('✅ Products fetched successfully via REST API:', products);
    return products;
  } catch (error) {
    console.error('❌ Error fetching products via REST API:', error);
    throw error;
  }
};