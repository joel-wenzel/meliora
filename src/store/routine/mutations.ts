import { WorkoutDef } from '@/model/workout.model';
import { MutationTree } from 'vuex';
import { RoutineStateInterface } from './state';

export type PutWorkoutDefRequest = {
  defId: string,
  def: WorkoutDef
}

const mutation: MutationTree<RoutineStateInterface> = {
  addWorkoutDef (state: RoutineStateInterface, payload: WorkoutDef) {
    state.workoutDefs.push(payload)
  },
  updateWorkoutDef (state: RoutineStateInterface, payload: PutWorkoutDefRequest) {
    // your code
    let def = state.workoutDefs.find(def => def.id === payload.defId)
    if(def) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      def = {
        ...payload.def
      }
    }
  }
};

export default mutation;
