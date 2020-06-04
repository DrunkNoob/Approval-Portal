/* eslint-disable linebreak-style */
import Model from './Model.js'
import View from './View.js'
import indexPage from './pages/index.js'
import agreementPage from './pages/agreement.js'
import usersPage from './pages/users.js'
import registrationPage from './pages/registration.js'
import profilePage from './pages/profile.js'
import newagreementPage from './pages/newagreement.js'
import authPage from './pages/auth.js'


// принимаем из router действие и обрабатываем
export default {
  async indexRoute() {
    const index = await Model.fetch('index')

    indexPage.setData(index)
    indexPage.render(document.getElementById('results'))
  },
  async agreementRoute(params) {
    const agreement = await Model.fetch('agreement')

    agreementPage.setData(agreement)
    agreementPage.render(document.getElementById('results'))
  },
  async usersRoute() {
    const users = await Model.fetch('users')

    usersPage.setData(users)
    usersPage.render(document.getElementById('results'))
  },

  async registrationRoute() {
    registrationPage.render(document.getElementById('results'))
  },

  aboutRoute() {
    const resultsNode = document.getElementById('results')
    resultsNode.innerHTML = View.render('about')
  },

  async profileRoute() {
    const profile = {'1': 1} // заглушка
    profilePage.setData(profile)
    profilePage.render(document.getElementById('results'))
  },

  async newagreementRoute() {
    const newagreement = {'1': 1} // заглушка
    newagreementPage.setData(newagreement)
    newagreementPage.render(document.getElementById('results'))
  },

  async authRoute() {
    authPage.render(document.getElementById('body'))
  }
}
