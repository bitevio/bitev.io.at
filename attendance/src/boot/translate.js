import { boot } from 'quasar/wrappers'

import { createI18n } from 'vue-i18n'
import en from 'src/locales/en'

// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router}) => {
  // something to do
  //app.use(i18n)
  const i18n = createI18n({
    locale: 'en',
    globalInjection: true,
    messages:{
      en

    }
  })

  // Tell app to use the I18n instance
  app.use(i18n)
})
