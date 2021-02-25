import {createRouter, createWebHashHistory} from "vue-router";
import HomeView from "../views/home.vue";
import DocView from "../views/doc.vue";
import SwitchDoc from '../views/switch-doc/index.vue'
import ButtonDoc from "../views/button-doc.vue";
import TabsDoc from "../views/tabs-doc.vue"
import DialogDoc from "../views/dialog-doc.vue"
import {generateMd} from './generate-md'

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    { path: '/', component: HomeView },
    {
      path: '/doc',
      component: DocView,
      redirect: '/doc/intro',
      children: [
        { path: 'intro', component: generateMd('intro') },
        { path: 'get-started', component: generateMd('get-started') },
        { path: 'switch', component: SwitchDoc },
        { path: 'button', component: ButtonDoc },
        { path: 'dialog', component: DialogDoc },
        { path: 'tabs', component: TabsDoc },
      ]
    }
  ]
})

export default router