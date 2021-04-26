export interface Workout {
  id: string
  name: string
  workoutExercises: Array<WorkoutExercise>
}

export type WorkoutExercise = {
  id: string
  exerciseId: string
  targetReps: number
  targetSets: number
}
