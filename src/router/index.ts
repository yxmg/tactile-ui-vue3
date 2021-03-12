import {createRouter, createWebHashHistory} from "vue-router";
import HomeView from "../views/home.vue";
import DocView from "../views/doc.vue";
import SwitchDoc from '../views/switch-doc/index.vue'
import ButtonDoc from "../views/button-doc/index.vue";
import TabsDoc from "../views/tabs-doc/index.vue"
import DialogDoc from "../views/dialog-doc/index.vue"
import {generateMd} from './generate-md'
import IntroMd from '../markdown/intro.md'
import GetStartedMd from '../markdown/get-started.md'

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
        { path: 'intro', component: generateMd(IntroMd) },
        { path: 'get-started', component: generateMd(GetStartedMd) },
        { path: 'switch', component: SwitchDoc },
        { path: 'button', component: ButtonDoc },
        { path: 'dialog', component: DialogDoc },
        { path: 'tabs', component: TabsDoc },
      ]
    }
  ]
})

export default router