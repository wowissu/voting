import { genVoterToken, verifyVoterToken, verifyVotingTokenRequestGuard, votingPublicKey } from '@/utilities/voting-server';
import { NextResponse as res } from 'next/server';

export async function POST(req: Request) {

  const {votingKey} = await req.json();

  try {
    // can not be a voter if votingKey is not given.
    if (votingKey !== votingPublicKey) {
      return res.json({ success: false })    
    }
  
    verifyVotingTokenRequestGuard(req);
    
    return res.json({ success: true });
  } catch(err) {
    const token = genVoterToken();  

    return res.json({ success: true, data: token })
  }
}