/*
 * Animated background that displays prime wheels.
 * Inspired by the 3Blue1Brown YouTube series:
 * https://www.youtube.com/watch?v=EK32jo7i5LQ
 *
 * Filename:  primeWheel.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  062522
 *
 * Copyright (c) 2020-2022 Matthew Evans - See LICENSE.md
 *
 */

/**
 * Prime Wheel class
 */
class primeWheel {
    static #bg_color = "#000000"               //  Background color
    static #max_wheels = 5                     //  Maximum number of running wheels
    static #SPAM = false                       //  Spam the console with prime numbers
    
    static #canvas_name = "primewheel_canvas"  //  Target draw canvas
    static #start_called = false               //  Track if start function was called
    static #ctx = null                         //  2d drawing contex
    static #canvas = null                      //  Canvas to draw to
    static #center_x = 0                       //  Center X of canvas
    static #center_y = 0                       //  Center Y of canvas
    static #wheels = []                        //  Array of prime wheels

    /**
     * Initialize
     */
    static {
        this.#canvas = document.getElementById(this.#canvas_name)
        //  Make sure the canvas element exists
        if(this.#canvas == null || this.#canvas == undefined) {
            console.log(`error`)
        }
        this.#ctx = this.#canvas.getContext("2d")

        //  Make the canvas fit the screen
        this.#canvas.width = window.innerWidth
        this.#canvas.height = window.innerHeight
        //  Calculate center position in the canvas
        this.#center_x = this.#ctx.canvas.width / 2
        this.#center_y = this.#ctx.canvas.height / 2

        //  Clear the canvas
        this.#ctx.fillStyle = this.#bg_color
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)

        this.#start_called = false  //  Allow start to be called
    }

    /** *** Public functions *** **/
    /** *** Getters *** **/
    /**
     * @prop {Number} num_wheels Number of prime wheels
     */
    static get num_wheels() { return this.#wheels.length }

    /** *** Setters *** **/
    /**
     * 
     */
    static set bgColor(color) {
        this.#bg_color = color
    }

    /**
     * 
     */
    static set maxWheels(newNum) {
        if(!this.#start_called) this.#max_wheels = newNum
    }

    /**
     * Add a new prime wheel.
     * @param {Object} wheelData 
     */
    static set add(wheelData) {
        if(this.num_wheels < this.#max_wheels) {
            wheelData = wheelData || {}

            wheelData.offset_x = wheelData.offset_x || 0
            wheelData.offset_y = wheelData.offset_y || 0
            wheelData.random_offset = wheelData.random_offset || true
            wheelData.scale = wheelData.scale || 2
            wheelData.speed = wheelData.speed || 5
            wheelData.wheel_color = wheelData.wheel_color || '#0000FF'
            wheelData.wheel_size =  wheelData.wheel_size || '8px'
            wheelData.wheel_font =  wheelData.wheel_font || 'Arial'
            wheelData.last_prime = 2
            wheelData.wheel_proc = null

            if(wheelData.random_offset) this.#setOffset(wheelData)

            this.#wheels.push(wheelData)
        } else console.log(`Max number of wheels reached.`)
    }

    /**
     * Start the effect
     */
    static start() {
        //  No wheels defined, create a default one
        if(this.num_wheels === 0) this.add()
        if(this.#start_called) {
            console.log("Prime wheel effect already running")
            return
        }
        this.#start_called = true
        if(true) console.log('stuff')
        if(true) {
            this.#canvas.style.display = "block"
            this.#wheelIterator(wheel => {
                //this.#animate_proc = setInterval(this.#test.animate, this.INTERVAL)
            })
            console.log("Running prime wheel effect")
        } else {
            console.log("Prime wheel effect disabled by setting")
            this.#canvas.style.display = "none"
        }
    }

    /**
     * Toggle effect on/off
     */
    static toggle() {
        if (this.#canvas.style.display === "none") {
            //  If off turn on
            //this.#setCookie("true")
            this.#canvas.style.display = "block"
            this.#wheelIterator(wheel => {
                //this.#animate_proc = setInterval(this.#test.animate, this.INTERVAL)
            })
            console.log("Prime wheel toggeled on")
        } else {
            //  Otherwise turn off
            //this.#setCookie("false")
            this.#canvas.style.display = "none"
            this.#wheelIterator(wheel => {
                //clearInterval(this.#animate_proc)
            })
            console.log("Prime wheel toggeled off")
        }
    }

    /**
     * Resets the effect
     */
    static reset() {
        console.log("Resetting prime wheel effect")
        this.#ctx.fillStyle = this.#bg_color
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
        this.#wheelIterator(wheel => {
            if(wheel.random_offset) this.#setOffset(wheel)
            wheel.last_prime = 2
        })
    }

    /**
     * Set the color of a prime wheel.
     * @param {String} color Color to set.
     * @param {Number} IDX Prime wheel array index.
     */
    static setColor(color, IDX) {
        if(IDX > this.num_wheels - 1 || IDX < 0) console.log(`error`)
        this.#wheels[IDX].wheel_color = color
    }

    /** *** Private functions *** **/
    /**
     * Run a function on each prime wheel.
     * @param {Function} callback Function to run.
     */
    static #wheelIterator(callback) {
        for(let IDX = 0; IDX < this.num_wheels; IDX++)
            callback(this.#wheels[IDX], IDX)
    }

    /**
     * Generate a random x,y offset for drawing the wheel
     */
    static #setOffset(wheel) {
        wheel.x_offset = Math.floor(Math.random() * (this.#center_x * 2 / 3) + 1)
        wheel.x_offset = wheel.x_offset * (Math.random() < 0.5 ? -1 : 1)
        wheel.y_offset = Math.floor(Math.random() * (this.#center_y * 2 / 3) + 1)
        wheel.y_offset = wheel.y_offset * (Math.random() < 0.5 ? -1 : 1)
    }

    static #resize() {
        //  Make the canvas fit the screen
        this.#canvas.width = window.innerWidth
        this.#canvas.height = window.innerHeight
        //  Calculate center position in the canvas
        this.#center_x = this.#ctx.canvas.width / 2
        this.#center_y = this.#ctx.canvas.height / 2
        this.reset()
    }

    /**
     * Check if a number is prime
     * @param {*} num 
     * @returns 
     */
    static #isPrime(num) {
        for(var i = 2; i < num; i++) {
            if(num % i == 0) return false
        }
        return true
    }

    /**
     * Animation function
     */
    static #animate(wheel) {
        //  Prime number found, draw it using cartesian coordinates
        if(this.#isPrime(wheel.last_prime)) {
            if(this.#SPAM) console.log(`Found prime: ${wheel.last_prime}`)
            this.#ctx.font = wheel.wheel_color + " " + wheel.wheel_font
            this.#ctx.fillStyle = wheel.wheel_color
            this.#ctx.fillText(
                wheel.last_prime,
                (this.#center_x + wheel.offset_x) + (wheel.last_prime * Math.cos(wheel.last_prime)),
                (this.#center_y + wheel.offset_y) - (wheel.last_prime * Math.sin(wheel.last_prime))
            )
        }

        wheel.last_prime++  //  Increment counter to check for next prime

        //  Once the wheel reaches (1400 * SCALE) then reset
        if(wheel.last_prime > 1400 * wheel.scale) this.reset()
    }
}