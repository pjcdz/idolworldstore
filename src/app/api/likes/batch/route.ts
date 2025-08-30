import { NextResponse } from "next/server";
import { getBatchLikes } from "@/lib/like-store";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const idsParam = searchParams.get('ids');
    
    if (!idsParam) {
      return NextResponse.json({ error: 'Missing ids parameter' }, { status: 400 });
    }
    
    const ids = idsParam.split(',').filter(id => id.trim());
    
    if (ids.length === 0) {
      return NextResponse.json({});
    }
    
    const likes = await getBatchLikes(ids);
    return NextResponse.json(likes);
  } catch (error) {
    console.error('Error in batch likes:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
