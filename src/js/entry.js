/* eslint-disable max-len */
import '../css/bootstrap.min.css'
import '../css/main.css'
import View from './view.js'
import Router from './router.js'
import Model from './model.js'
import {isValid} from './utils.js'
import {modal} from './modal.js'

(async () => {
  try {
    // Проверяем залогинился пользователь или нет
    await Model.fetch('notauthorized')
    const main = await Model.fetch('main')
    localStorage.setItem('main', JSON.stringify(main))
    if (main.result.accessLevel === 1) {
      console.log('Access level: ADMIN')
    } else {
      console.log('Access level: USER')
    }

    const resultsNode = document.getElementById('body')
    resultsNode.innerHTML = View.render('body')

    Router.init()

    pageScript()
  } catch (error) {
    console.error(error)
    alert('Ошибка (консоль)')
  }
})()

function pageScript() {
  // Активация выподающего меню в navbar
  const navItemDropdown = document.getElementById('navItemDropdown')
  navItemDropdown.addEventListener('click', () => {
    navItemDropdown.classList.toggle('show')
    navItemDropdown.querySelector('[aria-labelledby=dropdown01]').classList.toggle('show')
  })

  // Поиск по согласованию
  const formSearchAgreement = document.getElementById('formSearchAgreement')
  const btnSearchAgreement = formSearchAgreement.querySelector('#btnSearchAgreement')
  const inputSearchAgreement = formSearchAgreement.querySelector('#inputSearchAgreement')
  const MIN_VALUE_SEARCH = 8
  formSearchAgreement.addEventListener('submit', e => {
    e.preventDefault()

    if (isValid(inputSearchAgreement.value, MIN_VALUE_SEARCH)) {
      btnSearchAgreement.disabled = true

      console.log('search run: ', inputSearchAgreement.value)

      location.hash = `agreement/${inputSearchAgreement.value}`

      inputSearchAgreement.value = ''
    }
  })

  inputSearchAgreement.addEventListener('input', () => {
    btnSearchAgreement.disabled = !isValid(inputSearchAgreement.value, MIN_VALUE_SEARCH)
  })

  // Открытие модального окна с информацией о проекте
  const aboutClick = document.querySelector('[data-about]')
  const aboutModal = modal({
    title: 'О проекте',
    closable: true,
    content: `
    "Портал согласования" — это веб-приложение, призванное облегчить процесс согласования договоров и поставщиков у компаний, филиалы которых расположены в разных городах, а согласование происходит после подписания документов в бумажном виде.
    <br>
    Версия: 1.0 (Beta)
    <br>
    Стек технологий: JS, HTML, CSS, PHP.
    <br>
    Проект доступен на <a href="https://github.com/DrunkNoob/Approval-Portal">GitHub</a>.
    <br>
    <br>
    О авторе:
    Яковенко Данил
    <br>
    Контакты:
    <li><a href="https://t.me/DanilYakovenko">Telegram</a></li>
    <li><a href="mailto:danil.yakovenko@outlook.com">danil.yakovenko@outlook.com</a></li>
    <li><a href="https://dyakoven.ru">dyakoven.ru</a></li>
    <li><a href="https://github.com/DrunkNoob/">GitHub</a></li>
    <br>
        `,
    footerButtons: [
      {text: 'Закрыть', type: 'secondary', handler() {
        aboutModal.close()
      }}
    ]
  }, {once: true})

  aboutClick.addEventListener('click', () => {
    console.log('test')
    aboutModal.open()
  })
}

export function authHandler(value) {
  if (value=='false') {
    // const resultsNode = document.getElementById('body')
    // resultsNode.innerHTML = View.render('body')
    // pageScript()
    // location.hash = '#'
  } else {
    location.hash = 'auth'
  }
}
