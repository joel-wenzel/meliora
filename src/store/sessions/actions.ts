import { ActionTree, ActionContext } from 'vuex'
import { StateInterface } from '../index'
import { v4 as uuid } from 'uuid'
import { SessionsStateInterface } from '.'
import moment from 'moment'
import { Session } from '@/model/session.model'

const actions: ActionTree<SessionsStateInterface, StateInterface> = {
  addSession(context, payload: Partial<Session>) {
    // TODO api persist here. Either localstorage or firebase
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    const localId = uuid()

    const newSession = {
      id: localId,
      date: moment(),
      ...payload,
    }

    newSession.exercises?.forEach((ex) => {
      ex.id = ex.id || uuid()
    })

    context.commit('addSession', newSession)

    updateStorage(context)

    return newSession
  },
}

function updateStorage(
  context: ActionContext<SessionsStateInterface, StateInterface>
) {
  // TODO if calling backend api be sure to replace the localid with backend id afterwards

  const sessions = context.getters.sessions
  localStorage.setItem('meliora.sessions', JSON.stringify(sessions))
}

export default actions
