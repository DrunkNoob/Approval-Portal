import View from '../View.js'

let items = []

export default {
  setData(newagreement) {
    items = newagreement
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('newagreement', items)
    pageScript()
  }
}

function pageScript() {
  console.log('page new agreement is loaded')
}
