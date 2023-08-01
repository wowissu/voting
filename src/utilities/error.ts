import { JsonWebTokenError } from 'jsonwebtoken';
import { NextResponse } from 'next/server';

export function commonErrorResponse(err: unknown) {
  if (err instanceof JsonWebTokenError) {
    return NextResponse.json({ success: false, message: err.message }, { status: 498 });
  }

  if (err instanceof Error) {
    return NextResponse.json({ success: false, message: err.message }, { status: 400 });
  }
  
  return NextResponse.json({ success: false, message: "undefined error." }, { status: 400 });
}