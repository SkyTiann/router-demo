<template>
    <div class="layout">
        <aside style="width: 250px;">
            <Slider :data="sidebarData"></Slider>
        </aside>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import Slider from '@/components/Sidebar';

export default {
    components: { Slider },
    computed: {
        sidebarData() {
            return this.$store.state.user.sidebar
        }
    }
}

</script>
  
<style>
.layout {
    display: flex;
    gap: 20px;
}
</style>
  