import { Workout } from '../../model/workout.model'
import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { WorkoutsStateInterface } from './state'
import { v4 as uuid } from 'uuid'

const actions: ActionTree<WorkoutsStateInterface, StateInterface> = {
  addWorkout(context, payload: Partial<Workout>) {
    // TODO api persist here. Either localstorage or firebase
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const localId = uuid()

    payload.woExercises?.forEach((ex) => {
      if (!ex.id) {
        ex.id = uuid()
      }
    })

    context.commit('addWorkout', {
      id: localId,
      ...payload,
    })

    updateStorage(context)
  },
  updateWorkout(context, payload: Workout) {
    context.commit('updateWorkout', {
      id: payload.id,
      workout: payload,
    })
    updateStorage(context)
  },
  deleteWorkout(context, payload: string) {
    context.commit('removeWorkout', payload)
    updateStorage(context)
  },
}

function updateStorage(
  context: ActionContext<WorkoutsStateInterface, StateInterface>
) {
  // TODO if calling backend api be sure to replace the localid with backend id afterwards

  const workouts = context.getters.workouts
  localStorage.setItem('meliora.workouts', JSON.stringify(workouts))
}

export default actions
