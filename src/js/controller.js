import Model from './model.js'
import View from './view.js'
// import agreementPage from './pages/agreement.js'
import indexPage from './pages/index.js'


// принимаем из router действие и обрабатываем
export default {
  async indexRoute() {
    const index = await Model.ajaxDown('main.php')
        .then(value => {
          return value
        })
        .catch(error=>console.log('Error: ', error))
    indexPage.setData(index)
    indexPage.render()
  },
  async agreementRoute(params) {
    // console.log(params.id)

    const agreement = await Model.ajaxDown('agreement.php', params.id)
        .then(value => {
          return value
        })
        .catch(error=>console.log('Error: ', error))

    console.log(agreement)

    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('agreement', agreement)
    // agreementPage.setData(agreement.items)
    // agreementPage.render()
  },
  async usersRoute() {
    const users = await Model.ajaxDown('users.php')
        .then(value => {
          return value
        })
        .catch(error=>console.log('Error: ', error))


    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('users', users)
  },

  async registrationRoute() {
    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('registration')
  },


  async aboutRoute() {
    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('about')
  },
  async profileRoute() {
    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('profile')
  },
  async newagreementRoute() {
    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('newagreement')
  }
}
