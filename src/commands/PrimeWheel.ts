/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { TermRenderer } from '../modules/TermRenderer.js'

export interface PrimeWheelOptions {
    fontColor?:string
    fontSize?:string
    fontFace?:string
    scale?:number
    interval?:number
    useRandomOffset?:boolean
    spam?:boolean
    debug?:boolean
}

export class PrimeWheel extends Command {
  static #fontColor:string
  static #fontSize:string
  static #fontFace:string
  static #scale:number
  //static #interval:number
  static #useRandomOffset:boolean
  static #spam:boolean
  static #debug:boolean
  static #xOffset:number
  static #yOffset:number
  static #width:number
  static #height:number
  static #centerX:number
  static #centerY:number
  static #lastPrime:number
  static #animateFunc:FrameRequestCallback

  /**
   * Initialize PrimeWheel
   * @param options 
   */
  constructor(options:PrimeWheelOptions) {
    super()
    this.command = 'primewheel'
    this.description = 'Prime Wheel Effect'
    this.help =
      `<span style=\"font-weight: bold;\">Usage:</span> ` +
        `primewheel <em>start</em>|<em>stop</em>|<em>reset</em>|<em>color</em>`

    PrimeWheel.#fontColor = options.fontColor || '#0000FF'
    PrimeWheel.#fontSize = options.fontSize || '8px'
    PrimeWheel.#fontFace = options.fontFace || 'Arial'
    PrimeWheel.#scale = options.scale || 4
    //PrimeWheel.#interval = options.interval || 1
    PrimeWheel.#useRandomOffset = options.useRandomOffset || true
    PrimeWheel.#spam = options.spam || false
    PrimeWheel.#debug = options.debug || false
    PrimeWheel.#xOffset = 0
    PrimeWheel.#yOffset = 0
    PrimeWheel.#lastPrime = 2

    PrimeWheel.#width = TermRenderer.width
    PrimeWheel.#height = TermRenderer.height
    PrimeWheel.#centerX = PrimeWheel.#width / 2
    PrimeWheel.#centerY = PrimeWheel.#height / 2

    //  Primewheel animation function
    PrimeWheel.#animateFunc = (() => {
      //  Prime number found, draw it using cartesian coordinates
      if(PrimeWheel.#isPrime(PrimeWheel.#lastPrime)) {
        if(PrimeWheel.#spam) console.log('Found prime: ' + PrimeWheel.#lastPrime)
        TermRenderer.ctx.font = PrimeWheel.#fontSize + ' ' + PrimeWheel.#fontFace
        TermRenderer.ctx.fillStyle = PrimeWheel.#fontColor
        TermRenderer.ctx.fillText(`${PrimeWheel.#lastPrime}`,
          (PrimeWheel.#centerX + PrimeWheel.#xOffset) + (PrimeWheel.#lastPrime * Math.cos(PrimeWheel.#lastPrime)),
          (PrimeWheel.#centerY + PrimeWheel.#yOffset) - (PrimeWheel.#lastPrime * Math.sin(PrimeWheel.#lastPrime))
        )
      }

      PrimeWheel.#lastPrime++

      if(PrimeWheel.#lastPrime > 1400 * PrimeWheel.#scale) {
        PrimeWheel.#lastPrime = 2
        PrimeWheel.#centerX = PrimeWheel.#width / 2
        PrimeWheel.#centerY = PrimeWheel.#height / 2
        TermRenderer.clear()
      }
    })

    const observer = new ResizeObserver(() => {
      PrimeWheel.#width = TermRenderer.width
      PrimeWheel.#height = TermRenderer.height
    })
    observer.observe(document.documentElement)
  }

  /**
   * Process command
   * @param args Arguments to the command
   * @returns Result of the command
   */
  exec(args:Array<string>):string {
    if(String(args[0]).toLowerCase() === 'start') {
      PrimeWheel.#primeWheelStart()
      return 'Prime wheel started.'
    }
    if(String(args[0]).toLowerCase() === 'stop') {
      PrimeWheel.#primeWheelStop()
      return 'Prime wheel stopped.'
    }
    if(String(args[0]).toLowerCase() === 'reset') {
      PrimeWheel.#primeWheelReset()
      return 'Prime wheel reset.'
    }
    if(String(args[0]).toLowerCase() === 'color') {
      if(this.testHex(args[1]) || this.testRgb(args[1])) {
        PrimeWheel.#fontColor = args[1]
        return 'Color set.'
      }
      return 'Incorrect color code.'
    }
    return this.help
  }

  /**
   * Function to check if a number is prime
   * @param num Number to check
   * @returns True if prime, else false
   */
  static #isPrime(num:number) {
    for(var i = 2; i < num; i++) {
      if(num % i === 0) return false
    }
    return true
  }

  /**
   * Generate a random x,y offset for drawing the wheel
   */
  static #setOffset() {
    PrimeWheel.#xOffset = Math.floor(Math.random() * (PrimeWheel.#centerX * 2 / 3) + 1)
    PrimeWheel.#xOffset = PrimeWheel.#xOffset * (Math.random() < 0.5 ? -1 : 1)
    PrimeWheel.#yOffset = Math.floor(Math.random() * (PrimeWheel.#centerY * 2 / 3) + 1)
    PrimeWheel.#yOffset = PrimeWheel.#yOffset * (Math.random() < 0.5 ? -1 : 1)
  }

  /** Resets the effect */
  static #primeWheelReset() {
    TermRenderer.clear()
    PrimeWheel.#lastPrime = 2
    if(PrimeWheel.#useRandomOffset) PrimeWheel.#setOffset()
    if(PrimeWheel.#debug) console.log('Prime wheel reset')
  }

  /** Start the prime wheel */
  static #primeWheelStart() {
    PrimeWheel.#primeWheelStop()
    TermRenderer.setRenderer(PrimeWheel.#animateFunc)
    TermRenderer.start()
    if(PrimeWheel.#debug) console.log('Prime wheel started')
  }

  /** Stop the prime wheel */
  static #primeWheelStop() {
    PrimeWheel.#primeWheelReset()
    TermRenderer.stop()
    if(PrimeWheel.#debug) console.log('Prime wheel stopped')
  }
}
