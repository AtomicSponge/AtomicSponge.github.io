/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { TermRenderer } from '../modules/TermRenderer.js'

import primeTableString from '../assets/markdown/primetable.md?raw'

export interface PrimeWheelOptions {
    fontColor?:string
    fontSize?:string
    fontFace?:string
    durration?:number
    useRandomOffset?:boolean
}

export class PrimeWheel extends Command {
  static #width:number
  static #height:number
  static #centerX:number
  static #centerY:number
  static #primeTable:Array<number>
  static #animateFunc:FrameRequestCallback
  static #startTime:DOMHighResTimeStamp
  
  static #fontColor:string
  static #fontSize:string
  static #fontFace:string
  static #spacing:number
  static #durration:number
  static #useRandomOffset:boolean
  static #xOffset:number
  static #yOffset:number
  static #tableIdx:number

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
    PrimeWheel.#durration = options.durration || 20
    PrimeWheel.#useRandomOffset = options.useRandomOffset || true
    PrimeWheel.#xOffset = 0
    PrimeWheel.#yOffset = 0

    PrimeWheel.#width = TermRenderer.width
    PrimeWheel.#height = TermRenderer.height
    PrimeWheel.#centerX = PrimeWheel.#width / 2
    PrimeWheel.#centerY = PrimeWheel.#height / 2

    PrimeWheel.#spacing = 20

    PrimeWheel.#tableIdx = 0
    PrimeWheel.#primeTable = []
    const tempTable = primeTableString.split(',')
    tempTable.forEach(prime => PrimeWheel.#primeTable.push(Number(prime)))

    //  Primewheel animation function
    PrimeWheel.#animateFunc = ((timeStamp) => {
      const timeFraction = (timeStamp - PrimeWheel.#startTime) / (PrimeWheel.#durration * 1000)

      if(timeFraction < 1) {
        TermRenderer.ctx.font = PrimeWheel.#fontSize + ' ' + PrimeWheel.#fontFace
        TermRenderer.ctx.fillStyle = PrimeWheel.#fontColor
        const locX = (PrimeWheel.#centerX + PrimeWheel.#xOffset) +
                     (PrimeWheel.#primeTable[PrimeWheel.#tableIdx] *
                      Math.cos(PrimeWheel.#primeTable[PrimeWheel.#tableIdx])) / PrimeWheel.#spacing
        const locY = (PrimeWheel.#centerY + PrimeWheel.#yOffset) -
                     (PrimeWheel.#primeTable[PrimeWheel.#tableIdx] *
                      Math.sin(PrimeWheel.#primeTable[PrimeWheel.#tableIdx])) / PrimeWheel.#spacing
        TermRenderer.ctx.fillText(`${PrimeWheel.#primeTable[PrimeWheel.#tableIdx]}`, locX, locY)

        PrimeWheel.#tableIdx++
      } else PrimeWheel.#primeWheelReset()
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
  async exec(args:Array<string>):Promise<string> {
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
    PrimeWheel.#tableIdx = 0
    PrimeWheel.#centerX = PrimeWheel.#width / 2
    PrimeWheel.#centerY = PrimeWheel.#height / 2
    if(PrimeWheel.#useRandomOffset) PrimeWheel.#setOffset()
    PrimeWheel.#startTime = <DOMHighResTimeStamp>document.timeline.currentTime
  }

  /** Start the prime wheel */
  static #primeWheelStart() {
    PrimeWheel.#primeWheelStop()
    TermRenderer.setRenderer(PrimeWheel.#animateFunc)
    PrimeWheel.#startTime = <DOMHighResTimeStamp>document.timeline.currentTime
    TermRenderer.start()
  }

  /** Stop the prime wheel */
  static #primeWheelStop() {
    PrimeWheel.#primeWheelReset()
    TermRenderer.stop()
  }
}
