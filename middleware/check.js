import { getTokenFromCookie, getTokenFromLocalStorage } from '../utils/authentication'

export default function ({ isServer, store, req }) {
  if (isServer && !req) return

  let tt
  if (!process.server) {
    tt = getTokenFromLocalStorage()
  } else {
    tt = getTokenFromCookie(req)
  }

  store.commit('SET_TOKEN', tt)
}
