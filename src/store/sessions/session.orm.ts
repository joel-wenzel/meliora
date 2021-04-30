import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import Workout from '../workouts/workout.orm'
import SessionExercise from './session-exercise.orm'

export default class Session extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'sessions'

  id
  date
  workoutId
  workout!: Workout
  bodyWeight
  completed

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      date: this.attr(moment().valueOf()),
      workoutId: this.attr(null),
      workout: this.hasOne(Workout, 'id', 'workoutId'),
      bodyWeight: this.number(0),
      completed: this.boolean(false),
      sessionExercises: this.hasMany(SessionExercise, 'sessionId'),
    }
  }

  static async createNew(workoutId: string): Promise<Session> {
    const sessionId = uuid()

    const workout = Workout.query().with('workoutExercises').find(workoutId)

    workout?.workoutExercises.forEach((woExercise) => {
      SessionExercise.createNew(sessionId, woExercise.id)
    })

    return (
      await this.insert({
        data: {
          id: sessionId,
          workoutId,
        },
      })
    ).sessions[0] as Session
  }
}
export const sessionModule = {}
