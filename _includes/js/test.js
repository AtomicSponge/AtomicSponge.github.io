/*
 * test
 *
 * Filename:  test.js
 * By:  Matthew Evans
 *      https://atomicsponge.wtfsystems.net/
 * Version:  063022
 *
 * Copyright (c) 2022 Matthew Evans - See LICENSE.md
 *
 */

class test {
    static #bg_color = '#000000'  //  Background color
    static #canvas_name = 'test'  //  Target draw canvas
    static #ctx = null            //  2d drawing contex
    static #canvas = null         //  Canvas to draw to
    static #center_x = 0          //  Center X of canvas
    static #center_y = 0          //  Center Y of canvas
    static #width = 0
    static #height = 0

    static {
        this.#canvas = document.getElementById(this.#canvas_name)
        //  Make sure the canvas element exists
        if(this.#canvas == null || this.#canvas == undefined)
            new Error(`Error:  Unable to find a canvas named '${this.#canvas_name}'`)
        this.#ctx = this.#canvas.getContext('2d')

        //  Make the canvas fit the screen
        this.#canvas.width = window.innerWidth
        this.#canvas.height = window.innerHeight
        //  Calculate center position in the canvas
        this.#center_x = this.#ctx.canvas.width / 2
        this.#center_y = this.#ctx.canvas.height / 2

        //  Clear the canvas
        this.#ctx.fillStyle = this.#bg_color
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
    }

    constructor(size) {
        console.log(size)
    }
}