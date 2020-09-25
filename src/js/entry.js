/* eslint-disable max-len */
import '../css/bootstrap.min.css'
import '../css/main.css'
import View from './view.js'
import Router from './router.js'
import Model from './model.js'
import {isValid} from './utils.js'


(async () => {
  try {
    // Проверяем залогинился пользователь или нет
    await Model.fetch('notauthorized')

    Router.init()
  } catch (error) {
    console.error(error)
    alert('Ошибка (консоль)')
  }
})()

function pageScript() {
  // активация выподающего меню в navbar
  const navItemDropdown = document.getElementById('navItemDropdown')
  navItemDropdown.addEventListener('click', () => {
    navItemDropdown.classList.toggle('show')
    navItemDropdown.querySelector('[aria-labelledby=dropdown01]').classList.toggle('show')
  })

  // поиск по согласованию
  const formSearchAgreement = document.getElementById('formSearchAgreement')
  const btnSearchAgreement = formSearchAgreement.querySelector('#btnSearchAgreement')
  const inputSearchAgreement = formSearchAgreement.querySelector('#inputSearchAgreement')

  formSearchAgreement.addEventListener('submit', e => {
    e.preventDefault()

    if (isValid(inputSearchAgreement.value, 10)) {
      btnSearchAgreement.disabled = true

      console.log('search run: ', inputSearchAgreement.value)

      location.hash = `agreement/${inputSearchAgreement.value}`

      inputSearchAgreement.value = ''
    }
  })

  inputSearchAgreement.addEventListener('input', () => {
    btnSearchAgreement.disabled = !isValid(inputSearchAgreement.value, 10)
  })
}

export function authHandler(value) {
  if (value=='false') {
    const resultsNode = document.getElementById('body')
    resultsNode.innerHTML = View.render('body')
    pageScript()
    // location.hash = '#'
  } else {
    location.hash = 'auth'
  }
}
