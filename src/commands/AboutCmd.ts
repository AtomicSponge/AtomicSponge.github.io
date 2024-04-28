/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'

import aboutMarkdown from '../assets/markdown/about.md?raw'

export class AboutCmd extends Command {
  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'about'
    this.description = 'About this website'
  }

  /**
   * Process command
   * @param args 
   * @returns 
   */
  async exec(args:Array<string>):Promise<string> {
    return this.renderText(aboutMarkdown)
    console.log(args)
  }
}
