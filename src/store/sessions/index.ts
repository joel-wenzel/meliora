import { Session } from '@/model/session.model'
import { Module } from 'vuex'
import { StateInterface } from '../index'
import actions from './actions'
import getters from './getters'
import mutations from './mutations'

export type SessionsStateInterface = {
  sessions: Array<Session>
}

export function state(): SessionsStateInterface {
  const sessions: Array<Session> = JSON.parse(
    localStorage.getItem('meliora.sessions') || '[]'
  )

  return {
    sessions,
  }
}

const sessionsModule: Module<SessionsStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state,
}

export default sessionsModule
