
import MovingBanner from '@/components/MovingBanner'
import Transactions from '@/components/Transactions'
import Dashboard from '@/components/dashboard/Dashboard'
import Image from 'next/image'

export default function Home() {
  return (
    <main>
      <Dashboard />
      <MovingBanner />
      <Transactions />
    </main>
  )
}
