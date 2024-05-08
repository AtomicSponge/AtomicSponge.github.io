/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { Command } from './Command.js'
import { renderMd } from '../extras/renderMd.js'
import { renderPrism } from '../extras/renderPrism.js'

import prmwhlCodeText from './PrimeWheel.ts?raw'
import fibseqCodeText from './FibonacciSequence.ts?raw'

export class CodeExample extends Command {
  static #projects:Array<{name:string, code:string, lang:string}>

  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'showcode'
    this.description = 'View the source code for the effects'

    CodeExample.#projects = [ 
      { name: 'primewheel', code: prmwhlCodeText, lang: 'typescript' },
      { name: 'fibseq', code: fibseqCodeText, lang: 'typescript' }
    ]

    let tempStr = 'Projects: '
    CodeExample.#projects.forEach(project => tempStr += `*${project.name}* | `)
    tempStr = tempStr.slice(0, -3).trim()
    this.help = renderMd(`Usage: \`showcode [project]\`<br/><br/>${tempStr}`)
  }

  /**
   * Process command
   * @param args Arguments to the command
   * @returns Result of the command
   */
  async exec(args:Array<string>):Promise<string> {
    let res = ''
    CodeExample.#projects.forEach(project => {
      if(String(args[0]).toLowerCase() === 'help') {
        res = this.help
        return
      }
      if(String(args[0]).toLowerCase() === project.name) {
        res = renderPrism(`{% highlight language-${project.lang} %}${project.code}{% endhighlight %}`)
        return
      }
    })
    if(res !== '') return res
    return `Nothing found with name ${args[0]}\n${this.help}`
  }
}
