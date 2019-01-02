import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

export function C_GetToken() {
  return Cookies.get(TokenKey)
}

export function C_SetToken(token) {
  return Cookies.set(TokenKey, token)
}

export function C_RemoveToken() {
  return Cookies.remove(TokenKey)
}
