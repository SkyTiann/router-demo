/**
 * 模拟网络请求
 */

const DelayTime = 1000

export const getToken = () => new Promise((resolve) => {
    setTimeout(() => { resolve({ token: 'aaaa.bbbbb.cccc' }) }, DelayTime)
})

export const getRoles = () => new Promise((resolve) => {
    setTimeout(() => { resolve(['user']) }, DelayTime);
})