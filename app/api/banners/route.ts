import { NextResponse } from 'next/server';
import { Banner } from '@/models/Banner';

export const revalidate = 300;

export async function GET() {
  // Mock data for banners
  const banners: Banner[] = [
      {
        id: '1',
        title: 'Inspiration in Action',
        image: 'https://images.unsplash.com/photo-1542744173-8e7e53415bb0?auto=format&fit=crop&q=80&w=1600',
        link: '/about',
        active: true,
      },
      {
        id: '2',
        title: 'Shoebox Project Mongolia',
        image: 'https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=1600',
        link: '/events',
        active: true,
      },
    ];

  return NextResponse.json({ banners }, {
    headers: { 'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60' }
  });
}
