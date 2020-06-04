/* eslint-disable max-len */
/* eslint-disable linebreak-style */
export default {
  fetch(content) {
    console.log('fetch: ', content)
    return fetch(`${content}.json`)
        .then(response => response.json())
  }

}
