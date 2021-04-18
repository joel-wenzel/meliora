import { Workout } from './../../model/workout.model';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RoutineStateInterface } from './state';
import { v4 as uuid } from 'uuid';

const actions: ActionTree<RoutineStateInterface, StateInterface> = {
  addWorkout (context, payload: Partial<Workout>) {
    // TODO api persist here. Either localstorage or firebase
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const localId = uuid()

    context.commit('addWorkout', {
      id: localId,
      ...payload
    })
    
    // TODO if calling backend api be sure to replace the localid with backend id afterwards
    const workouts = context.getters.workouts
    localStorage.setItem('meliora.workouts', JSON.stringify(workouts))
  }
};

export default actions;
