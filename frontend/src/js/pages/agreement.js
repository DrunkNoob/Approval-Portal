/* eslint-disable no-undef */
/* eslint-disable max-len */
import View from '../view.js'
import {modal} from '../modal.js'
import {isValid} from '../utils.js'

let items = []
const fetch = {}

export default {
  setData(agreement) {
    items = agreement
  },

  async render(resultsNode) {
    resultsNode.innerHTML = await View.render('agreement', items)
    const main = localStorage.getItem('main')
    pageScript(JSON.parse(main))
  }
}
function pageScript(main) {
  const agreementForm = document.getElementById('agreement-form')
  const reviewerTable = agreementForm.querySelector('#reviewer-table').querySelector('tbody')
  const reviewers = items.result.reviewers
  const VALID_COMMENT = 8

  // Создание меню формы
  agreementForm.insertAdjacentHTML('beforeend', `
  <div id="buttonForm"></div>
  `)

  // Отрисовка кнопки "Изменить согласование", если зашел создатель согласования
  if (items.result.creatorID === main.result.idUser) {
    agreementForm.querySelector('#buttonForm').insertAdjacentHTML('beforeend', `
    <button type="button" class="btn btn-danger">Изменить согласование</button>
    `)
  }

  // Отрисовка кнопки "Скачать PDF-фаил", если согласование подтверждено всеми участниками сабжа или подсказки о возможности скачать PDF после согласования
  if (items.result.approved) {
    agreementForm.querySelector('#buttonForm').insertAdjacentHTML('afterBegin', `
      <button type="button" class="btn btn-info">Скачать PDF-фаил</button>
      `)
  } else {
    agreementForm.insertAdjacentHTML('beforeBegin', `
    <div class='alert alert-warning' id="alertInfo" role='alert'><strong>Внимание!</strong> Вы не сможете скачать PDF до согласования всеми участниками.</div>
    `)
  }

  // Создание модального окна "Просмотреть комментарий"
  const commentViewModal = modal({
    title: 'Комментарий',
    closable: true,
    footerButtons: [
      {text: 'Закрыть', type: 'secondary', handler() {
        commentViewModal.close()
      }}
    ]
  })


  // Создание модального окна "Изменить комментарий"
  const commentEditModal = function(param) {
    return new Promise((resolve, reject) => {
      const modalEdit = modal({
        title: param.title,
        closable: true,
        content: param.content,
        onClose() {
          modalEdit.destroy()
        },
        footerButtons: [
          {text: 'Сохранить', type: 'danger', disabled: 'true', id: 'saveBtn', handler() {
            modalEdit.messageText = document.querySelector('#messageText').value

            if (isValid(modalEdit.messageText, VALID_COMMENT)) {
              modalEdit.setContent(`
                <div class="d-flex justify-content-center">
                <div class="spinner-grow text-danger" style="width: 4rem; height: 4rem;" role="status">
                <span class="sr-only" >Loading...</span>
                </div>
                </div>
                `)
              resolve(modalEdit)
            }
          }},
          {text: 'Отмена', type: 'secondary', handler() {
            reject(modalEdit)
          }}
        ]
      })
      // Таймер для анимации
      setTimeout(() => modalEdit.open(), 200)
    })
  }


  // Создание модального окна "Подтвердить согласование"
  const statusModal = function(param) {
    return new Promise((resolve, reject) => {
      const statusModal = modal({
        title: param.title,
        closable: true,
        content: param.content,
        onClose() {
          statusModal.destroy()
        },
        footerButtons: [
          {text: param.btnApproveName, type: param.btnApproveType, disabled: 'true', id: 'approveBtn', handler() {
            resolve(statusModal)
          }},
          {text: 'Оставить комментарий', type: 'warning', handler() {
            // Вызов функции запуска модального окна для изменения комментария
            commentEditModalHandler(param)
            reject(statusModal)
          }},
          {text: 'Отмена', type: 'secondary', handler() {
            reject(statusModal)
          }}
        ]
      })
      // Таймер для анимации
      setTimeout(() => statusModal.open(), 200)
    })
  }


  // Функция рендера таблицы "Согласующие"
  function render() {
    reviewers.forEach(function(elem, i) {
      console.log(reviewers[i].status_rev)
      // reviewers[i].status = !!reviewers[i].status
      // reviewers[i].status_rev = !!reviewers[i].status_rev
      // Проверка, согласующего (просматривает странице человек который есть в списке согласующих (может оставить коментарий или согласовать) или нет)
      if (main.result.idUser == reviewers[i].id_user) {
        // Если пользователь просматривающий страницу является согласующим (может оставить комментарий)
        reviewers[i].commentInsert = `
        <button id="btnComment" class="btn btn-warning" data-comment="${reviewers[i].comment !=null ? 'true' : 'false'}" data-btn="commentEdit" data-id="${reviewers[i].id_user}">Комментарий</button>
        `

        reviewers[i].statusBtn = `
        <button type="button" id="btnStatus" class="btn btn-${reviewers[i].status ? 'success' : 'danger'}" data-status="${reviewers[i].status ? 'true' : 'false'}" data-btn="statusBtn" data-id="${reviewers[i].id_user}">${reviewers[i].status ? 'Согласовано' : 'Не согласовано'}</button>
        `
      } else {
        // Если пользователь просматривающий страницу НЕ является согласующим (может просмотреть комментарий, не может согласовать)
        if (reviewers[i].comment == null) {
          reviewers[i].commentInsert = 'Отсутствует'
        } else if (reviewers[i].comment.length < 20) {
          reviewers[i].commentInsert = reviewers[i].comment
        } else {
          reviewers[i].commentInsert = `
          <button id="btnComment" class="btn btn-primary" data-btn="commentView" data-id="${reviewers[i].id_user}">Комментарий</button>
          `
        }

        reviewers[i].statusBtn = `
        <button type="button" id="btnStatus" class="btn btn-${reviewers[i].status ? 'success' : 'danger'}" disabled>${reviewers[i].status ? 'Согласовано' : 'Не согласовано'}</button>
        `
      }

      reviewerTable.insertAdjacentHTML('beforeend', toHTML(reviewers[i]))
    })
  }

  // Шаблон формирует Согласующих
  const toHTML = reviewer => `
  <tr>
  <td><label>${reviewer.status_rev ? 'A' : 'R'}</label></td>
  <td>${reviewer.reviewer}</td>
  <td>
  ${reviewer.statusBtn}
  </td>
  <td>
  ${reviewer.commentInsert}
  </td>
  </tr>
  `
  render()

  // Функция запуска модального окна для изменения комментария
  function commentEditModalHandler(reviewer) {
    commentEditModal({title: 'Комментарий', content: `
    <form id="formComment">      
      <textarea class="form-control" placeholder="Оставьте здесь свой комментарий" id="messageText">${reviewer.comment || ''}</textarea>
    </form>
    `})
        .then(modalEdit => {
          if (isValid(modalEdit.messageText, VALID_COMMENT)) {
            // Отправка на сервер нового/измененого коментария
            fetch.comment = modalEdit.messageText
            console.log('Save, message text: ', modalEdit.messageText)
            modalEdit.close()
          } else {
            console.log('Комментарий менее ', VALID_COMMENT, 'символов')
            modalEdit.close()
          }
        })
        .catch(modalEdit => {
          modalEdit.close()
        })

    const commentInput = document.querySelector('#messageText')
    const saveBtn = document.getElementById('saveBtn')

    let valid = false
    let invalid = false

    // Отслеживание события ввода комментария: проверка на корректность вводимого/сохраняемого комментария
    commentInput.addEventListener('input', () => {
      saveBtn.disabled = !isValid(commentInput.value, VALID_COMMENT)

      if (!isValid(commentInput.value, VALID_COMMENT)) {
        commentInput.classList.remove('is-valid')
        commentInput.classList.add('is-invalid')

        if (invalid === false) {
          commentInput.insertAdjacentHTML('afterEnd', `
          <div class="invalid-feedback">
          Введите комментарий более ${VALID_COMMENT} символов.
          </div>
          `)
          invalid = true
        }
      } else {
        commentInput.classList.remove('is-invalid')
        commentInput.classList.add('is-valid')

        if (valid === false) {
          commentInput.insertAdjacentHTML('afterEnd', `
          <div class="valid-feedback">
          Выглядит неплохо!
          </div>
          `)
          valid = true
        }
      }
    })
  }

  // Отслеживание фокуса на таблице "Согласующие" (Кнопки)
  reviewerTable.addEventListener('mouseover', event => {
    if (event.target.dataset.btn == 'statusBtn') {
      if (event.target.dataset.status === 'false') {
        event.target.classList.remove('btn-danger')
        event.target.classList.add('btn-success')
        event.target.textContent = 'Согласовать'
      } else {
        event.target.classList.add('btn-danger')
        event.target.classList.remove('btn-success')
        event.target.textContent = 'Отклонить'
      }
    } else if (event.target.dataset.btn == 'commentView') {
      event.target.textContent = 'Посмотреть'
    } else if (event.target.dataset.btn == 'commentEdit') {
      if (event.target.dataset.comment == 'true') {
        event.target.textContent = 'Изменить'
      } else {
        event.target.textContent = 'Добавить'
      }
    }
  })
  reviewerTable.addEventListener('mouseout', event => {
    if (event.target.dataset.btn == 'statusBtn') {
      if (event.target.dataset.status === 'false') {
        event.target.classList.add('btn-danger')
        event.target.classList.remove('btn-success')
        event.target.textContent = 'Не согласовано'
      } else {
        event.target.classList.remove('btn-danger')
        event.target.classList.add('btn-success')
        event.target.textContent = 'Согласовано'
      }
    } else if (event.target.dataset.btn == 'commentView') {
      event.target.textContent = 'Комментарий'
    } else if (event.target.dataset.btn == 'commentEdit') {
      event.target.textContent = 'Комментарий'
    }
  })

  // Отслеживание нажатий по таблице "Согласующие"
  reviewerTable.addEventListener('click', event => {
    event.preventDefault()
    const reviewer = reviewers.find(r => r.id_rev == event.target.dataset.id)


    // Функция таймера кнопки "Согласовать"
    function delay(approveBtn, approveBtnText, i = 9) {
      const timerId = setInterval(() => {
        approveBtn.textContent = approveBtnText + ' (' + i + ')'
        if (i==0) {
          approveBtn.textContent = approveBtnText
          approveBtn.disabled = false
        }
        --i
      }, 1000)

      setTimeout(() => {
        clearInterval(timerId)
      }, 10000)
    }


    // Проверка на клик по Select и изменению статуса
    if (event.target.dataset.app === 'true') {
      // console.log(event.target.value)
      const status = event.target.value
      if (status === 'true') {
        // console.log('true')
      } else {
        // console.log('false')
      }
    }

    // Проверка, на то какую модалку открыть commentViewModal (прочитать комментарий) или commentEditModal (изменить комментарий)
    if (event.target.dataset.btn === 'commentView') {
      commentViewModal.setContent(`
      <p>${reviewer.comment || 'Комментарий отсутствует'}</p>
      `)
      commentViewModal.open()
    } else if (event.target.dataset.btn === 'commentEdit') {
      // Вызов функции запуска модального окна для изменения комментария
      commentEditModalHandler(reviewer)
    } else if (event.target.dataset.btn === 'statusBtn') {
      statusModal({title: reviewer.status ? 'Согласовано' : 'Не согласовано', content: `
      Вы действительно хотите <strong>${reviewer.status ? 'отклонить' : 'подтвердить'}</strong> согласование?
      `,
      btnApproveName: reviewer.status ? 'Отклонить' : 'Согласовать', btnApproveType: reviewer.status ? 'danger' : 'success'})
          .then(statusModal => {
            // Отправка на сервер нового/измененого коментария
            fetch.status = !reviewer.status
            console.log('Save, approve status: ', fetch.status)
            statusModal.close()
          })
          .catch(statusModal => {
            statusModal.close()
          })
      const approveBtn = document.getElementById('approveBtn')
      const approveBtnText = reviewer.status ? 'Отклонить' : 'Согласовать'
      const DELAY_BTN = 9


      // Таймер кнопки "Согласовать"
      delay(approveBtn, approveBtnText, DELAY_BTN)
    }
  })


  // Удаление модалок при смене хеша
  addEventListener('hashchange', () => {
    commentViewModal.destroy()
  }, {once: true})
}
