/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

/**
 * Class for handling library errors
 * @extends Error
 */
export class TermError extends Error {
  message:string
  code:Object
  exitCode:number

  /**
   * Constructs the TermError class
   * @param message Error message
   * @param code Error code
   * @param {number} [exitCode=1] Exit code
   */
  constructor(message:string, code:Object, exitCode?:number) {
		super()

		this.name = this.constructor.name
    this.message = message
		this.code = code
		this.exitCode = exitCode || 1

    this.stack = new Error().stack
	}
}
