Element.prototype.appendAfter = function(element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function getScrollbarWidth() {

    // Creating invisible container
    const outer = document.createElement('div');
    outer.style.visibility = 'hidden';
    outer.style.overflow = 'scroll'; // forcing scrollbar to appear
    outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
    document.body.appendChild(outer);

    // Creating inner element and placing it in the container
    const inner = document.createElement('div');
    outer.appendChild(inner);

    // Calculating difference between container's full width and the child width
    const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

    // Removing temporary elements from the DOM
    outer.parentNode.removeChild(outer);

    return scrollbarWidth;

}

function noop() {}

function _createModalFooter(buttons= []) {
    if (!buttons) {
        return document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal__footer')

    buttons.forEach(button => {
        const $btn = document.createElement('button')
        $btn.textContent = button.text
        $btn.classList.add(`${button.type || 'secondary'}`)
        $btn.addEventListener('click', button.handler || noop)
        wrap.appendChild($btn)
    })

    return wrap
}

function _createModal(params) {
    const DEFAULT_WIDTH = '600px'
    const modal = document.createElement('div')
    modal.classList.add('wmodal')
    modal.insertAdjacentHTML('afterbegin', `
    <div class="modal__overlay" data-close="true">
        <div class="modal__window" style="width: ${params.width || DEFAULT_WIDTH}">
            <div class="modal__body" data-content>
                ${params.content || ''}
            </div>
        </div>
    </div>
    `)
    const footer = _createModalFooter(params.footer)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}

$.modal = function(params) {
    const ANIMATION_SPEED = 300
    const $modal = _createModal(params)
    let closing = false
    let destroyed = false

    const modal = {
        open() {
            if (!closing && !destroyed) {
                $modal.classList.add('open')
                document.body.style.overflow = 'hidden'
                document.body.style.paddingRight = `${getScrollbarWidth()}px`
            }
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('hide')
            setTimeout(() => {
                $modal.classList.remove('hide')
                closing = false
                document.body.style.overflow = 'visible'
                document.body.style.paddingRight = ''
                if (typeof params.onClose === 'function') {
                    params.onClose()
                }
            }, ANIMATION_SPEED)
        },
    }

    const modalClickListener = event => {
        const target = event.target
        if (target.dataset.close) {
            modal.close()
        }
    }

    $modal.addEventListener('click', modalClickListener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', modalClickListener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}