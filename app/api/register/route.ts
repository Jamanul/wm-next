import { prisma } from "@/prisma/db_client";
import { NextRequest, NextResponse } from "next/server";
const bcrypt = require('bcrypt');
const nodemailer = require("nodemailer");
import { google } from "googleapis";
import crypto from "crypto";

const verificationToken = crypto.randomBytes(32).toString("hex");

const OAuth2 = google.auth.OAuth2;

const oauth2Client = new OAuth2(
  process.env.GOOGLE_CLIENT_ID,
  process.env.GOOGLE_CLIENT_SECRET,
  "https://developers.google.com/oauthplayground"
);

oauth2Client.setCredentials({
  refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
});

async function sendMail(receiverEmail: string) {
  const accessToken = await oauth2Client.getAccessToken();
const verificationUrl = `${process.env.NEXT_PUBLIC_SITE_URL}/api/authenticate-email?token=${verificationToken}`;
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      type: "OAuth2",
      user: process.env.NEXT_PUBLIC_USER_EMAIL,
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
      accessToken: accessToken.token!,
    },
  });

  const mailOptions = {
    from: process.env.NEXT_PUBLIC_USER_EMAIL,
    to:receiverEmail,
    subject: "Welcome to Our App!",
    text: "Thank you for registering!",
      html: `
    <h2>Welcome!</h2>
    <p>Please verify your email by clicking the link below:</p>
    <a href="${verificationUrl}">Verify Email</a>
  `
  };

  return transporter.sendMail(mailOptions);
}

export async function POST(req: NextRequest) {
  const userData = await req.json();
  const { name, password, email, role } = userData;

  if (!name || !email || !password) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (password.length < 6) {
    return NextResponse.json({ error: "Password too short" }, { status: 400 });
  }

  const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
  if (!passwordRegex.test(password)) {
    return NextResponse.json(
      { error: "Password must include an uppercase letter and a number" },
      { status: 400 }
    );
  }

  const existingUser = await prisma.user.findUnique({ where: { email } });
  if (existingUser) {
    return NextResponse.json({ error: "Email already in use" }, { status: 409 });
  }

  const hashedPassword = await bcrypt.hash(password, 10);
  console.log(verificationToken)
  const result = await prisma.user.create({
    data: {
      name,
      email,
      role,
      password: hashedPassword,
      emailVerificationToken:verificationToken,
    },
  });

  
  try {
    await sendMail(email);
  } catch (err) {
    console.error("Email sending failed", err);
  }

  return NextResponse.json(result, { status: 200 });
}
