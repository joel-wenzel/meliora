import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'
import SessionExercise from '../sessions/session-exercise.orm'

export default class Exercise extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'exercises'

  id!: string
  name!: string
  notes!: string
  startingWeight!: number
  targetWeight!: number
  increment!: number

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      notes: this.attr(''),
      startingWeight: this.number(75),
      targetWeight: this.number(75),
      increment: this.number(5),
    }
  }

  static deleteExercise(id: string): boolean {
    const sessionsExists = SessionExercise.query()
      .where('exerciseId', id)
      .exists()

    if (sessionsExists) {
      this.store().dispatch('showNotification', {
        message:
          'Cannot delete exercise. Sessions have already been logged with it.',
        duration: 5000,
      })
      return false
    } else {
      Exercise.delete(id)
      return true
    }
  }

  static async createFromName(name: string) {
    const existing = Exercise.query().where('name', name).all()
    if (existing[0]) {
      return existing[0]
    }

    const exercise = await this.createNew(name)

    this.store().dispatch('showDialog', {
      comp: 'MTargetWeightDialog',
      data: exercise.id,
    })
    // TODO dispatch dialog event to get target weight
    return exercise
  }

  static async createNew(name = 'My Exercise'): Promise<Exercise> {
    return (
      await Exercise.insert({
        data: {
          id: uuid(),
          name,
        },
      })
    ).exercises[0] as Exercise
  }

  static incrementTargetWeight(exerciseId: string) {
    const exercise = Exercise.find(exerciseId) as Exercise

    exercise.$update({
      targetWeight: exercise.targetWeight + (exercise.increment || 5),
    })
  }

  static resetAllTargetWeights() {
    Exercise.all().forEach(
      (ex) => void ex.$update({ targetWeight: ex.startingWeight })
    )
  }
}
export const exerciseModule = {}
