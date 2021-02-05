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
    // const index = await Model.fetch('index')
    const main = await Model.toServer({router: 'main'})
    console.log(main)
    const agreements = await Model.toServer({router: 'agreements'})
    indexPage.setData(agreements)
    indexPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-index]'))
  },
  async agreementRoute(params) {
    document.getElementById('results').innerHTML = await View.render('load')
    // const agreement = await Model.fetch('agreement')

    const agreement = await Model.toServer({router: 'agreement', params})
    console.log(agreement)
    agreementPage.setData(agreement)
    agreementPage.render(document.getElementById('results'))
  },
  async usersRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    // const users = await Model.fetch('users')
    // const users = await Model.toServer({router: 'users'})
    const users = await Model.toServer({router: 'newUser', params: {
      secondname: 'ttt',
      firstname: 'Артем',
      patronymic: 'trtrttrrt',
      email: 'artem@mail.ru',
      password: '544t45g45g',
      id_dep: 2,
      id_pos: 4,
      id_acc: '1'
    }})
    usersPage.setData(users)
    usersPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-users]'))
  },

  async profileRoute(params) {
    document.getElementById('results').innerHTML = await View.render('load')
    const profile = await Model.toServer({router: 'user', params})

    profilePage.setData(profile)
    profilePage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-profile]'))
  },

  async newagreementRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    // const newAgreement = await Model.toServer({router: 'main'})

    const newAgreement = await Model.toServer({router: 'newAgreement', params: {
      agreement: {
        id_typ: '1',
        id_cat: '2',
        price: '5486219',
        contract_num: '3810466',
        contract_date: '2020-11-30 21:07:12',
        contract_sub: 'Мдамкек',
        dep_res: '2',
        contract_own: '2',
        contract_adm: '2',
        inn: '12548515',
        verification: true,
        reason_ver: null,
        id_risk: '1',
        creator_agr: '1'
      },
      reviewers: [
        {
          status: 1,
          id_user: 1
        },
        {
          status: 1,
          id_user: 2
        },
        {
          status: 1,
          id_user: 3
        }
      ]

    }})
    newagreementPage.setData(newAgreement)
    newagreementPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-newagreement]'))
  },

  async authRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    authPage.render(document.getElementById('body'))
  }
}
