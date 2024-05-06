/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import showdown from 'showdown'

import { TermError } from '../modules/TermError'

export class Command {
  /**
   * Command to run
   * This needs to be changed in the extending class
   */
  #command:string = 'error'
  /**
   * Description of command
   * This needs to be changed in the extending class
   */
  #description:string = 'error'
  /**
   * Help for command
   * This needs to be changed in the extending class
   */
  #help:string = ''

  /** Flag to check if command is set */
  #commandSet:boolean = false
  /** Flag to check if description is set */
  #descriptionSet:boolean = false
  /** Flag to check if help is set */
  #helpSet:boolean = false

  /**
   * Restrict creating direct instances of this class
   * @throws Error if directly constructed
   */
  constructor() {
    if(this.constructor === Command) {
      throw new TermError('Command class is abstract!', this.constructor)
    }
  }

  /**
   * Exec function to define what the command runs
   * @param args List of arguments to pass to command
   * @throws Throws error if not implemented in overriding class
   */
  async exec(_args:Array<string>):Promise<string> {
    throw new TermError('Member \'exec()\' must be implemented!', this.exec)
  }

  /**
   * Take a Markdown file and parse to HTML
   * @param mdFileName Markdown file to render (placed in /assets/markdown)
   * @returns The rendered & formatted text
   */
  renderText(text:string, usePrism?:boolean):string {
    const converter = new showdown.Converter()
    const resText = converter.makeHtml(text)
    if(usePrism) {
      console.log('prism highlighting enabled')
    }
    return resText
  }

  /**
   * Regex that tests for hex
   * @param str String to test
   * @returns True if valid, else false
   */
  testHex(str:string) {
    return /^#[0-9a-f]{3,4}([0-9a-f]{3,4})?$/i.test(str)
  }

  /**
   * Regex that tests for rgb(a) or hsl(a)
   * @param str String to test
   * @returns True if valid, else false
   */
  testRgb(str:string) {
    str = str.replace(/,\s+/g, ',')
    return /^(rgb|hsl)a?\((-?\d+%?[,\s]+){2,3}\s*[\d\.]+%?\)$/i.test(str)
  }

  /**
   * Test for valid pixel format (NNpx)
   * @param str String to test
   * @returns True if valid pixel format, else false
   */
  testPixel(str:string) {
    return /^([0-9]+)px$/i.test(str)
  }

  /**
   * Test for alphabetic charecters
   * @param str String to test
   * @returns True if the string is only alpha, else false
   */
  testAlpha(str:string) {
    return /^[A-Za-z]+$/g.test(str)
  }

  /**
   * Test for numeric charecters
   * @param str String to test
   * @returns True if the string is only numeric, else false
   */
  testNumeric(str:string) {
    return /^\d+$/g.test(str)
  }

  /**
   * Test for alphabetic and numeric charecters
   * @param str String to test
   * @returns True if the string is only alpha and numeric, else false
   */
  testAlphaNumeric(str:string) {
    return /^[a-zA-Z0-9]+$/g.test(str)
  }

  /**
   * Get the command used to perform execution
   * @returns The command
   */
  get command():string { return this.#command }

  /**
   * Get the command's description
   * @returns The description
   */
  get description():string { return this.#description }

  /**
   * Get the command's help
   * @returns The command help
   */
  get help():string { return this.#help }

  /**
   * Set the command used to run
   * Can only be set once
   * @param cmd Command to set
   * @throws Error if the command is already set
   */
  set command(cmd:string) {
    if(this.#commandSet)
      throw new TermError('Command already set!', this.command)
    this.#command = cmd
    this.#commandSet = true
  }

  /**
   * Set the command description
   * Can only be set once
   * @param desc Command description to set
   * @throws Error if the command is already set
   */
  set description(desc:string) {
    if(this.#descriptionSet)
      throw new TermError('Description already set!', this.description)
    this.#description = desc
    this.#descriptionSet = true
  }

  /**
   * Set the command help
   * Can only be set once
   * @param desc Command help to set
   * @throws Error if the command is already set
   */
  set help(helpTxt:string) {
    if(this.#helpSet)
      throw new TermError('Help already set!', this.help)
    this.#help = helpTxt
    this.#helpSet = true
  }
}
