import fragment from 'vue-fragment'
import { boot } from 'quasar/wrappers'
import { weightUoM } from '../model/app.constants'

declare module 'vue/types/vue' {
  interface Vue {
    $labels: { [key: string]: string }
  }
}

export default boot(({ Vue }) => {
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
