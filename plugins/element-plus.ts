import ElementPlus from 'element-plus'
import id from 'element-plus/dist/locale/id.min.mjs'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(ElementPlus, {
    locale: id,
  })
})
