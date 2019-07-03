$(function () {
  $('select').change(function() {
    var val = $(this).val();
    chrome.storage.sync.get("KeyInfo", function(data){
      const apiKey = data.KeyInfo.apiKey;
      const workspace = data.KeyInfo.workspace;

      getEvent(val, apiKey, workspace).then(res => {
        res = res.filter(_fil => {
          return _fil.status.id === 2 || _fil.status.id === 1
        })
        const events = res.map(item => {
          let result;
          if (item.startDate){
            result = {
              id: item.issueKey,
              title: item.summary,
              start: item.startDate,
              end: item.dueDate,
              color: '#8fd3f4',
              textColor: 'black'
            };
          } else {
            result = {
              id: item.issueKey,
              title: item.summary,
              start: moment(item.dueDate).subtract(1, 'days').toISOString(),
              end: item.dueDate,
              color: '#8fd3f4',
              textColor: 'black'
            };
          }
          return result;
        })
        calendar_object.events = events;
        calendar_object.select = function(start, end, allDay) {
            const pj = $("option:selected").val();
            let startDate = moment(start).toISOString()
            let endDate = moment(end).toISOString();
            window.location.href = `/newIssue.html?pj=${pj}&Start=${startDate}&End=${endDate}`
        }
        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar(calendar_object);
      })
      .catch(err => (console.log(err)))
    });
  })
});

$(function(){
  let hash = window.location.hash
  if(hash != ''){
    hash = hash.replace(/#/g, '')
    chrome.storage.sync.get("KeyInfo", function(data){
      const apiKey = data.KeyInfo.apiKey;
      const workspace = data.KeyInfo.workspace;

      getEvent(hash, apiKey, workspace).then(res => {
        res = res.filter(_fil => {
          return _fil.status.id === 2 || _fil.status.id === 1
        })
        console.log(res.length);
        const events = res.map(item => {
          let result;
          if (item.startDate){
            result = {
              id: item.issueKey,
              title: item.summary,
              start: item.startDate,
              end: item.dueDate,
              color: '#8fd3f4',
              textColor: 'black'
            };
          } else {
            result = {
              id: item.issueKey,
              title: item.summary,
              start: moment(item.dueDate).subtract(1, 'days').toISOString(),
              end: item.dueDate,
              color: '#8fd3f4',
              textColor: 'black'
            };
          }
          return result;
        })
        calendar_object.events = events;
        calendar_object.select = function(start, end, allDay) {
            const pj = $("option:selected").val();
            let startDate = moment(start).toISOString()
            let endDate = moment(end).toISOString();
            window.location.href = `/newIssue.html?pj=${pj}&Start=${startDate}&End=${endDate}`
        }
        $('#calendar').fullCalendar('destroy');
        $('#calendar').fullCalendar(calendar_object);
      })
    });
  }
  $('#calendar').fullCalendar(calendar_object);
})



let calendar_object = {
  //ヘッダーの設定
  header: {
    left: 'prev,next today',
    center: 'title',
    right: 'month,agendaWeek,agendaDay'
  },
  lang: 'ja',
  height: 500,
  width: 520,
  editable: true, // イベントを編集するか
  allDaySlot: false, // 終日表示の枠を表示するか
  eventDurationEditable: false, // イベント期間をドラッグしで変更するかどうか
  slotEventOverlap: false, // イベントを重ねて表示するか
  selectable: true,
  selectHelper: true,
  defaultdate: moment().format('YYYY-MM-DD'),
  select: function(start, end, allDay) { return false},
  eventClick: function(item, jsEvent, view) {
    const pj = $("option:selected").val();

    chrome.storage.sync.get("KeyInfo", function(data){
      const apiKey = data.KeyInfo.apiKey;
      const workspace = data.KeyInfo.workspace;
      window.location.href = `/issue.html?pj=${pj}&Id=${item.id}`
    })
  },
  droppable: true,// イベントをドラッグできるかどうか
  events: ""
}