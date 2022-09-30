export default ApiEndpoints = {
  GET_ALL_FRUITS: 'https://dns.ziphio.com/fruits.json',
  LOGIN: 'api/identity/token',
  GET_USER_DETAILS_BY_USER_ID: (userId) => `api/identity/${userId}`,
  CHECK_FIRST_LOGIN: `api/identity/status`
}