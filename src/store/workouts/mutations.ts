import { Workout } from '@/model/workout.model'
import { MutationTree } from 'vuex'
import { WorkoutsStateInterface } from './state'

export type PutWorkoutRequest = {
  id: string
  workout: Workout
}

const mutation: MutationTree<WorkoutsStateInterface> = {
  addWorkout(state: WorkoutsStateInterface, payload: Workout) {
    state.workouts.push(payload)
  },
  updateWorkout(state: WorkoutsStateInterface, payload: PutWorkoutRequest) {
    // your code
    const index = state.workouts.findIndex(
      (workout) => workout.id === payload.id
    )
    if (index > -1) {
      state.workouts[index].name = payload.workout.name
      state.workouts[index].woExercises = payload.workout.woExercises
    }
  },
  removeWorkout(state: WorkoutsStateInterface, payload: string) {
    const index = state.workouts.findIndex((workout) => workout.id === payload)
    if (index > -1) {
      state.workouts.splice(index, 1)
    }
  },
}

export default mutation
