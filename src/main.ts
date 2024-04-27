/**
 * 
 * @author Matthew Evans
 * @module atomicsponge.website
 * @copyright MIT see LICENSE.md
 * 
 */

import showdown from 'showdown'
//import Prism from 'prismjs'

import { createApp } from 'vue'
import App from './App.vue'
import './style.styl'

showdown.setOption('parseImgDimensions', true)
showdown.setOption('tables', true)
showdown.setOption('emoji', true)

//Prism.manual = true  //  Disable PrismJS's auto highlighting

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

/*import { PrimeWheel } from './commands/PrimeWheel'
TermProcessor.addModule(new PrimeWheel({
	fontColor: '#ff4500', fontSize: '16px', fontFace: 'Arial',
	spam: false, debug: true
}))*/

//import { PostRenderer } from './modules/PostRenderer'
//TermProcessor.addModule(new PostRenderer('api/posts.json'))
//  Load posts
//TermProcessor.getModule('posts').getPosts()

createApp(App).mount('#app')
