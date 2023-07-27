import { JsonData, Question } from '@/interfaces/data';
import { getLoginToken } from './token-client';
import { APIResponseData } from '@/interfaces/api';

type Init = Parameters<typeof fetch>[1];

function onlyDataHandler<D> (res: Response): Promise<APIResponseData<D>> {
  return Promise.resolve().then(() => res.json() as Promise<APIResponseData>);
}

function fetcher<D>(...args: Parameters<typeof fetch>) {
  return fetch(...args).then(onlyDataHandler<D>);
} 

export function fetchWithToken<D = any>(...args: Parameters<typeof fetch>) {
  return () => {
    const token = getLoginToken() ?? "";
    const [input, init] = args;

    return fetcher<D>(input, { ...init, headers: { ...init?.headers, "Authorization": token } });
  }
}

export function fetchQuestions(init?: Init) {
  return fetchWithToken<{ questions: JsonData['questions'], activeIndex: number | null }>("/api/questions", init);
}

export function addQuestion(q: Pick<Question, 'questionLabel' | 'leftLabel' | 'rightLabel'>, init?: Init) {
  return fetchWithToken("/api/questions/add", { method: "POST", body: JSON.stringify(q) })()
}

export function removeQuestion(index: number, init?: Init) {
  return fetchWithToken(`/api/questions/remove?i=${index}`, init);
}

export function setActiveQuestion(index: number, init?: Init) {
  return fetchWithToken(`/api/questions/active/${index}`)()
}

export function removeActiveQuestion(init?: Init) {
  return fetchWithToken(`/api/questions/inactive`)()
}

export function getActiveQuestion(init?: Init) {
  return fetchWithToken("/api/questions/add", { method: "POST", body: JSON.stringify(q) })()
}

const context = {
  setActiveQuestion,
  getActiveQuestion,
  removeActiveQuestion,
  fetchWithToken,
  fetchQuestions,
  addQuestion,
  removeQuestion
}

export default context;