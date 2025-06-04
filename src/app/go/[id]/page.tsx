import { GODetailClient } from "./client";

export default async function GODetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  
  return <GODetailClient goId={id} />;
}