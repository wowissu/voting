import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { Question } from '@/interfaces/data';
import { addNewQuestion } from '@/utilities/data-server';
import { commonErrorResponse } from '@/utilities/error';

export async function POST(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    const postdata: { questionLabel: string, leftLabel: string, rightLabel: string } = await req.json();

    const newQuestion: Question = {
      questionLabel: postdata.questionLabel, 
      leftLabel: postdata.leftLabel, 
      rightLabel: postdata.rightLabel,
      votes: []
    }    

    addNewQuestion(newQuestion);

    return res.json({ success: true })

  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}