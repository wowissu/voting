"use client"

import { FC } from 'react';
import { Question } from '@/interfaces/data';
import { useActiveQuestion } from '@/utilities/useActiveQuestion';

import useBeVoter from '@/utilities/useBeVoter';
import WaitingForStart from '@/components/WaitingPage';
import { StartAnimation } from '@/components/StartAnimation';

const VotingPage: FC<{ question: Question, activeQuestionIndex: number, votingKey: string }> = (props) => {
  const {voting, will} = useBeVoter(props.votingKey);
  
  return (
    <>
      <div className='h-[100dvh] flex flex-col items-stretch bg-white text-black'>
        <div className="text-[min(6vw,10vh)] px-4 text-center font-black">
          {props.question.questionLabel}
        </div>
        <div className="flex flex-nowrap w-full flex-1 relative voting-background">
          <div className="flex-1 flex-shrink-0 basic-1/2 flex flex-col justify-center space-y-4 items-center cursor-pointer" onClick={() => voting(props.activeQuestionIndex, 1)}>
            <div className="text-[max(8vw,4vh)] font-bold text-white text-center">
              {props.question.leftLabel}
            </div>
            <div>
              <div className="border-2 rounded-full w-[max(25vw,100px)] h-[max(25vw,100px)] p-4">
                {will === 1 && (<div className="w-full h-full bg-white rounded-full"></div>)}
              </div>
            </div>
          </div>
          <div className="flex-1 flex-shrink-0 basic-1/2 flex flex-col justify-center space-y-4 items-center cursor-pointer" onClick={() => voting(props.activeQuestionIndex, 2)}>
            <div className="text-[max(8vw,4vh)] font-bold text-white text-center">
              {props.question.rightLabel}
            </div>
            <div>
              <div className="border-2 rounded-full w-[max(25vw,100px)] h-[max(25vw,100px)] p-4">
                {will === 2 && (<div className="w-full h-full bg-white rounded-full"></div>)}
              </div>
            </div>
          </div>
          <div className='absolute text-white text-[max(3vw,2vh)] font-bold left-1/2 -translate-x-1/2 bottom-[5vh]'>
            ROUND {props.activeQuestionIndex + 1}
          </div>
        </div>
      </div>
      <StartAnimation index={props.activeQuestionIndex} />
    </>
  )
}

export default function Page({ params }: { params: { votingKey: string } }) {
  const [{ question, activeQuestionIndex, votingKey }] = useActiveQuestion({ refreshInterval: 900 });
  const isActiveQuestion = votingKey === params.votingKey;

  return (
    <>
      {question && (activeQuestionIndex !== undefined) && isActiveQuestion
        ? <VotingPage question={question} activeQuestionIndex={activeQuestionIndex} votingKey={params.votingKey} /> 
        : <WaitingForStart />}
    </>
  )
}