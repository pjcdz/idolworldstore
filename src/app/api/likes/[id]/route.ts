import { NextResponse } from "next/server";
import { getLikes, incrementLikes } from "@/lib/like-store";

type Context = {
  params: Promise<{ id: string }>;
};

export async function GET(_req: Request, { params }: Context) {
  const { id } = await params;
  const likes = await getLikes(id);
  return NextResponse.json({ id, likes });
}

export async function POST(_req: Request, { params }: Context) {
  const { id } = await params;
  const likes = await incrementLikes(id);
  return NextResponse.json({ id, likes });
}

