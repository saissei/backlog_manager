$(function(){
  chrome.storage.sync.get(
    null, function (data) {
      if(!data.KeyInfo || data.KeyInfo === undefined){
        window.location.href = "/settings.html";
       }
    }
  )
})


