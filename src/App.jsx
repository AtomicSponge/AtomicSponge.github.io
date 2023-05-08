import { useState } from 'react'
//import './App.css'

import Sidebar from './Sidebar'

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
