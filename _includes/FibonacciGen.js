/*
 * Fibonacci Sequence Generator
 *
 * Filename:  FibonacciGen.js
 * By:  Matthew Evans
 *      https://atomicsponge.wtfsystems.net/
 * Version:  063022
 *
 * Copyright (c) 2022 Matthew Evans - See LICENSE.md
 *
 */

class FibonacciGen {
    #sequence = null

    /**
     * Constructor
     * @param {Number} len Length to generate the sequence to.
     * @returns {Array} Completed sequence.
     */
    constructor(len) {
        if(len === undefined || len < 2) len = 2
        this.#sequence = this.#genFib(len, [ 0, 1 ], 2)
    }

    /**
     * Recursive function to generate the sequence.
     * @param {Number} len Length to generate the sequence to.
     * @param {Array} fibSeq Sequence array.
     * @param {Count} count Current position.
     * @returns {Array} Completed sequence.
     */
    #genFib(len, fibSeq, count) {
        console.log(fibSeq)
        if(len === count) return fibSeq
        else {
            fibSeq.push((fibSeq[count - 2] + fibSeq[count - 1]))
            console.log(fibSeq)
            this.#genFib(len, fibSeq, count + 1)
        }
    }

    get sequence() { return this.#sequence }
    get length() { return this.#sequence.length }
}