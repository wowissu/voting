"use client"

import { fetchWithToken } from '@/utilities/api';
import useSWR, { mutate } from 'swr'
import { FC, useEffect } from 'react';
import { Question } from '@/interfaces/data';


const AwaitForQuestionStart: FC = () => {
  return (<div>waiting</div>)
}

const QuestionBlock: FC<{ question: Question, index: number }> = (props) => {
  return (
    <div>
      {props.question.questionLabel}({props.index + 1})
    </div>
  )
}

export default function Page() {
  const key = "getActiveQuestion";
  const { data, error, isLoading } = useSWR(key, fetchWithToken<{ question: Question, index: number }>("/api/questions/active/get"));

  // 定時刷新資訊
  useEffect(() => {
    const intervalKey = setInterval(() => {
      mutate(key)
    }, 2000);    

    return () => {
      clearInterval(intervalKey)
    }
  }, [])

  return (
    <div>
      {data?.success ? <QuestionBlock question={data.data.question} index={data.data.index} /> : <AwaitForQuestionStart />}
    </div>
  )
}