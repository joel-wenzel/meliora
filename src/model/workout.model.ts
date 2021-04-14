import moment from 'moment'

export type Routine = {
  workoutDefs: Array<WorkoutDef>
}

export type WorkoutDef = {
  id: string
  name: string
  workout: Array<ExerciseDef>
}

export type ExerciseDef = {
  id: string
  name: string
  targetReps: number
  targetSets: number
}

export type WorkoutInstance = {
  id: string
  date: moment.Moment
  workoutDefId: string
  exercises: Array<ExerciseInstance>
  bodyWeight: number
}

export type ExerciseInstance = {
  id: string
  exerciseDefId: string
  reps: number
  sets: number
  weight: number
}