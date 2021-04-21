import { Session } from '@/model/session.model'
import { SessionsStateInterface } from './index'
import { MutationTree } from 'vuex'

const mutation: MutationTree<SessionsStateInterface> = {
  addSession(state: SessionsStateInterface, payload: Session) {
    state.sessions.push(payload)
  },
}

export default mutation
