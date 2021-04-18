import fragment from 'vue-fragment'
import { boot } from 'quasar/wrappers'

export default boot(({ Vue }) => {
  Vue.use(fragment.Plugin)
})
