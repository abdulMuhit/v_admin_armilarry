const AssertAlive = function (decoded) {
  const now = Date.now().valueOf() / 1000
  if (typeof decoded.exp !== 'undefined' && decoded.exp < now) {
    // throw new Error(`token expired: ${JSON.stringify(decoded)}`)
    return {
      'code': false,
      'data': `token expired: ${JSON.stringify(decoded)}`
    }
  }
  if (typeof decoded.nbf !== 'undefined' && decoded.nbf > now) {
    // throw new Error(`token expired: ${JSON.stringify(decoded)}`)
    return {
      'code': false,
      'data': `token expired: ${JSON.stringify(decoded)}`
    }
  }
  return {
    'code': true,
    'data': `token not expired: ${JSON.stringify(decoded)}`
  }
}
export default {
  install: function (Vue) {
    Object.defineProperty(Vue.prototype, '$AssertAlive', { value: AssertAlive })
  },
  AssertAlive: AssertAlive
}
