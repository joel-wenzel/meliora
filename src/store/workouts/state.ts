import { Workout } from 'src/model/workout.model'

export interface WorkoutsStateInterface {
  workouts: Array<Workout>;
}

function state(): WorkoutsStateInterface {
  return {
    workouts: JSON.parse(localStorage.getItem('meliora.workouts') || '[]')
  }
};

export default state;
