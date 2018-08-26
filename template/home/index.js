import css from "./less/home.less"
import Vue from "vue";
import App from "./index.vue";

const test = "test";
const a = [1,2,3,4,5];
() => {
    console.log("es6", ...a);
}
new Vue({
    el: "#app",
    render: h => h(App)
});
