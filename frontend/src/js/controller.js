/* eslint-disable linebreak-style */
import View from './view.js'
import indexPage from './pages/index.js'
import agreementPage from './pages/agreement.js'
import usersPage from './pages/users.js'
import profilePage from './pages/profile.js'
import newagreementPage from './pages/newagreement.js'
import authPage from './pages/auth.js'
import {initBody} from './appInit.js'
import {Model} from './model.js'

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
  async init() {
    const resultsNode = document.getElementById('body')
    resultsNode.innerHTML = View.render('body')
    initBody()
    const main = await new Model({router: 'main'}).init()
    // Проверяем залогинился пользователь или нет
    localStorage.setItem('main', JSON.stringify(main))

    if (main.result.accessLevel === 1) {
      console.log('Access level: ADMIN')
    } else {
      console.log('Access level: USER')
    }
  },

  async indexRoute() {
    setActiveNavNode(document.querySelector('[data-role=nav-index]'))
    document.getElementById('results').innerHTML = await View.render('load')
    // const index = await Model.fetch('index')
    const agreements = await new Model({router: 'agreements'}).agreements()
    indexPage.setData(agreements)
    indexPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-index]'))
  },
  async agreementRoute(params) {
    document.getElementById('results').innerHTML = await View.render('load')

    // eslint-disable-next-line max-len
    const agreement = await new Model({router: 'agreement', params}).getAgreement()
    console.log(agreement)
    agreementPage.setData(agreement)
    agreementPage.render(document.getElementById('results'))
  },
  async usersRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    const users = await new Model({router: 'users'}).users()
    // const users = await Model.toServer({router: 'newUser', params: {
    //   secondname: 'ttt',
    //   firstname: 'Артем',
    //   patronymic: 'trtrttrrt',
    //   email: 'artem@mail.ru',
    //   password: '544t45g45g',
    //   id_dep: 2,
    //   id_pos: 4,
    //   id_acc: '1'
    // }})
    usersPage.setData(users)
    usersPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-users]'))
  },

  async profileRoute(params) {
    document.getElementById('results').innerHTML = await View.render('load')
    const profile = await new Model({router: 'user', params}).getProfile()

    profilePage.setData(profile)
    profilePage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-profile]'))
  },

  async newagreementRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    // const newAgreement = await Model({router: 'main'}).setAgreement
    const main = await new Model({router: 'main'}).init()
    // eslint-disable-next-line max-len
    // const newAgreement = await Model.toServer({router: 'newAgreement', params: {
    //   agreement: {
    //     id_typ: '1',
    //     id_cat: '2',
    //     price: '5486219',
    //     contract_num: '3810466',
    //     contract_date: '2020-11-30 21:07:12',
    //     contract_sub: 'Мдамкек',
    //     dep_res: '2',
    //     contract_own: '2',
    //     contract_adm: '2',
    //     inn: '12548515',
    //     verification: true,
    //     reason_ver: null,
    //     id_risk: '1',
    //     creator_agr: '1'
    //   },
    //   reviewers: [
    //     {
    //       status: 1,
    //       id_user: 1
    //     },
    //     {
    //       status: 1,
    //       id_user: 2
    //     },
    //     {
    //       status: 1,
    //       id_user: 3
    //     }
    //   ]

    // }})
    newagreementPage.setData(main)
    newagreementPage.render(document.getElementById('results'))
    setActiveNavNode(document.querySelector('[data-role=nav-newagreement]'))
    const fetch = await newagreementPage.pageScript()
    // const req = await Model.toServer({router: 'newAgreement', params: fetch})
    console.log(fetch)
  },

  async authRoute() {
    document.getElementById('results').innerHTML = await View.render('load')
    authPage.render(document.getElementById('body'))
  }
}
