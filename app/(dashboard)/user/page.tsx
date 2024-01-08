"use client"
import MovingBanner from '@/components/MovingBanner'
import { ScreenLoader } from '@/components/ScreenLoader';
import Transactions from '@/components/Transactions'
import Dashboard from '@/components/dashboard/Dashboard'
import { useUser } from '@/context/user-context';
import Image from 'next/image'

export default function Home() {

  const { user, loading } = useUser();

  if (loading) {
    return <ScreenLoader />;
  }

  return (
    <main>
      <Dashboard user={user}/>
      <MovingBanner user={user}/>
      <Transactions />
    </main>
  )
}
