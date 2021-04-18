import fragment from 'vue-fragment'
import { boot } from 'quasar/wrappers'

export default boot(({ Vue }) => {
  Vue.use(fragment.Plugin)

  Vue.directive('focus-select', {
    bind(el) {
      const inputEl = el instanceof HTMLInputElement ? el : el.querySelector('input, textarea')
      inputEl?.addEventListener('focus', event => {
        ;(event.target as HTMLInputElement).select()
      })
    },
    
  })
})
