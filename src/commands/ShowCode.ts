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

import termprcCodeText from '../modules/TermProcessor.ts?raw'
import termrndCodeText from '../modules/TermRenderer.ts?raw'
import commandCodeText from './Command.ts?raw'
import prmwhlCodeText from './PrimeWheel.ts?raw'
import fibseqCodeText from './FibonacciSequence.ts?raw'

export class ShowCode extends Command {
  static #projects:Array<{name:string, code:string, lang:string}>

  /**
   * Initialize 
   */
  constructor() {
    super()
    this.command = 'showcode'
    this.description = 'View the site source code'

    ShowCode.#projects = [ 
      { name: 'termprocessor', code: termprcCodeText, lang: 'typescript' },
      { name: 'termrenderer', code: termrndCodeText, lang: 'typescript' },
      { name: 'command', code: commandCodeText, lang: 'typescript' },
      { name: 'primewheel', code: prmwhlCodeText, lang: 'typescript' },
      { name: 'fibseq', code: fibseqCodeText, lang: 'typescript' }
    ]

    let tempStr = '__Options:__ '
    ShowCode.#projects.forEach((project, idx) => {
      tempStr += `*${project.name}*`
      {((idx + 1) % 5 === 0) ? tempStr += '<br/>' : tempStr += ' | '}
    })
    if(tempStr.slice(-3) === ' | ') tempStr = tempStr.slice(0, -3).trim()
    this.help = renderMd(`Usage: \`showcode [item]\`<br/><br/>${tempStr}`)
  }

  /**
   * Process command
   * @param args Arguments to the command
   * @returns Result of the command
   */
  async exec(args:Array<string>):Promise<string> {
    if(String(args[0]).toLowerCase() === 'help') return this.help
    if(String(args[0]).toLowerCase() === 'list') return this.help
    let res = ''
    ShowCode.#projects.forEach(project => {
      if(String(args[0]).toLowerCase() === project.name) {
        res = renderPrism(`{% highlight language-${project.lang} %}${project.code}{% endhighlight %}`)
        return
      }
    })
    if(res !== '') return res
    return `Nothing found with name '${args[0]}'\n${this.help}`
  }
}
