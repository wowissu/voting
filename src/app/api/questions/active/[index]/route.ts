import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { setActiveQuestionIndex } from '@/utilities/data-server';
import { restartVoting } from '@/utilities/voting-server';
import { commonErrorResponse } from '@/utilities/error';

export async function GET(req: Request, { params }: { params: { index: string } }) {
  try {
    verifyLoginTokenRequestGuard(req);

    const index = parseInt(params.index)

    if (!isNaN(index)) {
      restartVoting(index);
      setActiveQuestionIndex(index);
      
      return res.json({ success: true })
    }

  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}