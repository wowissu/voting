import { VotingWill } from '@/interfaces/data';
import jwt from "jsonwebtoken";
import { getQuestionByIndex } from './data-server';

type QuestionIndex = number;
type VotingToken = string;

const votingHours = 3;
const votingPool: Record<QuestionIndex, Map<VotingToken, { token: VotingToken, will: Omit<VotingWill, 1 | 2> }>> = {};

export let votingPublicKey = process.env.NODE_ENV === 'production' ? randomKey() : "w2yq4";

export function updateVotingPublicKey() {
  votingPublicKey = randomKey();

  return votingPublicKey;
}

export function genVoterToken() {
  const exp = Math.floor(Date.now() / 1000) + (60 * 60 * votingHours);
  const token = jwt.sign({ exp }, votingPublicKey);

  return token
}

export function verifyVoterToken(token: string) {
  return jwt.verify(token, votingPublicKey);
}

export function getVotingPublicKey () {
  return votingPublicKey;
}

export function randomKey() {
  return (Math.random() + 1).toString(36).substring(7) 
}

export function voting(questionIndex: number, token: string, will: Omit<VotingWill, 1 | 2>) {
  (votingPool[questionIndex] = votingPool[questionIndex] || new Map()).set(token, { will, token });
}

export function restartVoting(questionIndex: number) {
  if (votingPool[questionIndex]) {
    votingPool[questionIndex] = new Map()
  }
}

export function verifyVotingTokenRequestGuard(req: Request) {
  const requestHeaders = new Headers(req.headers)
  const token = requestHeaders.get("VotingAuthorization") ?? "";

  return [verifyVoterToken(token), token] as const
}

export function countNumberOfVotes(questionIndex: number) {
  const results = [0, 0] as [number, number];

  if (votingPool[questionIndex]) {
    votingPool[questionIndex].forEach((row) => {
      if (row.will === 1) {
        results[0] += 1;
      } else {
        results[1] += 1;
      }
    })
  }

  return results;
}

export function clearVotingPool() {
  for (const k in votingPool) {
    delete votingPool[k];
  }
}

export function saveVotes(questionIndex: number) {
  const votes = countNumberOfVotes(questionIndex);
  const q = getQuestionByIndex(questionIndex);

  if (q) {
    q.votes.push(votes);
  }
}

