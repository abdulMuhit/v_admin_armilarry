import jwtDecode from 'jwt-decode'
import {
  setToken,
  unsetToken
} from '~/utils/authentication'
import AssertAlive from '~/mixins/assertAlive'

export default {
  // =================================================
  // State
  // =================================================
  state: () => {
    const state = {
      token: '',
      user: null,
      LoadingOverlay: false
    }
    return state
  },

  // =================================================
  // Actions
  // =================================================

  actions: {
    nuxtServerInit({
      commit
    }, {
      req
    }) {
      if (req.headers.cookie) {
        const jwtCookie = req.headers.cookie.split(';').find(c => c.trim().startsWith('jwt='))
        if (!jwtCookie) return null
        const jwt = jwtCookie.split('=')[1]
        commit('SET_TOKEN', jwt)
      }
    },
    exportExcel(store, data) {
      const vm = this
      return new Promise((resolve, reject) => {
        vm.$axios({
          method: 'GET',
          headers: {
            'Access-Control-Allow-Origin': '*'
          },
          // url: '/api/exportFData',
          url: 'http://139.162.44.198:8800/excel',
          params: {
            start: data.sd,
            end: data.ed
          },
          responseType: 'arraybuffer'
        }).then(function (r) {
          resolve(r)
        }).catch(function (e) {
          reject(e)
        })
      })
    },
    exportExcelPost: function ({
      commit
    }, data) {
      const vm = this
      /* console.log("export excell post ", data)
      for(var pair of data.entries()) {
        console.log(pair[0]+ ', '+ pair[1])
        } */
      commit('CHANGE_LOADING', true)
      return new Promise((resolve, reject) => {
        vm.$axios({
          method: 'POST',
          url: '/api_proxy/api/vendor/exportExcelWaitingList',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          },
          responseType: 'arraybuffer'
        }).then(function (r) {
          commit('CHANGE_LOADING', false)
          resolve(r)
        }).catch(function (e) {
          commit('CHANGE_LOADING', false)
          reject(e)
        })
      })
    },
    login({
      commit
    }, data) {
      const that = this
      commit('CHANGE_LOADING', true)
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          // url: '/member/login',
          url: '/api_proxy/login',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(function (r) {
          if (r.data.code === 200) {
            // setToken(r.data.data.token)
            // commit('SET_TOKEN', r.data.data.token)

            setToken(r.data.token)
            commit('SET_TOKEN', r.data.token)
          } else {
            unsetToken()
            commit('SET_TOKEN', null)
          }
          commit('CHANGE_LOADING', false)
          resolve(r)
        }).catch(function (e) {
          unsetToken()
          commit('SET_TOKEN', null)
          commit('CHANGE_LOADING', false)
          reject(e)
        })
      })
    },
    logoutMethod({
      commit
    }) {
      return new Promise((resolve) => {
        unsetToken()
        commit('SET_TOKEN', null)
        resolve(true)
      })
    },

    getAllBrandlist: function (context, formdata) {
      console.log("getAllbrandlist here ", formdata)
      const that = this
      return new Promise((resolve, reject) => {
        // {{base_url_vadmin}}/api/get_list_brand/
        that.$axios({
          method: 'POST',
          url: '/api_proxy/api/get_list_brand',
          data: formdata,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
              // 'Accept': 'application/json',
              // 'Content-Type': 'application/json'
            }
          }
        }).then(function (r) {
          console.log('berhasil getlistbrand', r)
          resolve(r)
        }).catch(function (e) {
          console.log('gagal getlistbrand', e)
          reject(e)
        })
      })
    },
    getVendorWaitingList: function (contex, data) {
      const that = this
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          //  url: '/datatable',
          url: '/api_proxy/api/vendor/getAllDataFilter',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
          // headers: {"token": token},
        }).then(function (r) {
          console.log('berhasil ', r)
          resolve(r)
        }).catch(function (e) {
          reject(e)
        })
      })
    },
    getLogoBrand: function (contex, data) {
      const that = this
      console.log('data ', data)

      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'GET',
          url: '/api_proxy/api/vendor/edit_vendor_get_pic',
          // data: {myid: data.item.id, tipe: data.tipe},
          //        data: formData,
          params: {
            myid: data.item.id,
            tipe: data.tipe
          },
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }

        }).then(function (r) {
          console.log('berhasil ', r)
          resolve(r)
        }).catch(function (e) {
          reject(e)
        })
      })
    },
    changeVendorStatus: function (context, data) {
      const that = this
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          url: '/api_proxy/api/vendor/change_status_vendor',
          // data: {myid: data.item.id, tipe: data.tipe},
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(function (r) {
          console.log('berhasil ', r)
          resolve(r)
        }).catch(function (e) {
          console.log('catch ', e)
          reject(e)
        })
      })
    },

    gantiPassword: function (context, data) {
      const that = this
      console.log('data ', data)
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          // url: '/process',
          url: '/api_proxy/api/gantipassword',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(function (r) {
          console.log('r', r)
          resolve(r)
        }).catch(function (e) {
          console.log('e', e)
          reject(e)
        })
      })
    },
    picMigration: function (context, data) {
      const that = this
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          url: '/api_proxy/api/list_files',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(function (r) {
          resolve(r)
        }).catch(function (e) {
          reject(e)
        })
      })
    },
    getListPengguna: function (ctx, data) {
      const that = this
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          url: '/api_proxy/api/get_list_pengguna_datatables',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(function (r) {
          resolve(r)
        }).catch(function (e) {
          reject(e)
        })
      })
    },
    tambahPengguna: function (ctx, data) {
      const that = this
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          url: '/api_proxy/api/tambah_pengguna',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        })
          .then(function (r) {
            resolve(r)
          })
          .catch(function (e) {
            reject(e)
          })
      })
    },
    editPengguna: function (ctx, data) {
      const that = this
      return new Promise((resolve, reject) => {
        that.$axios({
          method: 'post',
          url: '/api_proxy/api/sign_pengguna',
          data: data,
          config: {
            headers: {
              'Content-Type': 'multipart/form-data'
            }
          }
        }).then(function (r) {
          resolve(r)
        }).catch(function (e) {
          reject(e)
        })
      })
    }

  },

  // =================================================
  // Getters
  // =================================================

  getters: {
    isLoading(state) {
      return state.LoadingOverlay
    },
    isAuthenticated(state) {
      if (!state.token) return false
      const alive = AssertAlive.AssertAlive(jwtDecode(state.token))
      // return alive.code === 200
      return alive.code
    },
    Token(state) {
      return state.token || null
    },
    loggedUser(state) {
      if (!state.token) return null
      // return state.token
      return jwtDecode(state.token)
    }
  },
  // =================================================
  // Mutations
  // =================================================
  mutations: {
    SET_TOKEN(state, token) {
      state.token = token
    },
    CHANGE_LOADING(state, status) {
      state.LoadingOverlay = status
    }
  }
}
