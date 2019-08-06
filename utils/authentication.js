import Cookie from 'js-cookie'

export const setToken = (token) => {
  window.localStorage.setItem('token', JSON.stringify(token))
  window.localStorage.setItem('logintime', Date.now())
  Cookie.set('jwt', token)
}

export const unsetToken = () => {
  window.localStorage.removeItem('token')
  Cookie.remove('jwt')
  window.localStorage.setItem('logoutime', Date.now())
}

export const getTokenFromCookie = (req) => {
  if (!req.headers.cookie) return
  const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
  if (!jwtCookie) return
  const jwt = jwtCookie.split('=')[1]
  return jwt
}

export const getTokenFromLocalStorage = () => {
  const json = window.localStorage.token
  // return json ? JSON.parse(json) : undefined
  return json ? JSON.parse(json) : undefined
}
