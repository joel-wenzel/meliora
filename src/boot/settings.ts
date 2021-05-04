import { Store } from 'vuex'
import { boot } from 'quasar/wrappers'
import { BootFileParams } from '@quasar/app'
import { computed, watch } from '@vue/composition-api'

export default boot(({ Vue, store }: BootFileParams<Store<any>>) => {
  const settings = computed(() => store.state.app.settings)

  watch(
    settings,
    (val) => {
      Vue.prototype.$labels = {
        uom: val.uom,
        dateFormat: val.dateFormat,
      }

      Vue.prototype.$q.dark.set(val.darkMode)
    },
    {
      immediate: true,
    }
  )
})
