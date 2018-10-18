import "./less/edit.less";
import Vue from "vue";
import App from "./index.vue";
import VueApollo from 'vue-apollo';
import apolloProvider from '@/client/util/graphql';

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.use(VueApollo);
Vue.use(ElementUI);
new Vue({
    el: "#app",
    apolloProvider,
    render: h => h(App)
});
