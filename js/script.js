const bigBall = document.querySelector('.big-ball span')
const smallBall = document.querySelector('.small-ball span')
const control = document.querySelector('.control')
const result = document.querySelector('.result')
const startButton = document.querySelector('.start')


let random = Math.round(Math.random()*100)

const controlButtonHandler = e => {
    const target = e.target

    if (target.classList.contains('control__button')) {
        random = Math.round(Math.random()*100)
        smallBall.textContent = random
        if (target.classList.contains('more')) {
            if (+smallBall.textContent > +bigBall.textContent) {
                result.textContent = "Победа"
                result.style.color = '#6bb560'
            } else {
                result.textContent = "Поражение"
                result.style.color = '#985151'
            }
        } else {
            if (+smallBall.textContent < +bigBall.textContent) {
                result.textContent = "Победа"
                result.style.color = '#6bb560'
            } else {
                result.textContent = "Поражение"
                result.style.color = '#985151'
            }
        }
    }

    control.removeEventListener('click', controlButtonHandler)
}

startButton.addEventListener('click', () => {
    random = Math.round(Math.random()*100)

    bigBall.textContent = random

    smallBall.textContent = ''
    result.textContent = ''

    control.addEventListener('click', controlButtonHandler)
})


