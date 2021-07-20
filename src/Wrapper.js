const axios = require('axios');

export default class GitHubWrapper {
  constructor() {
    this.token = "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"
    this.client = axios.create({
      baseURL: 'https://api.github.com/',
      responseType: 'json',
      headers: {
        'X-Custom-Header': this.token,
        'Accept': 'application/vnd.github.v3+json',
        'Authorization': 'token ' + this.token
      }
    })
  }

  getRequest(path) {
    return this.client.get(path)
  }
  postRequest(path, payload) {
    return this.client.post(path, payload)
  }
  deleteRequest(path){
    return this.client.delete(path)
  }
  root() {
    return this.getRequest('/')
  }
  createGist(payload) {
    return this.postRequest('/gists', payload)
  }
  deleteGist(gistId){
    return this.deleteRequest(`/gists/${gistId}`)
  }
  getGist(gistId) {
    return this.getRequest(`/gists/${gistId}`)
  }
  async getIds(){
    let list = [];
    await this.getRequest('/gists').then(data => {
      for(const key of Object.keys(data.data)){
        list.push(data.data[key].id)
      }
    })
    return list
  }
}