/**
 * @description 判断权限策略函数
 * @param {Array<string>} userRoles
 * @param {Array<string} routeRoles
 * @returns {Boolean}
 */
const strategy1 = (userRoles, routeRoles) => {
    const set1 = new Set(userRoles)
    const set2 = new Set(routeRoles)
    return [...set1].filter(x => set2.has(x)).length > 0
}

/**
 * @description 判断是否有token
 * @param {string} key
 * @returns {Boolean}
 */
const strategy2 = (key) => sessionStorage.getItem(key) === null


/**
 * @description 侧边栏展示数据计算函数
 * @param {Array} routes 项目全部路由
 * @param {Array<string>} userRoles 用户角色信息
 * @param {Function} strategy 权限验证策略
 * @returns {Array} 
 */
const compute = (routes, userRoles, strategy) => {
    const res = []
    for (const route of routes) {
        const { meta } = route
        if (meta === undefined) continue
        const { menu } = meta
        if (menu === undefined) continue
        if (route.children !== undefined) {
            const children = compute(route.children, userRoles, strategy)
            res.push({ title: menu.title, icon: menu.icon, path: route.path, children })
        }
        else {
            const { roles } = meta
            if (roles && !strategy(userRoles, roles)) continue
            res.push({ title: menu.title, icon: menu.icon, path: route.path })
        }
    }
    return res
}

export const roleStrategy = {
    verify: strategy1,
    generateSidebar: (routes, userRoles) => compute(routes, userRoles, strategy1)
}

export const tokenStrategy = {
    verify: strategy2
}