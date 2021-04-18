import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { RoutineStateInterface } from './state';

const getters: GetterTree<RoutineStateInterface, StateInterface> = {
  workouts (state: RoutineStateInterface, {}, root) {
    return state.workouts.map(def => {
      return {
        ...def,
        workout: def.workout.map(workout => {
          return {
            ...workout,
            name: root.exercises.find(ex => ex.id === workout.id)?.name
          }
        })
      }
    })
  }
};

export default getters;
