import { useState } from 'react'
//import './App.css'

import Controls from './Controls'

import { PrimeWheel } from './assets/PrimeWheel'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <>

    {PrimeWheel.add = {
      color: '#00FF00',
      random_offset: true,
      spacing: 3
    }}
    {PrimeWheel.add = {
      color: '#FF0000',
      random_offset: true,
      spacing: 3
    }}
    {PrimeWheel.add = {
      color: '#FFFF00',
      random_offset: true,
      scale: 0.5,
      spacing: 3
    }}
    {PrimeWheel.add = {
      color: '#FF7F00',
      random_offset: true,
      scale: 0.5,
      spacing: 3
    }}
    {PrimeWheel.add = {}}
    {PrimeWheel.start()}

    </>
  )
}
