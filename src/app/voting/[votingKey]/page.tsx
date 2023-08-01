"use client"

import { FC } from 'react';
import { Question } from '@/interfaces/data';
import { useActiveQuestion } from '@/utilities/useActiveQuestion';

import useBeVoter from '@/utilities/useBeVoter';
import WaitingForStart from '@/components/WaitingPage';

const VotingPage: FC<{ question: Question, activeQuestionIndex: number, votingKey: string }> = (props) => {
  const {voting, will} = useBeVoter(props.votingKey);

  return (
    <div className='h-screen flex flex-col items-stretch bg-white text-black'>
      <div className="text-[max(6vw,6vh)] px-4 text-center font-bold">
        {props.question.questionLabel}
      </div>
      <div className="flex flex-nowrap w-full flex-1 relative voting-background">
        <div className="flex-1 flex-shrink-0 basic-1/2 flex flex-col justify-center space-y-4 items-center cursor-pointer" onClick={() => voting(props.activeQuestionIndex, 1)}>
          <div className="text-[max(8vw,4vh)] font-bold text-white">
            {props.question.leftLabel}
          </div>
          <div>
            <div className="border-2 rounded-full w-[max(25vw,100px)] aspect-square p-4">
              {will === 1 && (<div className="w-full h-full bg-white rounded-full"></div>)}
            </div>
          </div>
        </div>
        <div className="flex-1 flex-shrink-0 basic-1/2 flex flex-col justify-center space-y-4 items-center cursor-pointer" onClick={() => voting(props.activeQuestionIndex, 2)}>
          <div className="text-[max(8vw,4vh)] font-bold text-white">
            {props.question.rightLabel}
          </div>
          <div>
            <div className="border-2 rounded-full w-[max(25vw,100px)] aspect-square p-4">
              {will === 2 && (<div className="w-full h-full bg-white rounded-full"></div>)}
            </div>
          </div>
        </div>
        <div className='absolute text-white text-[max(3vw,2vh)] font-bold left-1/2 -translate-x-1/2 bottom-0'>
          ROUND {props.activeQuestionIndex + 1}
        </div>
      </div>
    </div>
  )
}

export default function Page({ params }: { params: { votingKey: string } }) {
  const [{ question, activeQuestionIndex, votingKey }] = useActiveQuestion();
  const isActiveQuestion = votingKey === params.votingKey;

  return (
    <>
      {question && (activeQuestionIndex !== undefined) && isActiveQuestion
        ? <VotingPage question={question} activeQuestionIndex={activeQuestionIndex} votingKey={params.votingKey} /> 
        : <WaitingForStart />}
    </>
  )
}