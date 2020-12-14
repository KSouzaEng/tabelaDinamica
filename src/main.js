import Vue from 'vue'
import App from './App.vue'
import ElementUI from 'element-ui';

Vue.config.productionTip = false
Vue.use(ElementUI);


// Vue.component(Button.name, Button);
// Vue.component(Select.name, Select);
// Vue.component(Option.name, Option);
// Vue.component(Table.name, Table);
// Vue.component(TableColumn.name, TableColumn);


new Vue({
    render: h => h(App),
}).$mount('#app')