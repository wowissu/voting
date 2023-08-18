"use client"

import { FC, useState } from 'react';
import { Question } from '@/interfaces/data';
import { useActiveQuestionVotes } from '@/utilities/useActiveQuestion';
import useQRCode from '@/utilities/useQRCode';
import Logo from '@/assets/logo.jpg';
import { useVotingUrl } from '@/utilities/useVoting';
import useEasing from 'use-easing';
import { usePrevious } from '@/utilities/usePrevious';
import WaitingForStart from '@/components/WaitingPage';
import { StartAnimation } from '@/components/StartAnimation';

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

const QuestionPage: FC<{
  currentLeftVotes: number,
  currentRightVotes: number,
  activeQuestionIndex: number
  question: Question,
}> = (props) => {
  const { currentLeftVotes: realCurrentLeftVotes, currentRightVotes: realCurrentRightVotes, question, activeQuestionIndex } = props;
  const [showStart, setShowStart] = useState(false);

  const currentLeftVotes = showStart === false ? realCurrentLeftVotes : 0;
  const currentRightVotes = showStart === false ? realCurrentRightVotes : 0;

  const previousLeftVotes = usePrevious(currentLeftVotes);
  const previousRightVotes = usePrevious(currentRightVotes);
  
  const total = currentLeftVotes + currentRightVotes;
  const currentLeftWidth = (total === 0 ? 0.5 : currentLeftVotes / total) * 100;
  const currentRightWidth = (total === 0 ? 0.5 : currentRightVotes / total) * 100;

  const { value: currentLeftVotesEasing } = useEasing<number>({ end: currentLeftVotes, start: previousLeftVotes, duration: 0.2, formatFn: (n) => Math.floor(n) });  
  const { value: currentRightVotesEasing } = useEasing<number>({ end: currentRightVotes, start: previousRightVotes, duration: 0.2, formatFn: (n) => Math.floor(n) });  

  return (
    <>
      <div className='h-[100dvh] flex flex-col items-stretch bg-white text-black'>
        <div className="text-[max(6vw,6vh)] px-4 text-center font-black">
          {question?.questionLabel}
        </div>

        <div className="flex flex-col justify-evenly w-full flex-1 relative voting-background overflow-hidden">
          <div className="flex flex-nowrap text-[max(6vw,4vh)] font-bold text-white">
            <div className="flex-1 basis-1/2 flex items-center justify-center text-center">
              {question?.leftLabel}
            </div>
            <div className="flex-1 basis-1/2 flex items-center justify-center text-center">
              {question?.rightLabel}
            </div>
          </div>
          <div className="p-4">  
            <div className="h-[min(10vh,10vw)] border-4 rounded-[5vh] border-white w-11/12 mx-auto relative flex flex-nowrap">
              <div className="top-0 transition-all duration-200 h-full bg-blue-700 left-0 rounded-s-[5vh]" style={{ width: `${currentLeftWidth}%` }}></div>
              <div className="w-0 relative">
                <div className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 h-[calc(min(10vh,10vw)+2rem)] aspect-square rounded-full overflow-hidden">
                  <img src={Logo.src} alt="" />
                </div>
              </div>
              <div className="top-0 transition-all duration-200 h-full bg-red-700 right-0 rounded-e-[5vh]" style={{ width: `${currentRightWidth}%` }}></div>
            </div>
          </div>
          <div className="flex flex-nowrap text-[min(16vw,16vh)] font-bold text-white font-Impact">
            <div className="flex-1 basis-1/2 flex items-center justify-center">
              {currentLeftVotesEasing}
            </div>
            <div className="flex-1 basis-1/2 flex items-center justify-center">
              {currentRightVotesEasing}
            </div>
          </div>
          {activeQuestionIndex !== undefined && (
            <div className=' text-white text-[max(3vw,2vh)] font-bold justify-self-end self-center'>
              ROUND {activeQuestionIndex + 1}
            </div>
          )}
        </div>
      </div>
      <StartAnimation index={activeQuestionIndex} onChange={(b) => setShowStart(b)} />
    </>
  )
}

export default function Page() {
  const [{ currentLeftVotes, currentRightVotes, question, activeQuestionIndex }, { isLoading }] = useActiveQuestionVotes({ refreshInterval: 200 });

  return (
    <div >
      {isLoading ? <WaitingForStart /> : 
      (question && (activeQuestionIndex !== undefined) 
        ? <QuestionPage currentLeftVotes={currentLeftVotes} currentRightVotes={currentRightVotes} question={question} activeQuestionIndex={activeQuestionIndex} /> 
        : <QRcodePage />)}
    </div>
  )
}