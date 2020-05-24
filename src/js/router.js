import Controller from './controller.js'
// принимаем из entry хешь(действие) и обрабатываем
function getRouteInfo() {
// отрезаем решетку из хеша
  const hash = location.hash ? location.hash.slice(1) : ''
  console.log(hash)
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
