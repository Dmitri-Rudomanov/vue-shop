<template>
  <div id="app" class="container">
    <nav-bar></nav-bar>
    <router-view v-slot="{ Component }">
      <KeepAlive include="Component">
        <component :is="Component"></component>
      </KeepAlive>
    </router-view>
  </div>
</template>

<script>
import NavBar from "./vue/NavBar.vue";

export default {
  name: "app",
  components: {
    NavBar,
  },
};
</script>
<style lang="scss"></style>
