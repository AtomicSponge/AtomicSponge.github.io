/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { renderPrism } from '../extras/renderPrism.js'

import prmwhlCodeText from './PrimeWheel.ts?raw'

export class CodeExample extends Command {
  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'showcode'
    this.description = 'View the source code for the Prime Wheel'
  }

  /**
   * Process command
   * @param args 
   * @returns 
   */
  async exec():Promise<string> {
    return renderPrism(`{% highlight language-typescript %}${prmwhlCodeText}{% endhighlight %}`)
  }
}
