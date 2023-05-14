/*
 *
 */

import { useRef, useState } from 'react'

import Sidebar from './Sidebar'
import PrimeWheel from './PrimeWheel'

let wheelColor = "#0000FF"

const wheelData = {
  color: "#0000FF"
}

const WheelColor = () => {
  return <input className="wheel-color" defaultValue="#0000FF" onChange={e => {
    wheelData.color = e.target.value
  }}/>
}

const WheelScale = () => {
  return <select className="wheel-scale" onchange={e => {}}>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
}

const WheelSpacing = () => {
  return <select className="wheel-spacing" onchange={e => {}}>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
}

const WheelSpeed = () => {
  return <select className="wheel-speed" onchange={e => {}}>
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

    <PrimeWheel scale="5" spacing="5" speed="1" color={wheelData.color} size="8px" max_size="3600"/>
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