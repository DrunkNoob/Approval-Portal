import '../css/bootstrap.min.css'
import '../css/main.css'
import View from './View.js'
import Router from './Router.js'
import Model from './Model'


(async () => {
  try {
    // Проверяем залогинился пользователь или нет
    const notauthorized = false

    if (notauthorized===false) {
      const resultsNode = document.getElementById('body')
      resultsNode.innerHTML = View.render('body')
    } else {
      location.hash = 'auth'
    }
    Model.fetch()

    Router.init()
  } catch (error) {
    console.error(error)
    alert('Ошибка: ' + error.message)
  }
})()
