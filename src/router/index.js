import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store'
import { AuthConfig } from './authConfig'

Vue.use(VueRouter)

export const routes = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login.vue'),
  },
  {
    path: '/group1',
    redirect: '/group1/module1',
    component: () => import('../views/layout.vue'),
    meta: { menu: { isGroup: true, title: '一组' } },
    children: [
      {
        path: 'module1',
        component: () => import('../views/module1'),
        meta: {
          roles: ['admin'],
          menu: { title: '模块1' }
        }
      },
      {
        path: 'module2',
        component: () => import('../views/module2'),
        meta: {
          roles: ['admin'],
          menu: { title: '模块2' }
        }
      }
    ]
  },
  {
    path: '/group2',
    redirect: '/group2/module3',
    component: () => import('../views/layout.vue'),
    meta: { menu: { isGroup: true, title: '二组' } },
    children: [
      {
        path: 'module3',
        component: () => import('../views/module3'),
        meta: {
          menu: { title: '模块3' }
        }
      },
      {
        path: 'module4',
        component: () => import('../views/module4'),
        meta: {
          menu: { title: '模块4' }
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/404.vue')
  },
  {
    path: '*',
    redirect: '/404'
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.beforeEach(async (to, from, next) => {
  const { roles } = to.meta

  // 如果有缓存，优先使用缓存
  const userRoles = store.state.user.roles.length > 0
    ? store.state.user.roles
    : await store.dispatch('user/getUserRoles')

  if (roles === undefined) { next(); return }

  if (AuthConfig.strategy(userRoles, roles)) { next(); return }
  
  next('/404')
})


export default router
