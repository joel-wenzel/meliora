import { Store } from 'vuex'
import fragment from 'vue-fragment'
import { boot } from 'quasar/wrappers'
import { weightUoM } from '../model/app.constants'
import { BootFileParams } from '@quasar/app'
import MTargetWeightDialog from '../components/exercise/target-weight-dialog/MTargetWeightDialog.vue'
import MConfirmDialog from 'src/components/dialog/confirm-dialog/MConfirmDialog.vue'

declare module 'vue/types/vue' {
  interface Vue {
    $labels: { [key: string]: string }
  }
}

export default boot(({ Vue }: BootFileParams<Store<any>>) => {
  Vue.use(fragment.Plugin)

  Vue.prototype.$labels = {
    uom: weightUoM,
  }

  Vue.component('MTargetWeightDialog', MTargetWeightDialog)
  Vue.component('MConfirmDialog', MConfirmDialog)

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
