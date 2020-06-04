import View from '../View.js'

let items = []

export default {
  setData(agreement) {
    items = agreement
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('agreement', items)
  }
}
