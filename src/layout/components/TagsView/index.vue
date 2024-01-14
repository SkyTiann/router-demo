<template>
    <div class="tags-view"></div>
</template>
  
<script>
import { groups } from '@/router/index.js'
import { routeMaps } from '@/router/compute.js'

export default {
    created() {
        console.log(routeMaps(groups))
    }
}
</script>

<style>
.tags-view {
    background-color: cornsilk;
    height: 50px;
}
</style>
  