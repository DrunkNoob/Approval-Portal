/* eslint-disable linebreak-style */
import Controller from './controller.js'

// принимаем из entry хеш и обрабатываем
export class Router {
  constructor() {
    // this.hash
    // this.name
    // this.params
    this.init()
  }

  getRouteInfo() {
    const hash = location.hash ? location.hash.slice(1) : 'index'
    console.log('hash: ', hash)
    const [name, params] = hash.split('/')

    return {name, params}
  }

  handleHash() {
    const {name, params} = this.getRouteInfo()
    console.log(name, 'ghbdtn')
    if (name) {
      const routeName = name + 'Route'
      Controller[routeName](params)
    }
  }

  init() {
    Controller['init']()
    addEventListener('hashchange', this.handleHash.bind(this))
    // обрабатываем текущий хеш
    this.handleHash()
  }
}
