/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { TermRenderer } from '../modules/TermRenderer.js'
import { TermError } from '../modules/TermError.js'
import { testHexColor, testRGB } from '@spongex/regexps'

export class FibonacciSequence extends Command {
  static #centerX:number
  static #centerY:number
  static #lastFib:number
  static #thisFib:number
  static #begX:number
  static #begY:number
  static #midX:number
  static #midY:number
  static #endX:number
  static #endY:number
  static #counter:number
  static #color:string

  static #animateFunc:FrameRequestCallback

  /**
   * Set up the Fibonacci Sequence
   * @param color Color of the spiral effect
   */
  constructor(color:string) {
    super()
    this.command = 'fibseq'
    this.description = 'Fibonacci Sequence Effect'
    this.help = `<span style=\"font-weight: bold;\">Usage:</span> ` +
      `fibseq <em>start</em>|<em>stop</em>|<em>color</em>`

    if(!testHexColor(color) && !testRGB(color))
      throw new TermError(`Incorrect color code '${color}' when setting up Fibonacci Sequence!`, this.constructor)
    FibonacciSequence.#color = color
    FibonacciSequence.#lastFib = 0
    FibonacciSequence.#thisFib = 1

    FibonacciSequence.#animateFunc = (() => {
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
      TermRenderer.ctx.strokeStyle = FibonacciSequence.#color
      TermRenderer.ctx.lineWidth = 1
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

    const observer = new ResizeObserver(() => {
      FibonacciSequence.#reset()
    })
    observer.observe(document.documentElement)
  }

  /**
   * Process Fibonacci Sequence commands
   * @param args Arguments to the command
   * @returns Result of the command
   */
  async exec(args:Array<string>):Promise<string> {
    switch(String(args[0]).toLowerCase()) {
      case 'start':
        FibonacciSequence.#start()
        return 'Fibonacci Sequence started.'
      case 'stop':
        FibonacciSequence.#stop()
        return 'Fibonacci Sequence stopped.'
      case 'color':
        if(testHexColor(args[1]) || testRGB(args[1])) {
          FibonacciSequence.#color = args[1]
          FibonacciSequence.#reset()
          return 'Color set.'
        }
        return 'Incorrect color code.'
      default:
        return this.help
    }
  }

  /** Resets the effect */
  static #reset():void {
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
  static #start():void {
    FibonacciSequence.#stop()
    TermRenderer.setRenderer(FibonacciSequence.#animateFunc)
    TermRenderer.start()
  }

  /** Stop the effect */
  static #stop():void {
    FibonacciSequence.#reset()
    TermRenderer.stop()
  }
}
