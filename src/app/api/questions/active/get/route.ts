import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { Question } from '@/interfaces/data';
import { addNewQuestion, getActiveQuestion, getActiveQuestionIndex } from '@/utilities/syncData-server';

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);


    const question = getActiveQuestion();
    const index = getActiveQuestionIndex();

    if (index !== undefined && question !== undefined) {

      return res.json({ success: true, data: { question, index } })
    } else {
      return res.json({ success: false }, { status: 404 })
    }


  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.json({ success: false, message: err.message }, { status: 498 });
    }
    
    return res.json({ success: false }, { status: 498 });
  }
}