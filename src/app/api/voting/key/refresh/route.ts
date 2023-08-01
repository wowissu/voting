import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { genVoterToken, updateVotingPublicKey } from '@/utilities/voting-server';
import { NextResponse as res } from 'next/server';

export const dynamic = "force-dynamic";

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    const key = updateVotingPublicKey();

    return res.json({ success: true, data: key });    
  } catch(err) {
    const token = genVoterToken();  

    return res.json({ success: true, data: token })
  }
}