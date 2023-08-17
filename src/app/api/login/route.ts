import { NextResponse as res, NextRequest } from 'next/server';
import { encodeLoginToken } from '@/utilities/token-server';

export async function POST(req: NextRequest) {
  const postdata: { password: string } = await req.json()
  const password = postdata.password;
  
  if (password === "juqilin2023") {
    // a corrected password, make a token

    const token = encodeLoginToken(24);

    return res.json({ token })
  }
}