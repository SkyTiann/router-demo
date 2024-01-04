import Vue from 'vue'
import VueRouter from 'vue-router'
import { strategy1 } from './strategy'

Vue.use(VueRouter)

const routes = [
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


/**
 * 策略函数注册
 */
const judgment = strategy1

const userRoles = ['user']

router.beforeEach(async (to, from, next) => {
  const { roles } = to.meta
  if (roles === undefined) { next(); return }
  if (judgment(userRoles, roles)) { next(); return }
  next('/404')
})


/**
 * @description 侧边栏展示数据计算函数
 * @param {Array} routes
 * @param {Array<string>} userRoles
 * @returns {Array}
 */
const compute = (routes, userRoles) => {
  if (routes === undefined) return []
  const res = []
  for (let i = 0; i < routes.length; i++) {
    const route = routes[i]
    if (route.meta === undefined || route.meta.menu === undefined) continue
    const { menu } = route.meta
    if (menu.isGroup) {
      const children = compute(route.children, userRoles)
      res.push({ title: menu.title, path: route.path, children })
    }
    else {
      if (route.meta && route.meta.roles)
        if (!judgment(userRoles, route.meta.roles)) continue
      res.push({ title: menu.title, path: route.path })
    }
  }
  return res
}

console.log(compute(routes, userRoles))

export default router
