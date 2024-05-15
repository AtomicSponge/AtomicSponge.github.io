/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { parseMd } from '../parsers/parseMd.js'

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
   * @returns Result of the command
   */
  async exec():Promise<string> {
    let resStr = `<table><tr>`
    resStr += `<td>${parseMd(jabbaMarkdown)}</td>`
    resStr += `<td><iframe src="/assets/site_stats.html" width="320" height="220" style="border: none"/></td>`
    resStr += `</tr></table>`
    return resStr
  }
}
