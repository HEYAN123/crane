<template>
  <div id="app" :class="{ 'is-component': isComponent }">
    <main-header v-if="lang !== 'play'"></main-header>
    <div class="main-cnt">
      <router-view></router-view>
    </div>
    <main-footer v-if="lang !== 'play' && !isComponent"></main-footer>
  </div>
</template>

<script>
import { use } from './locale';
import zhLocale from './locale/lang/zh-CN';

use(zhLocale);

export default {
  name: 'app',

  computed: {
    lang() {
      return 'zh-CN';
    },
    isComponent() {
      return /^component-/.test(this.$route.name || '');
    }
  },

  watch: {
    lang(val) {
      if (val === 'zh-CN') {
        this.suggestJump();
      }
    }
  },

  methods: {
    suggestJump() {
    }
  },

  mounted() {
    if (this.lang === 'zh-CN') {
      this.suggestJump();
    }
  }
};
</script>
