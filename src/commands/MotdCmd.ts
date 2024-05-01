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
  async exec():Promise<string> {
    return this.renderText(motdMarkdown)
  }
}
