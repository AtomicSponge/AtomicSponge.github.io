/*
 * Draws a Fibonacci Spiral
 *
 * Filename:  FibonacciSpiral.js
 * By:  Matthew Evans
 *      https://atomicsponge.wtfsystems.net/
 * Version:  070322
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
    static #fib_seq = [ 0, 1 ]         //  Store calculated Fibonacci Sequence

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
     * Calculate the Fibonacci Sequence to a certain length
     * @param {Number} len Length to calculate the sequence to
     */
    static genSeq(len) {
        for(let i = 2; i < len - 2; i++)
            this.#fib_seq.push(
                (this.#fib_seq[this.#fib_seq.length - 1] + this.#fib_seq[this.#fib_seq.length - 2]))
    }

    /**
     * Call to draw the spiral
     * @param {Number} len Length to draw the sequence to
     */
    static draw(len) {
        if(this.#fib_seq.length < 3) {
            console.log(`Must call 'FibonacciSpiral.genSeq(len)' first.`)
            return
        }
        if(len > this.#fib_seq.length) len = this.#fib_seq.length
        var beg_x = this.#center_x  //  Start at center
        var beg_y = this.#center_y
        var mid_x = 0
        var mid_y = 0
        var end_x = 0
        var end_y = 0
        var counter = 0

        this.#ctx.fillStyle = this.#bg_color
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
        this.#ctx.strokeStyle = '#FFFF00'
        this.#ctx.lineWidth = 1

        for(let i = 1; i < len - 1; i++) {
            //  For each step, swap the direction of the blocks
            switch(counter) {
                case 0:
                    mid_x = beg_x
                    mid_y = beg_y + this.#fib_seq[i]
                    end_x = beg_x + this.#fib_seq[i]
                    end_y = beg_y + this.#fib_seq[i]
                    counter++
                    break
                case 1:
                    mid_x = beg_x + this.#fib_seq[i]
                    mid_y = beg_y
                    end_x = beg_x + this.#fib_seq[i]
                    end_y = beg_y - this.#fib_seq[i]
                    counter++
                    break
                case 2:
                    mid_x = beg_x
                    mid_y = beg_y - this.#fib_seq[i]
                    end_x = beg_x - this.#fib_seq[i]
                    end_y = beg_y - this.#fib_seq[i]
                    counter++
                    break
                case 3:
                    mid_x = beg_x - this.#fib_seq[i]
                    mid_y = beg_y
                    end_x = beg_x - this.#fib_seq[i]
                    end_y = beg_y + this.#fib_seq[i]
                    counter = 0
                    break
            }

            //  Draw curve using calculated points
            this.#ctx.beginPath()
            this.#ctx.moveTo(beg_x, beg_y)
            this.#ctx.quadraticCurveTo(mid_x, mid_y, end_x, end_y)
            this.#ctx.stroke()
            beg_x = end_x  //  Reset for next curve
            beg_y = end_y
        }
    }
}