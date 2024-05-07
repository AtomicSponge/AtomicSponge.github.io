/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import showdown from 'showdown'
import Prism from 'prismjs'

import { createApp } from 'vue'
import App from './App.vue'
import './style.styl'

//  Configure showdown
showdown.setOption('parseImgDimensions', true)
showdown.setOption('tables', true)
showdown.setOption('emoji', true)

Prism.manual = true  //  Disable PrismJS's auto highlighting

/*
 * Set up the command processor and its modules
 */
//  Main components
import { TermProcessor } from './modules/TermProcessor'
import { TermRenderer } from './modules/TermRenderer'

TermRenderer.initialize()

//  Add commands
import { MotdCmd } from './commands/MotdCmd'
TermProcessor.addModule(new MotdCmd())

import { AboutCmd } from './commands/AboutCmd'
TermProcessor.addModule(new AboutCmd())

import { JabbaCmd } from './commands/JabbaCmd'
TermProcessor.addModule(new JabbaCmd())

import { SetColor } from './commands/SetColor'
TermProcessor.addModule(new SetColor())

import { PrimeWheel } from './commands/PrimeWheel'
TermProcessor.addModule(new PrimeWheel([
	{ fontColor: '#ff4500' },
	{ fontColor: '#0000ff', useRandomOffset: true, durration: 5 },
	{ fontColor: '#00ff00', useRandomOffset: true,
		durration: 3, spacing: 10 }
]))

import { FibonacciSequence } from './commands/FibonacciSequence'
TermProcessor.addModule(new FibonacciSequence('#ffff00'))

import { TestPrism } from './commands/TestPrism'
TermProcessor.addModule(new TestPrism())

createApp(App).mount('#app')
