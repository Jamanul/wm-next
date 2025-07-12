import React from 'react'
import Sidebar from '../Components/Dashboard/Sidebar'

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div>
        <main className='grid grid-cols-12'>
          <div className='col-span-3'>
            <Sidebar/>
          </div>
            <div className='col-span-9'>
            {children}
            </div>
        </main>
    </div>
  )
}

export default DashboardLayout