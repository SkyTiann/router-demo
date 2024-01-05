<template>
    <div class="layout">
        <aside>
            <sidebar class="sidebar-container" />
        </aside>
        <div>
            <header></header>
            <main>
                <router-view />
            </main>
        </div>
    </div>
</template>

<script>
import { Sidebar } from '@/components/Sidebar'

export default {
    components: { Sidebar }
}

</script>
  
<style></style>
  