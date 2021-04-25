import { Exercise } from './workout.model'
import moment from 'moment'

export type DisplaySession = {
  /**
   * Transient for UI Display
   */
  title: string
} & Session

export type SessionInput = {
  workoutId: string
  workoutName: string
  exercises: Array<SessionExercise>
  bodyWeight?: number
  completed?: boolean
}

export type Session = {
  id: string
  date?: moment.Moment
} & SessionInput

export type SessionExercise = {
  id: string
  exercise: Exercise
  targetReps: number
  targetSets: number
  reps?: number
  sets?: number
  weight: number
}
