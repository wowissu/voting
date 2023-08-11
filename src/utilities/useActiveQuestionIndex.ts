import { useEffect } from 'react';

const key = "previous_active_question";

// AQI = Action Question Index

export function setSessionAQI(index: number) {
  if (!isNaN(index)) {
    sessionStorage.setItem(key, index.toString());
  }
}

export function getSessionAQI() {
  const str = sessionStorage.getItem(key);
  const i = parseInt(str ?? "");

  return isNaN(i) ? undefined : i;
}

export function removeSessionAQI() {
  sessionStorage.removeItem(key);
}

// export function useSessionAQIEffect(activeQuestionIndex: number | undefined, isLoading: boolean) {
//   useEffect(() => {
//     if (isLoading === false && activeQuestionIndex === undefined) {
//       removeSessionAQI();
//     }
//   }, [isLoading, activeQuestionIndex])
// }