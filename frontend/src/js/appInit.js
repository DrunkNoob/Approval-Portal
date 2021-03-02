import {isValid} from './utils.js'
import {modal} from './modal.js'

/* eslint-disable max-len */
export function initBody() {
  // Рендер элементов navbar в зависимости от прав авторизованного
  const navItemDropdown = document.getElementById('navItemDropdown')
  if (JSON.parse(localStorage.getItem('main')).result.accessLevel === 1) {
    navItemDropdown.insertAdjacentHTML('afterBegin', `
       <a class="nav-link dropdown-toggle" id="dropdown01" data-toggle="dropdown" style="cursor: pointer" aria-haspopup="true">Пользователи</a>
       <div id="dropdown-menu" class="dropdown-menu" aria-labelledby="dropdown01">
         <a class="dropdown-item" data-role="nav-users" href="#users">Просмотр пользователей</a>
         <a class="dropdown-item" data-role="nav-registration" data-registration>Регистрация новых пользователей</a>
       </div>
       `)
    navItemDropdown.className = 'nav-item dropdown'

    // Активация выподающего меню в navbar если авторизовался админ
    navItemDropdown.addEventListener('click', () => {
      navItemDropdown.classList.toggle('show')
      navItemDropdown.querySelector('[aria-labelledby=dropdown01]').classList.toggle('show')
    })
  } else {
    navItemDropdown.insertAdjacentHTML('afterBegin', `
         <a class="nav-link" data-role="nav-users" href="#users">Просмотр пользователей</a>
       `)
    // navItemDropdown.className('')
  }


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
  })

  aboutClick.addEventListener('click', () => {
    aboutModal.open()
  })


  // Открытие модального окна с регистрацией новых пользователей
  if (JSON.parse(localStorage.getItem('main')).result.accessLevel === 1) {
    const registrationClick = document.querySelector('[data-registration]')
    const registrationModal = function(param) {
      return new Promise((resolve, reject) => {
        const regModal = modal({
          title: 'Регистрация новых пользователей',
          closable: true,
          content: `
          <form id="registration-form">
          <!-- Поля для заполнения инфой и код для автоматического заполнения поля предыдущей инфой, в случае ошибки типа: "Заполните поле ..." -->
          <div class="form-row">
            <div class="col-md-4 mb-3">
              <label for="inputfirstname">Имя</label>
              <input type="text" class="form-control" id="inputfirstname" placeholder="Михаил" required autofocus>
            </div>
            <div class="col-md-4 mb-3">
              <label for="inputsecondname">Фамилия</label>
              <input type="text" class="form-control" id="inputsecondname" placeholder="Иванов" required>
            </div>
            <div class="col-md-4 mb-3">
              <label for="inputpatronymic">Отчество</label>
              <input type="text" class="form-control" id="inputpatronymic" placeholder="Александрович" aria-describedby="patronymicHelpBlock">
              <small id="patronymicHelpBlock" class="form-text text-muted">
                Опционально.
                </small>
            </div>
          </div>
      
        <div class="form-row">
          <div class="col-md-6 mb-3">
            <label for="inputposition" >Должность</label>
         <select  id="inputposition" class="form-control" required>
          
          <option value=""></option>
         
          </select>
          </div>
          <div class="col-md-6 mb-3">
            <label for="inputotdel" >Отдел</label>
        <select  id="inputotdel" class="form-control" required>
          
          <option value="{{this}}">{{this}}</option>
          
          </select>
          </div>
        </div>
      
         <div class="form-row">
            <div class="col-md-6 mb-3">
              <label for="inputEmail">Email</label>
              <input type="email" class="form-control" id="inputEmail" placeholder="example@gmail.ru" required>
            </div>
            
            <div class="col-md-6 mb-3">
               <label for="inputPassword">Пароль</label>
                <input type="password" id="inputPassword" class="form-control" aria-describedby="passwordHelpBlock" required>
                  <small id="passwordHelpBlock" class="form-text text-muted">
                  Пароль должен состоять из 8-20 символов.
                  </small>
            </div>
           </div>
      
      
      
           <fieldset class="form-group">
            <div class="row">
              <legend class="col-form-label col-sm-2 pt-0">Уровень привилегий</legend>
              <div class="col-sm-10">
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadiosUser" value="0" checked>
                  <label class="form-check-label" for="gridRadiosUser">
                    Пользователь
                  </label>
                </div>
                <div class="form-check">
                  <input class="form-check-input" type="radio" name="gridRadios" id="gridRadiosAdmin" value="1" aria-describedby="gridRadiosAdminHelpBlock">
                  <label class="form-check-label" for="gridRadiosAdmin">
                    Администратор
                  </label>
                  <small id="gridRadiosAdminHelpBlock" class="form-text text-muted">
                    Администратор может регистриовать новых пользователей.
                    </small>
                </div>
                
              </div>
            </div>
              </fieldset>
          </form>
                `,
          onClose() {
            regModal.destroy()
          },
          footerButtons: [
            {text: 'Отправить', type: 'primary', id: 'registrationUserBtn', disabled: true, handler() {
              resolve(regModal)
            }},
            {text: 'Закрыть', type: 'secondary', handler() {
              reject(regModal)
            }}
          ]
        })
        // Таймер для анимации
        setTimeout(() => regModal.open(), 200)
      })
    }


    registrationClick.addEventListener('click', () => {
      // eslint-disable-next-line no-undef
      registrationModal()
          .then(regModal => {
            const fetch = {}
            fetch.firstname = registrationForm.querySelector('#inputfirstname').value
            fetch.secondname = registrationForm.querySelector('#inputsecondname').value
            fetch.patronymic = registrationForm.querySelector('#inputpatronymic').value
            fetch.position = registrationForm.querySelector('#inputposition').value
            fetch.otdel = registrationForm.querySelector('#inputotdel').value
            fetch.email = registrationForm.querySelector('#inputEmail').value
            const radios = registrationForm.querySelectorAll('input[name="gridRadios"]')

            for (const radio of radios) {
              if (radio.checked) {
                fetch.accessLevel = radio.value
              }
            }

            // request to server
            console.log(fetch)
            regModal.close()
          })
          .catch(regModal => {
            regModal.close()
          })

      // Скрипт на модальном окне
      const registrationForm = document.getElementById('registration-form')
      const password = registrationForm.querySelector('#inputPassword')
      const registrationUserBtn = document.getElementById('registrationUserBtn')
      password.addEventListener('input', () => {
        registrationUserBtn.disabled = !isValid(password.value, 6)
        fetch.password = password.value
      })


      const $positions = registrationForm.querySelector('#inputposition')
      const $otdels = registrationForm.querySelector('#inputotdel')
      const main = JSON.parse(localStorage.getItem('main'))

      const positions = main.result.registration.positions
      const otdels = main.result.registration.otdels

      toSelect(positions, $positions)
      toSelect(otdels, $otdels)

      function toSelect(optionMain, node) {
        const htmlOption = optionMain.map(toOption).join('')


        node.innerHTML = htmlOption

        function toOption(option) {
          return `
          <option value="${option}">${option}</option>
          `
        }
      }
    })
  }
}
