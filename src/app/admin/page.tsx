'use client';

import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import useSWR from 'swr'
import { fetchWithToken } from '@/utilities/api';

export default function Page() {
  const url = "/api/login/verify";
  const { data, error, isLoading } = useSWR(url, fetchWithToken(url));

  return (
    <>
      {isLoading ? null : (data?.success ? <AdminPage /> : <LoginPage />) }
    </>
  )
}