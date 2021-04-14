import { Module } from 'vuex';
import { StateInterface } from '../index';
import state, { RoutineStateInterface } from './state';
import actions from './actions';
import getters from './getters';
import mutations from './mutations';

const routineModule: Module<RoutineStateInterface, StateInterface> = {
  namespaced: true,
  actions,
  getters,
  mutations,
  state
};

export default routineModule;
