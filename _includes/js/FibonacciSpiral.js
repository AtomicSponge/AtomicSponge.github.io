/*
 * Draws a Fibonacci Spiral
 * wip
 *
 * Filename:  FibonacciSpiral.js
 * By:  Matthew Evans
 *      https://atomicsponge.wtfsystems.net/
 * Version:  063022
 *
 * Copyright (c) 2022 Matthew Evans - See LICENSE.md
 *
 */

class FibonacciSpiral {
    static #bg_color = '#000000'       //  Background color
    static #canvas_name = 'fibSpiral'  //  Target draw canvas
    static #ctx = null                 //  2d drawing contex
    static #canvas = null              //  Canvas to draw to
    static #center_x = 0               //  Center X of canvas
    static #center_y = 0               //  Center Y of canvas

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
    }

    static draw(len) {
        var data = []
        this.#ctx.strokeStyle = '#FFFF00'
        this.#ctx.lineWidth = 1
        var pos_x = this.#center_x
        var pos_y = this.#center_y
        var counter = 0
        this.#ctx.fillStyle = this.#bg_color
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
        for(let i = 0; i < len; i++) {
            this.#ctx.beginPath()
            this.#ctx.moveTo(pos_x, pos_y)

            if(i == 0 || i == 1) data.push(i)
            else data.push((data[data.length - 1] + data[data.length - 2]))

            console.log(data[data.length-1])

            pos_x = this.#center_x + (data[i] * Math.cos(data[i]))
            pos_y = this.#center_y + (data[i] * Math.sin(data[i]))

            this.#ctx.lineTo(pos_x, pos_y)
            this.#ctx.stroke()
        }
    }
}