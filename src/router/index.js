import Vue from 'vue'
import VueRouter from 'vue-router'
import { combinedRouting, rootRedirect, guard, routeMaps } from './compute'

Vue.use(VueRouter)

/**
 * 常规路由
 * "InsertGroups" 为组路由插入位置
 */
const routes = [
  { path: '/', redirect: rootRedirect },
  { path: '/login', component: () => import('../views/login.vue') },
  "InsertGroups",
  { path: '/404', component: () => import('../views/404.vue') },
  { path: '*', redirect: '/404' }
]

/**
 * 组路由
 * 组路由中的一级路由默认都为children的第一个
 * 标记在组路由上的权限会下沉到每一个子路由
 */
export const groups = [
  {
    path: '/group1',
    meta: {
      menu: { title: '一组', icon: 'el-icon-s-tools' }
    },
    children: [
      {
        path: 'module1',
        component: () => import('../views/module1'),
        meta: {
          menu: { title: '模块一', icon: 'el-icon-delete-solid' }
        }
      },
      {
        path: 'module2',
        component: () => import('../views/module2'),
        meta: {
          menu: { title: '模块二', icon: 'el-icon-eleme' }
        }
      }
    ]
  },
  /**
   * admin 专享
   */
  {
    path: '/group2',
    meta: {
      menu: { title: '二组', icon: 'el-icon-warning' },
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
  /**
  * user1 专享
  */
  {
    path: '/group3',
    meta: {
      menu: { title: '三组', icon: 'el-icon-eleme' },
      roles: ['user1']
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
  },
  /**
   * user2 专享
   */
  {
    path: '/group4',
    meta: {
      menu: { title: '四组', icon: 'el-icon-eleme' },
      roles: ['user2']
    },
    children: [
      {
        path: 'module7',
        component: () => import('../views/module7'),
        meta: {
          menu: { title: '模块七', icon: 'el-icon-eleme' },
        }
      }
    ]
  },
  {
    path: '/group5',
    meta: {
      menu: { title: '五组', icon: 'el-icon-eleme' },
    },
    children: [
      {
        path: 'module8',
        component: () => import('../views/module8'),
        meta: {
          menu: { title: '模块八', icon: 'el-icon-eleme' },
        }
      }
    ]
  }
]


const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: combinedRouting(routes, groups, () => import('@/layout'))
})

router.beforeEach(guard)



export default router

