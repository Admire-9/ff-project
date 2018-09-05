import "./less/ffpage.less"
import Vue from "vue";
import App from "./index.vue";
console.log("in");
new Vue({
    el: "#app",
    render: h => h(App)
});