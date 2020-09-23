/* eslint-disable max-len */
import View from '../view.js'

let items = []
const fetch = {}

export default {
  setData(agreement) {
    items = agreement
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('agreement', items)
    pageScript()
  }
}
function pageScript() {
  const agreementForm = document.getElementById('agreement-form')
  const reviewerTable = agreementForm.querySelector('#reviewer-table').querySelector('tbody')


  const reviewer = items.result.reviewer
  reviewer.forEach(function(elem, i) {
    let status
    let comment
    if (reviewer[i].status===true) {
      status = 'Согласовано'
    } else {
      status = 'Не согласовано'
    }

    if (reviewer[i].comment&&reviewer[i].comment.length) {
      comment = reviewer[i].comment
    } else {
      comment = 'Нет комментария'
    }

    // console.log(comment)
    const html = `
    <tr>
    <td><label>${reviewer[i].statusu}</label></td>
    <td>${reviewer[i].secondname} ${reviewer[i].firstname} ${reviewer[i].patronymic} (${reviewer[i].otdel}/${reviewer[i].position})</td>
    <td>${status}</td>
    <td>${comment}</td>
    </tr>
`
    reviewerTable.insertAdjacentHTML('beforeend', html)
  })


  fetch.status = 1
  fetch.comment = 'Lolololol'
}
