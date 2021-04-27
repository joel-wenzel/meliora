import { AppStateInterface } from './application/index'
import { SessionsStateInterface } from './sessions/index'

import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import VuexORM from '@vuex-orm/core'

import Exercise, { exerciseModule } from './exercises/exercise.orm'
import WorkoutExercise, {
  workoutExercisesModule,
} from './workouts/workout-exercises.orm'
import Workout, { workoutModule } from './workouts/workout.orm'
import appModule from './application'
import VuexPersistence from 'vuex-persist'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.

  sessions: any
  app: AppStateInterface
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const database = new VuexORM.Database()

  database.register(Exercise, exerciseModule)
  database.register(WorkoutExercise, workoutExercisesModule)
  database.register(Workout, workoutModule)

  const vuexLocal = new VuexPersistence<StateInterface>({
    storage: window.localStorage,
    key: 'meliora.state',
  })

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      app: appModule,
    },
    plugins: [VuexORM.install(database), vuexLocal.plugin],
    actions: {
      clearData() {
        localStorage.clear()
      },
    },

    // enable strict mode (adds overhead!)
    // for dev mode only
    strict: !!process.env.DEBUGGING,
  })

  return Store
})
