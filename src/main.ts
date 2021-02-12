import {createApp} from 'vue'
import App from './App.vue'
import './index.css'
import {createWebHashHistory, createRouter} from "vue-router"
import CustomComponent from './components/custom-component'

const history = createWebHashHistory()
const router = createRouter({
    history,
    routes: [
        {path: '/', component: CustomComponent}
    ]
})

createApp(App).mount('#app')
