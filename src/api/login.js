import request from '@/utils/request'

export function API_LoginByUsername(username, password) {
  return request({
    url: '/auth/login',
    method: 'post',
    data: {
      username,
      password
    }
  })
}

export function API_GetUserInfo(token) {
  return request({
    url: '/auth/info',
    method: 'get',
    params: {
      token
    }
  })
}

export function API_Logout() {
  return request({
    url: '/auth/logout',
    method: 'get'
  })
}
