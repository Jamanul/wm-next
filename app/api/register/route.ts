import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');
// import bcrypt from "/bcrypt/js"

export async function POST(req: NextRequest) {
  const userData = await req.json();
  const { name, password, email, role } = userData;

  if (!name || !email || !password) {
    return NextResponse.json({ error: 'Missing fields' }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: 'Password too short' }, { status: 400 });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json({ error: 'Password must include an uppercase letter and a number' }, { status: 400 });
  }
const existingUser = await prisma.user.findUnique({ where: { email } });
if (existingUser) {
  return NextResponse.json({ error: 'Email already in use' }, { status: 409 });
}

  const hashedPassword = await bcrypt.hash(password, 10);

  const result = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password:hashedPassword,
    },
  });

  return NextResponse.json(result, { status: 200 });
}
