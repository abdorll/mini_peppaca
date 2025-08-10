import { supabase } from '../config/database.js';
import { v4 as uuidv4 } from 'uuid';




const seedData = {
  sellers: [
    {
      id: uuidv4(),
      name: 'Elena Rodriguez',
      email: 'elena.rodriguez@example.com',
      profile_picture: 'https://images.pexels.com/photos/774909/pexels-photo-774909.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      address: '123 Artisan Street, Creative District, CA 90210'
    },
    {
      id: uuidv4(),
      name: 'Marcus Chen',
      email: 'marcus.chen@example.com',
      profile_picture: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      address: '456 Innovation Ave, Tech Valley, NY 10001'
    },
    {
      id: uuidv4(),
      name: 'Sophia Williams',
      email: 'sophia.williams@example.com',
      profile_picture: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      address: '789 Design Boulevard, Modern City, FL 33101'
    },
    {
      id: uuidv4(),
      name: 'Ahmed Hassan',
      email: 'ahmed.hassan@example.com',
      profile_picture: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&fit=crop',
      address: '321 Vintage Lane, Historic Quarter, TX 75201'
    }
  ]
};


// Generate products with seller references
const generateProducts = (sellers) => [
  {
    id: uuidv4(),
    title: 'Artisan Ceramic Coffee Mug',
    description: 'Hand-crafted ceramic mug perfect for morning coffee',
    full_description: 'This beautifully hand-crafted ceramic coffee mug is made from high-quality stoneware clay. Each piece is unique, featuring a smooth glazed finish in warm earth tones. The ergonomic handle provides a comfortable grip, and the 12oz capacity is perfect for your morning coffee or afternoon tea. Microwave and dishwasher safe.',
    price: 24.99,
    image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[0].id
  },
  {
    id: uuidv4(),
    title: 'Wireless Bluetooth Headphones',
    description: 'High-quality wireless headphones with noise cancellation',
    full_description: 'Experience premium sound quality with these professional-grade wireless Bluetooth headphones. Featuring active noise cancellation, 30-hour battery life, and crystal-clear audio across all frequencies. The memory foam ear cushions provide all-day comfort, while the foldable design makes them perfect for travel.',
    price: 149.99,
    image: 'https://images.pexels.com/photos/3394650/pexels-photo-3394650.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[1].id
  },
  {
    id: uuidv4(),
    title: 'Organic Cotton T-Shirt',
    description: 'Soft, sustainable organic cotton tee in multiple colors',
    full_description: 'Made from 100% certified organic cotton, this premium t-shirt offers unparalleled comfort and sustainability. The fabric is pre-shrunk and features a classic fit that maintains its shape wash after wash. Available in a range of earth-tone colors, each shirt is ethically manufactured and supports fair trade practices.',
    price: 34.99,
    image: 'https://images.pexels.com/photos/996329/pexels-photo-996329.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[2].id
  },
  {
    id: uuidv4(),
    title: 'Vintage Leather Wallet',
    description: 'Genuine leather wallet with RFID protection',
    full_description: 'Crafted from genuine full-grain leather, this vintage-style wallet combines timeless elegance with modern security. Features RFID blocking technology to protect your cards from digital theft, multiple card slots, a bill compartment, and a clear ID window. The leather develops a beautiful patina over time, making each wallet unique.',
    price: 67.99,
    image: 'https://images.pexels.com/photos/1152077/pexels-photo-1152077.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[3].id
  },
  {
    id: uuidv4(),
    title: 'Smart Plant Monitor',
    description: 'IoT device to monitor your plants health and watering needs',
    full_description: 'Keep your plants thriving with this intelligent plant monitoring system. The device tracks soil moisture, light levels, temperature, and humidity, sending real-time notifications to your smartphone when your plants need attention. Compatible with over 3000 plant species and includes a comprehensive plant care database.',
    price: 89.99,
    image: 'https://images.pexels.com/photos/1084425/pexels-photo-1084425.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[1].id
  },
  {
    id: uuidv4(),
    title: 'Handmade Scented Candle Set',
    description: 'Set of 3 aromatherapy candles with natural soy wax',
    full_description: 'Transform your space with this curated set of three handmade soy wax candles. Each candle features a unique blend of essential oils: Lavender Serenity for relaxation, Citrus Burst for energy, and Vanilla Dreams for warmth. Made with 100% natural soy wax and cotton wicks, these candles burn cleanly for up to 40 hours each.',
    price: 42.99,
    image: 'https://images.pexels.com/photos/1024960/pexels-photo-1024960.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[0].id
  },
  {
    id: uuidv4(),
    title: 'Minimalist Desk Organizer',
    description: 'Bamboo desk organizer with multiple compartments',
    full_description: 'Organize your workspace with this elegant bamboo desk organizer. Featuring multiple compartments for pens, pencils, paperclips, and other office essentials. The sustainable bamboo construction is both durable and environmentally friendly. The minimalist design complements any office décor while maximizing desk space efficiency.',
    price: 29.99,
    image: 'https://images.pexels.com/photos/159832/pencils-coloured-pencils-colour-pencils-colouring-pencils-159832.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[2].id
  },
  {
    id: uuidv4(),
    title: 'Premium Kitchen Knife Set',
    description: 'Professional-grade stainless steel knives with wooden block',
    full_description: 'Elevate your culinary skills with this professional knife set. Includes 8 high-carbon stainless steel knives: chef knife, santoku, utility, paring, and steak knives, plus kitchen shears. Each blade is precision-forged and maintains its sharp edge longer than conventional knives. Comes with a beautiful acacia wood block for safe storage.',
    price: 199.99,
    image: 'https://images.pexels.com/photos/2291535/pexels-photo-2291535.jpeg?auto=compress&cs=tinysrgb&w=400&h=400&fit=crop',
    seller_id: sellers[3].id
  }
];

async function seedDatabase() {
  try {
    console.log('🌱 Starting database seeding...');

    // Clear existing data
    console.log('🧹 Clearing existing data...');
    await supabase.from('favorites').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('products').delete().neq('id', '00000000-0000-0000-0000-000000000000');
    await supabase.from('sellers').delete().neq('id', '00000000-0000-0000-0000-000000000000');

    // Insert sellers
    console.log('👥 Inserting sellers...');
    const { data: sellersData, error: sellersError } = await supabase
      .from('sellers')
      .insert(seedData.sellers)
      .select();

    if (sellersError) throw sellersError;
    console.log(`✅ Inserted ${sellersData.length} sellers`);

    // Insert products
    const products = generateProducts(seedData.sellers);
    console.log('📦 Inserting products...');
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .insert(products)
      .select();

    if (productsError) throw productsError;
    console.log(`✅ Inserted ${productsData.length} products`);

    console.log('🎉 Database seeding completed successfully!');
    console.log('\n📊 Summary:');
    console.log(`- Sellers: ${sellersData.length}`);
    console.log(`- Products: ${productsData.length}`);

  } catch (error) {
    console.error('❌ Error seeding database:', error);
    process.exit(1);
  }
}
// // Run seeding if this file is executed directly
// if (import.meta.url === `file://${process.argv[1]}`) {
// }
seedDatabase();

export { seedDatabase };