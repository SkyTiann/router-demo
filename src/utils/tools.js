import Vue from 'vue'

/**
 * @description 页面动画加载
 * @param {Function} networkFn
 * @returns {Promise}
 */
export const loading = async (networkFn) => {
    const load = Vue.prototype.$loading({
        lock: true,
        text: 'Loading',
        spinner: 'el-icon-loading',
        background: 'rgba(0, 0, 0, 0.7)'
    })
    const data = await networkFn()
        .catch(e => { load.close(); throw e })
    load.close()
    return data
}