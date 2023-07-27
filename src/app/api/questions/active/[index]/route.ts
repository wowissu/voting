import { NextResponse as res } from 'next/server';
import { verifyLoginTokenRequestGuard } from '@/utilities/token-server';
import { setActiveQuestionIndex } from '@/utilities/syncData-server';

export async function GET(req: Request, { params }: { params: { index: string } }) {
  try {
    verifyLoginTokenRequestGuard(req);

    const index = parseInt(params.index)

    if (!isNaN(index)) {
      setActiveQuestionIndex(index);
    }

    return res.json({ success: true })

  } catch (err: unknown) {
    if (err instanceof Error) {
      return res.json({ success: false, message: err.message }, { status: 498 });
    }
    
    return res.json({ success: false }, { status: 498 });
  }
}