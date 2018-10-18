import './less/ffpage.less'
import Vue from 'vue';
import App from './index.vue';
import VueApollo from 'vue-apollo';
import apolloProvider from '@/client/util/graphql';

Vue.use(VueApollo);
new Vue({
    el: "#app",
    apolloProvider,
    render: h => h(App)
});