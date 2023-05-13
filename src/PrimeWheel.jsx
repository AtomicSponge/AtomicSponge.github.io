/*
 *
 */

import React, { useRef, useEffect } from 'react'
import './PrimeWheel.css'

const PrimeWheel = props => {
  
  const canvasRef = useRef(null)

  const wheelData = {
    scale: 2,
    spacing: 2,
    speed: 1,
    color: '#0000FF',
    size: '8px',
    font: 'Arial',
    last_prime: 2,
    max_size: 1400
  }

  const isPrime = (num) => {
    for(var i = 2; i < num; i++) {
        if(num % i == 0) return false
    }
    return true
  }

  const draw = (ctx, frameCount) => {
    //  Prime number found, draw it using cartesian coordinates
    if(isPrime(wheelData.last_prime)) {
      ctx.font = wheelData.font + " " + wheelData.size
      ctx.fillStyle = wheelData.color
      ctx.fillText(
        wheelData.last_prime,
          ((ctx.canvas.width / 2) + (wheelData.last_prime * Math.cos(wheelData.last_prime)) / wheelData.spacing),
          ((ctx.canvas.height / 2) - (wheelData.last_prime * Math.sin(wheelData.last_prime)) / wheelData.spacing)
      )
    }

    if(frameCount % wheelData.speed === 0)
      wheelData.last_prime++  //  Increment counter to check for next prime

    //  Reset wheel at max size
    if(wheelData.last_prime > wheelData.max_size) {
      ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
      wheelData.last_prime = 2
    }
  }
  
  useEffect(() => {
    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    let frameCount = 0
    let animationFrameId
    
    const render = () => {
      frameCount++
      draw(context, frameCount)
      animationFrameId = window.requestAnimationFrame(render)
    }
    render()
    
    return () => {
      window.cancelAnimationFrame(animationFrameId)
    }
  }, [draw])
  
  return <canvas className="prime-wheel" ref={canvasRef} {...props}/>
}

export default PrimeWheel