import '../css/bootstrap.min.css'
import '../css/main.css'
// import Model from './model.js'
import View from './view.js'
import Router from './router.js'


(async () => {
  try {
    // загружаем главную страницу
    const auth = false

    const resultsNode = document.querySelector('#body')
    if (auth===true) {
      resultsNode.innerHTML = View.render('body')
      Router.init('index')
    } else {
      resultsNode.innerHTML = View.render('authForm')
    }


    const tableItem = document.querySelectorAll('.tableSubmit')
    tableItem.forEach(function(elem) {
      elem.addEventListener('click', tableClick)
    })

    // eslint-disable-next-line no-inner-declarations
    function tableClick() {
      // eslint-disable-next-line no-invalid-this
      const me = this.id
      location.hash = 'agreement/' + me
    }

    // Router.init('index')
  } catch (e) {
    console.error(e)
    alert('Ошибка: ' + e.message)
  }
})()
