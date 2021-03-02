export class Model {
  constructor(param) {
    this.param = param
  }

  async init() {
    return await this.toServer(this.param)
  }

  async agreements() {
    return await this.toServer(this.param)
  }

  async getAgreement() {
    return await this.toServer(this.param)
  }
  async setAgreement() {
    return null
  }

  async users() {
    return await this.toServer(this.param)
  }

  async getProfile() {
    return await this.toServer(this.param)
  }

  async setProfile() {
    return null
  }

  async toServer(param) {
    try {
      const response = await fetch('entry.php', {
        method: 'POST',
        body: JSON.stringify(param),
        headers: {
          'Content-Type': 'application/json'
        }
      })
      const json = await response.json()
      console.log(json )
      return json
    } catch (err) {
      console.log('Error:', err)
    }
  }
}


/* eslint-disable linebreak-style */
// export default {
//   fetch(content) {
//     // console.log('fetch: ', content)
//     return fetch(`${content}.json`)
//         .then(response => {
//           return new Promise((resolve, reject) => {
//             setTimeout(() => {
//               resolve(response)
//             }, 500)
//           })
//         })
//         .then(response => response.json())
//         .then(response => {
//           return response
//         })
//   }

// }
