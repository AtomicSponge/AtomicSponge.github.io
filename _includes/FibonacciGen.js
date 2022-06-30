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

/**
 * Generate a Fibonacci sequence
 * @param {Number} len Length to generate the sequence to.
 * @returns {Array} Completed sequence.
 */
const FibonacciSequence = (len) => {
    if(len === undefined || len < 2) len = 2
    /**
     * Recursive function to generate the sequence.
     * @param {Number} len Length to generate the sequence to.
     * @param {Array} fibSeq Sequence array.
     * @param {Count} count Current position.
     * @returns {Array} Completed sequence.
     */
    const genFib = (len, fibSeq, count) => {
        if(len === count) return fibSeq
        else {
            fibSeq.push((fibSeq[count - 2] + fibSeq[count - 1]))
            genFib(len, fibSeq, count + 1)
        }
    }
    return genFib(len, [ 0, 1 ], 2)
}