import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { isActiveQuestionIndex, removeActiveQuestionIndex } from '@/utilities/data-server';
import { saveVotes } from '@/utilities/voting-server';
import { commonErrorResponse } from '@/utilities/error';

export async function GET(req: Request, { params }: { params: {qIndex: string} }) {
  try {
    verifyLoginTokenRequestGuard(req);

    const { qIndex } = params
    const qi = parseInt(qIndex);

    if (isNaN(qi)) {
      throw new Error("question index must not be a NaN.");
    }

    if (!isActiveQuestionIndex(qi)) {
      throw new Error("not current active question");
    }

    saveVotes(qi);
    removeActiveQuestionIndex();

    return res.json({ success: true })

  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}