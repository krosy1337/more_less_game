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


const controlButtonHandler = e => {
    const target = e.target

    let kefMore = +document.querySelector('.more').textContent.substr(-4)
    let kefLess = +document.querySelector('.less').textContent.substr(-4)

    console.log(kefMore)

    if (target.classList.contains('control__button')) {

        if (+rateInput.value > 0 && +rateInput.value <= points) {
            rateInput.style.borderColor = "#000"
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
                        points += +rateInput.value*kefMore + +pointsElement.textContent
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
                        points += +rateInput.value*kefLess.toFixed(2)
                        pointsElement.textContent = points
                    } else {
                        result.textContent = "Поражение"
                        result.style.color = '#985151'
                    }
                } else {
                    if (+smallBall.textContent === +bigBall.textContent) {
                        result.textContent = "Победа"
                        result.style.color = '#6bb560'
                        points += Math.round(+rateInput.value*100)
                        pointsElement.textContent = points
                    } else {
                        result.textContent = "Поражение"
                        result.style.color = '#985151'
                    }
                }
            })
            control.removeEventListener('click', controlButtonHandler)
        } else {
            rateInput.style.borderColor = "#ff0000"
        }
    }
}

const rateButtonsHandler = e => {
    let target = e.target.closest('.rate__button')

    rateInput.value = target.textContent
}

startButton.addEventListener('click', () => {
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

        document.querySelector('.more').textContent = 'Больше' + kefMore
        document.querySelector('.less').textContent = 'Меньше' + kefLess

        rateButtons.forEach(item => {
            item.addEventListener('click', rateButtonsHandler)
        })

        control.addEventListener('click', controlButtonHandler)
    })


})

