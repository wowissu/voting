import useSWR, { SWRConfiguration } from 'swr'
import { fetchWithToken, fetcher } from './api';
import { Question } from '@/interfaces/data';
import { resolveUrl } from './resolveUrl';

export function useActiveQuestion (config?: SWRConfiguration) {
  const key = "getActiveQuestion";
  const context = useSWR(key, () => fetcher<{ question: Question, index: number, votingKey: string }>(resolveUrl("/api/questions/active")), config);
  const question = context.data?.data?.question;
  const activeQuestionIndex = context.data?.data?.index;
  const votingKey = context.data?.data?.votingKey;

  return [{question, activeQuestionIndex, votingKey}, context] as const;
}

export function useActiveQuestionVotes (config?: SWRConfiguration) {
  const key = "useActiveQuestionVotes";
  const context = useSWR(key, fetchWithToken<{ currentLeftVotes: number, currentRightVotes: number, question: Question, activeQuestionIndex: number }>(resolveUrl("/api/questions/active/votes")), config);  
  
  const currentLeftVotes = context.data?.data?.currentLeftVotes ?? 0
  const currentRightVotes = context.data?.data?.currentRightVotes ?? 0
  const question = context.data?.data?.question
  const activeQuestionIndex = context.data?.data?.activeQuestionIndex
  
  return [{currentLeftVotes, currentRightVotes, question, activeQuestionIndex}, context] as const
}