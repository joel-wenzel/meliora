import { Module } from 'vuex'
import { StateInterface } from '../index'
import state, { WorkoutsStateInterface } from './state'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

const routineModule: Module<WorkoutsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default routineModule
