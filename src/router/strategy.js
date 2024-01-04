/**
 * @description 判断权限策略函数
 * @param {Array<string>} userRoles
 * @param {Array<string} routeRoles
 * @returns {Boolean}
 */
export const strategy1 = (userRoles, routeRoles) => {
    const set1 = new Set(userRoles)
    const set2 = new Set(routeRoles)
    return [...set1].filter(x => set2.has(x)).length > 0
}