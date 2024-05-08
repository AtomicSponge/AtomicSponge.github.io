{% highlight language-javascript %}
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
import { testHex, testRgb, testPixel, testNumeric } from '../extras/regexps.js'
import { renderMd } from '../extras/renderMd.js'

import primeHelpString from '../assets/markdown/primewheel_help.md?raw'
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
   * @throws Throws error when problems with adding a new wheel
   */
  constructor(options:WheelList) {
    super()
    this.command = 'primewheel'
    this.description = 'Prime Wheel Effect'
    this.help = renderMd(primeHelpString)

    options.forEach(option => {
      const temp = PrimeWheel.#makeWheel(option)
      if(temp === null)
        throw new TermError(`Bad wheel '${option}' when adding to Prime Wheel!`, this.constructor)

      if(PrimeWheel.#wheels.length < PrimeWheel.maxWheels)
        PrimeWheel.#wheels.push(temp)
      else
        throw new TermError(`Max number of wheels allowed reached!`, this.constructor)
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
   * Process Prime Wheel commands
   * @param args Arguments to the command
   * @returns Result of the command
   */
  async exec(args:Array<string>):Promise<string> {
    switch(String(args[0]).toLowerCase()) {
      case 'start':
        PrimeWheel.#primeWheelStart()
        return `Prime wheel started.`
      case 'stop':
        PrimeWheel.#primeWheelStop()
        return `Prime wheel stopped.`
      case 'reset':
        PrimeWheel.#primeWheelReset()
        return `Prime wheel reset.`
      case 'list':
        let resStr = `<table>`
        PrimeWheel.#wheels.forEach((wheel, idx) => {
          resStr += `<tr><td>Wheel ${idx}:</td>`
          resStr += `<td>Color: ${wheel.fontColor}</td>`
          resStr += `<td>Spacing: ${wheel.spacing}</td>`
          resStr += `<td>Durration: ${wheel.durration}</td>`
          resStr += `<td>Offset: ${wheel.useRandomOffset}</td></tr>`
        })
        resStr += `</table>`
        return resStr
      case 'add':
        if(PrimeWheel.#wheels.length >= PrimeWheel.maxWheels)
          return `Max number of wheels allowed reached.`
        const options = {
          fontColor: '#ffffff',
          spacing: 10,
          durration: 10,
          useRandomOffset: true
        }
        const addArgs = args.slice(1)
        try {
          addArgs.forEach(arg => {
            const prop = arg.split('=')
            if(prop.length === 2 && prop[1] != '') {
              switch(prop[0]) {
                case 'color':
                  options.fontColor = prop[1]
                  break
                case 'spacing':
                  options.spacing = Number(prop[1])
                  break
                case 'durration':
                  options.durration = Number(prop[1])
                  break
                case 'offset':
                  options.useRandomOffset = Boolean(prop[1])
                  break
                default:
                  throw new Error(`Problems adding the new wheel!  Bad argument '${arg}'!`)
              }
            } else {
              throw new Error(`Problems adding the new wheel!  Bad argument '${arg}'!`)
            }
          })
        } catch(error:any) { return error.message }
        const tempWheel = PrimeWheel.#makeWheel(options)
        if(tempWheel === null) return `Problems adding the new wheel!  Make sure your parameters are valid!`
        PrimeWheel.#wheels.push(tempWheel)
        PrimeWheel.#primeWheelReset()
        return `Added new wheel.`
      case 'remove':
        if(!testNumeric(args[1])) return `${args[1]} is not a number!`
        const tempR = Number(args[1])
        if(tempR >= PrimeWheel.#wheels.length || tempR < 0)
          return `Bad index, no wheel at position ${args[1]}`
        PrimeWheel.#wheels = PrimeWheel.#wheels.slice(0, tempR).concat(PrimeWheel.#wheels.slice(tempR + 1))
        PrimeWheel.#primeWheelReset()
        return `Removed wheel at index ${args[1]}`
      case 'color':
        if(!testNumeric(args[1])) return `${args[1]} is not a number!`
        const tempC = Number(args[1])
        if(tempC >= PrimeWheel.#wheels.length || tempC < 0)
          return `Bad index, no wheel at position ${args[1]}`
        if(testHex(args[2]) || testRgb(args[2])) {
          PrimeWheel.#wheels[tempC].fontColor = args[2]
          PrimeWheel.#primeWheelReset()
          return `Color set.`
        }
        return `Incorrect color code.`
      default:
        return this.help
    }
  }

  /**
   * Generate a random x,y offset for a wheel
   * @param wheel Wheel to generate offset for
   */
  static #setOffset(wheel:Wheel):void {
    wheel.xOffset = Math.floor(Math.random() * (PrimeWheel.#centerX * 2 / 3) + 1)
    wheel.xOffset = wheel.xOffset * (Math.random() < 0.5 ? -1 : 1)
    wheel.yOffset = Math.floor(Math.random() * (PrimeWheel.#centerY * 2 / 3) + 1)
    wheel.yOffset = wheel.yOffset * (Math.random() < 0.5 ? -1 : 1)
  }

  /** Resets the effect */
  static #primeWheelReset():void {
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
  static #primeWheelStart():void {
    PrimeWheel.#primeWheelStop()
    TermRenderer.setRenderer(PrimeWheel.#animateFunc)
    PrimeWheel.#startTime = <DOMHighResTimeStamp>document.timeline.currentTime
    TermRenderer.start()
  }

  /** Stop the prime wheel */
  static #primeWheelStop():void {
    PrimeWheel.#primeWheelReset()
    TermRenderer.stop()
  }

  /**
   * Create a new Prime Wheel
   * @param options Options for the new wheel
   * @returns A new wheel object, or null if the object does not pass tests
   */
  static #makeWheel(options:PrimeWheelOptions):Wheel | null {
    const temp:Wheel = {
      fontColor: options.fontColor || '#0000FF',
      fontSize: options.fontSize || '8px',
      fontFace: options.fontFace || 'Arial',
      spacing: options.spacing || 20,
      durration: options.durration || 20,
      useRandomOffset: options.useRandomOffset || false,
      xOffset: options.xOffset || 0,
      yOffset: options.yOffset || 0,
      tableIdx: 0,
      complete: false
    }
    if(!testHex(temp.fontColor) && !testRgb(temp.fontColor)) return null
    if(!testPixel(temp.fontSize)) return null
    return temp
  }

  /** Get number of created wheels */
  static get numWheels():number { return PrimeWheel.#wheels.length }
  /** Get the max number of wheels allowed */
  static get maxWheels():number { return 5 }
}
{% endhighlight %}
