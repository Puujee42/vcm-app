import { revalidateTag } from 'next/cache';

/**
 * Valid cache tags used across the application for on-demand ISR revalidation.
 */
export type CacheTag = 'shopping' | 'events' | 'news' | 'lessons';

/**
 * Invalidates a specific cache tag globally across the Next.js edge cache.
 * Call this from admin API routes when data is mutated.
 */
export function invalidateCache(tag: CacheTag) {
  try {
    // Next.js 16 canary requires a CacheLifeConfig or profile as the 2nd argument
    revalidateTag(tag, {});
    console.log(`[Cache] Successfully invalidated tag: ${tag}`);
  } catch (error) {
    console.error(`[Cache] Failed to invalidate tag: ${tag}`, error);
  }
}
