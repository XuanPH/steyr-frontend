import Vue from "vue";
import VueResource from "vue-resource";
import App from "./App.vue";
import router from "./router";
import MaterialKit from "./plugins/material-kit";
import Spinner from "vue-spinkit";
import { library } from '@fortawesome/fontawesome-svg-core'
import { faCoffee } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import Vuex from 'vuex';
import TreeView from "vue-json-tree-view";
import _ from 'lodash';
library.add(faCoffee)
Vue.component('font-awesome-icon', FontAwesomeIcon)

import ElementUI from 'element-ui';
import locale from 'element-ui/lib/locale/lang/en'
import 'element-ui/lib/theme-chalk/index.css';
import 'es6-promise/auto'
/* eslint-disable */
Vue.use(ElementUI, { locale });
Vue.use(TreeView)
Vue.use(Vuex);
Vue.component("Spinner", Spinner);
Vue.config.productionTip = false;
Vue.use(MaterialKit);
Vue.use(VueResource);
const NavbarStore = {
  showNavbar: false
};
Vue.prototype._ = _;
// const store = new Vuex.store({
//   state: {
//     count: 0
//   },
//   mutations: {
//     increment (state) {
//       state.count++
//     }
//   }
// });
Vue.mixin({
  data() {
    return {
      NavbarStore,
      baseApi: "http://localhost:2300/",
      adminId: "2uhg7hLduLAnN9ICBeJb",
      accessToken: "EAACW5Fg5N2IBADvp0jNqmLrvpV8FJPfGtVNwNLYYaV35x9WZAZBhBf2LC1p8q9dqjkSh9n4VsE5rTAUpZAa6ZCUtcF9pEGksPSrqhFKXNIEZAY8ReZCJ9djVbjwTGbe2EJXHQOJ79EnjmTyAZAPa8NHEUeLUxBEoxZB89ubQgxCv8VojHR8n6oUzzgPhVJFI66DZAZCYyvYVgEeQZDZD"
    };
  },
  computed: {
    localUser: () => {
      return localStorage.user ? JSON.parse(localStorage.user) : {}
    },
    globalUser: () => {
    }
  },
  methods: {
    logout() {
      localStorage.clear("token");
      localStorage.clear("use");
      this.$router.push("/login");
    },
  }
});

new Vue({
  router,
  render: h => h(App)
}).$mount("#app");
