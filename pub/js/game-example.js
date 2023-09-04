'use strict';

const repoBtn = document.querySelector('#navBtn3')
repoBtn.addEventListener('click', () => window.open('https://github.com/csc309-fall-2021/js-library-fabiann1'))


// Create content elements, obtain existing element, and the DOM
const content1 = document.createElement('div')
const content2 = document.createElement('div')
const content3 = document.createElement('div')
const content4 = document.createElement('div')
const content5 = document.createElement('div')
const content6 = document.createElement('div')
const content7 = document.createElement('div')
const content8 = document.createElement('div')

content1.className = "content"
content2.className = "content"
content3.className = "content"
content4.className = "content"
content5.className = "content"
content6.className = "content"
content6.className = "content"
content7.className = "content"
content8.className = "content"

content1.innerHTML = "<p>Welcome to <b>GenericGame.io</b>. Press this any time you need help.</p>"
content2.innerHTML = "<p>View your profile, stats, and records.</p>"
content3.innerHTML = "<p>Tweak gameplay settings to your heart's content.</p>"
content4.innerHTML = "<p>The power to stop time.</p>"
content5.innerHTML = "<p>Don't die! Keep track of the bar and be careful when it gets low.</p>"
content6.innerHTML = "<p>It takes a lot to become one of these legends.</p>"
content7.innerHTML = "<p>You're getting there!</p>"
content8.innerHTML = "<p>Now you're set. If you need help, you know where to find me!</p>"

const helpBtn = document.querySelector('#helpBtn')
const profileBtn = document.querySelector('#profileBtn')
const settingsBtn = document.querySelector('#settingsBtn')
const playBtn = document.querySelector('#playBtn')
const healthbar = document.querySelector('#healthbar')
const leaderboard = document.querySelector('#leaderboard')
const score = document.querySelector('#score')
const center = document.querySelector('#centerInfo')
const tutorialBtn = document.querySelector('#tutorialBtn')

// Use HelpWanted.js
const sl = new SequenceList({opacity: 0.6, tint: "#21292c"})
const s = new Sequence(false, true, 
    {
        backgroundColor: "#536a72",
        textColor: "white",
        buttonBorderColor: "#c9c9c9",
        highlightColor: "#c9c9c9",
        borderRadius: "10px"
    })

s.addPin(content1, helpBtn, "right", "Need Help?")
s.addPin(content2, profileBtn, "right", "Profile")
s.addPin(content3, settingsBtn, "right", "Settings")
s.addPin(content4, playBtn, "right", "Play")
s.addPin(content5, healthbar, "top", "Health")
s.addPin(content6, leaderboard, "left", "Leaderboard")
s.addPin(content7, score, "right", "Score")
s.addPin(content8, center, "top", "Conclusion")

sl.addSequence(s)

helpBtn.addEventListener("click", () => {
    sl.discoveryModeOff(0)
    sl.start(0)
})

