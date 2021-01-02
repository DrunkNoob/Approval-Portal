/* eslint-disable linebreak-style */
import View from '../view.js'


let items = []

export default {
  setData(index) {
    items = index
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('index', items)

    const tableItem = document.querySelectorAll('.tableSubmit')
    tableItem.forEach(function(elem) {
      elem.addEventListener('click', tableClick)
    })
  }
}

function tableClick() {
  // eslint-disable-next-line no-invalid-this
  const me = this.id
  location.hash = 'agreement/' + me
}
