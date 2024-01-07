<template>
    <div class="sidebar">
        <Logo :collapse="false"></Logo>
        <el-menu :default-active="$route.path">
            <SidebarItem v-for="item in data" :key="item.path" :item="item" :base-path="item.path"></SidebarItem>
        </el-menu>
    </div>
</template>

<script>
import Logo from './Logo'
import SidebarItem from './SidebarItem'

export default {
    components: { SidebarItem, Logo },
    props: {
        data: {
            type: Array,
            default: () => []
        }
    }
}
</script>
  
<style></style>
  