import Exercise from 'src/store/exercises/exercise.orm'
import SessionExercise from 'src/store/sessions/session-exercise.orm'
import Session from 'src/store/sessions/session.orm'
import { Store } from 'vuex'

const conversions = {
  kg: 0.453592,
  lbs: 2.20462,
}

export default function updateUoMInDatabase(
  newUOM: 'lbs' | 'kg',
  store: Store<any>
) {
  function newValue(oldValue) {
    return (oldValue * conversions[newUOM]).toFixed(3)
  }

  store.dispatch('updateSettings', {
    bodyWeight: newValue(store.state.app.settings.bodyWeight),
  })

  Exercise.all().forEach(
    (ex) =>
      void ex.$update({
        startingWeight: newValue(ex.startingWeight),
        targetWeight: newValue(ex.targetWeight),
        increment: newValue(ex.increment),
      })
  )

  Session.all().forEach((session) => {
    void session.$update({
      bodyWeight: newValue(session.bodyWeight),
    })
  })

  SessionExercise.all().forEach((sessEx) => {
    void sessEx.$update({
      weight: newValue(sessEx.weight),
    })
  })
}
