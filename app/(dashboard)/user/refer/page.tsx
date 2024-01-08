import MovingBanner from '@/components/MovingBanner'
import Transactions from '@/components/Transactions'
import React from 'react'
import { FiRefreshCcw } from 'react-icons/fi'

type Props = {}

const Refer = (props: Props) => {
  return (
    <main>
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-medium text-[#1e293b]">Refer And Earn</h2>
        <div className="flex items-center gap-3 text-[#164e63] cursor-pointer">
          <FiRefreshCcw size={16} />
          <span>Reload Data</span>
        </div>
      </div>
     
      <Transactions />
    </main>
  )
}

export default Refer