import View from '../View.js'

let items = []

export default {
  setData(profile) {
    items = profile
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('profile', items)
  }
}
