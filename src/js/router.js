/* eslint-disable linebreak-style */
import Controller from './controller.js'

// принимаем из entry хеш и обрабатываем
function getRouteInfo() {
  const hash = location.hash ? location.hash.slice(1) : 'index'
  console.log('hash: ', hash)
  const [name, id] = hash.split('/')

  return {name, params: {id}}
}

function handleHash() {
  const {name, params} = getRouteInfo()

  if (name) {
    const routeName = name + 'Route'
    Controller[routeName](params)
  }
}

export default {
  init() {
    addEventListener('hashchange', handleHash)
    // обрабатываем текущий хеш
    handleHash()
  }
}
