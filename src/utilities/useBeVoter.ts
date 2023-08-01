import useSWR from 'swr'
import { fetcher } from './api';
import { VotingWill } from '@/interfaces/data';
import { useState } from 'react';

const votingStorageToken = "voting_storage_token"

function getVotingToken () {
  return localStorage.getItem(votingStorageToken) ?? "";
}

export default function useBeVoter (votingKey: string) {
  const [will, setWill] = useState<VotingWill>(0);
  const key = "voting/register";

  // register to a voter
  useSWR(key, () => {
    return fetcher<string>('/api/voting/register', { method: "POST", body: JSON.stringify({ votingKey }), headers: { VotingAuthorization: getVotingToken() }}).then(res => {
      const { success, data: newVotingToken } = res;

      if (success && newVotingToken) {
        localStorage.setItem(votingStorageToken, newVotingToken);
      }

      return res;
    })
  }); 

  function voting(questionIndex: number, will: VotingWill) {
    const k = localStorage.getItem(votingStorageToken);

    setWill(will);

    fetcher<string>('/api/voting', { method: "POST", body: JSON.stringify({ token: k, will: will, questionIndex }), headers: { VotingAuthorization: getVotingToken() } });
  }

  return {
    will,
    voting
  }
}