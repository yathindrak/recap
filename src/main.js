// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router";

import { ApolloClient } from 'apollo-client'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import Vuesax from "vuesax";
import "vuesax/dist/vuesax.css";
import "material-icons/iconfont/material-icons.css";
import store from "@/store/store";

Vue.config.productionTip = false;

Vue.use(Vuesax);

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:4000/graphql'
});

// Create the apollo client
export const apolloClient = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true
});

// Install the vue plugin
Vue.use(VueApollo);

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  apolloProvider,
  components: { App },
  template: '<App/>'
});
