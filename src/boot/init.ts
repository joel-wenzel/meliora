import { Store } from 'vuex'
import { StateInterface } from '@/store'
import fragment from 'vue-fragment'
import { boot } from 'quasar/wrappers'
import { weightUoM } from '../model/app.constants'
import { BootFileParams } from '@quasar/app'

declare module 'vue/types/vue' {
  interface Vue {
    $labels: { [key: string]: string }
  }
}

export default boot(({ Vue, store }: BootFileParams<Store<StateInterface>>) => {
  Vue.use(fragment.Plugin)

  Vue.prototype.$labels = {
    uom: weightUoM,
  }

  Vue.directive('focus-select', {
    bind(el) {
      const inputEl =
        el instanceof HTMLInputElement
          ? el
          : el.querySelector('input, textarea')
      inputEl?.addEventListener('focus', (event) => {
        ;(event.target as HTMLInputElement).select()
      })
    },
  })
})
