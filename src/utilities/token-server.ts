import jwt from "jsonwebtoken";
import { NextResponse } from 'next/server';

// const dateformat = "YYYY-MM-DDTHH:mm:ss"
const key = "this-is-voting-project"

export function encodeLoginToken(hours = 1) {
  const exp = Math.floor(Date.now() / 1000) + (60 * 60 * hours);

  return jwt.sign({ exp }, key);
}

export function verifyLoginToken(token: string) {
  return jwt.verify(token, key);
}

export function verifyLoginTokenRequestGuard(req: Request) {
  const requestHeaders = new Headers(req.headers)
  const authorization = requestHeaders.get("Authorization") ?? "";
  // a corrected password, make a authorization
  return verifyLoginToken(authorization)
}

