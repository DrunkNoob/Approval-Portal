/* eslint-disable max-len */
import View from '../view.js'
import {isValid} from '../utils.js'
// import {createElement} from '../helpers/js'
let items = []
// let fetch = {}
const err = []

export default {
  setData(newagreement) {
    items = newagreement
    // fetch = items
  },

  render(resultsNode) {
    resultsNode.innerHTML = View.render('newagreement', items)
  },

  async pageScript() {
    console.log('page new agreement is loaded')
    const sogForm = document.getElementById('sogForm')
    const partyVer = sogForm.querySelector('#partyVer')
    const partyVerCom = sogForm.querySelector('#partyVerCom')

    const addBtnApprover = sogForm.querySelector('#add-approver')
    const typeSog = sogForm.querySelector('#typeSog')
    const categorySog = sogForm.querySelector('#categorySog')
    const valuationPriceSog = sogForm.querySelector('#valuationPriceSog')
    const risk = sogForm.querySelector('#risk')
    // переделать в querySelector
    const sogList = sogForm.querySelector('#sogList')
    const ndog = sogForm.querySelector('#ndog')
    // const dated = sogForm.querySelector('#dated')
    // const pdog = sogForm.querySelector('#pdog')
    // const otdels = sogForm.querySelector('#otdels')
    // const vfio = sogForm.querySelector('#vfio')
    // const afio = sogForm.querySelector('#afio')
    // const inn = sogForm.querySelector('#inn')

    const sogItems = document.querySelectorAll('.sog-item')

    // Ослеживание "Вид соглашения"
    typeSog.addEventListener('change', e => {
      console.log('Выбран вид соглашения: ', e.target.value)
      changeApproversItem()
    })

    // Ослеживание "Категория"
    categorySog.addEventListener('change', e => {
      console.log('Выбрана категория: ', e.target.value)
      changeApproversItem()
    })

    // Ослеживание "Ежегодный оборот по договору (RUB)"
    valuationPriceSog.addEventListener('change', e => {
      if (isValid(valuationPriceSog.value, 2)) {
        console.log('Ежегодный оборот по договору: ', e.target.value)
        changeApproversItem()
      } else {
        err.push('Введите корректное значение ежегодного оборота')
        console.log(err)
      }
    })

    ndog.addEventListener('change', e => {
      if (isValid(ndog.value, 3)) {
        err.indexOf('Введите корректный номер договора')
      } else {
        err.push('Введите корректный номер договора')
      }
    })

    // Отслеживание "Проверка контрагента"
    partyVer.addEventListener('change', e => {
      if (e.target.value=='true') {
        partyVerCom.disabled = true
        partyVer.parentNode.parentNode.classList.remove('table-danger')
        partyVer.parentNode.parentNode.classList.add('table-success')
        partyVerCom.parentNode.parentNode.classList.add('table-dark')
        partyVerCom.parentNode.parentNode.classList.remove('table-danger')
      } else {
        partyVerCom.disabled = false
        partyVerCom.required = true
        partyVer.parentNode.parentNode.classList.remove('table-success')
        partyVer.parentNode.parentNode.classList.add('table-danger')
        partyVerCom.parentNode.parentNode.classList.add('table-danger')
        partyVerCom.parentNode.parentNode.classList.remove('table-dark')
        partyVerCom.addEventListener('input', () => {
          console.log('enter comment')
        })
      }
    })

    // Отслеживание "Степень риска по контрагенту"
    risk.addEventListener('change', e => {
      console.log('Степень риска по контрагенту: ', e.target.value)
      switch (e.target.value) {
        case 'high':
          risk.parentNode.parentNode.classList.remove('table-warning')
          risk.parentNode.parentNode.classList.remove('table-success')
          risk.parentNode.parentNode.classList.add('table-danger')
          break
        case 'medium':
          risk.parentNode.parentNode.classList.remove('table-danger')
          risk.parentNode.parentNode.classList.remove('table-success')
          risk.parentNode.parentNode.classList.add('table-warning')
          break
        case 'low':
          risk.parentNode.parentNode.classList.remove('table-danger')
          risk.parentNode.parentNode.classList.remove('table-warning')
          risk.parentNode.parentNode.classList.add('table-success')
          break
      }
    })

    // была нажата кнопка добавить согласующего
    addBtnApprover.addEventListener('click', addApproverItem)

    // Отслеживание отправки формы
    sogForm.addEventListener('submit', async e => {
      e.preventDefault()
      console.log('Отправка...')
      // fetch = {
      //   creator: '',
      //   type: typeSog.value,
      //   category: categorySog.value,
      //   valuationprice: valuationPriceSog.value,
      //   ndog: ndog.value,
      //   dated: dated.value,
      //   pdog: pdog.value,
      //   otdels: otdels.value,
      //   vfio: vfio.value,
      //   afio: afio.value,
      //   inn: inn.value,
      //   partyver: partyVer.value,
      //   partyercom: partyVerCom.value,
      //   risk: risk.value,
      //   sogList: null

      // }
      // console.log(fetch)

      return {agreement: {
        id_typ: '1',
        id_cat: '2',
        price: '5486219',
        contract_num: '3810466',
        contract_date: '2020-11-30 21:07:12',
        contract_sub: 'Мдамкек',
        dep_res: '2',
        contract_own: '2',
        contract_adm: '2',
        inn: '12548515',
        verification: true,
        reason_ver: null,
        id_risk: '1',
        creator_agr: '1'
      },
      reviewers: [
        {
          status: 1,
          id_user: 1
        },
        {
          status: 1,
          id_user: 2
        },
        {
          status: 1,
          id_user: 3
        }
      ]}
    })


    function changeApproversItem() {
      const typeSelect = document.getElementById('typeSog').selectedIndex
      const categorySelect = document.getElementById('categorySog').selectedIndex
      const valuationPriceSelect = parseFloat(document.getElementById('valuationPriceSog').value)
      let a = 2
      if (typeSelect===0) {
        if (categorySelect===0) {
          console.log('Разовые закупки: Закупки для целей монтажа')
          console.log(valuationPriceSelect)
          switch (true) {
            case valuationPriceSelect<100000:
              console.log('<100000')
              a = 2
              break
            case valuationPriceSelect>=100000 && valuationPriceSelect<300000:
              console.log('100000-300000')
              a = 3
              break
            case valuationPriceSelect>=300000 && valuationPriceSelect<1000000:
              console.log('300000-1000000')
              a = 6
              break
            case valuationPriceSelect>=1000000 && valuationPriceSelect<15000000:
              console.log('1000000-15000000')
              a = 9
              break
            case valuationPriceSelect>=15000000:
              console.log('>15000000')
              a = 9
              break

            default:
              console.log('Не найдено')
          }
        } else {
          console.log('Разовые закупки: Иные закупки')
          console.log(valuationPriceSelect)
          switch (true) {
            case valuationPriceSelect<100000:
              console.log('<100000')
              a = 2
              break
            case valuationPriceSelect>=100000 && valuationPriceSelect<300000:
              console.log('100000-300000')
              a = 1
              break
            case valuationPriceSelect>=300000 && valuationPriceSelect<1000000:
              console.log('300000-1000000')
              a = 4
              break
            case valuationPriceSelect>=1000000 && valuationPriceSelect<15000000:
              console.log('1000000-15000000')
              a = 7
              break
            case valuationPriceSelect>=15000000:
              console.log('>15000000')
              a = 7
              break

            default:
              console.log('Не найдено')
          }
        }
      } else {
        if (categorySelect===0) {
          console.log('Рамочные соглашения: Закупки для целей монтажа')
          console.log(valuationPriceSelect)
          switch (true) {
            case valuationPriceSelect<100000:
              console.log('<300000')
              a = 2
              break
            case valuationPriceSelect>=300000 && valuationPriceSelect<3000000:
              console.log('300000-3000000')
              a = 6
              break
            case valuationPriceSelect>=3000000 && valuationPriceSelect<15000000:
              console.log('3000000-15000000')
              a = 9
              break
            case valuationPriceSelect>=15000000:
              console.log('1000000-15000000')
              a = 10
              break

            default:
              console.log('Не найдено')
          }
        } else {
          console.log('Рамочные соглашения: Иные закупки')
          console.log(valuationPriceSelect)
          switch (true) {
            case valuationPriceSelect<300000:
              console.log('<300000')
              a = 2
              break
            case valuationPriceSelect>=300000 && valuationPriceSelect<3000000:
              console.log('300000-3000000')
              a = 5
              break
            case valuationPriceSelect>=3000000 && valuationPriceSelect<15000000:
              console.log('3000000-15000000')
              a = 8
              break
            case valuationPriceSelect>=15000000:
              console.log('>15000000')
              a = 8
              break

            default:
              console.log('Не найдено')
          }
        }
      }
      console.log(a)
      const sogItemQuantity = document.querySelectorAll('#sog-item').length
      for (let j = 2; j < sogItemQuantity; j++) {
      // добавить цикл удаления добавленных строк
        sogList.querySelector('tbody').removeChild(document.querySelectorAll('#sog-item')[2].children[1].parentNode)
      }

      for (let i = 0; i < a; i++) {
        addApproverItem()
      }

      return 0
    }

    function addApproverItem() {
      const sogItem = createApproverItem()
      sogList.querySelector('tbody').appendChild(sogItem)
    }

    function createApproverItem() {
      const statusu = document.createElement('select')
      // statusu.type = 'select'
      statusu.className = 'form-control'
      const rr = document.createElement('option')
      rr.value = 'R'
      rr.innerText = 'R'
      const aa = document.createElement('option')
      aa.value = 'A'
      aa.innerText = 'A'
      statusu.appendChild(rr)
      statusu.appendChild(aa)

      const selectSog = document.createElement('select')
      selectSog.innerText = 'select'
      selectSog.className = 'form-control'

      for (let i = 0; i < items.result.users.length; i++) {
        const sogUs = document.createElement('option')
        sogUs.value = items.result.users[i].id
        sogUs.innerText = items.result.users[i].user
        selectSog.appendChild(sogUs)
      }

      const deleteButton = document.createElement('button')
      deleteButton.type = 'button'
      deleteButton.className = `btn btn-outline-danger`
      deleteButton.id = 'deleteButton'
      deleteButton.innerHTML = `<svg class="bi bi-trash" width="1em" height="1em" viewBox="0 0 16 16" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"></path>
    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4L4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"></path>
  </svg>`

      const listCol1 = document.createElement('td')
      listCol1.appendChild(statusu)
      const listCol2 = document.createElement('td')
      listCol2.appendChild(selectSog)
      const listCol3 = document.createElement('td')
      listCol3.appendChild(deleteButton)
      const listItem = document.createElement('tr')
      listItem.id = 'sog-item'
      listItem.appendChild(listCol1)
      listItem.appendChild(listCol2)
      listItem.appendChild(listCol3)

      bindEvents(listItem)

      return listItem
    }

    function bindEvents(sogItem) {
      const delBtn = sogItem.querySelector('button#deleteButton')
      delBtn.addEventListener('click', deleteApproverItem)
    }

    function deleteApproverItem() {
    // eslint-disable-next-line no-invalid-this
      const listItem = this.parentNode
      sogList.querySelector('tbody').removeChild(listItem.parentNode)
    }

    function init() {
      sogItems.forEach(function(item, i) {
        if (i===0) {
          console.log('norm')
        } else {
          bindEvents(item)
        }
      })
    }

    init()
  }
}
