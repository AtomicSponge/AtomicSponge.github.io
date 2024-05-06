/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import showdown from 'showdown'
import Prism from 'prismjs'

export const renderPrism = (text:string):string => {
  const codeLang = 'javascript'
  text = Prism.highlight(text, Prism.languages[codeLang], codeLang)

  //  Use showdown to process markdown
  const converter = new showdown.Converter()
  text = converter.makeHtml(text)

  return text
}
