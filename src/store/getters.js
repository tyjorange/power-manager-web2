const getters = {
  sidebar: state => state.app.sidebar,
  language: state => state.app.language,
  device: state => state.app.device,
  token: state => state.user.token,
  avatar: state => state.user.avatar,
  name: state => state.user.name,
  roles: state => state.user.roles,
  permissions: state => state.user.permissions,
  checkedItem1: state => state.table.checkedItem1,
  checkedItem2: state => state.table.checkedItem2,
  checkedItem3: state => state.table.checkedItem3,
  radio1: state => state.table.radio1,
  radio2: state => state.table.radio2,
  switchs: state => state.table.switchs,
  addRouters: state => state.permission.addRouters
}
export default getters
