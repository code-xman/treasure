import { Notify } from 'quasar'

// "async" is optional;
// more info on params: https://quasar.dev/quasar-cli/boot-files

Notify.setDefaults({
  position: 'top',
  timeout: 2500,
  textColor: 'white',
  actions: [{ icon: 'close', color: 'white' }]
})