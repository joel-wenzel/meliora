import { Model } from '@vuex-orm/core'
import { v4 as uuid } from 'uuid'

export default class SessionExerciseSet extends Model {
  // This is the name used as module name of the Vuex Store.
  static entity = 'session_exercise_sets'

  id!: string
  sessionExerciseId!: string
  index!: number
  reps!: number
  started!: boolean

  // TODO allow weight specification on sess exercise set
  // Idea is lowering weight if you are fatigued
  // weight: number

  // List of all fields (schema) of the post model. `this.attr` is used
  // for the generic field type. The argument is the default value.
  static fields() {
    return {
      id: this.attr(null),
      sessionExerciseId: this.attr(null),
      index: this.number(-1),
      reps: this.number(0),
      started: this.boolean(false),
    }
  }

  static async createNew(
    sessionExerciseId: string,
    index: number
  ): Promise<SessionExerciseSet> {
    return (
      await this.insert({
        data: {
          id: uuid(),
          index,
          sessionExerciseId,
        },
      })
    ).session_exercise_sets[0] as SessionExerciseSet
  }
}
export const sessionExerciseSetModule = {}
