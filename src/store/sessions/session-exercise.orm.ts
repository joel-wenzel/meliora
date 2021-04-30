import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import WorkoutExercise from '../workouts/workout-exercises.orm'

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
      date: this.attr(moment().valueOf()),
      sessionId: this.attr(null),
      workoutExerciseId: this.attr(null),
      workoutExercise: this.hasOne(WorkoutExercise, 'id', 'workoutExerciseId'),
      reps: this.number(0),
      sets: this.number(0),
      weight: this.number(0),
    }
  }

  static async createNew(
    sessionId: string,
    workoutExerciseId: string
  ): Promise<SessionExercise> {
    return (
      await this.insert({
        data: {
          id: uuid(),
          sessionId,
          workoutExerciseId,
        },
      })
    ).session_exercises[0] as SessionExercise
  }
}
export const sessionExerciseModule = {}
