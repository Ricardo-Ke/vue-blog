export const login = {
  state: {
    hasLogined: false
  },
  getters: {
    getLoginState: state => state.hasLogined
  },
  mutations: {
    changeLoginState (state, nextState) {
      state.hasLogined = nextState
    }
  }
}
