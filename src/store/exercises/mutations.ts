import { Exercise } from './../../model/workout.model';
import { ExercisesStateInterface } from './index';
import { MutationTree } from 'vuex';

const mutation: MutationTree<ExercisesStateInterface> = {
  addExercise (state: ExercisesStateInterface, payload: Exercise) {
    state.push(payload)
  },
};

export default mutation;
