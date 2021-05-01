import { Module, GetterTree, ActionTree, MutationTree } from 'vuex'
import Exercise from '../exercises/exercise.orm'
import { StateInterface } from '../index'
import SessionExerciseSet from '../sessions/session-exercise-set.orm'
import SessionExercise from '../sessions/session-exercise.orm'
import Session from '../sessions/session.orm'
import WorkoutExercise from '../workouts/workout-exercises.orm'
import Workout from '../workouts/workout.orm'

export type AppStateInterface = {
  dialog: {
    show: boolean
    comp: string | null
    data: any
  }
  settings: {
    dateFormat: string
    uom: 'lbs' | 'kg'
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
    settings: {
      dateFormat: 'MMMM Do YYYY, h:mm:ss a',
      uom: 'lbs',
    },
  }
}

const getters: GetterTree<AppStateInterface, StateInterface> = {
  dialog(state: AppStateInterface) {
    return state.dialog
  },
  dateFormat(state: AppStateInterface) {
    return state.settings.dateFormat
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
  resetData(context, payload: 'all' | 'session') {
    if (payload === 'all' || payload === 'session') {
      SessionExerciseSet.deleteAll()
      SessionExercise.deleteAll()
      Session.deleteAll()
    }

    if (payload === 'all') {
      WorkoutExercise.deleteAll()
      Workout.deleteAll()
      Exercise.deleteAll()
    }
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
