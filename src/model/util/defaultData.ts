import moment from 'moment'
import { v4 as uuid } from 'uuid'
import Exercise from 'src/store/exercises/exercise.orm'
import SessionExercise from 'src/store/sessions/session-exercise.orm'
import Session from 'src/store/sessions/session.orm'
import WorkoutExercise from 'src/store/workouts/workout-exercises.orm'
import Workout from 'src/store/workouts/workout.orm'
import SessionExerciseSet from 'src/store/sessions/session-exercise-set.orm'

// resets all data and uploads a static set of data with 50 sessions
export default function defaultData() {
  this.store.dispatch('resetData', 'all')

  Exercise.insert({
    data: [
      {
        id: '1',
        name: 'Squat',
        startingWeight: 135,
        targetWeight: 135,
        increment: 5,
      },
      {
        id: '2',
        name: 'Bench Press',
        startingWeight: 115,
        targetWeight: 115,
        increment: 5,
      },
      {
        id: '3',
        name: 'Barbell Row',
        startingWeight: 115,
        targetWeight: 115,
        increment: 5,
      },
      {
        id: '4',
        name: 'Overhead Press',
        startingWeight: 65,
        targetWeight: 65,
        increment: 5,
      },
      {
        id: '5',
        name: 'Deadlift',
        startingWeight: 135,
        targetWeight: 135,
        increment: 5,
      },
    ],
  })

  Workout.insert({
    data: [
      { id: '1', name: 'Workout 1' },
      { id: '2', name: 'Workout 2' },
    ],
  })

  WorkoutExercise.insert({
    data: [
      { id: '1', workoutId: '1', exerciseId: '1' },
      { id: '2', workoutId: '1', exerciseId: '2' },
      { id: '3', workoutId: '1', exerciseId: '3' },
      { id: '4', workoutId: '2', exerciseId: '1' },
      { id: '5', workoutId: '2', exerciseId: '4' },
      { id: '6', workoutId: '2', exerciseId: '5', targetSets: 1 },
    ],
  })

  let workoutId = 2
  for (let i = 0; i < 300; i++) {
    if (i % 2 === 0) {
      continue
    }
    const sessionId = `${i}`
    const date = moment()
      .subtract(300 - i, 'd')
      .valueOf()

    workoutId = (workoutId % 2) + 1
    Session.insert({
      data: {
        id: sessionId,
        date,
        workoutId,
        bodyWeight: 150,
        completed: true,
      },
    })

    const workout = Workout.query().withAllRecursive().find(workoutId)

    workout?.workoutExercises.forEach((woExercise) => {
      const sessExId = uuid()
      SessionExercise.insert({
        data: {
          id: sessExId,
          date,
          sessionId,
          exerciseId: woExercise.exerciseId,
          targetSets: woExercise.targetSets,
          targetReps: woExercise.targetReps,
          weight: woExercise.exercise.targetWeight,
        },
      })

      for (let s = 0; s < woExercise.targetSets; s++) {
        SessionExerciseSet.insert({
          data: {
            id: uuid(),
            sessionExerciseId: sessExId,
            index: s + 1,
            reps: woExercise.targetReps,
            complete: true,
          },
        })
      }

      // fail 1/20 attempts
      if (Math.random() > 0.05) {
        Exercise.incrementTargetWeight(
          woExercise.exerciseId,
          woExercise.exercise.targetWeight
        )
      }
    })
  }
}
