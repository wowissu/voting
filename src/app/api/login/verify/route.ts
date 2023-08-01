import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { commonErrorResponse } from '@/utilities/error';

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    return res.json({ success: true })
  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}