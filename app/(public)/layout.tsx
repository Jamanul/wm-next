import React from 'react'
import Navbar from '../Components/Navbar/Navbar'
import Provider from '../Components/providers/Provider'

const PublicLayout = ({children}:{children:React.ReactNode}) => {
  return (
    
    <Provider>
         <header>
            <Navbar/>
         </header>
         
        <main className="bg-gray-900 min-h-screen px-4">
          {/* spacer */}
 
          <div className="container mx-auto pt-20 ">
            {children}
          </div>
        </main>
        <footer></footer>
       
        </Provider>
    
     
  )
}

export default PublicLayout