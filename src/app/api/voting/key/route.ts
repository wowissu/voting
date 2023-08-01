import { commonErrorResponse } from '@/utilities/error';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { genVoterToken, votingPublicKey } from '@/utilities/voting-server';
import { NextResponse as res } from 'next/server';

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    return res.json({ success: true, data: votingPublicKey })    

  } catch(err: unknown) {
    return commonErrorResponse(err);
  }
}