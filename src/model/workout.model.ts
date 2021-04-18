import moment from 'moment'

export type Exercise = {
  id: string
  name: string
}

export type Routine = {
  workoutDefs: Array<Workout>
}

export type Workout = {
  id: string
  name: string
  workout: Array<WorkoutExercise>
}

export type WorkoutExercise = Exercise & {
  targetReps: number
  targetSets: number
}

export type Session = {
  id: string
  date: moment.Moment
  workoutId: string
  exercises: Array<SessionExercise>
  bodyWeight: number
}

export type SessionExercise = {
  id: string
  exerciseId: string
  reps: number
  sets: number
  weight: number
}