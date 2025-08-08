
import { Product, Seller } from '../types';
import axios from 'axios';




// export const fetchProducts = async (): Promise<Product[]> => {
//   try {
//     const res = await fetch('http://localhost:3001/api/products/');

//     if (!res.ok) {
//       throw new Error('Network response was not ok');
//     }

//     const response = await res.json();

//     if (!response.success) {
//       throw new Error('Failed to fetch products');
//     }

//     console.log('✅ Products fetched successfully:', response.data);

//     const products = response.data;

//     const mapped: Product[] = products.map((p: any) => ({
//       id: p.id,
//       title: p.title,
//       description: p.description,
//       fullDescription: p.full_description,
//       price: p.price,
//       image: p.image,
//       sellerId: p.seller_id,
//       seller: {
//         id: p.seller.id,
//         name: p.seller.name,
//         email: p.seller.email,
//         address: p.seller.address,
//         profile_picture: p.seller.profile_picture
//       }
//     }));

//     return mapped;
//   } catch (error) {
//     console.error('❌ Error fetching products:', error);
//     return [];
//   }
// };



export const fetchProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get('http://localhost:3001/api/products/');

    if (!response.data.success) {
      throw new Error('Failed to fetch products');
    }

    console.log("yyyyyyyyyyy")

    console.log('✅ Products fetched successfully:', response.data);
    const products = response.data.data;

    // Convert to your Product[] format
    const mapped: Product[] = products.map((p: any) => ({
      id: p.id,
      title: p.title,
      description: p.description,
      fullDescription: p.full_description,
      price: p.price,
      image: p.image,
      sellerId: p.seller_id,
      seller: {
        id: p.seller.id,
        name: p.seller.name,
        email: p.seller.email,
        address: p.seller.address,
        profile_picture: p.seller.profile_picture
      }
    }));

    return mapped;

  } catch (error) {
    console.error('❌ Error fetching products:', error);
    return [];
  }
};

// export const mockProducts: Product[] = [
//   {
//     id: '1',
//     title: 'Artisan Ceramic Coffee Mug',
//     description: 'Hand-crafted ceramic mug perfect for morning coffee',
//     fullDescription: 'This beautifully hand-crafted ceramic coffee mug is made from high-quality stoneware clay. Each piece is unique, featuring a smooth glazed finish in warm earth tones. The ergonomic handle provides a comfortable grip, and the 12oz capacity is perfect for your morning coffee or afternoon tea. Microwave and dishwasher safe.',
//     price: 24.99,
//     image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '1',
//     seller: mockSellers[0]
//   },
//   {
//     id: '2',
//     title: 'Wireless Bluetooth Headphones',
//     description: 'High-quality wireless headphones with noise cancellation',
//     fullDescription: 'Experience premium sound quality with these professional-grade wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and crystal-clear audio across all frequencies. The memory foam ear cushions provide all-day comfort, while the foldable design makes them perfect for travel.',
//     price: 149.99,
//     image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '2',
//     seller: mockSellers[1]
//   },
//   {
//     id: '3',
//     title: 'Organic Cotton T-Shirt',
//     description: 'Soft, sustainable organic cotton tee in multiple colors',
//     fullDescription: 'Made from 100% certified organic cotton, this premium t-shirt offers unparalleled comfort and sustainability. The fabric is pre-shrunk and features a classic fit that maintains its shape wash after wash. Available in a range of earth-tone colors, each shirt is ethically manufactured and supports fair trade practices.',
//     price: 34.99,
//     image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '3',
//     seller: mockSellers[2]
//   },
//   {
//     id: '4',
//     title: 'Vintage Leather Wallet',
//     description: 'Genuine leather wallet with RFID protection',
//     fullDescription: 'Crafted from genuine full-grain leather, this vintage-style wallet combines timeless elegance with modern security. Features RFID blocking technology to protect your cards from digital theft, multiple card slots, a bill compartment, and a clear ID window. The leather develops a beautiful patina over time, making each wallet unique.',
//     price: 67.99,
//     image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '4',
//     seller: mockSellers[3]
//   },
//   {
//     id: '5',
//     title: 'Smart Plant Monitor',
//     description: 'IoT device to monitor your plants health and watering needs',
//     fullDescription: 'Keep your plants thriving with this intelligent plant monitoring system. The device tracks soil moisture, light levels, temperature, and humidity, sending real-time notifications to your smartphone when your plants need attention. Compatible with over 3000 plant species and includes a comprehensive plant care database.',
//     price: 89.99,
//     image: 'https://images.pexels.com/photos/1084425/pexels-photo-1084425.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '2',
//     seller: mockSellers[1]
//   },
//   {
//     id: '6',
//     title: 'Handmade Scented Candle Set',
//     description: 'Set of 3 aromatherapy candles with natural soy wax',
//     fullDescription: 'Transform your space with this curated set of three handmade soy wax candles. Each candle features a unique blend of essential oils: Lavender Serenity for relaxation, Citrus Burst for energy, and Vanilla Dreams for warmth. Made with 100% natural soy wax and cotton wicks, these candles burn cleanly for up to 40 hours each.',
//     price: 42.99,
//     image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '1',
//     seller: mockSellers[0]
//   },
//   {
//     id: '7',
//     title: 'Minimalist Desk Organizer',
//     description: 'Bamboo desk organizer with multiple compartments',
//     fullDescription: 'Organize your workspace with this elegant bamboo desk organizer. Featuring multiple compartments for pens, pencils, paperclips, and other office essentials. The sustainable bamboo construction is both durable and environmentally friendly. The minimalist design complements any office décor while maximizing desk space efficiency.',
//     price: 29.99,
//     image: 'https://images.pexels.com/photos/159832/pencils-coloured-pencils-colour-pencils-colouring-pencils-159832.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '3',
//     seller: mockSellers[2]
//   },
//   {
//     id: '8',
//     title: 'Premium Kitchen Knife Set',
//     description: 'Professional-grade stainless steel knives with wooden block',
//     fullDescription: 'Elevate your culinary skills with this professional knife set. Includes 8 high-carbon stainless steel knives: chef knife, santoku, utility, paring, and steak knives, plus kitchen shears. Each blade is precision-forged and maintains its sharp edge longer than conventional knives. Comes with a beautiful acacia wood block for safe storage.',
//     price: 199.99,
//     image: 'https://images.pexels.com/photos/2291535/pexels-photo-2291535.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
//     sellerId: '4',
//     seller: mockSellers[3]
//   }
// ];