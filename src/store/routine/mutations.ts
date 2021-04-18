import { Workout } from '@/model/workout.model';
import { MutationTree } from 'vuex';
import { RoutineStateInterface } from './state';

export type PutWorkoutRequest = {
  id: string,
  workout: Workout
}

const mutation: MutationTree<RoutineStateInterface> = {
  addWorkout (state: RoutineStateInterface, payload: Workout) {
    state.workouts.push(payload)
  },
  updateWorkout (state: RoutineStateInterface, payload: PutWorkoutRequest) {
    // your code
    let workout = state.workouts.find(def => def.id === payload.id)
    if(workout) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      workout = {
        ...payload.workout
      }
    }
  }
};

export default mutation;
