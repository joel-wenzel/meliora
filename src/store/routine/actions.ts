import { WorkoutDef } from './../../model/workout.model';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RoutineStateInterface } from './state';
import { v4 as uuid } from 'uuid';

const actions: ActionTree<RoutineStateInterface, StateInterface> = {
  addWorkoutDef (context, payload: Partial<WorkoutDef>) {
    // TODO api persist here. Either localstorage or firebase
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const localId = uuid()

    context.commit('addWorkoutDef', {
      id: localId,
      ...payload
    })

    // TODO if calling backend api be sure to replace the localid with backend id afterwards
    const workoutDefs = context.getters.workoutDefs
    localStorage.setItem('meliora.workoutDefs', JSON.stringify(workoutDefs))
  }
};

export default actions;
