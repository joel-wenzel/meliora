import { Workout } from 'src/model/workout.model'

export interface RoutineStateInterface {
  workouts: Array<Workout>;
}

function state(): RoutineStateInterface {
  return {
    workouts: JSON.parse(localStorage.getItem('meliora.workouts') || '[]')
  }
};

export default state;
