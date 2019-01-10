const table = {
  state: {
    checkedItem1: '',
    checkedItem2: '',
    checkedItem3: '',
    radio1: '',
    radio2: '',
    switchs: []
  },
  mutations: {
    SET_CI1: (state, checkedItem1) => {
      state.checkedItem1 = checkedItem1
    },
    SET_CI2: (state, checkedItem2) => {
      state.checkedItem2 = checkedItem2
    },
    SET_CI3: (state, checkedItem3) => {
      state.checkedItem3 = checkedItem3
    },
    SET_RD1: (state, radio1) => {
      state.radio1 = radio1
    },
    SET_RD2: (state, radio2) => {
      state.radio2 = radio2
    },
    SET_SWS: (state, switchs) => {
      state.switchs = switchs
    }
  },
  actions: {
    S_SetCI1({
      commit
    }, attr1) {
      commit('SET_CI1', attr1)
    },
    S_SetCI2({
      commit
    }, attr2) {
      commit('SET_CI2', attr2)
    },
    S_SetCI3({
      commit
    }, attr3) {
      commit('SET_CI3', attr3)
    },
    S_SetRD1({
      commit
    }, attr1) {
      commit('SET_RD1', attr1)
    },
    S_SetRD2({
      commit
    }, attr2) {
      commit('SET_RD2', attr2)
    },
    S_SetSWS({
      commit
    }, attr) {
      commit('SET_SWS', attr)
    }
  }

}
export default table
