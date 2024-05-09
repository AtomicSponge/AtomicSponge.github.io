/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { renderMd } from '../extras/renderMd.js'
import { testHex, testRgb } from '../extras/regexps.js'

import setColorHelp from '../assets/markdown/setcolor_help.md?raw'

export class SetColor extends Command {
  /** Store the default background color */
  defaultBgColor:string = 'rgb(36, 36, 36)'
  /** Store the default foreground color */
  defaultFgColor:string = 'rgba(255, 255, 255, 0.87)'
  /** Store the initial background color */
  initialBgColor:string
  /** Store the initial foreground color */
  initialFgColor:string

  /**
   * Initialize SetColor
   */
  constructor() {
    super()
    this.command = 'setcolor'
    this.description = 'Set terminal colors'
    this.help = renderMd(setColorHelp)

    this.#loadColors()
    this.initialBgColor = document.body.style.backgroundColor
    this.initialFgColor = document.body.style.color
  }

  /**
   * Process Set Color commands
   * @param args Arguments to the command
   * @returns Result of the command
   */
  async exec(args:Array<string>):Promise<string> {
    var errMsg = 'See <code>setcolor help</code> for more info.'
    switch(String(args[0]).toLowerCase()) {
      case 'help': return this.help
      case 'reset':
        if(!this.#loadColors()) {
          this.#setBgColor(this.initialBgColor)
          this.#setFontColor(this.initialFgColor)
        }
        return 'Colors reset.'
      case 'default':
        this.#setBgColor(this.defaultBgColor)
        this.#setFontColor(this.defaultFgColor)
        return 'Colors reset to default.'
      case 'save':
        if (this.#saveColors()) return 'Color settings saved.'
        return 'Error saving color settings!'
      case 'load':
        if(this.#loadColors()) return 'Color settings loaded.'
        return 'Error loading color settings!'
      case 'background':
        if(testHex(args[1]) || testRgb(args[1])) {
          this.#setBgColor(args[1])
          return 'Background color set.'
        }
        return 'Incorrect color code. ' + errMsg
      case 'font':
        if(testHex(args[1]) || testRgb(args[1])) {
          this.#setFontColor(args[1])
          return 'Font color set.'
        }
        return 'Incorrect color code. ' + errMsg
      default:
        return this.help
    }
  }

  /**
   * Set the background color
   * @param color Color to set
   */
  #setBgColor(color:string):void {
    document.body.style.backgroundColor = color
  }

  /**
   * Set the font color
   * @param color Color to set
   */
  #setFontColor(color:string):void {
    document.body.style.color = color
  }

  /**
   * Check if color settings exist locally
   * @returns True if they do, else false
   */
  #settingsExist():boolean {
    if(localStorage.getItem('bgcolor') === null) return false
    if(localStorage.getItem('fgcolor') === null) return false
    return true
  }

  /**
   * Save color settings to localstore
   * @returns True if settings were saved, else false
   */
  #saveColors():boolean {
    localStorage.setItem('bgcolor', document.body.style.backgroundColor)
    localStorage.setItem('fgcolor', document.body.style.color)
    if(this.#settingsExist()) return true
    return false
  }

  /**
   * Load color settings from localstore
   * @returns True if settings were loaded, else false
   */
  #loadColors():boolean {
    if(this.#settingsExist()) {
      document.body.style.backgroundColor = <string>localStorage.getItem('bgcolor')
      document.body.style.color = <string>localStorage.getItem('fgcolor')
      return true
    }
    return false
  }
}
