import { configure } from 'vee-validate'

/**
 * Updating default vee-validate configuration
 * @param app vue instance
 */
export default defineNuxtPlugin((nuxtApp) => {
  configure({
    validateOnBlur: true,
    validateOnChange: true,
    validateOnInput: true,
    validateOnModelUpdate: true,
  })
})
