import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { getActiveQuestionIndex, getQuestions, getTemporaryData } from '@/utilities/syncData-server';

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    return res.json({ success: true, data: {
      questions: getQuestions(),
      activeIndex: getActiveQuestionIndex()
    }})
  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.json({ success: false, message: err.message }, { status: 498 });
    }
    
    return res.json({ success: false }, { status: 498 });
  }
}