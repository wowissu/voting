import useSWR, { mutate } from 'swr'
import { fetchWithToken } from './api';
import { useMemo } from 'react';
import { resolveUrl } from './resolveUrl';

export function useVotingUrl() {
  const apiUrl = "/api/voting/key"
  const { data: votingKeyData, ...ctx } = useSWR(apiUrl, (u) => fetchWithToken<string>(resolveUrl(u))());
  
  const votingUrl = useMemo<string>(() => {
    return votingKeyData?.data ? (new URL(resolveUrl(`/voting/${votingKeyData.data}`), window.location.href)).toString() : "";
  }, [votingKeyData])

  async function refresh() {
    const res = await fetchWithToken<string>(resolveUrl("/api/voting/key/refresh"))();

    if (res.success === true) {
      mutate(apiUrl);
    }
  }

return [votingUrl, {...ctx, refresh}] as const;
}