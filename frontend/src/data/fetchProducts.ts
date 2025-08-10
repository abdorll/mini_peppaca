
import { Product } from '../types';
import axios from 'axios';

const API_BASE_URL = 'https://api-mini-peppaca.onrender.com/api';

export const fetchProducts = async (): Promise<Product[]> => {
  try {
    console.log('🔄 Fetching products via REST API...');
    const response = await axios.get(`${API_BASE_URL}/products`);
    const products = response.data.data;
    console.log('✅ Products fetched successfully via REST API:', products);

    // Transform the data to match frontend types (snake_case to camelCase)
    const transformedProducts = products.map((product: any) => ({
      id: product.id,
      title: product.title,
      description: product.description,
      fullDescription: product.full_description || product.fullDescription,
      price: product.price,
      image: product.image,
      sellerId: product.seller_id || product.sellerId,
      createdAt: product.created_at || product.createdAt,
      updatedAt: product.updated_at || product.updatedAt,
      seller: {
        id: product.seller.id,
        name: product.seller.name,
        email: product.seller.email,
        address: product.seller.address,
        profilePicture: product.seller.profile_picture || product.seller.profilePicture,
        createdAt: product.seller.created_at || product.seller.createdAt,
        updatedAt: product.seller.updated_at || product.seller.updatedAt
      }
    }));

    // Debug: Check the transformed data
    if (transformedProducts && transformedProducts.length > 0) {
      const firstProduct = transformedProducts[0];
      console.log('🔍 Transformed first product seller data:', {
        seller: firstProduct.seller,
        profilePicture: firstProduct.seller?.profilePicture,
        allSellerFields: Object.keys(firstProduct.seller || {})
      });
    }

    return transformedProducts;
  } catch (error) {
    console.error('❌ Error fetching products via REST API:', error);
    throw error;
  }
};