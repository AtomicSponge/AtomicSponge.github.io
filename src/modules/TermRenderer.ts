/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { TermError } from './TermError.js'

export class TermRenderer {
  /** Flag if the renderer was initialized */
  static #initialized:boolean = false
  /** Flag if the renderer is ready to run */
  static #ready:boolean = false
  /** Reference to the canvas ID */
  static #canvas_name:string = '___termrenderer_canvas_id'
  /** Reference to the canvas element */
  static #canvas:HTMLCanvasElement
  /** Reference to the drawing context */
  static #ctx:CanvasRenderingContext2D
  /** Reference to the rendering process */
  static #renderProc:number
  /** Rendering function */
  static #renderFunc:FrameRequestCallback
  /** Background color */
  static #bgColor:string = 'rgba(0, 0, 0, 0.66)'
  /** Zero timer - point in time when first frame is drawn for a new animation */
  static #zero:number = <number>document.timeline.currentTime
  /** Start timer - point in time when renderer starts */
  static #start:number = <number>document.timeline.currentTime

  constructor() { return false }  //  Don't allow direct construction

  /** Set up the TermRenderer */
  static initialize = () => {
    if(TermRenderer.#initialized)
      throw new TermError('TermRenderer already initialized!', this.constructor)
    //  Append canvas css styling
    const cssElem = document.createElement('style')
    cssElem.innerHTML = `
      #${TermRenderer.#canvas_name} {
        pointer-events: none;
        position: fixed;
        margin: 0;
        padding: 0;
        background-color: ${TermRenderer.#bgColor};
      }`
    document.body.appendChild(cssElem)

    //  Prepend canvas html
    const canvas = document.createElement('canvas')
    canvas.setAttribute('id', TermRenderer.#canvas_name)
    canvas.setAttribute('width', `${document.documentElement.clientWidth}`)
    canvas.setAttribute('height', `${document.documentElement.clientHeight}`)
    document.body.prepend(canvas)

    TermRenderer.#canvas = <HTMLCanvasElement>document.getElementById(TermRenderer.#canvas_name)
    TermRenderer.#canvas.style.display = 'none'
    TermRenderer.#ctx = <CanvasRenderingContext2D>TermRenderer.#canvas.getContext("2d")
    TermRenderer.#renderProc = 0

    const observer = new ResizeObserver(() => {
      const temp = TermRenderer.#ctx.getImageData(0, 0, TermRenderer.#canvas.width, TermRenderer.#canvas.height)
      TermRenderer.#canvas.width = document.documentElement.clientWidth
      TermRenderer.#canvas.height = document.documentElement.clientHeight
      TermRenderer.#ctx.putImageData(temp, 0, 0, 0, 0, TermRenderer.#canvas.width, TermRenderer.#canvas.height)
    })
    observer.observe(document.documentElement)

    TermRenderer.#initialized = true
  }

  /**
   * Set the renderer's animation function
   * @param func Animation function
   */
  static setRenderer = (func:FrameRequestCallback) => {
    if(!(func instanceof Function))
      throw new TermError('Provided animation is not a function!', TermRenderer.setRenderer)
    TermRenderer.#renderFunc = func
    TermRenderer.#ready = true
  }

  /** Start the renderer */
  static start = () => {
    if(!TermRenderer.isReady) return  //  Prevent running if an animation function was not set
    if(TermRenderer.isRunning) TermRenderer.stop()
    TermRenderer.clear()
    TermRenderer.show()
    TermRenderer.#start = <number>document.timeline.currentTime
    TermRenderer.#renderProc = window.requestAnimationFrame(TermRenderer.#firstFrame)
  }

  /** First animation frame */
  static #firstFrame() {
    TermRenderer.#zero = <number>document.timeline.currentTime
    TermRenderer.#animate(<number>document.timeline.currentTime)
  }

  /**
   * Perform rendering
   * Calls the provided animation function
   * @param timeStamp Current time
   */
  static #animate(timeStamp:number) {
    const value = (timeStamp - TermRenderer.#zero) /
      (<number>document.timeline.currentTime - TermRenderer.#start)
    if(value < 1) {
      TermRenderer.#renderFunc(timeStamp)
      TermRenderer.#renderProc = requestAnimationFrame((timeStamp) => TermRenderer.#animate(timeStamp))
    }
  }

  /** Stop the renderer */
  static stop = () => {
    TermRenderer.hide()
    window.cancelAnimationFrame(TermRenderer.#renderProc)
    TermRenderer.#renderProc = 0
  }

  /** Clear the renderer */
  static clear = () => {
    TermRenderer.#ctx.clearRect(0, 0, TermRenderer.width, TermRenderer.height)
  }

  /** Show the renderer */
  static show = () => {
    TermRenderer.#canvas.style.display = 'block'
  }

  /** Hide the renderer */
  static hide = () => {
    TermRenderer.#canvas.style.display = 'none'
  }

  /**
   * Check if the renderer is ready to start
   * This requires both initilization to be ran and a render function to be set
   * @returns If the renderer is ready to run
   */
  static get isReady():boolean {
    return TermRenderer.#initialized && TermRenderer.#ready
  }

  /**
   * Check if the renderer is running
   * @retunrs True if it is, false if not
   */
  static get isRunning():boolean {
    if(TermRenderer.#renderProc === 0) return false
    return true
  }

  /**
   * Get the renderer's drawing context
   * @retunrs The drawing context
   */
  static get ctx():CanvasRenderingContext2D { return TermRenderer.#ctx }

  /**
   * Get the renderer's width
   * @retunrs Width in pixels
   */
  static get width():number { return TermRenderer.#canvas.width }

  /**
   * Get the renderer's height
   * @retunrs Height in pixels
   */
  static get height():number { return TermRenderer.#canvas.height }
}
