import { GetterTree } from 'vuex'
import { StateInterface } from '../index'
import { WorkoutsStateInterface } from './state'

const getters: GetterTree<WorkoutsStateInterface, StateInterface> = {
  workouts(state: WorkoutsStateInterface, {}, root) {
    return state.workouts.map((workout) => {
      return {
        ...workout,
        woExercises: workout.woExercises.map((exercise) => {
          return {
            ...exercise,
            name: root.exercises.find((ex) => ex.id === exercise.exerciseId)
              ?.name,
          }
        }),
      }
    })
  },
  workout: (state: WorkoutsStateInterface) => (id) => {
    return state.workouts.find((wo) => wo.id === id)
  },
}

export default getters
