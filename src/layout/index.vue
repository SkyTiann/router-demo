<template>
    <div class="layout">
        <aside style="width: 250px;">
            <Sidebar></Sidebar>
        </aside>
        <main>
            <TagsView></TagsView>
            <router-view />
        </main>
    </div>
</template>

<script>
import Sidebar from "./components/Sidebar";
import TagsView from './components/TagsView'

export default {
    components: { Sidebar, TagsView }
}

</script>
  
<style>
.layout {
    display: flex;
    gap: 20px;
}

.layout>main {
    flex: 1;
}
</style>
  