/* eslint-disable linebreak-style */
import Model from './model.js'
import View from './view.js'
import indexPage from './pages/index.js'
import agreementPage from './pages/agreement.js'
import usersPage from './pages/users.js'
import profilePage from './pages/profile.js'
import newagreementPage from './pages/newagreement.js'
import authPage from './pages/auth.js'

// const indexNavNode = document.querySelector('[data-role=nav-index]')
// // eslint-disable-next-line max-len
// eslint-disable-next-line max-len
// const newagreementNavNode = document.querySelector('[data-role=nav-newagreement]')
// console.log(indexNavNode)

let activeNavNode

function setActiveNavNode(node) {
  if (activeNavNode) {
    activeNavNode.classList.remove('active')
  }

  activeNavNode = node

  activeNavNode.classList.add('active')
}

// Принимаем из router действие и обрабатываем
export default {
  async indexRoute() {
    setActiveNavNode(document.querySelector('[data-role=nav-index]'))
    document.getElementById('results').innerHTML = await View.render('load')
    const index = await Model.fetch('index')

    indexPage.setData(index)
    indexPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-index]'))
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
    setActiveNavNode(document.querySelector('[data-role=nav-users]'))
  },

  async profileRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const profile = await Model.fetch('profile')

    profilePage.setData(profile)
    profilePage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-profile]'))
  },

  async newagreementRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const newagreement = await Model.fetch('newagreement')

    newagreementPage.setData(newagreement)
    newagreementPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-newagreement]'))
  },

  async authRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    authPage.render(document.getElementById('body'))
  }
}
