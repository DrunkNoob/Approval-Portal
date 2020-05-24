/* eslint-disable linebreak-style */
import View from '../view.js'


function tableClick() {
  // eslint-disable-next-line no-invalid-this
  const me = this.id
  console.log(me)
  location.hash = 'agreement/' + me
}

const tableItem = document.querySelectorAll('.tableSubmit')
tableItem.forEach(function(elem) {
  elem.addEventListener('click', tableClick)
})

const resultsNode = document.querySelector('#results')
let items = []

export default {
  setData(index) {
    items = index
  },

  render() {
    resultsNode.innerHTML = View.render('index', items)
  }
}
// const resultsNode = document.querySelector('#results')
// resultsNode.innerHTML = View.render('index', index)
