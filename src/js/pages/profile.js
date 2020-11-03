/* eslint-disable max-len */
import {isValid} from '../utils.js'
/* eslint-disable no-invalid-this */
import View from '../view.js'

let items = []
const fetch = {}

export default {
  setData(profile) {
    items = profile
    if (items.result.accessLevel===1) {
      items.result.accessLevel = 'Администратор'
    } else {
      items.result.accessLevel = 'Пользователь'
    }
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('profile', items)
    pageScript()
  }
}
function pageScript() {
  const profileForm = document.getElementById('profile-form')
  const password = profileForm.querySelector('#inputCurPassword')
  const newPassword = profileForm.querySelector('#inputNewPassword')
  const confirmPassword = profileForm.querySelector('#inputConfirmPassword')

  const position = profileForm.querySelector('#inputposition').querySelectorAll('option')
  const otdel = profileForm.querySelector('#inputotdel').querySelectorAll('option')
  profileForm.addEventListener('submit', profileFormHandler, {onse: true})

  // Установка в правильное положение селектора
  position.forEach(function(elem) {
    if (elem.value===items.result.position) {
      elem.selected = true
    }
  })

  otdel.forEach(function(elem) {
    if (elem.value===items.result.otdel) {
      elem.selected = true
    }
  })

  password.addEventListener('change', () => {
    if (isValid(password.value, 1)) {
      newPassword.required = true
      confirmPassword.required = true
    } else {
      newPassword.required = false
      confirmPassword.required = false
    }
  })
}


function profileFormHandler(event) {
  event.preventDefault()
  fetch.firstname = this.querySelector('#inputfirstname').value
  fetch.secondname = this.querySelector('#inputsecondname').value
  fetch.patronymic = this.querySelector('#inputpatronymic').value
  fetch.position = this.querySelector('#inputposition').value
  fetch.otdel = this.querySelector('#inputotdel').value
  fetch.email = this.querySelector('#inputEmail').value
  const password = this.querySelector('#inputCurPassword')
  const newPassword = this.querySelector('#inputNewPassword')
  const confirmPassword = this.querySelector('#inputConfirmPassword')

  if (isValid(password.value, 1)) {
    if (newPassword.value===confirmPassword.value) {
      fetch.password = password.value
      fetch.newPassword = newPassword.value
      requestProfile()
      document.getElementById('profile-form').querySelector('.invalid-feed').classList.remove('on')
    } else {
      document.getElementById('profile-form').querySelector('.invalid-feed').classList.add('on')
    }
  } else {
    requestProfile()
  }

  // request to server
  function requestProfile() {
    console.log(fetch)
  }
}
