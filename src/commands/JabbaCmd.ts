/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'

import jabbaMarkdown from '../assets/markdown/jabbascript.md?raw'

export class JabbaCmd extends Command {
  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'jabbascript'
    this.description = 'Modern development'
  }

  /**
   * Process command
   * @param args 
   * @returns 
   */
  exec(args:Array<string>):string {
    return this.renderText(jabbaMarkdown)
    console.log(args)
  }
}
