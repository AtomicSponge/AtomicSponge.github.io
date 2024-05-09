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
  size: (size / 1000).toFixed(2),
  createdAt: birthtime,
  totalsize: (totalsize / 1000).toFixed(2)
}
let outputStr = `<!doctype html><html lang="en"><head>`
outputStr += `<style>body { font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif; font-size: large; font-weight: 400; line-height: 1.2; `
outputStr += `color: rgba(255, 255, 255, 0.87); background-color: rgb(36, 36, 36); }<style>`
outputStr += `</head><body>`
outputStr += `Size of website source:  ${result.size} kB<br/><br/>`
outputStr += `Total size of website:  ${result.totalsize} kB<br/><br/>`
outputStr += `Site built at:<br/>${result.createdAt}`
outputStr += `</body></html>`

const outLocation = path.normalize(`${buildLocation}/assets/`)
fs.writeFileSync(`${outLocation}site_stats.html`, outputStr)
