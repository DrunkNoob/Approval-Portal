import View from '../view.js'

let items = []

export default {
  setData(users) {
    items = users
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('users', items)

    const tableItem = document.querySelectorAll('.tableSubmit')
    tableItem.forEach(function(elem) {
      elem.addEventListener('click', tableClick)
    })
  }
}

function tableClick() {
  // eslint-disable-next-line no-invalid-this
  const me = this.id
  location.hash = 'profile/' + me
}
