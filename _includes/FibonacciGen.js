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
    /**
     * Constructor
     * @param {Number} len Length to generate the sequence to.
     * @returns {Array} Completed sequence.
     */
    constructor(len) {
        if(len === undefined || !(len instanceof Number)) len = 0
        return genFib(len, [ 0, 1 ], 2)
    }

    /**
     * Recursive function to generate the sequence.
     * @param {Number} len Length to generate the sequence to.
     * @param {Array} fibSeq Sequence array.
     * @param {Count} count Current position.
     * @returns {Array} Completed sequence.
     */
    static genFib(len, fibSeq, count) {
        if(len <= count) return fibSeq
        fibSeq.push(fibSeq[count - 1] + fibSeq[count])
        this.genFib(len, fibSeq, count + 1)
    }
}