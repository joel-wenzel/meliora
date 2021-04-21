import { Exercise } from './workout.model'
import moment from 'moment'

export type Session = {
  id: string
  date: moment.Moment
  workoutId: string
  workoutName: string
  exercises: Array<SessionExercise>
  bodyWeight: number
  completed?: boolean
}

export type SessionExercise = {
  id: string
  exercise: Exercise
  reps: number
  sets: number
  weight: number
}
