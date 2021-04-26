import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import { StateInterface } from '../index'

export type AppStateInterface = {
  dialog: {
    show: boolean
    comp: string | null
    data: any
  }
}

const defaultDialogState = Object.freeze({
  show: false,
  comp: null,
  data: null,
})

function state(): AppStateInterface {
  return {
    dialog: defaultDialogState,
  }
}

const getters: GetterTree<AppStateInterface, StateInterface> = {
  dialog(state: AppStateInterface) {
    return state.dialog
  },
}

const mutations: MutationTree<AppStateInterface> = {
  showDialog(
    state: AppStateInterface,
    { comp, data }: { comp: string; data?: any }
  ) {
    state.dialog = {
      show: true,
      comp,
      data,
    }
  },
  clearDialog(state: AppStateInterface) {
    state.dialog = defaultDialogState
  },
}

const actions: ActionTree<AppStateInterface, StateInterface> = {
  showDialog(context, payload: { comp: string; data?: any }) {
    context.commit('showDialog', payload)
  },
  dismissDialog(context) {
    context.commit('clearDialog')
  },
}

const appModule: Module<AppStateInterface, StateInterface> = {
  namespaced: false,
  getters,
  mutations,
  actions,
  state,
}

export default appModule
