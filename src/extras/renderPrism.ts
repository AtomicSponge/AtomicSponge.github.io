/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import Prism from 'prismjs'
import showdown from 'showdown'

/**
 * Render a markdown file that contains Prism highlighting
 * @param text Text to convert
 * @returns Converted string of text
 */
export const renderPrism = (text:string):string => {
  //  First, find start/end indices of the code blocks
  const codeStartRx = /{% highlight.*/g
  const codeEndRx = /{% endhighlight %}/g
  const startIndices = [], endIndices = []
  let result
  while((result = codeStartRx.exec(text)) !== null)
    startIndices.push(result.index)
  while((result = codeEndRx.exec(text)) !== null)
    endIndices.push(result.index)

  //  If nothing was found or format error, just do showdown conversion and return
  if((startIndices.length !== endIndices.length) || startIndices.length === 0) {
    const converter = new showdown.Converter()
    return converter.makeHtml(text)
  }

  //  Capture the code blocks, format them, and store in result array
  const formattedCode = []
  for(let i = 0; i < startIndices.length; i++) {
    //  Get the text to replace
    let tempStr = text.substring(startIndices[i], endIndices[i])

    //  Determine code language to format as
    const codeLang = (() => {
      const temp = tempStr.match(/(?<={% highlight language-+).*?(?=\s+%})/)
      if(temp !== null) return temp[0]
      return 'javascript' //  Didn't find language, use JavaScript
    })()

    //  Wipe the code block start tag
    tempStr = tempStr.substring(tempStr.indexOf('%}') + 2)
    //  Highlight with PrismJS
    tempStr = Prism.highlight(tempStr, Prism.languages[codeLang], codeLang)
    //  Add background formatting
    tempStr = `<pre class=\"language-${codeLang}\">${tempStr}</pre>`
    //  Push to the formatted code array
    formattedCode.push(tempStr)
  }

  //  Use showdown to process markdown
  const converter = new showdown.Converter()
  text = converter.makeHtml(text)

  //  Now go back and insert the formatted code
  for(let i = 0; i < formattedCode.length; i++) {
    //  Calc indices each step, as position will change
    const start = (() => {
      const temp = codeStartRx.exec(text)
      if(temp !== null) return temp.index
      console.error(`START INDEX ERROR IN FUNCTION RENDERPRISM!`)
      return 0
    })()
    const end = (() => {
      const temp = codeEndRx.exec(text)
      if(temp !== null) return temp.index
      console.error(`END INDEX ERROR IN FUNCTION RENDERPRISM!`)
      return 0
    })()

    //  Do the replacement
    const tempStr = text.substring(start, end + '{% endhighlight %}'.length)
    text = text.replace(tempStr, formattedCode[i])
  }

  return text
}
