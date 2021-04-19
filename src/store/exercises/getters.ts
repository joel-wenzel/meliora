import { GetterTree } from 'vuex'
import { ExercisesStateInterface } from '.'
import { StateInterface } from '../index'

const getters: GetterTree<ExercisesStateInterface, StateInterface> = {
  exercises(state: ExercisesStateInterface) {
    return state
  },
  exerciseNames(state: ExercisesStateInterface) {
    return state.map((ex) => ex.name)
  },
}

export default getters
