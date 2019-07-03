$(function(){
  chrome.storage.sync.get("KeyInfo", function(data){
    const apiKey = data.KeyInfo.apiKey;
    const workspace = data.KeyInfo.workspace;
    const backlog = `https://${workspace}.backlog.com/api/v2`;
    let params = { "apiKey": apiKey };
    axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
    axios.get(`${backlog}/projects?${$.param(params)}`)
    .then(res => {
      const data = (res.data).map(item => ({
        "Name": item.name,
        "KeyId": item.id
      }))
      var templ = $.templates('#tmpl3')
      var html = templ.render(data);
      $('#ul3').append(html)
      if(window.location.hash || window.location.hash !== undefined){
        $(document).ready(function(){
          $('#ul3').val((window.location.hash).replace(/#/g, ''));
        })
      }
    })
  })
})
