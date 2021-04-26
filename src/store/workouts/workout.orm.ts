import { Model } from '@vuex-orm/core'
import WorkoutExercise from './workout-exercises.orm'
import { v4 as uuid } from 'uuid'

export default class Workout extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'workouts'

  id
  name
  workoutExercises: Array<WorkoutExercise> = []

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      isPending: this.attr(true),
      workoutExercises: this.hasMany(WorkoutExercise, 'workoutId'),
    }
  }

  static async createNew(): Promise<Workout> {
    return (
      await this.insert({
        data: {
          id: uuid(),
          name: `Workout ${Workout.all().length + 1}`,
        },
      })
    ).workouts[0] as Workout
  }

  static deleteRecursive(workoutId) {
    const workout = Workout.query().with('workoutExercises').find(workoutId)
    workout?.workoutExercises.forEach((wEx) => {
      wEx.$delete()
    })
    workout?.$delete()
  }
}

export const workoutModule = {
  actions: {
    fetch() {
      const workouts = JSON.parse(
        localStorage.getItem('meliora.workouts') || '[]'
      )

      void Workout.create({ data: workouts })
    },
  },
}
