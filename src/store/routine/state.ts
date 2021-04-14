import { WorkoutDef } from 'src/model/workout.model'

export interface RoutineStateInterface {
  workoutDefs: Array<WorkoutDef>;
}

function state(): RoutineStateInterface {
  return {
    workoutDefs: JSON.parse(localStorage.getItem('meliora.workoutDefs') || '[]')
  }
};

export default state;
