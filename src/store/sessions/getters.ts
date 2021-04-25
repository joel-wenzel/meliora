import { SessionDisplay } from './../../model/session.model'
import { Session } from '@/model/session.model'
import { Exercise, Workout } from '@/model/workout.model'
import moment from 'moment'
import { GetterTree } from 'vuex'
import { SessionsStateInterface } from '.'
import { StateInterface } from '../index'

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
  lastCompleted(state: SessionsStateInterface, getters) {
    const sessions = getters.sessions as Array<Session>
    const last = sessions.reverse().find((sess) => sess.completed)
    return last
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
  nextPreview(state: SessionsStateInterface, getters, rootState, rootGetters) {
    const sessions = getters.sessions as Array<Session>
    const last = sessions[sessions.length]
    if (last && !last.completed) {
      return last
    }

    const nextWorkout: Workout = getters.nextWorkout
    if (!nextWorkout) {
      return null
    }

    const exercises: Array<Exercise> = rootGetters['exercises']

    const newSession = {
      title: 'Next',
      workoutId: nextWorkout.id,
      workoutName: nextWorkout.name,
      sessionExercises: nextWorkout.woExercises.map((ex) => {
        return {
          exerciseName: ex.name,
          reps: ex.targetReps,
          sets: ex.targetSets,
          weight:
            exercises.find((exe) => exe.id === ex.exerciseId)?.targetWeight ||
            75,
        }
      }),
    } as SessionDisplay
    return newSession
  },
}

export default getters
