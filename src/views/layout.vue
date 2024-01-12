<template>
    <div class="layout">
        <aside style="width: 250px;">
            <Sidebar></Sidebar>
        </aside>
        <div>
            <router-view />
        </div>
    </div>
</template>

<script>
import Sidebar from "@/components/Sidebar2";

export default {
    components: { Sidebar },
    mounted(){
        console.log('ni好');
    }
}

</script>
  
<style>
.layout {
    display: flex;
    gap: 20px;
}
</style>
  