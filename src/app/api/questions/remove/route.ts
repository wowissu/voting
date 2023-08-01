import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { removeQuestionByIndex } from '@/utilities/data-server';
import { commonErrorResponse } from '@/utilities/error';

export async function GET(req: Request) {
  try {
    verifyLoginTokenRequestGuard(req);

    const url = new URL(req.url);
    const searchParams = new URLSearchParams(url.search);
    const questionIndex = parseInt(searchParams.get("i") ?? "");
    
    if (!isNaN(questionIndex)) {
      removeQuestionByIndex(questionIndex);
    }

    return res.json({ success: true })

  } catch (err: unknown) {
    return commonErrorResponse(err);
  }
}