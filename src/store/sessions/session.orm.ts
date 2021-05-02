import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import Workout from '../workouts/workout.orm'
import SessionExercise from './session-exercise.orm'

export default class Session extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'sessions'

  id!: string
  date!: string
  workoutId!: string
  workout!: Workout
  bodyWeight!: number
  completed!: boolean
  sessionExercises!: Array<SessionExercise>

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

    const workout = Workout.query()
      .with('workoutExercises.exercise')
      .find(workoutId)

    workout?.workoutExercises.forEach((woExercise) => {
      SessionExercise.createNew(
        sessionId,
        woExercise.id,
        woExercise.exercise.targetWeight
      )
    })

    return (
      await this.insert({
        data: {
          id: sessionId,
          workoutId,
          bodyWeight: this.store().state.app.settings.bodyWeight,
        },
      })
    ).sessions[0] as Session
  }

  static completeSession(sessionId, bodyWeight) {
    Session.update({
      where: sessionId,
      data: {
        completed: true,
        bodyWeight,
      },
    })
    this.store().dispatch('updateSettings', {
      bodyWeight,
    })
  }

  static deleteSession(sessionId) {
    // need to delete session, session exercises and session exercise sets
    const session = Session.query().withAllRecursive().find(sessionId)
    session?.sessionExercises.forEach((sEx) => {
      sEx.sessionExerciseSets.forEach((sExSet) => void sExSet.$delete())
      sEx.$delete()
    })

    session?.$delete()
  }
}
export const sessionModule = {}
