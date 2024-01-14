import _ from 'lodash'
import store from '@/store'
import { sessionStorageKey } from '@/utils/storageKey'

/**
 * 策略函数定义
 * 函数名称 [xxx]Strategy
 * 返回值为 true 则表示为允许该路由通行
 * 返回值为 false 则表示阻止该路由通行
 */

/**
 * @description 判断权限策略函数
 * @param {Array<string>} userRoles
 * @param {Array<string | undefined} routeRoles
 * @returns {Boolean}
 */
const roleStrategy = (userRoles, routeRoles) => {
    if (routeRoles === undefined) return true
    const set1 = new Set(userRoles)
    const set2 = new Set(routeRoles)
    return [...set1].filter(x => set2.has(x)).length > 0
}

/**
 * @description token是否存在策略,token被存储在 sessionStorage
 * @param {string} key
 * @returns {boolean}
 */
const tokenStrategy = (key) => !(sessionStorage.getItem(key) === null)

/**
 * @description 下沉权限
 * @param {Array} group 项目组路由
 * @returns {Array}
 */
const sinkRoles = (group) => {
    group = _.cloneDeep(group)
    if (group.meta.roles === undefined) return group.children
    const { children } = group
    for (let i = 0; i < children.length; i++) {
        const module = children[i]
        module.meta.roles = module.meta.roles === undefined
            ? [...group.meta.roles]
            : [...new Set([...module.meta.roles, ...group.meta.roles])]
    }
    return group.children
}

/**
 * @description 侧边栏展示数据计算函数
 * @param {Array} groups 项目组路由
 * @param {Array<string>} userRoles 用户角色
 * @param {Function} strategy 角色验证策略
 * @returns {Record<string,any>} 
 */
const sidebarCalculation = (groups, userRoles, strategy) => {
    groups = _.cloneDeep(groups)
    const res = []
    groups.forEach((group) => {
        const children = sinkRoles(group)
        const passModule = children
            .filter(({ meta }) => strategy(userRoles, meta.roles))
        if (passModule.length > 0) {
            group.children = passModule
            res.push(group)
        }
    })
    return res
}

/**
 * @description 权限侧边栏
 * @param {Array} groups 
 * @param {Array<string>} userRoles 
 * @returns {Record<string,any>}
 */
export const roleSidebar = (groups, userRoles) => sidebarCalculation(groups, userRoles, roleStrategy)

/**
 * @description 生成路由路径与组件名称映射表
 * @param {Array} groups 项目组路由
 * @returns {Record<string,any>}
 */
export const routeMaps = (groups) => {
    groups = _.cloneDeep(groups)
    const res = {}
    groups.forEach(({ path: groupPath, children }) => {
        
        children.forEach(({ path: modulePath, meta }) => {

            res[`${groupPath}/${modulePath}`] = meta.menu.title
            
        })
    })
    return res
}

/**
 * @description 组合路由
 * @param {Array} routes 常规路由
 * @param {Array} groups 组路由
 * @param {Function} layout 布局组件
 * @returns {Array}
 */
export const combinedRouting = (routes, groups, layout) => {
    routes = _.cloneDeep(routes)
    groups = _.cloneDeep(groups)
    for (let i = 0; i < groups.length; i++) {
        const group = groups[i]
        group.component = layout
        group.redirect = `${group.path}/${group.children[0].path}`
        // 组权限下沉
        group.children = sinkRoles(group)
    }
    for (let i = 0; i < routes.length; i++) {
        if (routes[i] === 'InsertGroups') {
            routes.splice(i, 1, ...groups)
            break
        }
    }
    return routes
}

/**
 * @description 根路由重定向
 * @returns {string}
 */
export const rootRedirect = () => tokenStrategy(sessionStorageKey.TOKEN) ? '/group1' : '/login'


/**
 * @description 路由守卫
 * @param {Route} to 
 * @param {Route} from 
 * @param {NavigationGuardNext<V>} next
 * @returns {void}
 */
export const guard = async (to, from, next) => {
    if (to.path !== '/login'
        && tokenStrategy(sessionStorageKey.TOKEN) === false) {
        next('/login')
        return
    }

    if (to.path === '/login') {
        next()
        return
    }

    const { meta } = to
    const userRoles = store.state.user.roles.length > 0
        ? store.state.user.roles
        : await store.dispatch('user/getUserRoles')
    if (roleStrategy(userRoles, meta.roles) === false) { next('/404'); return }
    next()
}
