<template>
  <div class="sidebar-logo">
  </div>
</template>

<script>
export default {
  name: 'SidebarLogo',
  props: {
    collapse: {
      type: Boolean,
      required: true
    }
  }
}
</script>

<style scoped>
.sidebar-logo{
  background-color: blue;
  height: 70px;
}
</style>
