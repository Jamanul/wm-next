import { google } from "googleapis";
import { NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    "http://localhost:3000/api/oauth2callback"
  );

  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    prompt: "consent",
    scope: ["https://mail.google.com/"],
  });

  return Response.redirect(authUrl);
}