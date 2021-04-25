import { Exercise } from './../../model/workout.model'
import { ExercisesStateInterface } from './index'
import { MutationTree } from 'vuex'

const mutation: MutationTree<ExercisesStateInterface> = {
  addExercise(state: ExercisesStateInterface, payload: Exercise) {
    state.push(payload)
  },
  patchExercise(state: ExercisesStateInterface, payload: Partial<Exercise>) {
    const index = state.findIndex((ex) => ex.id === payload.id)
    if (index > -1) {
      const existing = state[index]
      state[index].targetWeight = payload.targetWeight || existing.targetWeight
      state[index].name = payload.name || existing.name
    }
  },
}

export default mutation
