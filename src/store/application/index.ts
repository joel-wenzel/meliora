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
  settings: AppSettings
}

export type AppSettings = {
  dateFormat: string
  uom: 'lbs' | 'kg'
  bodyWeight: number
  darkMode: boolean
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
      dateFormat: 'MMMM D YYYY, h:mm A',
      uom: 'lbs',
      bodyWeight: 150,
      darkMode: false,
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
  settings(state: AppStateInterface) {
    return state.settings
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
  setSettings(state: AppStateInterface, payload: AppSettings) {
    state.settings = {
      ...state.settings,
      ...payload,
    }
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

      Exercise.resetAllTargetWeights()
    }

    if (payload === 'all') {
      WorkoutExercise.deleteAll()
      Workout.deleteAll()
      Exercise.deleteAll()
    }
  },
  updateSettings(context, payload: AppSettings) {
    context.commit('setSettings', payload)
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
