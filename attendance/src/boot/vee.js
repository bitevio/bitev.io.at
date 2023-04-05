import { boot } from 'quasar/wrappers'
import { defineRule, configure } from "vee-validate";

import AllRules  from "@vee-validate/rules";

Object.keys(AllRules).forEach((rule) => {
  defineRule(rule, AllRules[rule]);
});

import fr from "@vee-validate/i18n/dist/locale/fr.json";
import en from "@vee-validate/i18n/dist/locale/en.json";
import { localize, setLocale } from "@vee-validate/i18n";

configure({
  generateMessage: localize({
    en,
  }),
});

import { Form, Field } from "vee-validate";
const globalComponents = {
  Form: Form,
  Field: Field,

};

//setLocale("fr");
// "async" is optional;
// more info on params: https://v2.quasar.dev/quasar-cli/boot-files
export default boot(async ({ app, router} ) => {
  // something to do
  for (const key in globalComponents) {
    app.component(key, globalComponents[key]);
}
})
