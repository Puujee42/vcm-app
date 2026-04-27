import { unstable_cache } from 'next/cache';
import { connectToDB } from '@/lib/db';
import ShoppingItem from '@/lib/models/ShoppingItem';

/**
 * Fetches all shopping items from MongoDB with Next.js App Router Data Caching.
 * This replaces the client-side fetch from /api/shopping.
 */
export const getCachedShoppingItems = unstable_cache(
  async () => {
    try {
      await connectToDB();
      // Use .lean() to strip Mongoose methods and return POJOs
      const items = await ShoppingItem.find({}).lean();
      
      // Serialize the output to safely pass from Server to Client component
      return JSON.parse(JSON.stringify(items));
    } catch (error) {
      console.error("[Cache] Failed to fetch shopping items:", error);
      return [];
    }
  },
  ['all-shopping-items'], // Global cache key
  {
    tags: ['shopping'], // Allows on-demand revalidation via revalidateTag('shopping')
    revalidate: 86400, // Fallback background revalidation every 24 hours
  }
);
