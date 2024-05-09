/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import { TermError } from './TermError.js'
import { Command } from '../commands/Command.js'

export class TermProcessor {
  /** Store all the command objects */
  static #commands:Array<Command> = []

  constructor() { return false }  //  Prevent direct construction

  /**
   * Process a command
   * @param cmd The command string passed from the Vue app
   * @returns A string with the result
   */
  static async processCommand(cmd:string):Promise<string> {
    /**
     * Find a string grouping and replace spaces
     * @param cmd Command being ran
     * @param regex Grouping regex
     */
    const processGroup = (cmd:string, regex:RegExp) => {
      const group = cmd.match(regex)
      const groupRes:Array<string> = []
      group?.forEach(item => groupRes.push(item.replace(/\s+/g, '%%__%%')))
      group?.forEach((item, idx) => cmd = cmd.replace(item, groupRes[idx]))
      return cmd
    }
    //  Match the ( ) grouping and remove spaces
    cmd = processGroup(cmd, /(?<=\()(.*?)(?=\))/g)
    //  Match the [ ] grouping and remove spaces
    cmd = processGroup(cmd, /(?<=\[)(.*?)(?=\])/g)
    //  Match the " " grouping and remove spaces
    cmd = processGroup(cmd, /(?<=\")(.*?)(?=\")/g)
    //  Match the ' ' grouping and remove spaces
    cmd = processGroup(cmd, /(?<=\')(.*?)(?=\')/g)
    //  Match the ` ` grouping and remove spaces
    cmd = processGroup(cmd, /(?<=\`)(.*?)(?=\`)/g)

    const cmdArr:Array<string> = cmd.split(' ')
    //  Add spaces back to the groups
    cmdArr.forEach((cmd, idx, arr) => { arr[idx] = cmd.replace(/%%__%%+/g, ' ') })

    if(String(cmdArr[0]).toLowerCase() === "help") return this.#render.help(TermProcessor.#commands)
    const res = TermProcessor.#commands.find(elm => elm.command === String(cmdArr[0]).toLowerCase())
    if(res === undefined)
      return "<span style=\"font-weight: bold;\">command not found:</span> " + cmdArr[0]
    return await res.exec(cmdArr.splice(1, cmdArr.length))
  }

  /**
   * Load a command module into the command array
   * Must be an instance of the Command abstract class
   * @param obj Command object to add
   * @throws Error if the object is not derived from the Command class
   * @throws Error if the command and description parameters are not set
   * @throws Error if the command already exists
   */
  static addModule(obj:Command):void {
    if(!(obj instanceof Command))
      throw new TermError("'addModule()' Error: Not an instance of Command.", TermProcessor.addModule)
    if(obj.command === "error" || obj.description === "error")
      throw new TermError("'addModule()' Error: Command or description parameters not defined.", TermProcessor.addModule)
    for(let i = 0; i < TermProcessor.#commands.length; i++) {
      if(TermProcessor.#commands[i].command === obj.command)
        throw new TermError(`'addModule()' Error: Command '${obj.command}' already exists.`, TermProcessor.addModule)
    }
    TermProcessor.#commands.push(obj)
  }

  /**
   * Return reference to a loaded command module
   * @param cmd Command name to search for
   * @returns Command object with matching command name
   * @throws Error if the command is not found
   */
  static getModule(cmd:string):Command {
    const res = TermProcessor.#commands.find(elm => elm.command === cmd)
    if(res === undefined)
      throw new TermError(`'getModule()' Error: Module '${cmd}' not found!`, TermProcessor.getModule)
    return res
  }

  static #render = {
    /**
     * Help render function
     * @param commands 
     * @returns The Help display
     */
    help(commands:Array<Command>):string {
      var help = "<table style=\"border: 0px;\">"
      help += "<tr><th style=\"text-align: left;\">Command</th>"
      help += "<th>&nbsp;&nbsp;&nbsp;</th><th>Description</th></tr>"
      for(let i = 0; i < commands.length; i++) {
        help += "<tr>"
        help += "<td><span style=\"font-weight: bold;\">" + commands[i].command + "</span></td>"
        help += "<td>&nbsp;&nbsp;&nbsp;</td>"
        help += "<td>" + commands[i].description + "</td>"
        help += "</tr>"
      }
      help += "<tr><td><span style=\"font-weight: bold;\">clear</span></td>"
      help += "<td>&nbsp;&nbsp;&nbsp;</td>"
      help += "<td>Clear the screen</td></tr></table>"
      return help
    }
  }
}
