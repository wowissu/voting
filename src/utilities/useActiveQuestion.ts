import useSWR from 'swr'
import { fetchWithToken, fetcher } from './api';
import { Question } from '@/interfaces/data';

export function useActiveQuestion (intervalTime = 2000) {
  const key = "getActiveQuestion";
  const context = useSWR(key, () => fetcher<{ question: Question, index: number, votingKey: string }>("/api/questions/active"), { refreshInterval: intervalTime });
  const question = context.data?.data?.question;
  const activeQuestionIndex = context.data?.data?.index;
  const votingKey = context.data?.data?.votingKey;

  return [{question, activeQuestionIndex, votingKey}, context] as const;
}

export function useActiveQuestionVotes (intervalTime = 2000) {
  const key = "useActiveQuestionVotes";
  const context = useSWR(key, fetchWithToken<{ currentLeftVotes: number, currentRightVotes: number }>("/api/questions/active/votes"), { refreshInterval: intervalTime });  
  
  const currentLeftVotes = context.data?.data?.currentLeftVotes ?? 0
  const currentRightVotes = context.data?.data?.currentRightVotes ?? 0
  
  return [{currentLeftVotes, currentRightVotes}, context] as const
}