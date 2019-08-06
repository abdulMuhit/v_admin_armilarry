export default function (vm) {
  if (vm.store.getters.isAuthenticated === false) {
    return vm.redirect('/')
  }
}
