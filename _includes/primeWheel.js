/*
 * Animated background that creates a prime wheel.
 * Uses a cookie to track activity status across multiple page visits.
 *
 * Filename:  primeWheel.js
 * By:  Matthew Evans
 *      https://www.wtfsystems.net/
 * Version:  062322
 *
 * Copyright (c) 2020-2022 Matthew Evans - See LICENSE.md
 *
 */

/**
 * Prime Wheel class
 */
class primeWheel {
    /*
     * Config variables
     */
    static BACKGROUND_COLOR = "#000000"       //  Background color
    static CANVAS_NAME = "primewheel_canvas"  //  Target draw canvas
    static SPAM = false                       //  Spam the console with prime numbers
    static MAX_WHEELS = 5                     //  Maximum number of running wheels
    static INTERVAL = 5                       //  Interval for timer function

    /*
     * Private variables
     */
    static #start_called = false  //  Track if start function was called
    static #canvas = null         //  Canvas to draw to
    static #ctx = null            //  2d drawing contex
    static #animate_proc = null   //  Animation procedure
    static #center_x = null       //  Center X of canvas
    static #center_y = null       //  Center Y of canvas
    static #wheels = []           //  Array of prime wheels

    /**
     * Initialize
     */
    static {
        this.#canvas = document.getElementById(this.CANVAS_NAME)
        //  Make sure the canvas element exists
        if(this.#canvas == null || this.#canvas == undefined) {
            //  If not inject it after the body tag
            document.body.insertAdjacentHTML('afterbegin',
                `<canvas id="${this.CANVAS_NAME}" style="position: fixed; top: 0; left: 0;"></canvas>`)
            this.#canvas = document.getElementById(this.CANVAS_NAME)
        }
        this.#ctx = this.#canvas.getContext("2d")

        //  Make the canvas fit the screen
        this.#canvas.width = window.innerWidth
        this.#canvas.height = window.innerHeight
        //  Calculate center position in the canvas
        this.#center_x = this.#ctx.canvas.width / 2
        this.#center_y = this.#ctx.canvas.height / 2

        //  Clear the canvas
        this.#ctx.fillStyle = this.BACKGROUND_COLOR
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)

        this.#start_called = false  //  Allow start to be called
    }

    /**
     * @prop {Number} num_wheels Number of prime wheels
     */
    static get num_wheels() { return this.#wheels.lenght }
    
    /**
     * Add a new prime wheel.
     * @param {Object} wheelData 
     */
    static add(wheelData) {
        if(this.num_wheels < this.MAX_WHEELS) {
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

            if(wheelData.random_offset) this.#setOffset(wheelData)

            this.#wheels.push(wheelData)
        } else console.log(`Max number of wheels reached.`)
    }

    /**
     * Start the effect
     */
    static start() {
        if(this.num_wheels === 0) {
            console.log(`Error`)
            return
        }
        if(this.#start_called) {
            console.log("Prime wheel effect already running")
            return
        }
        this.#start_called = true
        if(true) console.log('stuff')
        if(true) {
            this.#canvas.style.display = "block"
            this.#animate_proc = setInterval(this.#animate, this.INTERVAL)
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
            this.#animate_proc = setInterval(this.#animate, this.INTERVAL)
            console.log("Prime wheel toggeled on")
        } else {
            //  Otherwise turn off
            //this.#setCookie("false")
            this.#canvas.style.display = "none"
            clearInterval(this.#animate_proc)
            console.log("Prime wheel toggeled off")
        }
    }

    /**
     * Resets the effect
     */
    static reset() {
        console.log("Resetting prime wheel effect")
        this.#ctx.fillStyle = this.BACKGROUND_COLOR
        this.#ctx.fillRect(0, 0, this.#ctx.canvas.width, this.#ctx.canvas.height)
        this.#wheelIterator((wheel) => {
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

    /** *** Privates *** **/
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
    static #animate() {
        //  Prime number found, draw it using cartesian coordinates
        if(this.#isPrime(this.#last_prime)) {
            if(this.SPAM) console.log(`Found prime: ${this.#last_prime}`)
            this.#ctx.font = this.FONT_SIZE + " " + this.FONT_FACE
            this.#ctx.fillStyle = this.FONT_COLOR
            this.#ctx.fillText(
                this.#last_prime,
                (this.#center_x + this.#x_offset) + (this.#last_prime * Math.cos(this.#last_prime)),
                (this.#center_y + this.#y_offset) - (this.#last_prime * Math.sin(this.#last_prime))
            )
        }

        this.#last_prime++  //  Increment counter to check for next prime

        //  Once the wheel reaches (1400 * SCALE) then reset
        if(this.#last_prime > 1400 * this.#SCALE) this.reset()
    }
}