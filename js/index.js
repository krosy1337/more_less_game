let cards = [
    {id: 1, text: 'Яблочки', price: 10,},
    {id: 2, text: 'Груши', price: 20,},
    {id: 3, text: 'Картошка', price: 30,},
]

function render() {
    let html = ''
    cards.forEach(item => {
        html += `
        <div class="col">
            <div class="card" data-id="${item.id}"> 
                <img src="https://static.tildacdn.com/tild3331-6537-4132-a363-326366366637/b0c6431bd9241db9b596.jpg" class="card-img-top" alt="Ядлочки">
                <div class="card-body">
                    <h5 class="card-title">${item.text}</h5>
                    <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                    <a href="#" class="btn btn-primary" data-btn="price" data-id="${item.id}">Узнать цену</a>
                    <a href="#" class="btn btn-danger" data-btn="delete" data-id="${item.id}">Удалить</a>
                </div>
            </div>
        </div> 
    `
    })
    document.querySelector('.row').innerHTML = html
}

render()

const priceModal = $.modal({
    title: 'Цена на товар',
    closable: true,
    width: '400px',
    footer: [
        {
            text: 'Ok',
            type: 'primary',
            handler() {
                priceModal.close()
            }
        },
    ]
})

document.addEventListener('click', event => {
    const target = event.target
    const id = target.dataset.id
    const item = cards.find(fruit => fruit.id === Number(id))

    if (target.dataset.btn === 'price') {

        priceModal.setContent(`<p>Цена: <b>${item.price} $</b></p>`)
        priceModal.open()
        event.preventDefault()
    }

    if (target.dataset.btn === 'delete') {

        $.delete({
            title: 'Точно?',
            content: `<p>Удалить ${item.text}?</p>`,
        }).then(() => {
            cards = cards.filter(f => f.id !== Number(id))
            render()
        }).catch(() => {

        })

        event.preventDefault()
    }
})
