/*
 *
 */

import { useState } from 'react'

import Sidebar from './Sidebar'
import PrimeWheel from './PrimeWheel'

const wheelData = {
  color: "#0000FF"
}

const WheelColor = ({stateChanger}) => {
  return <input className="wheel-color" defaultValue="#0000FF" onChange={e => {
    stateChanger(e.target.value)
  }}/>
}

const WheelScale = () => {
  return <select className="wheel-scale" onChange={e => {
    //
  }}>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
}

const WheelSpacing = () => {
  return <select className="wheel-spacing" onChange={e => {
    //
  }}>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
}

const WheelSpeed = () => {
  return <select className="wheel-speed" onChange={e => {
    //
  }}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
}

const App = () => {
  const [ wheelColor, setState ] = useState("#0000FF")

  return (
    <> 

    <PrimeWheel scale="5" spacing="5" speed="1" color={wheelColor} size="8px" max_size="4200"/>
    <Sidebar width={300} height={"100vh"}>
      <WheelColor stateChanger={setState}/>
      <WheelScale/>
      <WheelSpacing/>
      <WheelSpeed/>
    </Sidebar>

    </>
  )
}

export default App