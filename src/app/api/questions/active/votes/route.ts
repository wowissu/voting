import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { getActiveQuestion, getActiveQuestionIndex } from '@/utilities/data-server';
import { countNumberOfVotes } from '@/utilities/voting-server';
import { commonErrorResponse } from '@/utilities/error';

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    const index = getActiveQuestionIndex();
    const question = getActiveQuestion();

    if (index !== null) {
      const [currentLeftVotes, currentRightVotes] = countNumberOfVotes(index);
      
      return res.json({ success: true, data: { currentLeftVotes, currentRightVotes, question, activeQuestionIndex: index } })

      // const total = 200
      // const l = getRandomInt(total);
      // return res.json({ success: true, data: { currentLeftVotes: l, currentRightVotes: total - l } })
    }

    return res.json({ success: true, data: { currentLeftVotes: 0, currentRightVotes: 0 } })

  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}


function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}