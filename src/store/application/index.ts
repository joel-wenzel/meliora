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
  notification: {
    show: boolean
    message: string | null
    dismissable: boolean
    contentClass: string | null
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

const defaultNotificationState = Object.freeze({
  show: false,
  message: null,
  dismissable: false,
  contentClass: null,
})

function state(): AppStateInterface {
  return {
    dialog: defaultDialogState,
    notification: defaultNotificationState,
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
  notification(state: AppStateInterface) {
    return state.notification
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
  showNotification(
    state: AppStateInterface,
    {
      message,
      dismissable,
      contentClass,
    }: { message: string; dismissable: boolean; contentClass: string }
  ) {
    state.notification = {
      show: true,
      message,
      dismissable,
      contentClass,
    }
  },
  clearDialog(state: AppStateInterface) {
    state.dialog = defaultDialogState
  },
  clearNotification(state: AppStateInterface) {
    state.notification = defaultNotificationState
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
  showNotification(context, payload: { payload: any; duration?: number }) {
    context.commit('showNotification', payload.payload)
    const duration = payload.duration || 3000
    setTimeout(() => {
      context.commit('clearNotification')
    }, duration)
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
