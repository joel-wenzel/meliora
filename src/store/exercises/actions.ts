import { Exercise } from './../../model/workout.model'
import { ActionTree } from 'vuex'
import { StateInterface } from '../index'
import { v4 as uuid } from 'uuid'
import { ExercisesStateInterface } from '.'

const actions: ActionTree<ExercisesStateInterface, StateInterface> = {
  addExercise(context, payload: Partial<Exercise>) {
    // TODO api persist here. Either localstorage or firebase
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const localId = uuid()

    const newEx = {
      id: localId,
      ...payload,
    }
    context.commit('addExercise', newEx)

    // TODO if calling backend api be sure to replace the localid with backend id afterwards
    updateStorage(context)

    return newEx
  },
  patchExercise(context, payload: Partial<Exercise>) {
    context.commit('patchExercise', payload)
    updateStorage(context)
  },
}

function updateStorage(context) {
  const exercises = context.getters.exercises
  localStorage.setItem('meliora.exercises', JSON.stringify(exercises))
}

export default actions
