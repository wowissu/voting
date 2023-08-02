'use client';

import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import useSWR from 'swr'
import { fetchWithToken } from '@/utilities/api';
import { resolveUrl } from '@/utilities/resolveUrl';

export default function Page() {
  const url = resolveUrl("/api/login/verify");
  const { data, error, isLoading } = useSWR(url, fetchWithToken(url));

  return (
    <>
      {isLoading ? null : (data?.success ? <AdminPage /> : <LoginPage />) }
    </>
  )
}