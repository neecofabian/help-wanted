# js-library-fabiann1

## HelpWanted.js
`HelpWanted.js` is a library for creating website tours and tutorial modals. 
It's time to rethink the Help button.

Visit the website:
https://helpwantedjs.herokuapp.com


## Getting Started
Read the library's full documentation here:
https://helpwantedjs.herokuapp.com/html/docs.html
 
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
