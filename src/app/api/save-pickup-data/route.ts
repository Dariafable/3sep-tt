import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  cookies().set("pickupData", JSON.stringify(body));

  return NextResponse.json({ success: true });
}
