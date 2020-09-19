import View from '../view.js'

let items = []

export default {
  setData(agreement) {
    items = agreement
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('agreement', items)
  }
}
