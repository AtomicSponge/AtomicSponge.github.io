/*
 *
 */

import { useState } from 'react'

import Sidebar from './Sidebar'
import PrimeWheel from './PrimeWheel'

const WheelColor = ({stateChanger}) => {
  return <input className="wheel-color" defaultValue="#0000FF" onChange={e => {
    stateChanger(e.target.value)
  }}/>
}

const WheelScale = ({stateChanger}) => {
  return <select className="wheel-scale" onChange={e => {
    stateChanger(e.target.value)
  }}>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
}

const WheelSpacing = ({stateChanger}) => {
  return <select className="wheel-spacing" onChange={e => {
    stateChanger(e.target.value)
  }}>
    <option value="5">5</option>
    <option value="4">4</option>
    <option value="3">3</option>
    <option value="2">2</option>
    <option value="1">1</option>
  </select>
}

const WheelSpeed = ({stateChanger}) => {
  return <select className="wheel-speed" onChange={e => {
    stateChanger(e.target.value)
  }}>
    <option value="1">1</option>
    <option value="2">2</option>
    <option value="3">3</option>
    <option value="4">4</option>
    <option value="5">5</option>
  </select>
}

const App = () => {
  const [ wheelColor, setColorState ] = useState("#0000FF")
  const [ wheelScale, setScaleState ] = useState(5)
  const [ wheelSpacing, setSpacingState ] = useState(5)
  const [ wheelSpeed, setSpeedState ] = useState(1)

  return (
    <> 

    <PrimeWheel scale={wheelScale} spacing={wheelSpacing} speed={wheelSpeed} color={wheelColor} size="8px" max_size="4200"/>
    <Sidebar width={300} height={"100vh"}>
      <WheelColor stateChanger={setColorState}/>
      <WheelScale stateChanger={setScaleState}/>
      <WheelSpacing stateChanger={setSpacingState}/>
      <WheelSpeed stateChanger={setSpeedState}/>
    </Sidebar>

    </>
  )
}

export default App