$(function(){
  chrome.storage.sync.get(
    null, function (data) {
      if(data.KeyInfo || data.KeyInfo !== undefined || data.KeyInfo.apiKey){
        const apiKey = data.KeyInfo.apiKey;
        const workspace = data.KeyInfo.workspace;
        $(document).ready(function(){
          $('#apiKey').val(apiKey);
          $('#workspace').val(workspace);
          $('.back').show();
        })
      }
    }
  )
})
