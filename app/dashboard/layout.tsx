import React from 'react'
import Sidebar from '../Components/Dashboard/Sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <main className='grid grid-cols-12 bg-gray-900'>
          <div className='lg:col-span-2'>
            <Sidebar/>
          </div>
            <div className='lg:col-span-9 col-span-12 pt-[100px] '>
            {children}
            </div>
        </main>
    </div>
  )
}

export default DashboardLayout