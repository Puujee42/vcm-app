import { NextResponse } from "next/server";
import { connectToDB } from "@/lib/db";
import ShoppingItem from "@/lib/models/ShoppingItem";

export const revalidate = 60;

// Public GET — only active items
export async function GET() {
  try {
    await connectToDB();
    // Added .lean() to drastically reduce memory usage and speed up data fetching
    const items = await ShoppingItem.find({ isActive: true }).sort({
      createdAt: -1,
    }).lean();
    
    return NextResponse.json(items, { 
      status: 200,
      headers: {
        'Cache-Control': 'public, s-maxage=60, stale-while-revalidate=30'
      }
    });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch shopping items" },
      { status: 500 }
    );
  }
}
