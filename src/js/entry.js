import '../css/bootstrap.min.css'
import '../css/main.css'
import Model from './model.js'
import View from './view.js'
import Router from './router.js'

(async () => {
  try {
    // загружаем главную страницу
    const index = await Model.ajaxDown('http://konesog.fefaweb.ru/main.php')
        .then(value => {
          return value
        })
        .catch(error=>console.log('Error: ', error))
    // indexPage.setData(index);
    // indexPage.render();
    const resultsNode = document.querySelector('#results')
    resultsNode.innerHTML = View.render('index', index)
    // const resultsNode = document.querySelector('#results');
    // resultsNode.innerHTML = View.render('index');


    const tableItem = document.querySelectorAll('.tableSubmit');
    tableItem.forEach(function(elem) {
      elem.addEventListener('click', tableClick);
    })

    // eslint-disable-next-line no-inner-declarations
    function tableClick() {
      // eslint-disable-next-line no-invalid-this
      const me = this.id
      location.hash = 'agreement/' + me
    }

    Router.init('index')
  } catch (e) {
    console.error(e)
    alert('Ошибка: ' + e.message)
  }
})()
