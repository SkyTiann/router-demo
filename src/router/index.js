import Vue from 'vue'
import VueRouter from 'vue-router'
import { sessionStorageKey } from '@/utils/storageKey'
import store from '@/store'
import { roleStrategy, tokenStrategy } from './strategy'

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
  /**
   * group1 公共组
   */
  {
    path: '/group1',
    redirect: '/group1/module1',
    component: () => import('../views/layout.vue'),
    meta: {
      menu: { title: '一组', icon: 'el-icon-eleme' }
    },
    children: [
      {
        path: 'module1',
        component: () => import('../views/module1'),
        meta: {
          menu: { title: '模块一', icon: 'el-icon-eleme' }
        },
      },
      {
        path: 'module2',
        component: () => import('../views/module2'),
        meta: {
          menu: { title: '模块二', icon: 'el-icon-eleme' }
        },
      }
    ]
  },
  /**
   * group2 admin与user共享组 
   */
  {
    path: '/group2',
    redirect: '/group2/module3',
    component: () => import('../views/layout.vue'),
    meta: {
      menu: { title: '二组', icon: 'el-icon-eleme' }
    },
    children: [
      {
        path: 'module3',
        component: () => import('../views/module3'),
        meta: {
          roles: ['admin', 'user'],
          menu: { title: '模块三', icon: 'el-icon-eleme' }
        }
      },
      {
        path: 'module4',
        component: () => import('../views/module4'),
        meta: {
          roles: ['admin', 'user'],
          menu: { title: '模块四', icon: 'el-icon-eleme' }
        }
      }
    ]
  },
  /**
   * group3 admin专享组
   */
  {
    path: '/group3',
    redirect: '/group3/module5',
    component: () => import('../views/layout.vue'),
    meta: {
      menu: { title: '三组', icon: 'el-icon-eleme' },
    },
    children: [
      {
        path: 'module5',
        component: () => import('../views/module5'),
        meta: {
          roles: ['admin'],
          menu: { title: '模块五', icon: 'el-icon-eleme' },
        }
      },
      {
        path: 'module6',
        component: () => import('../views/module6'),
        meta: {
          roles: ['admin'],
          menu: { title: '模块六', icon: 'el-icon-eleme' },
        }
      }
    ]
  },
  {
    path: '/404',
    component: () => import('../views/404.vue'),
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
  if (to.path === '/login') { next(); return }
  /**
   * 无 token 且当前页面不是 /login 跳到 /login
   */
  if (to.path !== '/login'
    && tokenStrategy.verify(sessionStorageKey.TOKEN)) {
    next('/login')
    return
  }
  const { meta } = to
  /**
   *  有token，可以拉取用户数据
   */
  const userRoles = store.state.user.roles.length > 0
    ? store.state.user.roles
    : await store.dispatch('user/getUserRoles')

  if (meta.roles === undefined) { next(); return }

  if (roleStrategy.verify(userRoles, meta.roles)) { next(); return }

  next('/404')
})


export default router
