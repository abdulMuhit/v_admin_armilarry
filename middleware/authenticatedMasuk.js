export default function ({ store, redirect }) {
  if (store.getters.isAuthenticated === true) {
    return redirect('/dashboard')
  }
}
