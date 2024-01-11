import Vue from 'vue'
import VueRouter from 'vue-router'
import { combinedRouting, roleStrategy, sidebarCalculation } from './compute'

Vue.use(VueRouter)

/**
 * 常规路由
 */
const routes = [
  { path: '/', redirect: '/login' },
  { path: '/login', component: () => import('../views/login.vue') },
  "InsertGroups",
  { path: '/404', component: () => import('../views/404.vue') },
  { path: '*', redirect: '/404' }
]

/**
 * 组路由的数组下标对应 modules 中的下标
 */
export const groups = [
  {
    path: '/group1',
    meta: {
      menu: { title: '一组', icon: 'el-icon-eleme' },
    },
    children: [
      {
        path: 'module1',
        component: () => import('../views/module1'),
        meta: {
          menu: { title: '模块一', icon: 'el-icon-eleme' }
        }
      },
      {
        path: 'module2',
        component: () => import('../views/module2'),
        meta: {
          menu: { title: '模块二', icon: 'el-icon-eleme' },
        }
      }
    ]
  },
  {
    path: '/group2',
    meta: {
      menu: { title: '二组', icon: 'el-icon-eleme' },
      roles: ['admin']
    },
    children: [
      {
        path: 'module3',
        component: () => import('../views/module3'),
        meta: {
          menu: { title: '模块三', icon: 'el-icon-eleme' }
        }
      },
      {
        path: 'module4',
        component: () => import('../views/module4'),
        meta: {
          menu: { title: '模块四', icon: 'el-icon-eleme' }
        }
      }
    ],
  },
  {
    path: '/group3',
    meta: {
      menu: { title: '三组', icon: 'el-icon-eleme' }
    },
    children: [
      {
        path: 'module5',
        component: () => import('../views/module5'),
        meta: {
          menu: { title: '模块五', icon: 'el-icon-eleme' },
        }
      },
      {
        path: 'module6',
        component: () => import('../views/module6'),
        meta: {
          menu: { title: '模块六', icon: 'el-icon-eleme' }
        }
      }
    ]
  }
]
console.log(combinedRouting(routes, groups, () => import('@/views/layout.vue')))

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: combinedRouting(routes, groups, () => import('@/views/layout.vue'))
})

router.beforeEach(async (to, from, next) => {
  next()
})



export default router

