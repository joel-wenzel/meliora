import moment from 'moment'
import { GetterTree } from 'vuex'
import { SessionsStateInterface } from '.'
import { StateInterface } from '../index'

const getters: GetterTree<SessionsStateInterface, StateInterface> = {
  sessions(state: SessionsStateInterface) {
    return state.sessions.map((session) => {
      return {
        ...session,
        date: moment(session.date),
      }
    })
  },
  last(state: SessionsStateInterface, getters) {
    const sessions = getters.sessions
    return sessions[sessions.length - 1]
  },
}

export default getters
