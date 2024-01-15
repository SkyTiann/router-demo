<template>
    <div class="sidebar">
        <el-menu :default-active="$route.path">
            <el-submenu v-for="group in sidebarData" :key="group.path" :index="group.path">
                <template slot="title">
                    <i :class="group.meta.menu.icon"></i>
                    <span>{{ group.meta.menu.title }}</span>
                </template>
                <el-menu-item v-for="item in group.children" :key="item.path" :index="`${group.path}/${item.path}`"
                    @click="routeRedirects(`${group.path}/${item.path}`)">
                    <i :class="item.meta.menu.icon"></i>
                    <span slot="title">{{ item.meta.menu.title }}</span>
                </el-menu-item>
            </el-submenu>
        </el-menu>
    </div>
</template>

<script>

export default {
    computed: {
        sidebarData() {
            return this.$store.state.user.sidebar
        }
    },
    methods: {
        routeRedirects(basePath) {
            if (this.$route.path === basePath) return
            this.$router.push({ path: basePath }).catch(e => { })
        }
    }
}
</script>
  
<style>
.scrollbar-wrapper {
    overflow-x: hidden !important;
}
</style>
  