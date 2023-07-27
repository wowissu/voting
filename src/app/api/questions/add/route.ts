import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { Question } from '@/interfaces/data';
import { addNewQuestion } from '@/utilities/syncData-server';

export async function POST(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    const postdata: { questionLabel: string, leftLabel: string, rightLabel: string } = await req.json();

    const newQuestion: Question = {
      questionLabel: postdata.questionLabel, 
      leftLabel: postdata.leftLabel, 
      rightLabel: postdata.rightLabel,
      leftVotes: 0,
      rightVotes: 0,
    }    

    addNewQuestion(newQuestion);

    return res.json({ success: true })

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.json({ success: false, message: err.message }, { status: 498 });
    }
    
    return res.json({ success: false }, { status: 498 });
  }
}