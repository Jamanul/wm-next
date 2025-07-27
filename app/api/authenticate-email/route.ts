
import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  console.log(req)
  const token = req.nextUrl.searchParams.get("token");
  console.log(token)
  if (!token) {
    return NextResponse.json({ error: "Invalid verification link" }, { status: 400 });
  }

  const user = await prisma.user.findFirst({
    where: { emailVerificationToken: token },
  });

  if (!user) {
    return NextResponse.json({ error: "Invalid or expired token" }, { status: 404 });
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      authenticated: true,
      emailVerificationToken: null, 
    },
  });

  return NextResponse.redirect(`${process.env.NEXT_PUBLIC_SITE_URL}/login`);
}
