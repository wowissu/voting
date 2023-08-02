import { Question } from '@/interfaces/data';
import { getLoginToken } from './token-client';
import { APIResponseData } from '@/interfaces/api';
import { resolveUrl } from './resolveUrl';

type Init = Parameters<typeof fetch>[1];

function onlyDataHandler<D> (res: Response): Promise<APIResponseData<D>> {
  return Promise.resolve().then(() => res.json() as Promise<APIResponseData>);
}

export function fetcher<D>(...args: Parameters<typeof fetch>) {
  return fetch(...args).then(onlyDataHandler<D>);
} 

export function fetchWithToken<D = any>(...args: Parameters<typeof fetch>) {
  return () => {
    const token = getLoginToken() ?? "";
    const [input, init] = args;

    return fetcher<D>(input, { ...init, headers: { ...init?.headers, "Authorization": token } });
  }
}

export function addQuestion(q: Pick<Question, 'questionLabel' | 'leftLabel' | 'rightLabel'>, init?: Init) {
  return fetchWithToken(resolveUrl("/api/questions/add"), { method: "POST", body: JSON.stringify(q) })()
}

export function removeQuestion(index: number, init?: Init) {
  return fetchWithToken(resolveUrl(`/api/questions/remove?i=${index}`), init);
}

export function setActiveQuestion(index: number, init?: Init) {
  return fetchWithToken(resolveUrl(`/api/questions/active/${index}`), init)
}

export function InactiveQuestion(qIndex: number, init?: Init) {
  return fetchWithToken(resolveUrl(`/api/questions/inactive/${qIndex}`))()
}

const context = {
  setActiveQuestion,
  InactiveQuestion,
  fetchWithToken,
  addQuestion,
  removeQuestion
}

export default context;