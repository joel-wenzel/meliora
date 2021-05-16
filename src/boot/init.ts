import { Store } from 'vuex'
import fragment from 'vue-fragment'
import { boot } from 'quasar/wrappers'
import { BootFileParams } from '@quasar/app'
import MTargetWeightDialog from 'src/components/dialog/target-weight-dialog/MTargetWeightDialog.vue'
import MConfirmDialog from 'src/components/dialog/confirm-dialog/MConfirmDialog.vue'
import VueApexCharts from 'vue-apexcharts'
import defaultData from 'src/model/util/defaultData'

declare module 'vue/types/vue' {
  interface Vue {
    $labels: { [key: string]: string }
  }
}

export default boot(({ Vue, store }: BootFileParams<Store<any>>) => {
  Vue.use(fragment.Plugin)

  Vue.use(VueApexCharts)

  Vue.component('apexchart', VueApexCharts)
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

  window['defaultData'] = defaultData.bind({ store })
})
