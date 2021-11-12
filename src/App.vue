<template>
  <div id="app">
    <el-container>
    <SideBar  v-if="isAuthenticated"/>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import SideBar from './components/SideBar.vue';

export default {
  name: 'App',
  components: {
    SideBar,
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.UserAuth.user.isAuthenticated;
    },
  },
};
</script>

<style lang="scss">
@import 'src/scss/reset.scss';

body {
  padding: 0;
  margin: 0;
  font-family: 'MonserratRegular';
  font-size: 16px;
  box-sizing: border-box;
  background-color: $color_1;
  color: white;
}

.el-main {
  padding: 0;
}
</style>
