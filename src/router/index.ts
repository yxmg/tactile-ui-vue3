import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/home.vue";
import DocView from "../views/doc.vue";
import SwitchDoc from '../views/switch-doc.vue'
import ButtonDoc from "../views/button-doc.vue";
import TabsDoc from "../views/tabs-doc.vue"
import DialogDoc from "../views/dialog-doc.vue"

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
        { path: 'switch', component: SwitchDoc },
        { path: 'button', component: ButtonDoc },
        { path: 'dialog', component: DialogDoc },
        { path: 'tabs', component: TabsDoc },
      ]
    }
  ]
})

export default router