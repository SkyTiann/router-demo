<template>
    <div class="login">
        <div class="login-box">
            <el-button type="primary" @click="click">login</el-button>
        </div>
    </div>
</template>

<script>
import { sessionStorageKey } from '@/utils/storageKey'
import { loading } from '@/utils/tools'
import { getToken } from '@/api'

export default {
    methods: {
        async click() {
            const { token } = await loading(getToken)
            sessionStorage.setItem(sessionStorageKey.TOKEN, token)
            await this.$router.push({ path: 'group1' })
        }
    }
}
</script>
  
<style>
.login {
    display: flex;
    width: 100vw;
    height: 100vh;
    justify-content: center;
    align-items: center;
    background-color: #24292E;
}
</style>
  