/*
 * Fibonacci Sequence Generator
 *
 * Filename:  FibonacciSequence.js
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
    var fibSeq = [ 0, 1 ]
    for(let i = 2; i < len; i++)
        fibSeq.push((fibSeq[i - 2] + fibSeq[i - 1]))
    return fibSeq
}