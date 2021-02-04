const bigBall = document.querySelector('.big-ball span')
const smallBall = document.querySelector('.small-ball span')
const control = document.querySelector('.control')
const result = document.querySelector('.result')
const startButton = document.querySelector('.start')


let random = Math.round(Math.random()*100)

const controlButtonHandler = e => {
    const target = e.target

    if (target.classList.contains('control__button')) {

        const sP = new Promise((resolve, reject) => {
            let j = 0
            secondInterval = setInterval(() => {
                if (j === 100) {
                    clearInterval(secondInterval)
                    resolve()
                }
                smallBall.textContent = Math.floor(Math.random() * (98 - 2 + 1)) + 2
                j++
            }, 10)
        })

        sP.then(() => {
            random = Math.floor(Math.random() * (100 - 1+ 1)) + 1
            smallBall.textContent = random
            if (target.classList.contains('more')) {
                if (+smallBall.textContent > +bigBall.textContent) {
                    result.textContent = "Победа"
                    result.style.color = '#6bb560'
                } else {
                    result.textContent = "Поражение"
                    result.style.color = '#985151'
                }
            } else if (target.classList.contains('less')){
                if (+smallBall.textContent < +bigBall.textContent) {
                    result.textContent = "Победа"
                    result.style.color = '#6bb560'
                } else {
                    result.textContent = "Поражение"
                    result.style.color = '#985151'
                }
            } else {
                if (+smallBall.textContent === +bigBall.textContent) {
                    result.textContent = "Победа"
                    result.style.color = '#6bb560'
                } else {
                    result.textContent = "Поражение"
                    result.style.color = '#985151'
                }
            }
        })
    }

    control.removeEventListener('click', controlButtonHandler)
}


startButton.addEventListener('click', () => {
    random = Math.floor(Math.random() * (98 - 2 + 1)) + 2

    smallBall.textContent = ''
    result.textContent = ''

    const p = new Promise((resolve, reject) => {
        let i = 0
        let interval = setInterval(() => {
            if (i === 100) {
                clearInterval(interval)
                resolve()
            }
            bigBall.textContent = Math.floor(Math.random() * (98 - 2 + 1)) + 2
            i++
        }, 10)
    })


    p.then(() => {
        bigBall.textContent = random

        control.addEventListener('click', controlButtonHandler)
    })


})

