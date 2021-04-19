import { WorkoutsStateInterface as WorkoutsStateInterface } from './workouts/state'
import workoutsModule from './workouts'
import { store } from 'quasar/wrappers'
import Vuex from 'vuex'
import exercisesModule, { ExercisesStateInterface } from './exercises'

/*
 * If not building with SSR mode, you can
 * directly export the Store instantiation
 */

export interface StateInterface {
  // Define your own store structure, using submodules if needed
  // example: ExampleStateInterface;
  // Declared as unknown to avoid linting issue. Best to strongly type as per the line above.
  workouts: WorkoutsStateInterface
  exercises: ExercisesStateInterface
}

export default store(function ({ Vue }) {
  Vue.use(Vuex)

  const Store = new Vuex.Store<StateInterface>({
    modules: {
      workouts: workoutsModule,
      exercises: exercisesModule,
    },
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
