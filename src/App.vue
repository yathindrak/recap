<template>
  <div id="app">
    <nav-bar />
    <!--<div id="nav">-->
      <!--<router-link to="/">Home</router-link> |-->
      <!--<router-link to="/about">About</router-link>-->
    <!--</div>-->
    <router-view/>
  </div>
</template>

<style lang="scss">
#app {
  height: 100%;
  font-family: "Noto Sans", Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
<script>
import NavBar from "./components/NavBar";
export default {
  components: { NavBar }
};
</script>
