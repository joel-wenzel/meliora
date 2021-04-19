import { GetterTree } from 'vuex';
import { StateInterface } from '../index';
import { WorkoutsStateInterface } from './state';

const getters: GetterTree<WorkoutsStateInterface, StateInterface> = {
  workouts (state: WorkoutsStateInterface, {}, root) {

    return state.workouts.map(workout => {
      return {
        ...workout,
        exercises: workout.exercises.map(exercise => {
          return {
            ...exercise,
            name: root.exercises.find(ex => ex.id === exercise.id)?.name
          }
        })
      }
    })
  }
};

export default getters;
