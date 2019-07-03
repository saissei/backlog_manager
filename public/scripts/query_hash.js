$(function(){
  const query = parseQuery(location.search)

  chrome.storage.sync.get("KeyInfo", function(data){
    const apiKey = data.KeyInfo.apiKey;
    const workspace = data.KeyInfo.workspace;
    getIssue(query.Id, apiKey, workspace).then(issue => {
      $(document).ready(function(){
        
        $('#issue-title').text(issue.data.summary);
        issue.data.description = (issue.data.description).replace(/\n/g, '<br>');
        $('#issue-desc').html(issue.data.description);
        if(issue.data.startDate){
          $('#issue-start').text(moment(issue.data.startDate).format('YYYY 年 MM 月 DD 日'));
        }
        if(issue.data.dueDate){
          $('#issue-end').text(moment(issue.data.dueDate).format('YYYY 年 MM 月 DD 日'));
        }
        $("#issue-link").attr("href", `http://${workspace}.backlog.com/view/${query.Id}`);
        $("#issue-link").text(query.Id);
        if(issue.data.status.id !== 4 ){
          $('#task-done').show();
        } else if(issue.data.status.id === 4){
          $('#task-done').text('完了済み')
          $('#task-done').prop("disabled", true);
          $('#task-done').removeClass('btn-success').addClass('btn-light');
          $('#task-done').show();
        }
      })
    })
  })
})