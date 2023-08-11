import { getSessionAQI, removeSessionAQI, setSessionAQI } from '@/utilities/useActiveQuestionIndex';
import { FC, useEffect, useState } from 'react';

export const StartAnimation: FC<{index: number, onChange?(b: boolean): void}> = (props) => {
  const {index, onChange} = props;
  const [showStart, setShowStart] = useState(false);

  useEffect(() => {
    const sessionActiveQuestionIndex = getSessionAQI();

    if (index !== sessionActiveQuestionIndex) {
      setShowStart(true);
      setSessionAQI(index);
      onChange?.(true);

      setTimeout(() => {
        setShowStart(false);
        onChange?.(false);
      }, 4000)
    }

    return () => {
      console.log('remove AQI')
      removeSessionAQI();
    }
  }, [index])

  return (
    showStart && (
      <div className="fixed top-0 left-0 bg-black/50 w-screen h-screen">
        <div className="order-animation">
          <div className="order-item order-first font-Impact">
            <div className="w-full h-full flex justify-center items-center text-[min(30vw,30vh)] font-bold text-yellow-300">
              start
            </div>
          </div>
          <div className="order-item order-second">
            <div className="w-full h-full flex justify-center items-center text-[min(30vw,30vh)] font-bold text-yellow-300">
              3
            </div>
          </div>
          <div className="order-item order-third">
            <div className="w-full h-full flex justify-center items-center text-[min(30vw,30vh)] font-bold text-yellow-300">
              2
            </div>
          </div>
          <div className="order-item order-fourth">
            <div className="w-full h-full flex justify-center items-center text-[min(30vw,30vh)] font-bold text-yellow-300">
              1
            </div>
          </div>
        </div>
      </div>
    )
  )
}