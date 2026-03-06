export interface Product {
  id: string;
  name: string;
  slug: string;
  price: number;
  originalPrice?: number;
  description: string;
  shortDescription: string;
  ingredients: string[];
  servingSuggestions: string;
  category: string;
  subcategory: string;
  image: string;
  images: string[];
  badge?: 'new' | 'sale' | 'bestseller' | 'popular';
  rating: number;
  reviewCount: number;
  inStock: boolean;
  flavor: string;
  occasion: string[];
  dietType: string[];
  metaTitle: string;
  metaDescription: string;
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  description: string;
  image: string;
  subcategories: {
    id: string;
    name: string;
    slug: string;
  }[];
}

export interface Review {
  id: string;
  productId: string;
  author: string;
  rating: number;
  content: string;
  date: string;
  verified: boolean;
}

export interface CartItem {
  product: Product;
  quantity: number;
}

export const formatPrice = (price: number) => {
  return new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(price);
};

export const categories: Category[] = [
  {
    id: 'c1',
    name: 'Cakes',
    slug: 'cakes',
    description: 'Beautifully crafted cakes for every occasion',
    image: 'https://images.unsplash.com/photo-1578985543412-306ad8d5f5ae?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sc1', name: 'Birthday Cakes', slug: 'birthday-cakes' },
      { id: 'sc2', name: 'Wedding Cakes', slug: 'wedding-cakes' },
      { id: 'sc3', name: 'Custom Cakes', slug: 'custom-cakes' },
    ],
  },
  {
    id: 'c2',
    name: 'Cupcakes',
    slug: 'cupcakes',
    description: 'Perfectly sized treats in amazing flavors',
    image: 'https://images.unsplash.com/photo-1519869325930-281384150729?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sc4', name: 'Box Sets', slug: 'box-sets' },
      { id: 'sc5', name: 'Custom Design', slug: 'custom-design' },
    ],
  },
  {
    id: 'c3',
    name: 'Desserts',
    slug: 'desserts',
    description: 'Individual dessert portions and parfaits',
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sc6', name: 'Brownies', slug: 'brownies' },
      { id: 'sc7', name: 'Dessert Cups', slug: 'dessert-cups' },
    ],
  },
  {
    id: 'c4',
    name: 'Pastries',
    slug: 'pastries',
    description: 'Flaky, buttery baked goods',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sc8', name: 'Croissants', slug: 'croissants' },
      { id: 'sc9', name: 'Danish', slug: 'danish' },
    ],
  },
  {
    id: 'c5',
    name: 'Event Packages',
    slug: 'event-packages',
    description: 'Curated boxes for your special events',
    image: 'https://images.unsplash.com/photo-1513201099705-a9746e1e201f?auto=format&fit=crop&w=800&q=80',
    subcategories: [
      { id: 'sc10', name: 'Corporate', slug: 'corporate' },
      { id: 'sc11', name: 'Party Boxes', slug: 'party-boxes' },
    ],
  },
];

export const products: Product[] = [
  {
    id: 'p1',
    name: 'Classic Chocolate Birthday Cake',
    slug: 'classic-chocolate-birthday-cake',
    price: 25000,
    originalPrice: 30000,
    description: 'Our signature Classic Chocolate Birthday Cake is every chocolate lover\'s dream. Moist, rich chocolate layers are generously filled and frosted with our velvety dark chocolate ganache.',
    shortDescription: 'Rich double chocolate layer cake with dark chocolate ganache.',
    ingredients: ['Belgian Chocolate', 'Farm-fresh Eggs', 'Premium Butter', 'Vanilla Extract', 'Unbleached Flour', 'Cocoa Powder', 'Heavy Cream'],
    servingSuggestions: 'Serves 10-12. Best enjoyed at room temperature.',
    category: 'cakes',
    subcategory: 'birthday-cakes',
    image: '/images/cake_chocolate.png',
    images: ['/images/cake_chocolate.png'],
    badge: 'bestseller',
    rating: 4.8,
    reviewCount: 152,
    inStock: true,
    flavor: 'chocolate',
    occasion: ['birthday', 'anniversary'],
    dietType: [],
    metaTitle: 'Classic Chocolate Birthday Cake | The Little Bake Store',
    metaDescription: 'Order our bestselling chocolate birthday cake made with premium Belgian chocolate.',
  },
  {
    id: 'p2',
    name: 'Red Velvet Layer Cake',
    slug: 'red-velvet-layer-cake',
    price: 30000,
    originalPrice: 35000,
    description: 'A Southern classic perfected. Our Red Velvet Layer Cake features a mild chocolate flavor with a beautiful bright red crumb, layered and coated in our signature tangy-sweet cream cheese frosting.',
    shortDescription: 'Classic red velvet cake with smooth cream cheese frosting.',
    ingredients: ['Buttermilk', 'Cocoa Powder', 'Cream Cheese', 'Vanilla Extract', 'Premium Butter'],
    servingSuggestions: 'Serves 12-15. Keep refrigerated and bring to room temp before serving.',
    category: 'cakes',
    subcategory: 'wedding-cakes',
    image: '/images/cake_red_velvet.png',
    images: ['/images/cake_red_velvet.png'],
    badge: 'popular',
    rating: 4.9,
    reviewCount: 89,
    inStock: true,
    flavor: 'red velvet',
    occasion: ['wedding', 'valentine', 'anniversary'],
    dietType: [],
    metaTitle: 'Red Velvet Layer Cake | The Little Bake Store',
    metaDescription: 'Stunning red velvet cake with cream cheese frosting.',
  },
  {
    id: 'p5',
    name: 'Vanilla Bean Cloud Cake',
    slug: 'vanilla-bean-cloud-cake',
    price: 22000,
    description: 'A light, airy, and incredibly moist vanilla sponge made with Madagascar vanilla beans, topped with a cloud-like whipped cream frosting.',
    shortDescription: 'Light and airy vanilla bean sponge with whipped cream.',
    ingredients: ['Madagascar Vanilla Bean', 'Cake Flour', 'Egg Whites', 'Heavy Cream', 'Organic Sugar'],
    servingSuggestions: 'Best served chilled.',
    category: 'cakes',
    subcategory: 'birthday-cakes',
    image: 'https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1464349095431-e9a21285b5f3?auto=format&fit=crop&w=800&q=80'],
    badge: 'new',
    rating: 4.7,
    reviewCount: 42,
    inStock: true,
    flavor: 'vanilla',
    occasion: ['birthday'],
    dietType: [],
    metaTitle: 'Vanilla Bean Cloud Cake | The Little Bake Store',
    metaDescription: 'Light and airy vanilla bean cake with whipped cream.',
  },
  {
    id: 'p3',
    name: 'Strawberries & Cream Cupcakes',
    slug: 'strawberries-cream-cupcakes',
    price: 12000,
    description: 'Light and fluffy vanilla bean cupcakes topped with a generous swirl of buttercream made with real crushed strawberries.',
    shortDescription: 'Box of 12 vanilla cupcakes with fresh strawberry buttercream.',
    ingredients: ['Flour', 'Sugar', 'Butter', 'Eggs', 'Vanilla Bean', 'Fresh Strawberries'],
    servingSuggestions: 'Best eaten within 2 days.',
    category: 'cupcakes',
    subcategory: 'box-sets',
    image: '/images/cupcake_strawberry.png',
    images: ['/images/cupcake_strawberry.png'],
    rating: 4.6,
    reviewCount: 64,
    inStock: true,
    flavor: 'vanilla',
    occasion: ['birthday', 'baby-shower'],
    dietType: [],
    metaTitle: 'Strawberry & Cream Cupcakes | The Little Bake Store',
    metaDescription: 'Box of 12 fresh strawberry cupcakes.',
  },
  {
    id: 'p6',
    name: 'Salted Caramel Cupcakes',
    slug: 'salted-caramel-cupcakes',
    price: 15000,
    description: 'Rich dark chocolate cupcakes with a gooey salted caramel center, topped with caramel buttercream and a drizzle of sea salt caramel.',
    shortDescription: 'Box of 12 chocolate caramel cupcakes with sea salt.',
    ingredients: ['Dark Chocolate', 'Sea Salt', 'Caramel', 'Unsalted Butter', 'Cocoa Powder'],
    servingSuggestions: 'Great for afternoon tea.',
    category: 'cupcakes',
    subcategory: 'box-sets',
    image: 'https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1576618148400-f54bed99fcfd?auto=format&fit=crop&w=800&q=80'],
    badge: 'popular',
    rating: 4.8,
    reviewCount: 56,
    inStock: true,
    flavor: 'chocolate/caramel',
    occasion: ['party', 'gift'],
    dietType: [],
    metaTitle: 'Salted Caramel Cupcakes | The Little Bake Store',
    metaDescription: 'Delicious chocolate cupcakes with salted caramel.',
  },
  {
    id: 'p7',
    name: 'Artisan Croissant Box',
    slug: 'artisan-croissant-box',
    price: 18000,
    description: 'A box of 6 oversized, flaky, buttery croissants made with 100% French butter. Perfectly laminated for maximum layers.',
    shortDescription: 'Box of 6 handmade buttery French croissants.',
    ingredients: ['French Butter', 'Bread Flour', 'Yeast', 'Whole Milk', 'Sea Salt'],
    servingSuggestions: 'Warm for 3-5 minutes in oven before serving.',
    category: 'pastries',
    subcategory: 'croissants',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=800&q=80'],
    rating: 4.9,
    reviewCount: 38,
    inStock: true,
    flavor: 'buttery',
    occasion: ['breakfast', 'brunch'],
    dietType: [],
    metaTitle: 'Artisan Croissants | The Little Bake Store',
    metaDescription: 'Handmade flaky French croissants.',
  },
  {
    id: 'p8',
    name: 'Dark Chocolate Ganache Brownies',
    slug: 'dark-chocolate-brownies',
    price: 14000,
    description: 'Fudgy, dense brownies made with 70% dark Belgian chocolate and topped with a smooth chocolate ganache layer.',
    shortDescription: 'Box of 9 rich dark chocolate brownies.',
    ingredients: ['Belgian Dark Chocolate', 'Cocoa Powder', 'Butter', 'Eggs', 'Brown Sugar'],
    servingSuggestions: 'Serve with a scoop of vanilla ice cream.',
    category: 'desserts',
    subcategory: 'brownies',
    image: 'https://images.unsplash.com/photo-1461008102162-66322b93196c?auto=format&fit=crop&w=800&q=80',
    images: ['https://images.unsplash.com/photo-1461008102162-66322b93196c?auto=format&fit=crop&w=800&q=80'],
    badge: 'bestseller',
    rating: 5.0,
    reviewCount: 29,
    inStock: true,
    flavor: 'dark chocolate',
    occasion: ['dessert', 'party'],
    dietType: [],
    metaTitle: 'Dark Chocolate Brownies | The Little Bake Store',
    metaDescription: 'Ultra fudgy Belgian chocolate brownies.',
  },
  {
    id: 'p4',
    name: 'Party Dessert Box',
    slug: 'party-dessert-box',
    price: 35000,
    originalPrice: 42000,
    description: 'Take the stress out of hosting with our Party Dessert Box. Includes cupcakes, brownies, dessert cups, and cake pops.',
    shortDescription: 'A curated mix of our best mini desserts for any gathering.',
    ingredients: ['Assorted Ingredients'],
    servingSuggestions: 'Serves 15-20 guests.',
    category: 'event-packages',
    subcategory: 'party-boxes',
    image: '/images/dessert_box.png',
    images: ['/images/dessert_box.png'],
    badge: 'sale',
    rating: 4.9,
    reviewCount: 112,
    inStock: true,
    flavor: 'assorted',
    occasion: ['corporate-event', 'birthday'],
    dietType: [],
    metaTitle: 'Party Dessert Box | The Little Bake Store',
    metaDescription: 'Premium dessert box for parties and events.',
  }
];
export const testimonials = [
  {
    id: 't1',
    author: 'Chidinma O.',
    role: 'Birthday Customer',
    content: 'The chocolate cake was absolutely divine! It was the highlight of my birthday party. Moist, not too sweet, and beautifully decorated.',
    rating: 5,
    avatar: '👩🏾',
  },
  {
    id: 't2',
    author: 'Tunde A.',
    role: 'Corporate Client',
    content: 'Ordered the event package for our end-of-year meeting. The presentation was top-notch and everyone loved the dessert cups!',
    rating: 5,
    avatar: '👨🏾',
  },
  {
    id: 't3',
    author: 'Aisha I.',
    role: 'Regular Customer',
    content: 'Their red velvet cupcakes are my weekly guilty pleasure. Always fresh and the cream cheese frosting is perfect.',
    rating: 4,
    avatar: '🧕🏾',
  },
  {
    id: 't4',
    author: 'Emeka N.',
    role: 'Wedding Client',
    content: 'We ordered our wedding cake here and it was stunning. Every guest commented on how delicious it was. Truly elite baking!',
    rating: 5,
    avatar: '👨🏾',
  },
  {
    id: 't5',
    author: 'Sarah J.',
    role: 'Dessert Lover',
    content: 'The pastries are so flaky and buttery, remind me of Paris. Highly recommend the croissants!',
    rating: 5,
    avatar: '👩🏼',
  },
  {
    id: 't6',
    author: 'Mohammed B.',
    role: 'Party Host',
    content: 'Great service and prompt delivery. The party dessert box made hosting so much easier. Will definitely order again.',
    rating: 5,
    avatar: '👨🏾',
  },
];
