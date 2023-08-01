
import { Question } from '@/interfaces/data';
import useSWR from 'swr'
import { fetchWithToken } from './api';

export function useQuestions() {
  const key = "/api/questions";

  const context = useSWR(key, fetchWithToken<{ questions: Question[], activeQuestionIndex: number | null }>("/api/questions"));

  const questions = context.data?.data?.questions;
  const activeQuestionIndex = context.data?.data?.activeQuestionIndex ?? null;

  return [{questions, activeQuestionIndex}, context] as const
}