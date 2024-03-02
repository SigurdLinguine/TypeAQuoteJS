const RANDOM_QUOTE_API_URL = 'http://api.quotable.io/random'
const quoteDisplayElement = document.getElementById("quoteDisplay")
const quoteInputElement = document.getElementById("quoteInput")
const timerElement = document.getElementById("timer")

quoteInputElement.addEventListener("input", () => {
    const arrayQuote = quoteDisplayElement.querySelectorAll("span")
    const arrayValue = quoteInputElement.value.split("")
    let correct = true
    arrayQuote.forEach((characterSpan, index) => {
        const character = arrayValue[index]
        if (character == null) {
            characterSpan.classList.remove("correct")
            characterSpan.classList.remove("incorrect")
            correct = false
        } else if (character === characterSpan.innerText) {
            characterSpan.classList.add("correct")
            characterSpan.classList.remove("incorrect")
        } else {
            characterSpan.classList.remove("correct")
            characterSpan.classList.add("incorrect")
            correct = false
        }
    })

    if (correct) {
        stopTimer()
    }
})
quoteInputElement.addEventListener("keydown", function () {
    if (event.key === "Enter") {
        location.reload()
    }
})

let start = false
quoteInputElement.addEventListener("keydown", function () {
    if (start === false) {
        startTimer()
    }
    start = true
})

function getRandomQuote() {
    return fetch(RANDOM_QUOTE_API_URL)
        .then(response => response.json())
        .then(data => data.content)
}

async function renderNewQuote() {
    const quote = await getRandomQuote()
    quoteDisplayElement.innerHTML = ''
    quote.split("").forEach(character => {
        const characterSpan = document.createElement("span")
        characterSpan.innerText = character
        quoteDisplayElement.append(characterSpan)
    })
    quoteInputElement.value = null
}

let startTime
function startTimer() {
    timerElement.innerText = 0
    startTime = new Date()
    timerInterval = setInterval(() => {
        timer.innerText = getTimerTime()
    }, 1000);
}

function stopTimer() {
    clearInterval(timerInterval)
}

function getTimerTime() {
    return Math.floor((new Date() - startTime) / 1000)
}

renderNewQuote()