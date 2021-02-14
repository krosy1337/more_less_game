const bigBall = document.querySelector('.big-ball span')
const smallBall = document.querySelector('.small-ball span')
const control = document.querySelector('.control')
const result = document.querySelector('.result')
const startButton = document.querySelector('.start')
const pointsElement = document.querySelector('.points')
const rateButtons = document.querySelectorAll('.rate__button')
const rateInput = document.querySelector('.rate__input')

let points = +pointsElement.textContent


let random = Math.round(Math.random()*100)

const endModal = $.modal({
    width: '300px',
    footer: [
        {
            text: 'Поскрести по сусекам',
            type: 'blue',
            handler() {
                endModal.close()
                points += 100
                pointsElement.textContent = points
            }
        }
    ]

})

const endModalHandler = () => {

}


endModal.setContent(`<h2>Упс, у вас закончилась валюта</h2>`)

const controlButtonHandler = e => {
    const target = e.target.closest('.control__button')

    let kefMore = +document.querySelector('.more .control__button-kf').textContent.substr(1)
    let kefLess = +document.querySelector('.less .control__button-kf').textContent.substr(1)

    if (target.classList.contains('control__button')) {

        if (+rateInput.value >= 10 && +rateInput.value <= points) {
            rateInput.style.borderColor = "#8a8a8a"
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

            rateButtons.forEach(item => {
                item.removeEventListener('click', rateButtonsHandler)
            })
            points -= +rateInput.value
            pointsElement.textContent = points

            sP.then(() => {
                random = Math.floor(Math.random() * (100 - 1+ 1)) + 1
                smallBall.textContent = random
                if (target.classList.contains('more')) {
                    if (+smallBall.textContent > +bigBall.textContent) {
                        result.textContent = "Победа"
                        result.style.color = '#6bb560'
                        points += +rateInput.value*kefMore
                        points.toFixed(2)
                        pointsElement.textContent = points

                    } else {
                        result.textContent = "Поражение"
                        result.style.color = '#985151'
                    }
                } else if (target.classList.contains('less')){
                    if (+smallBall.textContent < +bigBall.textContent) {
                        result.textContent = "Победа"
                        result.style.color = '#6bb560'
                        points += +rateInput.value*kefLess
                        points.toFixed(2)
                        pointsElement.textContent = points
                    } else {
                        result.textContent = "Поражение"
                        result.style.color = '#985151'
                    }
                } else {
                    if (+smallBall.textContent === +bigBall.textContent) {
                        result.textContent = "Победа"
                        result.style.color = '#6bb560'
                        points += (+rateInput.value*100)
                        points.toFixed(2)
                        pointsElement.textContent = points
                    } else {
                        result.textContent = "Поражение"
                        result.style.color = '#985151'
                    }
                }
                if (+pointsElement.textContent < 10) {
                    endModal.open()
                }
                startButton.addEventListener('click', startButtonHandler)
            })
            control.removeEventListener('click', controlButtonHandler)
        } else {
            rateInput.style.borderColor = "#ff0000"

            if (+pointsElement.textContent < 10) {
                endModal.open()
            }
        }
    }
}

const rateButtonsHandler = e => {
    let target = e.target.querySelector('.rate__button-value')

    if (!target) {
        target = e.target
    }

    if (target) {
        if (target.textContent === 'max') {
            rateInput.value = points
        } else if (target.textContent === 'min') {
            rateInput.value = 10
        } else if (target.textContent === 'x/2') {
            if (Math.floor(rateInput.value / 2) >= 10) {
                rateInput.value = Math.floor(rateInput.value / 2)
            } else {
                rateInput.value = 10
            }
        } else if (target.textContent === '2x') {
            if (rateInput.value * 2 <= points) {
                rateInput.value = rateInput.value * 2
            } else {
                rateInput.value = points
            }
        } else {
            rateInput.value = target.textContent
        }
    }
}

const startButtonHandler = () => {
    random = Math.floor(Math.random() * (98 - 2 + 1)) + 2

    let kefMore = 1/((100-random)/100)
    let kefLess = 1/(random/100)

    kefMore = kefMore.toFixed(2)
    kefLess = kefLess.toFixed(2)

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

        document.querySelector('.more .control__button-kf').textContent = 'x' + kefMore
        document.querySelector('.less .control__button-kf').textContent = 'x' + kefLess

        rateButtons.forEach(item => {
            item.addEventListener('click', rateButtonsHandler)
        })

        control.addEventListener('click', controlButtonHandler)
        startButton.removeEventListener('click', startButtonHandler)
    })
}

startButton.addEventListener('click', startButtonHandler)

