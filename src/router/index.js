import { createRouter, createWebHashHistory } from "vue-router";
import HomeView from "../views/home.vue";
import DocView from "../views/doc.vue";

const history = createWebHashHistory()
const router = createRouter({
  history,
  routes: [
    {path: '/', component: HomeView},
    {path: '/doc', component: DocView}
  ]
})

export default router