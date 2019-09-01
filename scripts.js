document.addEventListener('DOMContentLoaded', () => {
    const options = {
        eventType: 'keydown',
        keystrokeDelay: 1000
    }

    keyMapper([updateBackground, updateUI], options)
})

function keyMapper(callbackList, options) {
    const delay = hasProperty('keystrokeDelay', options) && options.keystrokeDelay >= 300 && options.keyStrokeDelay
    const eventType = options && options.eventType || 'keydown'
    const keystrokeDelay = delay || 1000
    let state = {
        buffer: [],
        lastKeyTime: Date.now(),
    }
    document.addEventListener(eventType, (e) => {
        const key = e.key.toLowerCase()
        const currentTime = Date.now()
        let buffer = []

        if (currentTime - state.lastKeyTime > keystrokeDelay) {
            buffer = [key]
        } else {
            buffer = [...state.buffer, key]
        }
        state = { buffer: buffer, lastKeyTime: currentTime }
        callbackList.forEach(callback => callback(buffer))

    })

    function hasProperty(property, object) {
        return object && object.hasOwnProperty(property)
    }
}

function updateBackground(keySeq) {
    const validKeys = keySeq.every((key) => !isNaN(parseInt(key) || key.toLowerCase() !== key.toUpperCase()))
    let keys = validKeys ? keySeq : undefined
    const container = document.querySelector('.bg')

    container.style.backgroundImage = `url(img/${keys.join('')}.jpg)`
    const keys2 = document.querySelectorAll('key')
    keys2.forEach(key => key.style.display = 'block')

    if (container.style.backgroundImage != null) {
        const audio = document.querySelector('[data-key="ding"]')

        audio.currentTime = 0
        audio.play()
        setTimeout(() => {
            document.body.style.backgroundColor = '#faaca8'
            container.style.backgroundImage = ''
        }, 1000);
    }
}

function updateUI(keySeq) {
    const userInput = keySeq.join('')
    const keySequences = {
        'matthew': 'Owner',
        'spaghetti': 'Favorite Food',
        'name': 'Cali!',
        'cali': 'That is correct!'
    }
    const userInputDisplay = document.querySelector('.user_input')
    userInputDisplay.textContent = userInput
    const cheatMessage = document.querySelector('.cheat_message')
    cheatMessage.textContent = keySequences[userInput] || 'Part of his name contains the letter of a southwestern state'
}