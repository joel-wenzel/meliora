import { Model } from '@vuex-orm/core'
import Exercise from '../exercises/exercise.orm'
import { v4 as uuid } from 'uuid'
import moment from 'moment'

export default class WorkoutExercise extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'workout_exercises'

  id!: string
  workoutId!: string

  exerciseId!: string
  targetSets!: number
  targetReps!: number
  exercise!: Exercise

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      workoutId: this.attr(null),
      created: this.attr(moment().valueOf()),
      exerciseId: this.attr(null),
      targetSets: this.number(5),
      targetReps: this.number(5),
      exercise: this.hasOne(Exercise, 'id', 'exerciseId'),
    }
  }

  static async createNew(workoutId: string): Promise<WorkoutExercise> {
    const lastEx = WorkoutExercise.query()
      .where('workoutId', workoutId)
      .orderBy('created', 'desc')
      .limit(1)
      .get()[0]

    return (
      await this.insert({
        data: {
          id: uuid(),
          workoutId,
          exerciseId: lastEx?.exerciseId || null,
          targetReps: lastEx?.targetReps || 5,
          targetSets: lastEx?.targetSets || 5,
        },
      })
    ).workout_exercises[0] as WorkoutExercise
  }
}

export const workoutExercisesModule = {}
