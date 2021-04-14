import { WorkoutDef } from './../../model/workout.model';
import { ActionTree } from 'vuex';
import { StateInterface } from '../index';
import { RoutineStateInterface } from './state';

const actions: ActionTree<RoutineStateInterface, StateInterface> = {
  addWorkoutDef (context, payload: WorkoutDef) {
    //TODO api persist here. Either localstorage or firebase
    context.commit('addWorkoutDef', payload)

    const workoutDefs = context.getters.workoutDefs
    localStorage.setItem('meliora.workoutDefs', JSON.stringify(workoutDefs))
  }
};

export default actions;
