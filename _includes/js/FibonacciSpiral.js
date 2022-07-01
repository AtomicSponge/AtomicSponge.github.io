/*
 * Draws a Fibonacci Spiral
 *
 * Filename:  FibonacciSpiral.js
 * By:  Matthew Evans
 *      https://atomicsponge.wtfsystems.net/
 * Version:  070122
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

    /**
     * Call to draw the spiral
     * @param {Number} len Length to generate the sequence to
     */
    static draw(len) {
        var data = [ 0, 1 ]
        var beg_x = this.#center_x
        var beg_y = this.#center_y
        var mid_x = this.#center_x + 0.5
        var mid_y = this.#center_y + 0.5
        var end_x = this.#center_x + 1
        var end_y = this.#center_y + 1
        var counter = 1

        this.#ctx.fillStyle = this.#bg_color
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
        this.#ctx.strokeStyle = '#FFFF00'
        this.#ctx.lineWidth = 1

        this.#ctx.beginPath()
        this.#ctx.moveTo(beg_x, beg_y)
        this.#ctx.quadraticCurveTo(mid_x, mid_y, end_x, end_y)
        this.#ctx.stroke()
        
        beg_x = end_x
        beg_y = end_y

        for(let i = 2; i < len; i++) {
            data.push((data[data.length - 1] + data[data.length - 2]))
            switch(counter) {
                case 0:
                    mid_x = beg_x
                    mid_y = beg_y + data[i]
                    end_x = beg_x + data[i]
                    end_y = beg_y + data[i]
                    counter++
                    break
                case 1:
                    mid_x = beg_x + data[i]
                    mid_y = beg_y
                    end_x = beg_x + data[i]
                    end_y = beg_y - data[i]
                    counter++
                    break
                case 2:
                    mid_x = beg_x
                    mid_y = beg_y - data[i]
                    end_x = beg_x - data[i]
                    end_y = beg_y - data[i]
                    counter++
                    break
                case 3:
                    mid_x = beg_x - data[i]
                    mid_y = beg_y
                    end_x = beg_x - data[i]
                    end_y = beg_y + data[i]
                    counter = 0
                    break
            }

            this.#ctx.beginPath()
            this.#ctx.moveTo(beg_x, beg_y)
            this.#ctx.quadraticCurveTo(mid_x, mid_y, end_x, end_y)
            this.#ctx.stroke()
            beg_x = end_x
            beg_y = end_y
        }
    }
}