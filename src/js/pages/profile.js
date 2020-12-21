/* eslint-disable max-len */
import {isValid} from '../utils.js'
/* eslint-disable no-invalid-this */
import View from '../view.js'

let items = []
const fetch = {}

export default {
  setData(profile) {
    items = profile
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('profile', items)
    pageScript()
  }
}
function pageScript() {
  if (JSON.parse(localStorage.getItem('main')).result.accessLevel === 1) {
    if ((JSON.parse(localStorage.getItem('main')).result.idUser === items.result.id)) {
      console.log('Это я и я админ')
      adminHandler(true, true)
    } else {
      console.log('Это не я и я админ')
      adminHandler(false, true)
    }
  } else {
    if ((JSON.parse(localStorage.getItem('main')).result.idUser === items.result.id)) {
      console.log('Это я')
      adminHandler(true)
    } else {
      console.log('Это не я')
    }
  }


  const profileForm = document.getElementById('profile-form')


  const position = profileForm.querySelector('#inputposition').querySelectorAll('option')
  const otdel = profileForm.querySelector('#inputotdel').querySelectorAll('option')


  function adminHandler(me, admin) {
    console.log(me, admin)
    // Отрисовка таблицы "Безопасность"
    const securityHTML = `
  <br>
  <h3><small>Безопасность:</small></h3>
  <table class="table" id="tableSecurity">
${me ? `<tr><td><span>Текущий пароль</span></td><td><input type="password" id="inputCurPassword" class="form-control"></td></tr>` : '' }
${(me || admin) ? `<tr><td><span>Новый пароль</span></td><td><input type="password" id="inputNewPassword" class="form-control" minlength="8" maxlength="20"></td></tr>` : ''}
${me ? `<tr><td><span>Повторите новый пароль</span></td><td><div><input type="password" id="inputConfirmPassword" class="form-control" minlength="8" maxlength="20"><div class="invalid-feed">Пароли не совпадают</div></div></td></tr>` : ''}
  </table>
  `
    const tableMain = document.getElementById('tableMain')
    tableMain.insertAdjacentHTML('afterEnd', securityHTML)

    const profileForm = document.getElementById('profile-form')

    const VALID_INPUT = 2
    const VALID_EMAIL = 6
    const VALID_PASS = 5
    const inputFirstname = profileForm.querySelector('#inputfirstname')
    const inputSecondname = profileForm.querySelector('#inputsecondname')
    const inputPatronymic = profileForm.querySelector('#inputpatronymic')
    const inputPosition = profileForm.querySelector('#inputposition')
    const inputOtdel = profileForm.querySelector('#inputotdel')
    const inputEmail = profileForm.querySelector('#inputEmail')
    const password = document.getElementById('inputCurPassword')
    const newPassword = document.getElementById('inputNewPassword')
    let valid = false
    let invalid = false
    inputSecondname.disabled = false
    inputPosition.disabled = false
    inputOtdel.disabled = false

    if (admin) {
      inputFirstname.disabled = false
      inputPatronymic.disabled = false
      inputEmail.disabled = false
      inputFirstname.addEventListener('input', e => {
        btnOnOff(e.target, VALID_INPUT)
      })
      inputPatronymic.addEventListener('input', e => {
        btnOnOff(e.target, VALID_INPUT)
      })
      inputEmail.addEventListener('input', e => {
        btnOnOff(e.target, VALID_EMAIL)
      })
      if (!me) {
        newPassword.addEventListener('input', e => {
          btnOnOff(e.target, VALID_PASS)
        })
      }
    }


    if (me) {
      const confirmPassword = document.getElementById('inputConfirmPassword')

      password.addEventListener('input', e => {
        btnOnOff(e.target, VALID_PASS)
      })
      password.addEventListener('change', e => {
        if (isValid(password.value, VALID_PASS)) {
          newPassword.required = true
          confirmPassword.required = true
          newPassword.addEventListener('input', e => {
            btnOnOff(e.target, VALID_PASS)
          })
        } else {
          newPassword.required = false
          confirmPassword.required = false
          newPassword.removeEventListener('input')
        }
      })
    }

    profileForm.insertAdjacentHTML('afterEnd', `<div id="buttonForm"><button id="saveProfile" class="btn btn-danger" disabled>Сохранить профиль</button></div>`)
    const saveProfileBtn = document.getElementById('saveProfile')
    saveProfileBtn.addEventListener('click', profileFormHandler, {onse: true})


    inputSecondname.addEventListener('input', e => {
      btnOnOff(e.target, VALID_INPUT)
    })
    inputPosition.addEventListener('change', e => {
      btnOnOff(e.target)
    })
    inputOtdel.addEventListener('change', e => {
      btnOnOff(e.target)
    })


    function btnOnOff(target, VALID = 0) {
      saveProfileBtn.disabled = !isValid(target.value, VALID)

      if (!isValid(target.value, VALID)) {
        target.classList.remove('is-valid')
        target.classList.add('is-invalid')

        if (invalid === false) {
          target.insertAdjacentHTML('afterEnd', `
          <div class="invalid-feedback">
          Введите не менее ${VALID} символов.
          </div>
          `)
          invalid = true
        }
      } else {
        target.classList.remove('is-invalid')
        target.classList.add('is-valid')

        if (valid === false) {
          valid = true
        }
      }
    }
    let confirmInvalid = false
    function profileFormHandler(event) {
      event.preventDefault
      fetch.secondname = inputSecondname.value
      fetch.position = inputPosition.value
      fetch.otdel = inputOtdel.value


      if (me) {
        const password = document.getElementById('inputCurPassword')
        const confirmPassword = document.getElementById('inputConfirmPassword')

        if (isValid(password.value, 1)) {
          if (newPassword.value===confirmPassword.value) {
            fetch.password = password.value
            fetch.newPassword = newPassword.value
            // newPassword.classList.add('is-valid')
            confirmPassword.classList.add('is-valid')
            // newPassword.classList.remove('is-invalid')
            confirmPassword.classList.remove('is-invalid')
            requestProfile()
          } else {
            // newPassword.classList.remove('is-valid')
            confirmPassword.classList.remove('is-valid')
            // newPassword.classList.add('is-invalid')
            confirmPassword.classList.add('is-invalid')
            if (confirmInvalid === false) {
              confirmPassword.insertAdjacentHTML('afterEnd', `
                <div class="invalid-feedback">
                Пароли не совпадают!
                </div>
                `)
              confirmInvalid = true
            }
          }
        } else {
          requestProfile()
        }
      } else if (admin) {
        fetch.firstname = inputFirstname.value
        fetch.patronymic = inputPatronymic.value
        fetch.email = inputEmail.value
        if (isValid(newPassword.value, VALID_PASS)) {
          fetch.newPassword = newPassword.value
        }
        requestProfile()
      }


      // request to server
      function requestProfile() {
        console.log(fetch)
      }
    }
  }
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
}

