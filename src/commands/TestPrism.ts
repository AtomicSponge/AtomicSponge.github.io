/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { renderPrism } from '../extras/renderPrism.js'

import prismTestText from '../assets/markdown/prism_test.md?raw'

export class TestPrism extends Command {
  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'testprism'
    this.description = 'Prism formatting test'
  }

  /**
   * Process command
   * @param args 
   * @returns 
   */
  async exec():Promise<string> {
    return renderPrism(prismTestText)
  }
}
