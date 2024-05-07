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
import { testHex, testRgb, testPixel } from '../extras/regexps.js'

import primeTableString from '../assets/markdown/primetable.md?raw'

interface PrimeWheelOptions {
  fontColor?:string
  fontSize?:string
  fontFace?:string
  spacing?:number
  durration?:number
  useRandomOffset?:boolean
  xOffset?:number
  yOffset?:number
}
type WheelList = PrimeWheelOptions[]

interface Wheel {
  fontColor:string
  fontSize:string
  fontFace:string
  spacing:number
  durration:number
  useRandomOffset:boolean
  xOffset:number
  yOffset:number
  tableIdx:number
  complete:boolean
}

export class PrimeWheel extends Command {
  static #width:number
  static #height:number
  static #centerX:number
  static #centerY:number
  static #startTime:DOMHighResTimeStamp
  static #animateFunc:FrameRequestCallback
  static #primeTable:Array<number>
  static #wheels:Array<Wheel> = []

  /**
   * Initialize PrimeWheel
   * @param options List of wheels to add
   * @throws Throws error if a color code is incorret
   */
  constructor(options:WheelList) {
    super()
    this.command = 'primewheel'
    this.description = 'Prime Wheel Effect'
    this.help =
      `<span style=\"font-weight: bold;\">Usage:</span> ` +
        `primewheel <em>start</em>|<em>stop</em>|<em>reset</em>|<em>color</em>`

    options.forEach(option => {
      const temp:Wheel = {
        fontColor: option.fontColor || '#0000FF',
        fontSize: option.fontSize || '8px',
        fontFace: option.fontFace || 'Arial',
        spacing: option.spacing || 20,
        durration: option.durration || 20,
        useRandomOffset: option.useRandomOffset || false,
        xOffset: option.xOffset || 0,
        yOffset: option.yOffset || 0,
        tableIdx: 0,
        complete: false
      }
      if(!testHex(temp.fontColor) && !testRgb(temp.fontColor))
        throw new TermError(`Incorrect color code '${temp.fontColor}' when adding to Prime Wheel!`, this.constructor)
      if(!testPixel(temp.fontSize))
        throw new TermError(`Incorrect pixel size '${temp.fontSize}' when adding to Prime Wheel!`, this.constructor)

      if(PrimeWheel.#wheels.length < PrimeWheel.maxWheels)
        PrimeWheel.#wheels.push(temp)
    })

    PrimeWheel.#width = TermRenderer.width
    PrimeWheel.#height = TermRenderer.height
    PrimeWheel.#centerX = PrimeWheel.#width / 2
    PrimeWheel.#centerY = PrimeWheel.#height / 2

    PrimeWheel.#primeTable = []
    const tempTable = primeTableString.split(',')
    tempTable.forEach(prime => PrimeWheel.#primeTable.push(Number(prime)))

    //  Primewheel animation function
    PrimeWheel.#animateFunc = ((timeStamp) => {
      PrimeWheel.#wheels.forEach(wheel => {
        const timeFraction = (timeStamp - PrimeWheel.#startTime) / (wheel.durration * 1000)

        if(timeFraction < 1 && wheel.tableIdx !== PrimeWheel.#primeTable.length) {
          TermRenderer.ctx.font = wheel.fontSize + ' ' + wheel.fontFace
          TermRenderer.ctx.fillStyle = wheel.fontColor
          const locX = (PrimeWheel.#centerX + wheel.xOffset) +
                      (PrimeWheel.#primeTable[wheel.tableIdx] *
                       Math.cos(PrimeWheel.#primeTable[wheel.tableIdx])) / wheel.spacing
          const locY = (PrimeWheel.#centerY + wheel.yOffset) -
                      (PrimeWheel.#primeTable[wheel.tableIdx] *
                       Math.sin(PrimeWheel.#primeTable[wheel.tableIdx])) / wheel.spacing
          TermRenderer.ctx.fillText(`${PrimeWheel.#primeTable[wheel.tableIdx]}`, locX, locY)

          wheel.tableIdx++
        } else wheel.complete = true
      })

      if(PrimeWheel.#wheels.every(item => item.complete))
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
    /*if(String(args[0]).toLowerCase() === 'color') {
      if(testHex(args[1]) || testRgb(args[1])) {
        PrimeWheel.#fontColor = args[1]
        return 'Color set.'
      }
      return 'Incorrect color code.'
    }*/
    return this.help
  }

  /**
   * Generate a random x,y offset for a wheel
   * @param wheel Wheel to generate offset for
   */
  static #setOffset(wheel:Wheel) {
    wheel.xOffset = Math.floor(Math.random() * (PrimeWheel.#centerX * 2 / 3) + 1)
    wheel.xOffset = wheel.xOffset * (Math.random() < 0.5 ? -1 : 1)
    wheel.yOffset = Math.floor(Math.random() * (PrimeWheel.#centerY * 2 / 3) + 1)
    wheel.yOffset = wheel.yOffset * (Math.random() < 0.5 ? -1 : 1)
  }

  /** Resets the effect */
  static #primeWheelReset() {
    TermRenderer.clear()
    PrimeWheel.#centerX = PrimeWheel.#width / 2
    PrimeWheel.#centerY = PrimeWheel.#height / 2
    PrimeWheel.#wheels.forEach(wheel => {
      wheel.complete = false
      wheel.tableIdx = 0
      if(wheel.useRandomOffset) PrimeWheel.#setOffset(wheel)
    })
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

  /** Get number of created wheels */
  static get numWheels() { return PrimeWheel.#wheels.length }
  /** Get the max number of wheels allowed */
  static get maxWheels() { return 5 }
}
