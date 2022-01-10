<template>
  <div class="layout">
    <Header></Header>
    <router-view></router-view>
  </div>
</template>

<script>
import Header from "./header";
export default {
  name: 'HelloWorld',
  components: {Header},
  props: {
    msg: String
  }
}
</script>

<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
