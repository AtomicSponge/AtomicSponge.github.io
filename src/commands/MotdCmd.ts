/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'

import motdMarkdown from '../assets/markdown/motd.md?raw'

export class MotdCmd extends Command {
  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'motd'
    this.description = 'Message of the Day'
  }

  /**
   * Process command
   * @param args 
   * @returns 
   */
  async exec(args:Array<string>):Promise<string> {
    const res = await (async () => {
      try {
        const options:RequestInit = {
          method: 'GET',
          mode: 'cors',
          credentials: 'same-origin'
        }
        const response = await fetch('https://atomicsponge.wtfsystems.net/site_stats.json', options)
        return response.json()
      } catch (error:any) {  //  Catch connection errors
        return error.message
      }
    })()
    console.log(res)
    return this.renderText(motdMarkdown)
    console.log(args)
  }
}
