const axios = require('axios');


module.exports = {
    getJokesData(req, res) {
        axios
        .get('https://official-joke-api.appspot.com/jokes/ten')
        .then(response => {
            console.log('Fetching Random Jokes: ============')
            res.send(response.data)
        })
        .catch(err => {
          console.log('ERROR when fetching random jokes:-------', err)
          res.send(err)
        })
    },

    getKitsuData(req, res) {
        axios
        .get('https://kitsu.io/api/edge/anime', {
          "headers": {'Accept': 'application/vnd.api+json','Content-Type': 'application/vnd.api+json'}
        })
        .then(response => {
            console.log('I AM GETTING KITSU DATA============')
            res.send(response.data)
        })
        .catch(err => {
          console.log('ERROR when fetching kitsu data:-------', err)
          res.send(err)
        })
    }
  }

