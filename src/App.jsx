/*
 *
 */

import { useRef, useState } from 'react'

import Sidebar from './Sidebar'
import PrimeWheel from './PrimeWheel'

const WheelColor = () => {
  const colorRef = useRef(null)
  
  return <input className="wheel-color" ref={colorRef}/>
}

const WheelScale = () => {
  const scaleRef = useRef(null)
  
  return <select className="wheel-scale" ref={scaleRef}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
}

const WheelSpacing = () => {
  const spacingRef = useRef(null)
  
  return <select className="wheel-spacing" ref={spacingRef}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
}

const WheelSpeed = () => {
  const speedRef = useRef(null)
  
  return <select className="wheel-speed" ref={speedRef}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
}

const App = () => {
  const [count, setCount] = useState(0)

  return (
    <> 

    <PrimeWheel scale="2" spacing="2" speed="1" color="#0000FF" size="8px" max_size="1400"/>
    <Sidebar width={300} height={"100vh"}>
      <WheelColor/>
      <WheelScale/>
      <WheelSpacing/>
      <WheelSpeed/>
    </Sidebar>

    </>
  )
}

export default App