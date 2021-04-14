import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { RoutineStateInterface } from './state';

const getters: GetterTree<RoutineStateInterface, StateInterface> = {
  workoutDefs (state: RoutineStateInterface) {
    return state.workoutDefs
  }
};

export default getters;
