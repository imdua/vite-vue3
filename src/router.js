import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { path: '/', name: 'home', redirect: { name: 'todolist' } },
  {
    path: '/todolist',
    name: 'todolist',
    component: () => import('./components/TodoList/TodoTemplate.vue'),
  },
  {
    path: '/yesno',
    name: 'yesno',
    component: () => import('./components/YesNo/YesNo.vue'),
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
