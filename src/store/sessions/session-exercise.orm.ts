import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'
import moment from 'moment'
import WorkoutExercise from '../workouts/workout-exercises.orm'
import SessionExerciseSet from './session-exercise-set.orm'
import Exercise from '../exercises/exercise.orm'

export default class SessionExercise extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'session_exercises'

  id!: string
  workoutExerciseId!: string
  workoutExercise!: WorkoutExercise
  sessionExerciseSets!: Array<SessionExerciseSet>
  weight!: number

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      date: this.attr(moment().valueOf()),
      sessionId: this.attr(null),
      workoutExerciseId: this.attr(null),
      workoutExercise: this.hasOne(WorkoutExercise, 'id', 'workoutExerciseId'),
      sessionExerciseSets: this.hasMany(
        SessionExerciseSet,
        'sessionExerciseId'
      ),
      weight: this.number(0),
    }
  }

  static async createNew(
    sessionId: string,
    workoutExerciseId: string,
    targetWeight: number
  ): Promise<SessionExercise> {
    const sessionEx = (
      await this.insert({
        data: {
          id: uuid(),
          sessionId,
          workoutExerciseId,
          weight: targetWeight,
        },
      })
    ).session_exercises[0] as SessionExercise

    const workoutEx = WorkoutExercise.find(workoutExerciseId)
    if (workoutEx) {
      for (let i = 0; i < workoutEx?.targetSets; i++) {
        SessionExerciseSet.createNew(sessionEx.id, i)
      }
    }

    return sessionEx
  }

  static completeSessionExercise(sessionExerciseId: string) {
    const sExercise = SessionExercise.query()
      .with('workoutExercise')
      .find(sessionExerciseId)

    Exercise.incrementTargetWeight(
      sExercise?.workoutExercise.exerciseId as string
    )
  }
}
export const sessionExerciseModule = {}
