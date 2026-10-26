import { getGames } from "@/utils/gamezop";
import { NextResponse } from "next/server";

export async function GET() {
  const result = await getGames();
  return NextResponse.json(result);
}
