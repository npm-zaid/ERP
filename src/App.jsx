import React, { useState } from 'react'

import Sidebar from './component/Sidebar'
import Container from './component/Container'

const App = () => {
  const [isOpen, setIsOpen] = useState(false)
  return (
   <div className='flex overflow-hidden'>
   <Sidebar isOpen={isOpen} setIsOpen={setIsOpen} />
 <Container isOpen={isOpen} setIsOpen={setIsOpen} />
 

   </div>
  )
}

export default App