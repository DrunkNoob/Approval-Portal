/* eslint-disable max-len */
Element.prototype.appendAfter = function(element) {
  element.parentNode.insertBefore(this, element.nextSibling)
}

function noop() {}

const disableScroll = function() {
  const pagePosition = window.scrollY
  document.body.classList.add('disable-scroll')
  document.body.dataset.position = pagePosition
  document.body.style.top = -pagePosition + 'px'
  document.body.style.paddingRight = 17 + 'px'
  console.log('scroll off')
}

const enableScroll = function() {
  const pagePosition = parseInt(document.body.dataset.position, 10)
  document.body.style.top = 'auto'
  document.body.style.paddingRight = 0 + 'px'
  document.body.classList.remove('disable-scroll')
  window.scroll({top: pagePosition, left: 0})
  document.body.removeAttribute('data-position')
}

function _createModalFooter(buttons = []) {
  if (buttons.length === 0) {
    return document.createElement('div')
  }

  const wrap = document.createElement('div')
  wrap.classList.add('modal-footer')

  buttons.forEach(btn => {
    const $btn = document.createElement('button')
    $btn.textContent = btn.text
    $btn.classList.add('btn')
    $btn.classList.add(`btn-${btn.type || 'secondary'}`)
    $btn.onclick = btn.handler || noop

    wrap.appendChild($btn)
  })

  return wrap
}

function _createModal(param) {
  const modal = document.createElement('div')
  modal.className = 'modalBase'
  modal.setAttribute('role', 'dialog')
  modal.setAttribute('aria-hidden', 'true')
  modal.insertAdjacentHTML('afterbegin', `
  <div class="modal-overlay">
  <div class="modal-window">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">${param.title || ''}</h5>
        ${param.closable ? `<button type="button" class="close" aria-label="Close" data-dismiss="modal">&times</button>` : ''}
      </div>
      <div class="modal-body" data-content>
        ${param.content || ''}
      </div>
    </div>
    </div>
  </div>
`)
  const footer = _createModalFooter(param.footerButtons)
  footer.appendAfter(modal.querySelector('[data-content]'))

  document.body.appendChild(modal)
  return modal
}
export function modal(param) {
  const ANIMATION_SPEED = 200
  const $modal = _createModal(param)
  let closing = false
  // eslint-disable-next-line no-unused-vars
  let destroyed = false

  const modal = {
    open() {
      // closing = true // Временно, проверить!!!
      if (destroyed) {
        return console.log('Modal is destroyed')
      }
      !closing && $modal.classList.add('show')
      disableScroll()
    },
    close() {
      closing = true
      $modal.classList.remove('show')
      $modal.classList.add('hide')
      setTimeout(() => {
        $modal.classList.remove('hide')
        closing = false
        if (typeof param.onClose === 'function') {
          param.onClose()
        }
      }, ANIMATION_SPEED)
      enableScroll()
    },
  }
  const listener = event => {
    if (event.target.dataset.dismiss) {
      modal.close()
    }
  }

  $modal.addEventListener('click', listener)
  return Object.assign(modal, {
    destroy() {
      $modal.parentNode.removeChild($modal)
      $modal.removeEventListener('click', listener)
      destroyed = true
    },
    setContent(html) {
      $modal.querySelector('[data-content]').innerHTML = html
    }
  })
}


{/* <div class="modal fade show" id="exampleModalLive" tabindex="-1" role="dialog" aria-labelledby="exampleModalLiveLabel" style="display: block; padding-right: 17px;" aria-modal="true">
  <div class="modal-dialog">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLiveLabel">Modal title</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">×</span>
        </button>
      </div>
      <div class="modal-body">
        <p>Woohoo, you're reading this text in a modal!</p>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary">Save changes</button>
      </div>
    </div>
  </div>
</div> */}
