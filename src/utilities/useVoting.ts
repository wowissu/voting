import useSWR, { mutate } from 'swr'
import { fetchWithToken } from './api';
import { useMemo, useState } from 'react';

export function useVotingUrl() {

  const apiUrl = "/api/voting/key";
  const { data: votingKeyData, ...ctx } = useSWR(apiUrl, (u) => fetchWithToken<string>(u)());
  
  const votingUrl = useMemo<string>(() => {
    return votingKeyData?.data ? (new URL(`/voting/${votingKeyData.data}`, window.location.href)).toString() : "";
  }, [votingKeyData])

  async function refresh() {
    const res = await fetchWithToken<string>("/api/voting/key/refresh")();

    if (res.success === true) {
      mutate(apiUrl);
    }
  }

return [votingUrl, {...ctx, refresh}] as const;
}