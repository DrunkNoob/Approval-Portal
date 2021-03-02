/* eslint-disable no-invalid-this */
/* eslint-disable max-len */
import '../css/bootstrap.min.css'
import '../css/main.css'
import {Router} from './router.js'


(async () => {
  try {
    new Router()
  } catch (err) {
    console.error(err)
    alert('Ошибка (консоль)')
  }
})()
