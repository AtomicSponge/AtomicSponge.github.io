/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import showdown from 'showdown'

/**
 * Take a Markdown file and parse to HTML
 * @param text Markdown file to render (placed in /assets/markdown)
 * @returns The rendered & formatted text
 */
export const parseMd = (text:string):string => {
  const converter = new showdown.Converter()
  return converter.makeHtml(text)
}
