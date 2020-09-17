/* eslint-disable no-invalid-this */
/* eslint-disable no-unused-vars */
import View from '../View.js'

let fetch = {}
let accessLevel

export default {
  render(resultsNode) {
    resultsNode.innerHTML = View.render('registration')
    document
        .getElementById('registration-form')
        .addEventListener('submit', registrationFormHandler, {onse: true})
  }
}

function registrationFormHandler(event) {
  event.preventDefault()
  const firstname = this.querySelector('#inputfirstname').value
  const secondname = this.querySelector('#inputsecondname').value
  const patronymic = this.querySelector('#inputpatronymic').value

  const position = this.querySelector('#inputposition').value
  const otdel = this.querySelector('#inputotdel').value

  const email = this.querySelector('#inputEmail').value
  const password = this.querySelector('#inputPassword').value

  const radios = this.querySelectorAll('input[name="gridRadios"]')

  for (const radio of radios) {
    if (radio.checked) {
      accessLevel = radio.value
    }
  }

  fetch = {
    firstname,
    secondname,
    patronymic,
    position,
    otdel,
    email,
    password,
    accessLevel
  }

  console.log(fetch)
}
