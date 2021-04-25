export type Exercise = {
  id: string
  name: string
  targetWeight?: number
}

export type Routine = {
  workoutDefs: Array<Workout>
}

export type Workout = {
  id: string
  name: string
  woExercises: Array<WorkoutExercise>
}

export type WorkoutExercise = Exercise & {
  exerciseId: string
  targetReps: number
  targetSets: number
}
