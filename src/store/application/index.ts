import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import { StateInterface } from '../index'

export type AppStateInterface = {
  showDialog: boolean
  dialogComp: any
}

function state(): AppStateInterface {
  return {
    showDialog: false,
    dialogComp: null,
  }
}

const getters: GetterTree<AppStateInterface, StateInterface> = {
  dialog(state: AppStateInterface) {
    return state.showDialog ? state.dialogComp : null
  },
}

const mutations: MutationTree<AppStateInterface> = {
  showDialog(state: AppStateInterface, payload: any) {
    state.showDialog = true
    state.dialogComp = payload
  },
  clearDialog(state: AppStateInterface) {
    state.dialogComp = null
    state.showDialog = false
  },
}

const actions: ActionTree<AppStateInterface, StateInterface> = {
  showDialog(context, payload: any) {
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
