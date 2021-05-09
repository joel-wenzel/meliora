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
  date!: number
  sessionExerciseSets!: Array<SessionExerciseSet>
  weight!: number
  exerciseId!: string
  targetSets!: number
  targetReps!: number
  exercise!: Exercise

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      date: this.attr(moment().valueOf()),
      sessionId: this.attr(null),
      sessionExerciseSets: this.hasMany(
        SessionExerciseSet,
        'sessionExerciseId'
      ),
      weight: this.number(0),

      // this is essentiall a snapshot of the workout exercise at the time of the session
      // we dont just join to the workout exercise because that could change at some point which shouldnt change this session
      exerciseId: this.attr(null),
      targetSets: this.number(5),
      targetReps: this.number(5),
      exercise: this.hasOne(Exercise, 'id', 'exerciseId'),
    }
  }

  /**
   * Syncronizes session exercise sets with target sets if it has changed
   * @param model
   */
  static afterUpdate(model: SessionExercise) {
    const targetSets = model.targetSets
    const currentSets = SessionExerciseSet.query()
      .where('sessionExerciseId', model.id)
      .get()
    const diff = targetSets - currentSets.length

    if (diff > 0) {
      for (let i = 0; i < diff; i++) {
        SessionExerciseSet.createNew(model.id, currentSets.length + i)
      }
    } else if (diff < 0) {
      for (let i = currentSets.length - 1; i >= targetSets; i--) {
        currentSets[i].$delete()
      }
    }
  }

  static async createNew(
    sessionId: string,
    workoutExerciseId: string,
    targetWeight: number
  ): Promise<SessionExercise> {
    const workoutEx = WorkoutExercise.find(workoutExerciseId)

    const sessionEx = (
      await this.insert({
        data: {
          id: uuid(),
          sessionId,
          exerciseId: workoutEx?.exerciseId,
          targetSets: workoutEx?.targetSets,
          targetReps: workoutEx?.targetReps,
          weight: targetWeight,
        },
      })
    ).session_exercises[0] as SessionExercise

    if (workoutEx) {
      for (let i = 0; i < workoutEx?.targetSets; i++) {
        SessionExerciseSet.createNew(sessionEx.id, i)
      }
    }

    return sessionEx
  }

  static completeSessionExercise(sessionExerciseId: string) {
    const sExercise = SessionExercise.find(sessionExerciseId)

    Exercise.incrementTargetWeight(
      sExercise?.exerciseId as string,
      sExercise?.weight
    )
  }
}
export const sessionExerciseModule = {}
