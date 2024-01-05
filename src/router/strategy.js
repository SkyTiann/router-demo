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
 * @param {Array} routes
 * @param {Array<string>} userRoles
 * @param {Function} strategy
 * @returns {Array}
 */
const compute = (routes, userRoles, strategy) => {
    if (routes === undefined) return []
    const res = []
    for (let i = 0; i < routes.length; i++) {
        const route = routes[i]
        if (route.meta === undefined || route.meta.menu === undefined) continue
        const { menu } = route.meta
        if (menu.isGroup) {
            const children = compute(route.children, userRoles, strategy)
            res.push({ title: menu.title, path: route.path, children })
        }
        else {
            if (route.meta && route.meta.roles)
                if (!strategy(userRoles, route.meta.roles)) continue
            res.push({ title: menu.title, path: route.path })
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