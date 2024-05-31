#!/usr/bin/env node
/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import fs from 'node:fs'
import path from 'node:path'

/**
 * Check if a number is prime
 * @param {number} num Number to check
 * @returns True if it is, else false
 */
const isPrime = (num) => {
  for(let i = 2; i < num; i++) {
    if(num % i === 0) return false
  }
  return true
}

const outputLocation = path.normalize(
  `${process.env.npm_config_local_prefix}/src/assets/markdown/`)

const primeTable = []
for(let i = 2; i < 20000; i++) {
  if(isPrime(i)) primeTable.push(i)
}

fs.writeFileSync(`${outputLocation}primetable.md`, primeTable.toString())
