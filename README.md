# HelpWanted.js

`HelpWanted.js` is a library for creating website tours and tutorial modals. 
It's time to rethink the Help button.

To view the website below, run `examples.html`. To use the library, skip to [Getting Started](#getting-started).

<img width="1701" alt="home-page" src="https://github.com/neecofabian/help-wanted/assets/48688155/1b33bd89-cb70-4730-93da-9581d4e09aaf">
<img width="1701" alt="home-page-guided-mode" src="https://github.com/neecofabian/help-wanted/assets/48688155/179d7a61-ffd1-4035-978f-618c5c79e0ce">
<img width="1701" alt="home-page-discovery-mode" src="https://github.com/neecofabian/help-wanted/assets/48688155/8818cef4-e002-4b53-b4d6-7806a7b3fb4a">
<img width="1701" alt="doc-page-getting-started" src="https://github.com/neecofabian/help-wanted/assets/48688155/29039fa7-c0f7-4f3f-b00c-5b3895fdf21e">
<img width="1701" alt="doc-page-api" src="https://github.com/neecofabian/help-wanted/assets/48688155/6a181305-c88c-4497-8288-0f597f248015">
<img width="1701" alt="example-page-guided-mode" src="https://github.com/neecofabian/help-wanted/assets/48688155/92d4ca64-cc11-4f4f-97f8-ec4128ce2b43">

## Getting Started
`HelpWanted.js` does not rely on external libraries, so only the following must be included inside the HTML `<head>`:
```
<script defer type="text/javascript" src="helpwanted/helpwanted.js"></script>
<link rel="stylesheet" type="text/css" href="helpwanted/helpwanted.css">
```

Once imported, create a `SequenceList` and your first `Sequence` object in JavaScript.
```
const sl = new SequenceList()
const s = new Sequence()
```

Now, decide on what HTML element to attach a pin to. Then, create the HTML elements that will be the content of the pins. Place the items in wrapper divs as needed because only one element can be passed as content into `addPin(content, element, position)`. Here's one way to do it:
```
const element = document.querySelector('#gettingStarted')
const content = document.createElement('div')
content.innerHTML = "This is my first pin!"
```

Place the pin at the bottom of `element`. After adding all desired pins into the sequence, add the sequence to the sequence list. Let's stick to one pin for now.
```
s.addPin(content, element, "bottom")
sl.addSequence(s)
```

Finally, we need a way to trigger Guided and Discovery modes. Buttons can call the appropriate method per mode and then pass 0 to `start()`, since sequence s is first on the `SequenceList`. Give it a try!
```
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
```

These steps highlight the key steps needed to work with `HelpWanted.js`.
![logo](https://github.com/csc309-fall-2021/js-library-fabiann1/blob/main/pub/images/helpwanted-logo.svg "HelpWanted.js logo")



