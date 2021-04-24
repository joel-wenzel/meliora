import { Session } from './../../model/session.model'
import { StateInterface } from '@/store'
import { Store } from 'vuex'
import { v4 as uuid } from 'uuid'
import { computed } from '@vue/composition-api'
import { Exercise, Workout } from '@/model/workout.model'
export default function useSessionManager(
  store: Store<StateInterface>,
  next = 2
) {
  const nextSessions = computed(() => {
    const lastSession: Session = store.getters['sessions/last']

    const workouts: Array<Workout> = store.getters['workouts/workouts']
    const exercises: Array<Exercise> = store.getters['exercises']
    const lastWOIndex = workouts.findIndex(
      (wo) => wo.id === lastSession?.workoutId
    )

    let current = 1
    const sessions: Array<Partial<Session>> = []
    while (current <= next) {
      const nextIndex = (lastWOIndex + current) % workouts.length

      const nextWorkout = workouts[nextIndex]

      sessions.push({
        title: `next - ${nextWorkout.name}`,
        completed: false,
        workoutId: nextWorkout.id,
        workoutName: nextWorkout.name,
        exercises: nextWorkout.exercises.map((ex) => {
          return {
            exercise: ex,
            id: uuid(),
            reps: ex.targetReps,
            sets: ex.targetSets,
            // TODO how to keep track of the weight?
            weight:
              (exercises.find((exe) => exe.id === ex.exerciseId)
                ?.lastWeightLifted || 75) + 5,
          }
        }),
      })
      current++
    }

    return sessions
  })

  return { nextSessions }
}
