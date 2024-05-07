/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { TermRenderer } from '../modules/TermRenderer.js'

export class FibonacciSequence extends Command {
  static #centerX:number = 0
  static #centerY:number = 0
  static #lastFib:number = 0
  static #thisFib:number = 1
  static #begX = FibonacciSequence.#centerX
  static #begY = FibonacciSequence.#centerY
  static #midX = 0
  static #midY = 0
  static #endX = 0
  static #endY = 0
  static #counter = 0

  static #animateFunc:FrameRequestCallback

  constructor() {
    super()
    this.command = 'fibseq'
    this.description = 'Fibonacci Sequence Effect'
    this.help = ''

    FibonacciSequence.#centerX = TermRenderer.width / 2
    FibonacciSequence.#centerY = TermRenderer.height / 2
    FibonacciSequence.#begX = FibonacciSequence.#centerX
    FibonacciSequence.#begY = FibonacciSequence.#centerY

    FibonacciSequence.#animateFunc = (() => {
      TermRenderer.ctx.strokeStyle = '#FFFF00'
      TermRenderer.ctx.lineWidth = 1
  
      //  For each step, swap the direction of the blocks
      switch(FibonacciSequence.#counter) {
        case 0:
          FibonacciSequence.#midX = FibonacciSequence.#begX
          FibonacciSequence.#midY = FibonacciSequence.#begY + FibonacciSequence.#thisFib
          FibonacciSequence.#endX = FibonacciSequence.#begX + FibonacciSequence.#thisFib
          FibonacciSequence.#endY = FibonacciSequence.#begY + FibonacciSequence.#thisFib
          FibonacciSequence.#counter++
          break
        case 1:
          FibonacciSequence.#midX = FibonacciSequence.#begX + FibonacciSequence.#thisFib
          FibonacciSequence.#midY = FibonacciSequence.#begY
          FibonacciSequence.#endX = FibonacciSequence.#begX + FibonacciSequence.#thisFib
          FibonacciSequence.#endY = FibonacciSequence.#begY - FibonacciSequence.#thisFib
          FibonacciSequence.#counter++
          break
        case 2:
          FibonacciSequence.#midX = FibonacciSequence.#begX
          FibonacciSequence.#midY = FibonacciSequence.#begY - FibonacciSequence.#thisFib
          FibonacciSequence.#endX = FibonacciSequence.#begX - FibonacciSequence.#thisFib
          FibonacciSequence.#endY = FibonacciSequence.#begY - FibonacciSequence.#thisFib
          FibonacciSequence.#counter++
          break
        case 3:
          FibonacciSequence.#midX = FibonacciSequence.#begX - FibonacciSequence.#thisFib
          FibonacciSequence.#midY = FibonacciSequence.#begY
          FibonacciSequence.#endX = FibonacciSequence.#begX - FibonacciSequence.#thisFib
          FibonacciSequence.#endY = FibonacciSequence.#begY + FibonacciSequence.#thisFib
          FibonacciSequence.#counter = 0
          break
      }
  
      //  Draw curve using calculated points
      TermRenderer.ctx.beginPath()
      TermRenderer.ctx.moveTo(FibonacciSequence.#begX, FibonacciSequence.#begY)
      TermRenderer.ctx.quadraticCurveTo(FibonacciSequence.#midX, FibonacciSequence.#midY,
        FibonacciSequence.#endX, FibonacciSequence.#endY)
      TermRenderer.ctx.stroke()
      //  Reset for next curve
      FibonacciSequence.#begX = FibonacciSequence.#endX
      FibonacciSequence.#begY = FibonacciSequence.#endY

      //  Calculate the next number in the sequence
      const temp = FibonacciSequence.#thisFib
      FibonacciSequence.#thisFib += FibonacciSequence.#lastFib
      FibonacciSequence.#lastFib = temp
      
      if(FibonacciSequence.#thisFib === Number.MAX_SAFE_INTEGER)
        FibonacciSequence.#reset()
    })
  }

  /**
   * Process Fibonacci Sequence commands
   * @param args Arguments to the command
   * @returns Result of the command
   */
  async exec(args:Array<string>):Promise<string> {
    if(String(args[0]).toLowerCase() === 'start') {
      FibonacciSequence.#start()
      return 'Fibonacci Sequence started.'
    }
    if(String(args[0]).toLowerCase() === 'stop') {
      FibonacciSequence.#stop()
      return 'Fibonacci Sequence stopped.'
    }
    if(String(args[0]).toLowerCase() === 'reset') {
      FibonacciSequence.#reset()
      return 'Fibonacci Sequence reset.'
    }
    return this.help
  }

  /** Resets the effect */
  static #reset() {
    FibonacciSequence.#centerX = TermRenderer.width / 2
    FibonacciSequence.#centerY = TermRenderer.height / 2
    FibonacciSequence.#lastFib = 0
    FibonacciSequence.#thisFib = 1
    FibonacciSequence.#begX = FibonacciSequence.#centerX
    FibonacciSequence.#begY = FibonacciSequence.#centerY
    FibonacciSequence.#midX = 0
    FibonacciSequence.#midY = 0
    FibonacciSequence.#endX = 0
    FibonacciSequence.#endY = 0
    FibonacciSequence.#counter = 0
    TermRenderer.clear()
  }

  /** Start the effect */
  static #start() {
    FibonacciSequence.#stop()
    TermRenderer.setRenderer(FibonacciSequence.#animateFunc)
    TermRenderer.start()
  }

  /** Stop the effect */
  static #stop() {
    FibonacciSequence.#reset()
    TermRenderer.stop()
  }
}
