'use client';

import { FC } from 'react';
import AdminPage from './AdminPage';
import LoginPage from './LoginPage';
import { Skeleton } from '@mui/material';
import useSWR from 'swr'
import { fetchWithToken } from '@/utilities/api';

// const LoadingSkeleton: FC = () => {
//   return (
//     <div className="w-screen h-screen flex items-center justify-center">
//       <div className="space-y-2 p-4">
//         <Skeleton variant="rounded" width={210} height={60} />
//       </div>
//     </div>
//   )
// }

export default function Page() {
  const url = "/api/login/verify";
  const { data, error, isLoading } = useSWR(url, fetchWithToken(url));

  return (
    <>
      {isLoading ? null : (data?.success ? <AdminPage /> : <LoginPage />) }
    </>
  )
}