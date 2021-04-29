import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import Workout from '../workouts/workout.orm'
import Exercise from '../exercises/exercise.orm'

export default class SessionExercise extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'session_exercises'

  id
  exerciseId
  exercise
  reps
  sets
  weight

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      sessionId: this.attr(null),
      exerciseId: this.attr(null),
      exercise: this.hasOne(Exercise, 'id', 'exerciseId'),
      reps: this.number(0),
      sets: this.number(0),
      weight: this.number(0),
    }
  }
}
export const sessionExerciseModule = {}
