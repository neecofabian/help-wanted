// HELPWANTED.js

'use strict';

(function(global, document) { 
    const log = console.log

    // "Classes"
    class SequenceList {
        constructor(styles={}) {
            this.currSequence = -1 // -1 if no sequence running
            this.sequences = []
            this._overlayContainer = {
                visible: false,
                overlay: document.createElement('div'),
                closeBtn: document.createElement('button'),
                opacity: 'opacity' in styles ? styles.opacity : 0.75,
                tint: 'tint' in styles ? styles.tint: "#121212"
            }

            this.next = this.next.bind(this)
            this.back = this.back.bind(this)
            this.addSequence = this.addSequence.bind(this)
            this.removeSequence = this.removeSequence.bind(this)
            this.start = this.start.bind(this)
            this.stop = this.stop.bind(this)
            this.discoveryModeOn = this.discoveryModeOn.bind(this)
            this.discoveryModeOff = this.discoveryModeOff.bind(this)

            this._overlayContainer.overlay.setAttribute("id", "overlay")
            this._overlayContainer.overlay.style.opacity = this._overlayContainer.opacity
            this._overlayContainer.overlay.style.backgroundColor = this._overlayContainer.tint
            this._overlayContainer.closeBtn.setAttribute("id", "overlayCloseBtn")
            this._overlayContainer.closeBtn.innerHTML = "✕"

            document.addEventListener('keydown', (e) => {
                if (this.currSequence >= 0 && e.key === "Escape") {
                    this.stop()
                } else if (this.currSequence >= 0 && e.key === "ArrowLeft") {
                    if (!this.sequences[this.currSequence].discoveryMode) {
                        this.back()
                    }
                } else if (this.currSequence >= 0 && e.key === "ArrowRight")  {
                    if (!this.sequences[this.currSequence].discoveryMode) {
                        this.next()
                    }
                } 
            }, true)
        }

        // Show the next element in current sequence, if it exists
        next() {
            // Check if there is a next pin
            if (!this.sequences[this.currSequence]._next(this.back, this.next)) {
                this.stop()
            }
        }

        // Show the previous element in current sequence, if it exists
        back() {
            this.sequences[this.currSequence]._back(this.back, this.next)
        }

        // Add a sequence to the list of sequences
        addSequence(sequence) {
            this.sequences.push(sequence)
        }

        // Remove the sNum'th sequence from the list of sequences (zero-indexing)
        removeSequence(sNum) {
            this.sequences.splice(sNum, 1)
        }

        // Start the sNum'th sequence (zero-indexing)
        start(sNum) {
            if (this.currSequence === sNum) {
                return
            }

            // Notify globals array that this sequence has started
            this.currSequence = sNum

            if (this.sequences[this.currSequence].discoveryMode) {
                if (this.sequences[this.currSequence].darkenBackground) {
                    document.getElementsByTagName("body")[0].appendChild(this._overlayContainer.overlay)
                }
                
                document.getElementsByTagName("body")[0].appendChild(this._overlayContainer.closeBtn)
                this._overlayContainer.closeBtn.addEventListener("click", this.stop)
            }

            // If Discovery Mode starts, show special message
            if (this.sequences[sNum]._start(this.back, this.next)) {
                this._showEscapeMessage()
            }
        }

        // Stop the current sequence from running
        stop() {
            if (this.currSequence === -1) {
                // No sequence is running
                return
            }

            if (this.sequences[this.currSequence].discoveryMode) {
                if (this.sequences[this.currSequence].darkenBackground) {
                    document.getElementsByTagName("body")[0].removeChild(this._overlayContainer.overlay)
                }
                document.getElementsByTagName("body")[0].removeChild(this._overlayContainer.closeBtn)
            }

            this.sequences[this.currSequence]._stop()

            this.currSequence = -1
        }

        // Turn on Discovery mode for the sNum'th sequence
        discoveryModeOn(sNum) {
            if (this.currSequence !== -1) {
                return
            }

            this.sequences[sNum]._dModeOn()
        }

        // Turn off Discovery mode for the sNum'th sequence
        discoveryModeOff(sNum) {
            if (this.currSequence !== -1) {
                return
            }

            this.sequences[sNum]._dModeOff()
        }

        // Show a temporary message that ESC key can be used to exit
        _showEscapeMessage() {
            const escMessage = document.createElement('h2')
            escMessage.innerHTML = "Press ESC to exit."
            escMessage.classList.add("escMessage")
            document.getElementsByTagName("body")[0].appendChild(escMessage)
            
            setTimeout(function() {
                escMessage.style.transition = "opacity 3s ease"
                escMessage.style.opacity = 0
            }, 3000)

            setTimeout(function() {
                document.getElementsByTagName("body")[0].removeChild(escMessage)
            }, 5000)
        }
    }

    class Sequence {
        constructor(discoveryMode=false, darkenBackground=true, styles={}) {
            this.pins = []
            this.numPins = this.pins.length
            this.currPin = 0                            // For Guided Mode
            this.discoveryMode = discoveryMode
            this.darkenBackground = darkenBackground
            this.styles = {
                backgroundColor: 'backgroundColor' in styles ? styles.backgroundColor: "white",
                textColor: 'textColor' in styles ? styles.textColor: "#4b4b4b",
                buttonBorderColor: 'buttonBorderColor' in styles ? styles.buttonBorderColor: "lightgray",
                highlightColor: 'highlightColor' in styles ? styles.highlightColor: "white",
                borderRadius: 'borderRadius' in styles ? styles.borderRadius: "14px",
            }

            this._start = this._start.bind(this)
            this._stop = this._stop.bind(this)
            this._dModeOn = this._dModeOn.bind(this)
            this._dModeOff = this._dModeOff.bind(this)
        }

        // Add a pin to the sequence
        addPin(content, element, position="bottom", title="") {
            const p = new Pin(title, content, element, position, this.discoveryMode)
            this.pins.push(p)
            this.numPins++
        }

        // Remove the ith pin in the sequence (indexing from 0)
        removePin(pinNum) {
            if (pinNum <= this.currPin) {
                this.currPin--
            }

            this.pins.splice(pinNum, 1)
            this.numPins--
        }

        // Start either guided or discovery mode. Return 1 if Discovery Mode was started.
        _start(backCallback, nextCallback) {
            if (!this.discoveryMode) {
                this._showPin(0, backCallback, nextCallback, this.styles)
                return 0
            } else {
                this.pins.forEach((pin, i) => this._showPin(i, backCallback, nextCallback, this.styles))
                return 1
            }
        }

        // Stop the sequence
        _stop() {

            if (!this.discoveryMode) {
                // Remove only the pin displayed from the DOM
                this._hidePin(this.currPin)
            } else {
                this.pins.forEach((pin, i) => {
                    // Remove pin elements from DOM and listeners from elements
                    pin.element.classList.remove("highlightElement")
                    pin.element.removeEventListener("mouseenter", pin._hoverReveal)
                    pin.element.removeEventListener("mouseleave", pin._hoverHide)
                    this._hidePin(i)
                })
            }

            this.currPin = 0
        }

        _showPin(pinNum, backCallback, nextCallback, styles) {
            this.pins[pinNum]._showPin(pinNum, this.numPins, backCallback, nextCallback, styles)
        }

        _hidePin(pinNum) {
            this.pins[pinNum]._hidePin()
        }

        // Go to the previous pin in the sequence
        _back(backCallback, nextCallback) {
            if (this.currPin > 0) {
                this._hidePin(this.currPin)
                this.currPin--
                this._showPin(this.currPin, backCallback, nextCallback, this.styles)
            }
            
            //Disable back button
            this.pins[this.currPin].pinElem.getElementsByTagName('button')[0]
        }

        // Go to the next pin in the sequence, return false if this is the last pin
        _next(backCallback, nextCallback) {
            if (this.currPin < this.pins.length - 1) {
                this._hidePin(this.currPin)
                this.currPin++
                this._showPin(this.currPin, backCallback, nextCallback, this.styles)
                return true
            } else {
                // Sequence is over
                return false
            }
        }

        _dModeOn() {
            this.discoveryMode = true
            this.pins.forEach(pin => pin._discoveryModeOn())
        }

        _dModeOff() {
            this.discoveryMode = false
            this.pins.forEach(pin => pin._discoveryModeOff())
        }
    }

    class Pin {
        constructor(title, content, element, position, discoveryMode=false) {
            this.title = title                  // The title of the pin/step/instruction
            this.content = content              // HTML element containing the pin's content
            this.element = element              // HTMl element to pin the pin onto
            this.position = position            // Position of pin: "top", "bottom", "left", or "right" in relation to the element
            this.discoveryMode = discoveryMode  // Whether discovery mode is turned on
            this.pinElem = null                 // The HTML element created for the pin
            
            this._hoverReveal = this._hoverReveal.bind(this)
            this._hoverHide = this._hoverHide.bind(this)
        }

        // Add pin to DOM
        _showPin(pinNum, numPins, backCallback, nextCallback, styles) {

            if (!this.pinElem || this.pinElem !== undefined) {
                const body = document.getElementsByTagName("body")[0]
                const pinElem = document.createElement('div')
                pinElem.className = "pinElem"

                if (this.discoveryMode) {
                    const pinTitle = document.createElement('div')
                    pinTitle.innerHTML = this.title
                    pinTitle.classList.add("strong")
                    pinTitle.classList.add("pinTitle")
                    pinElem.appendChild(pinTitle)
                    pinTitle.style.color = styles.textColor
                }

                pinElem.appendChild(this.content)

                if (!this.discoveryMode) {
                    const pinFooter = document.createElement('div')
                    pinFooter.className = "pinFooter"

                    const pinBtns = document.createElement('div')
                    const pinBtnBack = document.createElement('button')
                    const pinBtnNext = document.createElement('button')
                    pinBtnBack.innerHTML = "<"
                    pinBtnNext.innerHTML = ">"
                    pinBtnBack.className = "pinBtnBack"
                    pinBtnNext.className = "pinBtnNext"
                    pinBtnBack.addEventListener("click", backCallback)
                    pinBtnNext.addEventListener("click", nextCallback)
                    pinBtnBack.cursor = "default"
                    
                    if (pinNum == 0) {
                        pinBtnBack.disabled = true
                        pinBtnBack.classList.add("pinBtnDisabled")
                        pinBtnBack.style.filter = 'brightness(90%)'
                    }

                    if (pinNum == numPins - 1) {
                        pinBtnNext.innerHTML = "✕"
                    }

                    pinBtns.appendChild(pinBtnBack)
                    pinBtns.appendChild(pinBtnNext)
                    pinBtnBack.style.background = styles.backgroundColor
                    pinBtnBack.style.color = styles.textColor
                    pinBtnBack.style.borderColor = styles.buttonBorderColor
                    pinBtnNext.style.background = styles.backgroundColor
                    pinBtnNext.style.color = styles.textColor
                    pinBtnNext.style.borderColor = styles.buttonBorderColor

                    const pinTitle = document.createElement('span')
                    pinTitle.innerHTML = this.title
                    pinTitle.classList.add("strong")
                    pinTitle.classList.add("pinTitle")
                    pinBtns.appendChild(pinTitle)
                    pinFooter.appendChild(pinBtns)
                    pinTitle.style.color = styles.textColor

                    const pinProgressIndicator = document.createElement('p')
                    pinProgressIndicator.innerHTML = (pinNum + 1) + ' / ' + numPins
                    pinProgressIndicator.style.color = styles.textColor
                    pinProgressIndicator.classList.add("strong")
                    pinFooter.appendChild(pinProgressIndicator)
                    pinElem.appendChild(pinFooter)
                }

                body.appendChild(pinElem)    
                window.getComputedStyle(pinElem).opacity

                if (!this.discoveryMode) {
                    pinElem.classList.add("visible")
                }

                this.pinElem = pinElem
                this.pinElem.style.backgroundColor = styles.backgroundColor
                this.pinElem.style.color = styles.textColor
                this.pinElem.style.borderRadius = styles.borderRadius

                if (!this.discoveryMode) {
                    if (this.position === "top") {
                        this.element.scrollIntoView(true, {behavior: "smooth", block: 'nearest', inline: 'start' })
                        const elemPos = this.pinElem.getBoundingClientRect()
                        scrollBy(0, - elemPos.height - 10)
                    } else {
                        this.element.scrollIntoView(true, {behavior: "smooth", block: 'nearest', inline: 'start' })
                    }  
                }

                if (this.discoveryMode) {
                    // Hide this pin, add listener to its element
                    this.element.classList.add("highlightElement")
                    this.element.style.outlineColor = styles.highlightColor
                    this.element.addEventListener("mouseenter", this._hoverReveal)
                    this.element.addEventListener("mouseleave", this._hoverHide)
                }

                _positionPinElem(this.pinElem, this.element, this.position)
            }
        }

        _hoverReveal(e) {
            this.pinElem.scrollIntoView({behavior: "smooth", block: 'nearest', inline: 'start' })
            this.pinElem.classList.add("visible")
        }

        _hoverHide(e) {
            this.pinElem.classList.remove("visible")
        }

        // Remove pin from DOM
        _hidePin() {
            this.pinElem.remove()
            this.pinElem = null
        }

        _discoveryModeOn() {
            this.discoveryMode = true
        }

        _discoveryModeOff() {
            this.discoveryMode = false
        }
    }

    // Place pinElem in the direction position of element
    function _positionPinElem(pinElem, element, position) {
        // Get position and dimensions
        const elemPos = element.getBoundingClientRect()
        const pinElemPos = pinElem.getBoundingClientRect()
        const elemStyle = getComputedStyle(element)
        const pinElemStyle = getComputedStyle(pinElem)

        const pinElemFullHeight = pinElemPos.height
        + parseInt(pinElemStyle.marginTop) 
        + parseInt(pinElemStyle.borderTopWidth) 
        + parseInt(pinElemStyle.borderBottomWidth) 
        + parseInt(pinElemStyle.marginBottom)

        const pinElemFullWidth = pinElemPos.width
        + parseInt(pinElemStyle.marginLeft) 
        + parseInt(pinElemStyle.borderLeftWidth) 
        + parseInt(pinElemStyle.borderRightWidth) 
        + parseInt(pinElemStyle.marginRight)

        if (position === "top") {
            pinElem.style.top = (elemPos.top + document.documentElement['scrollTop']
                - (pinElemFullHeight))
                // + parseInt(elemStyle.marginTop)         // Comment to remove margins
                // + parseInt(elemStyle.borderTopWidth)))  // Comment to remove margins
                + 'px'
            pinElem.style.left = (elemPos.left + document.documentElement['scrollLeft'] + (elemPos.width / 2) 
                - (pinElemFullWidth / 2)) 
                + 'px'
        } else if (position === "right") {
            pinElem.style.top = (elemPos.top + document.documentElement['scrollTop'] + (elemPos.height / 2) 
                - (pinElemFullHeight/ 2)) 
                + 'px'
            pinElem.style.left = (elemPos.left + document.documentElement['scrollLeft']
                + elemPos.width                            // elem.offsetWidth
                // + parseInt(elemStyle.borderRightWidth)  // Comment to remove margins
                // + parseInt(elemStyle.marginRight)       // Comment to remove margins
                + parseInt(pinElemStyle.marginLeft)
                + parseInt(pinElemStyle.borderLeftWidth))
                + 'px'
        } else if (position === "bottom") {
            pinElem.style.top = (elemPos.top + document.documentElement['scrollTop']
                + (elemPos.height                          // elem.offsetHeight
                // + parseInt(elemStyle.marginBottom)      // Comment to remove margins
                // + parseInt(elemStyle.borderBottomWidth) // Comment to remove margins
                + parseInt(pinElemStyle.borderTopWidth) 
                + parseInt(pinElemStyle.marginTop))) 
                + 'px'
            pinElem.style.left = (elemPos.left + document.documentElement['scrollLeft'] + (elemPos.width / 2) 
                - (pinElemFullWidth / 2)) 
                + 'px'
        } else {
            pinElem.style.top = (elemPos.top + document.documentElement['scrollTop'] + (elemPos.height / 2) 
                - (pinElemFullHeight/ 2)) 
                + 'px'
            pinElem.style.left = (elemPos.left + document.documentElement['scrollLeft']
                - (pinElemFullWidth))
                // + parseInt(elemStyle.marginLeft)        // Comment to remove margins
                // + parseInt(elemStyle.borderLeftWidth))) // Comment to remove margins
                + 'px'
        }
    }

    global.SequenceList = global.SequenceList || SequenceList
    global.Sequence = global.Sequence || Sequence
})(window, window.document);