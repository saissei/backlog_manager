$(function(){
  $('.back').on('click', function(){
    const search = parseQuery(window.location.search);
    if (search.pj|| search.pj !== undefined){
      window.location.href = `/main.html#${search.pj}`
    } else {
      window.location.href = '/main.html'
    }
  })
});

$(function(){
  $('#save-event').on('click', function(){
    const apiKey = $('#apiKey').val();
    const workspace = $('#workspace').val();
    const KeyInfo = {
      "KeyInfo": {
        "apiKey": apiKey,
        "workspace": workspace
      }
    };
    chrome.storage.sync.set(KeyInfo, function(){
      window.location.href = '/main.html'
    })
  })
})

$(function(){
  $('#post-event').on('click', function(){
    var formData = $("#issueForm").serializeArray();
    let search = parseQuery(window.location.search);
    const pj = search.pj;
    let params = {
      'projectId': pj,
      'summary': '',
      'description': '',
      'startDate': '',
      'dueDate': '',
      'categoryId[]': '',
      'priorityId': '',
      'assigneeId': '',
      'issueTypeId': '',
      'apiKey': ''
    };
    $.each(formData, function(i, element) {
      params[element.name] = element.value;
    });
    if(params['categoryId[]'] === ''){
      delete params['categoryId[]'];
    }
    chrome.storage.sync.get("KeyInfo", function(data){
      const apiKey = data.KeyInfo.apiKey;
      const workspace = data.KeyInfo.workspace;
      const backlog = `https://${workspace}.backlog.com/api/v2/issues`;
      params['apiKey'] = apiKey ;
      axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';

      axios.post(`${backlog}?${$.param(params)}`)
      .then(res => {
        window.location.href = `/main.html#${pj}`
        return false;
      })
      .catch(err => {
        alert(err);
        return false;
      })
    })
  })
})

$(function(){
  $('#task-done').on('click', function(){
    const search = parseQuery(window.location.search);
    chrome.storage.sync.get("KeyInfo", function(data){
      const apiKey = data.KeyInfo.apiKey;
      const workspace = data.KeyInfo.workspace;
      patchIssue(search.Id, '4', apiKey, workspace)
      .then(res => {
        window.location.href = `/main.html#${search.pj}`
        //console.log(res)
      })
      .catch(err => {
        console.log(err);
        alert(err);
      })
    })
  })
});