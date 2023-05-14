/*
 * Prime Wheel effect
 * By:  Matthew Evans
 */

import { useState } from 'react'

import Sidebar from './Sidebar'
import PrimeWheel from './PrimeWheel'

/*
 * Set wheel color
 */
const WheelColor = ({stateChanger}) => {
  return <input className="wheel-color" defaultValue="#0000FF" onChange={e => {
    stateChanger(e.target.value)
  }}/>
}

/*
 * Set wheel Size
 */
const WheelSize = ({stateChanger}) => {
  return <select className="wheel-speed" onChange={e => {
    stateChanger(e.target.value)
  }}>
    <option value="8px">8px</option>
    <option value="6px">6px</option>
    <option value="4px">4px</option>
    <option value="2px">2px</option>
  </select>
}

/*
 * Set wheel scale
 */
const WheelScale = ({stateChanger}) => {
  return <select className="wheel-scale" onChange={e => {
    stateChanger(e.target.value)
  }}>
    <option value="5">Smallest</option>
    <option value="4">Smaller</option>
    <option value="3">Middle</option>
    <option value="2">Larger</option>
    <option value="1">Largest</option>
  </select>
}

/*
 * Set wheel speed
 */
const WheelSpeed = ({stateChanger}) => {
  return <select className="wheel-speed" onChange={e => {
    stateChanger(e.target.value)
  }}>
    <option value="1">Fastest</option>
    <option value="2">Faster</option>
    <option value="3">Middle</option>
    <option value="4">Slower</option>
    <option value="5">Slowest</option>
  </select>
}

/*
 * Main app function
 */
const App = () => {
  const [ wheelColor, setColorState ] = useState("#0000FF")
  const [ wheelSize, setSizeState ] = useState("8px")
  const [ wheelScale, setScaleState ] = useState(5)
  const [ wheelSpeed, setSpeedState ] = useState(1)

  return (
    <> 

    <PrimeWheel scale={wheelScale} size={wheelSize} speed={wheelSpeed} color={wheelColor} max_size="4200"/>
    <Sidebar width={300} height={"100vh"}>
      <h3>Prime Wheel controls</h3>
      <div>Color: <WheelColor stateChanger={setColorState}/></div>
      <div>Size: <WheelSize stateChanger={setSizeState}/></div>
      <div>Scale: <WheelScale stateChanger={setScaleState}/></div>
      <div>Speed: <WheelSpeed stateChanger={setSpeedState}/></div>
    </Sidebar>

    </>
  )
}

export default App