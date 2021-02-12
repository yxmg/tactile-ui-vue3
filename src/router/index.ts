import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/home.vue";
import DocView from "../views/doc.vue";
import Switch from '../components/switch.vue'
import Button from "../components/button.vue";
import Tabs from "../components/tabs.vue"
import Dialog from "../components/dialog.vue"

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/doc',
      component: DocView,
      redirect: '/doc/switch',
      children: [
        { path: 'switch', component: Switch },
        { path: 'button', component: Button },
        { path: 'dialog', component: Dialog },
        { path: 'tabs', component: Tabs },
      ]
    }
  ]
})

export default router