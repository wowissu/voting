import { getActiveQuestionIndex } from '@/utilities/data-server';
import { verifyVotingTokenRequestGuard, voting } from '@/utilities/voting-server';
import { JsonWebTokenError } from 'jsonwebtoken';
import { NextResponse as res } from 'next/server';

export async function POST(req: Request) {
  try {
    const [_, token] = verifyVotingTokenRequestGuard(req);

    const activeQuestionIndex = getActiveQuestionIndex();
    const { will, questionIndex } = await req.json();

    if (will !== 1 && will !== 2) {
      return res.json({ success: false, message: "will only can be 1 or 0" }, { status: 400 });
    }

    if (activeQuestionIndex === null) {
      return res.json({ success: false, message: "no active question." }, { status: 400 });
    }

    if (activeQuestionIndex !== questionIndex) {
      return res.json({ success: false, message: "not active question index." }, { status: 400 });
    }

    voting(activeQuestionIndex, token, will);

    return res.json({ success: true })    
  } catch(err: unknown) {
    if (err instanceof JsonWebTokenError) {
      return res.json({ success: false, message: err.message }, { status: 498 });
    }
    
    return res.json({ success: false }, { status: 498 });
  }
}