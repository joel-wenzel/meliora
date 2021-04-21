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
  exercises: Array<WorkoutExercise>
}

export type WorkoutExercise = Exercise & {
  exerciseId: string
  targetReps: number
  targetSets: number
}
