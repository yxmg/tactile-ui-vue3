import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/home.vue";
import DocView from "../views/doc.vue";
import Switch from '../components/switch.vue'

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/doc', component: DocView,
      children: [
        { path: 'switch', component: Switch },
      ]
    }
  ]
})

export default router