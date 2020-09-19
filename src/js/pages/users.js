import View from '../view.js'

let items = []

export default {
  setData(user) {
    items = user
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('users', items)
  }
}
