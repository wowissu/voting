import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { removeQuestionByIndex } from '@/utilities/syncData-server';

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
    if (err instanceof Error) {
      return res.json({ success: false, message: err.message }, { status: 498 });
    }
    
    return res.json({ success: false }, { status: 498 });
  }
}