import { Session } from '@/model/session.model'
import { Exercise, Workout } from '@/model/workout.model'
import moment from 'moment'
import { GetterTree } from 'vuex'
import { SessionsStateInterface } from '.'
import { StateInterface } from '../index'
import { v4 as uuid } from 'uuid'

const getters: GetterTree<SessionsStateInterface, StateInterface> = {
  sessions(state: SessionsStateInterface) {
    return state.sessions
      .map((session) => {
        return {
          ...session,
          date: moment(session.date),
        }
      })
      .sort((a, b) => a.date.diff(b.date))
  },
  last(state: SessionsStateInterface, getters) {
    const sessions = getters.sessions
    return sessions[sessions.length - 1]
  },
  nextWorkout(state: SessionsStateInterface, getters, rootState, rootGetters) {
    const lastSession: Session = getters.last
    const workouts: Array<Workout> = rootGetters['workouts/workouts']

    if (workouts.length == 0) {
      return null
    }

    const nextWOIndex = lastSession
      ? workouts.findIndex((wo) => wo.id === lastSession?.workoutId) + 1
      : 0

    const nextIndex = nextWOIndex % workouts.length
    return workouts[nextIndex]
  },
  next(state: SessionsStateInterface, getters, rootState, rootGetters) {
    const nextWorkout: Workout = getters.nextWorkout
    if (!nextWorkout) {
      console.log('no workouts')
      return null
    }

    const exercises: Array<Exercise> = rootGetters['exercises']

    const newSession = {
      id: uuid(),
      completed: false,
      workoutId: nextWorkout.id,
      workoutName: nextWorkout.name,
      exercises: nextWorkout.woExercises.map((ex) => {
        return {
          id: uuid(),
          exercise: ex,
          targetReps: ex.targetReps,
          targetSets: ex.targetSets,
          weight:
            exercises.find((exe) => exe.id === ex.exerciseId)?.targetWeight ||
            75,
        }
      }),
    } as Session
    return newSession
  },
}

export default getters
