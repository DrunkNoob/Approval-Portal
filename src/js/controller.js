/* eslint-disable linebreak-style */
import Model from './model.js'
import View from './view.js'
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
    document.getElementById('results').innerHTML = await View.render('load')
    const index = await Model.fetch('index')

    indexPage.setData(index)
    indexPage.render(document.getElementById('results'))
  },
  async agreementRoute(params) {
    document.getElementById('results').innerHTML = await View.render('load')
    const agreement = await Model.fetch('agreement')

    agreementPage.setData(agreement)
    agreementPage.render(document.getElementById('results'))
  },
  async usersRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const users = await Model.fetch('users')

    usersPage.setData(users)
    usersPage.render(document.getElementById('results'))
  },

  async registrationRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const registration = await Model.fetch('registration')
    registrationPage.setData(registration)
    registrationPage.render(document.getElementById('results'))
  },

  aboutRoute() {
    const resultsNode = document.getElementById('results')
    resultsNode.innerHTML = View.render('about')
  },

  async profileRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const profile = await Model.fetch('profile')
    profilePage.setData(profile)
    profilePage.render(document.getElementById('results'))
  },

  async newagreementRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const newagreement = await Model.fetch('newagreement')
    newagreementPage.setData(newagreement)
    newagreementPage.render(document.getElementById('results'))
  },

  async authRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    authPage.render(document.getElementById('body'))
  }
}
