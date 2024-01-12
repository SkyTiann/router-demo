import _ from 'lodash'

/**
 * @description 判断权限策略函数
 * @param {Array<string>} userRoles
 * @param {Array<string | undefined} routeRoles
 * @returns {Boolean}
 */
export const roleStrategy = (userRoles, routeRoles) => {
    if (routeRoles === undefined) return true
    const set1 = new Set(userRoles)
    const set2 = new Set(routeRoles)
    return [...set1].filter(x => set2.has(x)).length > 0
}


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
export const sidebarCalculation = (groups, userRoles, strategy) => {
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