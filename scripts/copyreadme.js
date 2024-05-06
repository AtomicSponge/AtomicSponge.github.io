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

const inputLocation = path.normalize(`${process.env.npm_config_local_prefix}/`)
const outputLocation = path.normalize(`${process.env.npm_config_local_prefix}/public/`)
const fileName = 'README.md'

fs.copyFileSync(`${inputLocation}${fileName}`, `${outputLocation}${fileName}`)
