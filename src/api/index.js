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


export const getInfoForLongTime = () => new Promise((resolve) => {
    setTimeout(() => { resolve({ data: 'Hello,world' }) }, 8000);
})

export const getInfoForError = () => new Promise((_, reject) => {
    setTimeout(() => { reject('Hello,error') }, 3000);
})