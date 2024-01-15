<template>
    <div class="tags-view">
        <el-tag v-for="tag in tagsData" :key="tag.path" :closable="tagsData.length > 1" size="medium"
            :effect="$route.path === tag.path ? 'dark' : 'plain'" @close="tagClose(tag.path)" @click="tagClick(tag.path)">
            {{ tag.name }}
        </el-tag>
    </div>
</template>
  
<script>
import { groups } from '@/router/index.js'
import { routeMaps } from '@/router/compute.js'

export default {
    data() {
        return {
            routeMaps: {}
        }
    },
    methods: {
        tagClose(path) {
            this.$store.dispatch('tags/delTag', path)
            if (this.$route.path === path) {
                this.$router.push({ path: this.tagsData[this.tagsData.length - 1].path }).catch(e => { })
            }
        },
        tagClick(path) {
            if (this.$route.path === path) return
            this.$router.push({ path }).catch(e => { })
        }
    },
    computed: {
        tagsData() {
            return this.$store.state.tags.tags
        }
    },
    created() {
        this.routeMaps = routeMaps(groups)
        const { path } = this.$route
        this.$store.dispatch('tags/addTag', { path, name: this.routeMaps[path] })
    },
    watch: {
        $route(to) {
            const { path } = to
            this.$store.dispatch('tags/addTag', { path, name: this.routeMaps[path] })
        }
    }
}
</script>

<style>
.tags-view {
    display: flex;
    align-items: center;
    gap: 15px;
    height: 50px;
}

.tags-view>.el-tag {
    cursor: pointer;
}
</style>
  