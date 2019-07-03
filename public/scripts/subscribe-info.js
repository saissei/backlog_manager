$(function() {
  let sData = parseQuery(window.location.search)
  $(document).ready(function() {
    $('#start').val(sData.Start)
    $('#end').val(sData.End)
  })
  chrome.storage.sync.get('KeyInfo', function(data) {
    const apiKey = data.KeyInfo.apiKey
    const workspace = data.KeyInfo.workspace
    const backlog = `https://${workspace}/api/v2`
    let params = { apiKey: apiKey }
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios
      .get(`${backlog}/projects/${sData.pj}/users?${$.param(params)}`)
      .then(res => {
        const data = res.data.map(item => ({
          Name: item.nulabAccount.name,
          userId: item.id
        }))
        var templ = $.templates('#pUser')
        var html = templ.render(data)
        $('#projectUser').append(html)
      })
      .catch(err => console.log(err))
  })
})

$(function() {
  let sData = parseQuery(window.location.search)
  chrome.storage.sync.get('KeyInfo', function(data) {
    const apiKey = data.KeyInfo.apiKey
    const workspace = data.KeyInfo.workspace
    const backlog = `https://${workspace}/api/v2`
    let params = { apiKey: apiKey }
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios
      .get(`${backlog}/projects/${sData.pj}/issueTypes?${$.param(params)}`)
      .then(res => {
        console.log(res.data)
        const data = res.data.map(item => ({
          Name: item.name,
          kId: item.id
        }))
        var templ = $.templates('#KindTmpl')
        var html = templ.render(data)
        $('#Kind').append(html)
      })
      .catch(err => console.log(err))
  })
})

$(function() {
  let sData = parseQuery(window.location.search)
  chrome.storage.sync.get('KeyInfo', function(data) {
    const apiKey = data.KeyInfo.apiKey
    const workspace = data.KeyInfo.workspace
    const backlog = `https://${workspace}/api/v2`
    let params = { apiKey: apiKey }
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios
      .get(`${backlog}/projects/${sData.pj}/categories?${$.param(params)}`)
      .then(res => {
        console.log(res.data)
        const data = res.data.map(item => ({
          Name: item.name,
          cId: item.id
        }))
        var templ = $.templates('#CateTmpl')
        var html = templ.render(data)
        $('#Category').append(html)
      })
      .catch(err => console.log(err))
  })
})

$(function() {
  let sData = parseQuery(window.location.search)
  chrome.storage.sync.get('KeyInfo', function(data) {
    const apiKey = data.KeyInfo.apiKey
    const workspace = data.KeyInfo.workspace
    const backlog = `https://${workspace}/api/v2`
    let params = { apiKey: apiKey }
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
    axios
      .get(`${backlog}/priorities?${$.param(params)}`)
      .then(res => {
        console.log(res.data)
        const data = res.data.map(item => ({
          Name: item.name,
          priId: item.id
        }))
        var templ = $.templates('#prioTmpl')
        var html = templ.render(data)
        $('#Priority').append(html)
      })
      .catch(err => console.log(err))
  })
})

$(function() {
  flatpickr('.flatpickr', {})
})
