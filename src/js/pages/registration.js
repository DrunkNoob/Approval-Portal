import {isValid} from '../utils.js'
/* eslint-disable max-len */
/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
import View from '../view.js'

let items = []
const fetch = {}

export default {
  setData(registration) {
    items = registration
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('registration', items)
    pageScript()
  }
}

function pageScript() {
  const registrationForm = document.getElementById('registration-form')
  const password = registrationForm.querySelector('#inputPassword')
  const registrationUser = registrationForm.querySelector('#registrationUser')
  password.addEventListener('input', () => {
    registrationUser.disabled = !isValid(password.value, 6)
    fetch.password = password.value
  })
  registrationForm.addEventListener('submit', registrationFormHandler, {onse: true})
}

function registrationFormHandler(event) {
  event.preventDefault()
  const radios = this.querySelectorAll('input[name="gridRadios"]')

  for (const radio of radios) {
    if (radio.checked) {
      fetch.accessLevel = radio.value
    }
  }

  fetch.firstname = this.querySelector('#inputfirstname').value
  fetch.secondname = this.querySelector('#inputsecondname').value
  fetch.patronymic = this.querySelector('#inputpatronymic').value
  fetch.position = this.querySelector('#inputposition').value
  fetch.otdel = this.querySelector('#inputotdel').value
  fetch.email = this.querySelector('#inputEmail').value


  // request to server
  console.log(fetch)
}
