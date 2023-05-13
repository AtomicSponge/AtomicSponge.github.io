/*
 *
 */

import { useState } from 'react'

import Sidebar from './Sidebar'
import PrimeWheel from './PrimeWheel'

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <> 

    <PrimeWheel scale="2" spacing="2" speed="1" color="#0000FF" size="8px" max_size="1400"/>
    <Sidebar width={300} height={"100vh"}>
      <h1>Nav Item</h1>
      <h1>Nav Item</h1>
      <h1>Nav Item</h1>
      <h1>Nav Item</h1>
      <h1>Nav Item</h1>
    </Sidebar>

    </>
  )
}

export default App