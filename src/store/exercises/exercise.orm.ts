import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'

export default class Exercise extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'exercises'

  id
  name
  targetWeight

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      name: this.attr(''),
      targetWeight: this.number(75),
    }
  }

  static async createNew(name: string) {
    const existing = Exercise.query().where('name', name).all()
    if (existing[0]) {
      console.log('exercise exists')
      return existing[0]
    }

    const exercise = (
      await Exercise.insert({
        data: {
          id: uuid(),
          name,
        },
      })
    ).exercises[0] as Exercise

    this.store().dispatch('showDialog', {
      comp: 'MTargetWeightDialog',
      data: exercise.id,
    })
    // TODO dispatch dialog event to get target weight
    return exercise
  }
}
export const exerciseModule = {
  actions: {
    fetch() {
      const exercises = JSON.parse(
        localStorage.getItem('meliora.exercises') || '[]'
      )

      void Exercise.create({ data: exercises })
    },
  },
}
