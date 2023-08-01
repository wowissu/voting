"use client"

import { FC } from 'react';
import { Question } from '@/interfaces/data';
import { useActiveQuestion, useActiveQuestionVotes } from '@/utilities/useActiveQuestion';
import useQRCode from '@/utilities/useQRCode';
import Logo from '@/assets/logo.jpg';
import { useVotingUrl } from '@/utilities/useVoting';
import useEasing from 'use-easing';
import { usePrevious } from '@/utilities/usePrevious';
import WaitingForStart from '@/components/WaitingPage';

const QRcodePage: FC = () => {
  const [votingUrl] = useVotingUrl();
  const [qrcodeImageSrc] = useQRCode(votingUrl);

  return (
    <div className="space-y-4 flex flex-col items-center justify-center w-screen h-screen voting-background">
      <div className="w-[min(10vw,15vh)] min-w-[80px] aspect-square rounded-full overflow-hidden">
        <img src={Logo.src} alt="" />
      </div>
      <div className="w-[min(40vw,40vh)] min-w-[300px]">
        <img src={qrcodeImageSrc} alt="" className="w-full" />
      </div>
      <div className="text-2xl">
        {votingUrl}
      </div>
    </div>
  )
}

const QuestionPage: FC<{ question: Question, activeQuestionIndex: number }> = (props) => {
  const [{ currentLeftVotes, currentRightVotes }] = useActiveQuestionVotes(500);

  const previousLeftVotes = usePrevious(currentLeftVotes);
  const previousRightVotes = usePrevious(currentRightVotes);
  // const currentLeftVotes = 123;
  // const currentRightVotes = 25;
  const total = currentLeftVotes + currentRightVotes;
  const currentLeftWidth = (total === 0 ? 0.5 : currentLeftVotes / total) * 100;
  const currentRightWidth = (total === 0 ? 0.5 : currentRightVotes / total) * 100;

  const { value: currentLeftVotesEasing } = useEasing<number>({ end: currentLeftVotes, start: previousLeftVotes, duration: 1, formatFn: (n) => Math.floor(n) });  
  const { value: currentRightVotesEasing } = useEasing<number>({ end: currentRightVotes, start: previousRightVotes, duration: 1, formatFn: (n) => Math.floor(n) });  

  return (
    <div className='h-screen flex flex-col items-stretch bg-white text-black'>
      <div className="text-[max(6vw,6vh)] px-4 text-center font-bold">
        {props.question.questionLabel}
      </div>

      <div className="flex flex-col justify-evenly w-full flex-1 relative voting-background">
        <div className="flex flex-nowrap text-[max(8vw,4vh)] font-bold text-white">
          <div className="flex-1 basis-1/2 flex items-center justify-center">
            {props.question.leftLabel}
          </div>
          <div className="flex-1 basis-1/2 flex items-center justify-center">
            {props.question.rightLabel}
          </div>
        </div>
        <div className="p-4">  
          <div className="h-[10vh] border-4 rounded-[5vh] border-white w-11/12 mx-auto relative flex flex-nowrap">
            <div className="top-0 transition-all duration-700 h-full bg-red-700 left-0 rounded-s-[5vh]" style={{ width: `${currentLeftWidth}%` }}></div>
            <div className="w-0 relative">
              <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[calc(10vh+4rem)] aspect-square rounded-full overflow-hidden">
                <img src={Logo.src} alt="" />
              </div>
            </div>
            <div className="top-0 transition-all duration-700 h-full bg-blue-700 right-0 rounded-e-[5vh]" style={{ width: `${currentRightWidth}%` }}></div>
          </div>
        </div>
        <div className="flex flex-nowrap text-[max(16vw,12vh)] font-bold text-white">
          <div className="flex-1 basis-1/2 flex items-center justify-center">
            {currentLeftVotesEasing}
          </div>
          <div className="flex-1 basis-1/2 flex items-center justify-center">
            {currentRightVotesEasing}
          </div>
        </div>
        <div className=' text-white text-[max(3vw,2vh)] font-bold justify-self-end self-center'>
          ROUND {props.activeQuestionIndex + 1}
        </div>
      </div>
    </div>
  )
}

export default function Page() {
  const [{ question, activeQuestionIndex }, { isLoading }] = useActiveQuestion(2000)

  return (
    <>
      {isLoading ? <WaitingForStart /> : 
      (question && (activeQuestionIndex !== undefined) 
        ? <QuestionPage question={question} activeQuestionIndex={activeQuestionIndex} /> 
        : <QRcodePage />)}
    </>
  )
}