import { NextRequest, NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(req: NextRequest) {
  const url = new URL(req.url);
  const code = url.searchParams.get('code');

  if (!code) {
    return NextResponse.json({ error: 'Missing code' }, { status: 400 });
  }

  const oauth2Client = new google.auth.OAuth2(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    'http://localhost:3000/api/oauth2callback'
  );

  try {
    const { tokens } = await oauth2Client.getToken(code);
    console.log('Refresh Token:', tokens.refresh_token);

    return NextResponse.json({
      message: 'Success!',
      refreshToken: tokens.refresh_token,
    });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ error: 'Failed to get tokens' }, { status: 500 });
  }
}