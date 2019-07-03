/*const getEvent = async (Id, apiKey, workspace) => {
  const backlog = `https://${workspace}/api/v2`;
  let params = {"apiKey": apiKey};
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded';
  params['projectId[]'] = Id;
  params['count'] = 100;
  params['offset'] = 0;
  return await axios.get(`${backlog}/issues?${$.param(params)}`);
}*/

const getIssue = async (Id, apiKey, workspace) => {
  const backlog = `https://${workspace}/api/v2/issues`
  let params = { apiKey: apiKey }
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return await axios.get(`${backlog}/${Id}?${$.param(params)}`)
}

const patchIssue = async (Id, status, apiKey, workspace) => {
  const backlog = `https://${workspace}/api/v2/issues`
  let params = {
    statusId: status,
    apiKey: apiKey
  }
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  return await axios.patch(`${backlog}/${Id}?${$.param(params)}`)
}

const getEvent = async (Id, apiKey, workspace) => {
  let _length
  let records = []

  const backlog = `https://${workspace}/api/v2`
  let params = { apiKey: apiKey }
  axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded'
  params['projectId[]'] = Id
  params['count'] = 100
  params['offset'] = 0
  const Scroll = async _len => {
    if (_len < 100 || _len === undefined) {
      return records
    }
    const result = await axios.get(`${backlog}/issues?${$.param(params)}`)
    if (!records) {
      records = result.data[0]
    } else {
      records.push(...result.data)
    }
    params['offset'] += 100
    _length = result.data.length
    return Scroll(_length)
  }
  return await Scroll(100)
}
