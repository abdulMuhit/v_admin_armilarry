export default function ({ $axios, store, redirect }) {
  $axios.onRequest((config) => {
    // console.log('Making request to ' + config.url)
    // console.log('store ' + JSON.stringify(store))
    if (store.state.token) {
      // config.headers.common['token'] = `Bearer ${store.state.token}`
      config.headers.token = store.state.token || ''
    }
  })

  $axios.onError((error) => {
    const code = parseInt(error.response && error.response.status)
    if (code === 400) {
      redirect('/400')
    }
  })
}
