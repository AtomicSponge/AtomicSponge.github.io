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
    interval?:number
    useRandomOffset?:boolean
}

export class PrimeWheel extends Command {
  static #fontColor:string  //!
  static #fontSize:string  //!
  static #fontFace:string  //!
  static #spacing:number  //!
  //static #interval:number
  static #useRandomOffset:boolean  //!
  static #xOffset:number  //!
  static #yOffset:number  //!
  static #width:number
  static #height:number
  static #centerX:number
  static #centerY:number
  static #primeTable:Array<number>
  static #tableIdx:number  //!
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
    //PrimeWheel.#interval = options.interval || 1
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
    console.log(PrimeWheel.#primeTable)

    //  Primewheel animation function
    PrimeWheel.#animateFunc = ((_timeStamp) => {
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
      //  Reset wheel
      if(PrimeWheel.#tableIdx === PrimeWheel.#primeTable.length)
        PrimeWheel.#primeWheelReset()
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
  }

  /** Start the prime wheel */
  static #primeWheelStart() {
    PrimeWheel.#primeWheelStop()
    PrimeWheel.#tableIdx = 0
    if(PrimeWheel.#useRandomOffset) PrimeWheel.#setOffset()
    TermRenderer.setRenderer(PrimeWheel.#animateFunc)
    TermRenderer.start()
  }

  /** Stop the prime wheel */
  static #primeWheelStop() {
    PrimeWheel.#primeWheelReset()
    TermRenderer.stop()
  }
}
