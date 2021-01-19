/* eslint-disable max-len */

import {authHandler} from './entry.js'


/* eslint-disable linebreak-style */
export default {
  toServer(param) {
    return fetch('entry.php', {
      method: 'POST',
      body: JSON.stringify(param),
      headers: {
        'Content-Type': 'application/json'
      }
    })
        .then(response => response.json())
        .then(response => {
          console.log(response)
          return response
        })
        .catch(response => {
          console.log('errrrrror', response)
        })
  },
  fetch(content) {
    // console.log('fetch: ', content)
    return fetch(`${content}.json`)
        .then(response => {
          return new Promise((resolve, reject) => {
            setTimeout(() => {
              resolve(response)
            }, 500)
          })
        })
        .then(response => response.json())
        .then(response => {
          // console.log(response.status)
          if (response.status==='ok') {
            authHandler('false')
            return response
          } else {
            authHandler('true')
          }
        })
  }

}
