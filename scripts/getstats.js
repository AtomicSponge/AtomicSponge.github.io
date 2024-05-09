#!/usr/bin/env node
/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import fs from 'fs'
import path from 'node:path'

const buildLocation = path.normalize(
  `${process.env.npm_config_local_prefix}/dist/`)

//  Get the size and created time for the main index-*.js file
const buildfiles = fs.readdirSync(`${buildLocation}assets/`)
  .filter(file => file.endsWith('.js'))
  .filter(file => file.startsWith('index'))
const fileName = buildfiles[0]
const {size, birthtime} = fs.statSync(`${buildLocation}assets/${fileName}`)

//  Get the total size of the site
const getTotalSize = (path) => {
  var size = 0
  if(fs.statSync(path).isDirectory()) {
    const files = fs.readdirSync(path)
    files.forEach(file => {
      size += getTotalSize(path + '/' + file)
    })
  } else {
    size += fs.statSync(path).size
  }
  return size
}
const totalsize = getTotalSize(buildLocation)

//  Aggragate results and write to file
const result = {
  size: size,
  createdAt: birthtime,
  totalsize: totalsize
}
let outputStr = `${size}<br/>${totalsize}<br/>${birthtime}`
const outLocation = path.normalize(`${buildLocation}/assets/`)
fs.writeFileSync(`${outLocation}site_stats.html`, outputStr)
