<template>
    <div class="sidebarItem">
        <el-submenu v-if="item.children && item.children.length > 0" :index="basePath">
            <template slot="title">
                <i :class="item.icon"></i>
                <span>{{ item.title }}</span>
            </template>
            <SidebarItem v-for="childItem in item.children" :key="resolvePath(childItem.path)" :item="childItem"
                :base-path="resolvePath(childItem.path)"></SidebarItem>
        </el-submenu>
        <el-menu-item v-else-if="item.children === undefined" :index="basePath" @click="routeRedirects">
            <i :class="item.icon"></i>
            <span slot="title">{{ item.title }}</span>
        </el-menu-item>
    </div>
</template>
  
<script>

export default {
    name: 'SidebarItem',
    props: {
        item: {
            type: Object,
            required: true
        },
        basePath: {
            type: String,
            default: ''
        }
    },
    methods: {
        resolvePath(routePath) {
            return this.basePath + '/' + routePath
        },
        routeRedirects() {
            if (this.$route.path === this.basePath) return
            this.$router.push({ path: this.basePath }).catch(e => { })
        }

    }
}
</script>
<style></style>
  