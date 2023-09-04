'use strict';

const repoBtn = document.querySelector('#navBtn3')
repoBtn.addEventListener('click', () => window.open('https://github.com/csc309-fall-2021/js-library-fabiann1'))


const sl = new SequenceList()
const s = new Sequence()

const element = document.querySelector('#gettingStarted')
const content = document.createElement('div')
content.innerHTML = "This is my first pin!"

s.addPin(content, element, "right")
sl.addSequence(s)

const gModeBtn = document.querySelector('#gModeBtn')
gModeBtn.addEventListener("click", () => {
    sl.discoveryModeOff(0)
    sl.start(0)
})

const dModeBtn = document.querySelector('#dModeBtn')
dModeBtn.addEventListener("click", () => {
    sl.discoveryModeOn(0)
    sl.start(0)
})
