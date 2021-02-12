import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import {createWebHashHistory, createRouter} from "vue-router"
import CustomComponent from './components/custom-component.vue'
import SecondComponent from './components/second-component.vue'

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    {path: '/', component: CustomComponent},
    {path: '/xxx', component: SecondComponent}
  ]
})
const app = createApp(App)
app.use(router)
app.mount('#app')
