import { NextResponse as res } from 'next/server';
import { getActiveQuestion, getActiveQuestionIndex } from '@/utilities/data-server';
import { getVotingPublicKey } from '@/utilities/voting-server';

export const dynamic = "force-dynamic";

export async function GET() {
  const activeQuestionIndex = getActiveQuestionIndex();
  const question = getActiveQuestion();
  const votingKey = getVotingPublicKey();

  if (question !== undefined && activeQuestionIndex !== null && votingKey) {
    return res.json({ success: true, data: { question, index: activeQuestionIndex, votingKey } })
  } else {
    return res.json({ success: false }, { status: 404 })
  } 
}