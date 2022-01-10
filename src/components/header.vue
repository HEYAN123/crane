<template>
  <div class="header-con">
    header
  </div>
</template>

<script>
export default {
  name: 'Header',
  props: {
    msg: String
  }
}
</script>

<style scoped>
.header-con {
  position: relative;
  height: 80px;
  background-color: #eee;
}
</style>
