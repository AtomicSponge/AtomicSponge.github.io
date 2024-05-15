/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { parseMd } from '../parsers/parseMd.js'

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
   * @returns Rendered result
   */
  async exec():Promise<string> {
    return parseMd(aboutMarkdown)
  }
}
