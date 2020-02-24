import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import AdminTemplate from '../views/admin/Template.vue'
import CatalogoTask from '../views/admin/catalogos/task/CrudTask.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/admin/',
    name: 'AdminTemplate',
    component: AdminTemplate,
    children: [
      {
        path: 'task',
        name: 'CatalogoTask',
        component: CatalogoTask
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
