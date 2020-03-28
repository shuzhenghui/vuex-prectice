import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    list: []
  },
  mutations: {
    initList(state, opt) {
      state.list = opt
    },
    // saveValue(state, value) {
    // state.inputValue = value
    // },
    addItemToList(state, val) {
      state.list.push({
        id: state.list.length,
        info: val,
        done: false
      })
    },
    deleteItemFromList(state, val) {
      const idx = state.list.findIndex(x => x.id === val)
      state.list.splice(idx, 1)
    },
    changeCheckItem(state, val) {
      const idx = state.list.findIndex(x => x.id === val)
      state.list[idx].done = !state.list[idx].done
    }
  },
  actions: {
    getDataList({
      commit
    }) {
      axios.get('./list.json').then((res) => {
        // actions内只能通过调用mutations内的方法来给state中的变量赋值
        commit('initList', res.data)
      })
    }
  },
  modules: {},
  getters: {
    restUnDone(state) {
      return state.list.filter(x => x.done === false).length
    }
  }
})
