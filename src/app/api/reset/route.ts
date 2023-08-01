import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { removeActiveQuestionIndex } from '@/utilities/data-server';
import { clearVotingPool, updateVotingPublicKey } from '@/utilities/voting-server';
import { commonErrorResponse } from '@/utilities/error';

// reset all votes.
export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    removeActiveQuestionIndex();
    clearVotingPool();
    updateVotingPublicKey();

    return res.json({ success: true })

  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}