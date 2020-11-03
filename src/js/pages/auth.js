/* eslint-disable no-invalid-this */
/* eslint-disable linebreak-style */
import View from '../view.js'

let fetch = {}

export default {
  render(resultsNode) {
    resultsNode.innerHTML = View.render('authForm')
    document
        .getElementById('auth-form')
        .addEventListener('submit', authFormHandler, {onse: true})
  }
}

function authFormHandler(event) {
  event.preventDefault()
  const email = this.querySelector('#inputEmail').value
  const password = this.querySelector('#inputPassword').value
  fetch = {
    email,
    password
  }

  console.log(fetch)
}
