import api from '@/utils/api'

export default {
  state: {
    isLogin: false,
    profile: {},
    sheets: []
  },
  mutations: {
    SET_LOGIN: (state, user) => {
      state.isLogin = true
      state.profile = user
    },
    SET_NULL: (state) => {
      state.isLogin = false
      state.profile = {}
    },
    SET_SHEETS: (state, sheets) => {
      state.sheets = sheets
    }
  },
  actions: {
    async loginSuccess({
      commit,
      state,
      dispatch
    }) {
      let res = await api.checkLogin()
      let {
        code,
        data,
        msg
      } = res
      if (code === 200) {
        commit('SET_LOGIN', data.account)
        dispatch('getMySheet')
      } else {
        commit('SET_NULL')
      }
    },
    async getMySheet({
      commit,
      state
    }) {
      let res = await api.accountSheet({
        cid: state.profile.cid
      })
      let {
        code,
        data
      } = res
      if (code === 200) {
        commit('SET_SHEETS', data.sheets)
      }
    }
  }
}