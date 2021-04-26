import { Model } from '@vuex-orm/core'
import Exercise from '../exercises/exercise.orm'
import { v4 as uuid } from 'uuid'

export default class WorkoutExercise extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'workout_exercises'

  workoutId
  exerciseId
  targetSets
  targetReps
  exercise

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      workoutId: this.attr(null),
      exerciseId: this.attr(null),
      targetSets: this.number(5),
      targetReps: this.number(5),
      exercise: this.hasOne(Exercise, 'exerciseId', 'id'),
    }
  }

  static async createNew(workoutId: string): Promise<WorkoutExercise> {
    return (
      await this.insert({
        data: {
          id: uuid(),
          workoutId,
        },
      })
    ).workout_exercises[0] as WorkoutExercise
  }
}

export const workoutExercisesModule = {
  actions: {
    fetch() {
      const workoutExercises = JSON.parse(
        localStorage.getItem('meliora.workout_exercises') || '[]'
      )

      void WorkoutExercise.create({ data: workoutExercises })
    },
  },
}