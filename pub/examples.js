'use strict'

const repoBtn = document.querySelector('#navBtn3')
repoBtn.addEventListener('click', () => window.open('https://github.com/neecofabian/help-wanted'))


// Create content elements, obtain existing element, and the DOM
const content1 = document.createElement('div')
const content2 = document.createElement('div')
const content3 = document.createElement('div')
const content4 = document.createElement('div')
const content5 = document.createElement('div')
const content6 = document.createElement('div')
const content7 = document.createElement('div')
const content8 = document.createElement('div')
const content9 = document.createElement('div')
const content10 = document.createElement('div')
const content11 = document.createElement('div')

content1.className = "content"
content2.className = "content"
content3.className = "content"
content4.className = "content"
content5.className = "content"
content6.className = "content"
content6.className = "content"
content7.className = "content"
content8.className = "content"
content9.className = "content"
content10.className = "content"
content11.className = "content"

content1.innerHTML = "<p>Welcome to a mock website tour using HelpWanted.js! In Guided Mode, press the arrows in the pins to navigate. This is the first pin, which is pinned to the Documentation tab.</p>"
content2.innerHTML = "<p>And this one is for Application. Try using your keyboard's arrow keys to move between steps. Look at the bottom right corner to check your progress.</p>"
content3.innerHTML = "<p>In this case, it's pinned to the bottom of the Repository tab. Click \"✕\" on the final step or press \"ESC\" any time to exit.</p>"
content4.innerHTML = "<p>Notice how the page auto-scrolls to show an element that's not in view. Apart from beneath, pins can also be placed on top of elements...</p>"
content5.innerHTML = "<p>...to the right of this div...</p>"
content6.innerHTML = "<p>...or to the left of this button.</p>"
content7.innerHTML = "<p>In Discovery Mode, hover over a highlighted element to see its annotation.</p>"
content8.innerHTML = "<p>Sequences and pins used in Guided Mode can be reused in Discovery Mode, so there's no duplicate code.</p>"
content9.innerHTML = "<p>Any HTML element can be used as content for a pin. Also, a pin can be pinned to any HTML element."
content10.innerHTML = "<p>Make as many sequences as you like. It's time to rethink the HELP button.</p>"
content11.innerHTML = "<p>Now, it's your turn to create pins and tours. Happy Helping!</p>"

const elem1 = document.querySelector('#navBtn1')
const elem2 = document.querySelector('#navBtn2')
const elem3 = document.querySelector('#navBtn3')
const elem4 = document.querySelector('#codeBox')
const elem5 = document.querySelector('#whatItDoes')
const elem6 = document.querySelector('#initialProposal')
const elem7 = document.querySelector('#sideBarDiscoveryModeDiv')
const elem8 = document.querySelector('#sideBarGuidedModeDiv')
const elem9 = document.querySelector('#whatsNewContent')
const elem10 = document.querySelector('#chosen11') 
const elem11 = document.querySelector('#helpwantedLogo')

const guidedModeBtn = document.querySelector('#guidedModeBtn')
const discoveryModeBtn = document.querySelector('#discoveryModeBtn')



// Use HelpWanted.js
const sl = new SequenceList({opacity: 0.7, tint: "#121212"})
const s = new Sequence(false, true)

s.addPin(content1, elem1, "bottom", "Introduction")
s.addPin(content2, elem2, "bottom", "Progress")
s.addPin(content3, elem3, "bottom", "Exit")
s.addPin(content4, elem4, "top", "Scrolling")
s.addPin(content5, elem5, "right")
s.addPin(content6, elem6, "left")
s.addPin(content7, elem7, "right", "Discovery")
s.addPin(content8, elem8, "right", "Reusability")
s.addPin(content9, elem9, "bottom", "Elements")
s.addPin(content10, elem10, "top")
s.addPin(content11, elem11, "bottom", "Conclusion")
sl.addSequence(s)

guidedModeBtn.addEventListener("click", () => {
    sl.discoveryModeOff(0)
    sl.start(0)
})

discoveryModeBtn.addEventListener("click", () => {
    sl.discoveryModeOn(0)
    sl.start(0)
})