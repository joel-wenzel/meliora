import { Exercise } from './../../model/workout.model'
import { Module } from 'vuex'
import { StateInterface } from '../index'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export type ExercisesStateInterface = Array<Exercise>

export function state(): ExercisesStateInterface {
  return JSON.parse(localStorage.getItem('meliora.exercises') || '[]')
}

const exercisesModule: Module<ExercisesStateInterface, StateInterface> = {
  namespaced: false,
  actions,
  getters,
  mutations,
  state,
}

export default exercisesModule
