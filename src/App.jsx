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

    <PrimeWheel></PrimeWheel>
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