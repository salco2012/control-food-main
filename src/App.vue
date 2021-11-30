<template>
  <div id="app" v-loading.fullscreen="isLoading"
    element-loading-text="Загрузка..."
    element-loading-background="rgba(0, 0, 0, 0.8)">
    <el-container>
    <SideBar v-if="infoCurrentUser && isAuthenticated"/>
      <el-main>
        <vue-page-transition name="fade-in-down">
        <router-view />
        </vue-page-transition>
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
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
    isLoading() {
      return this.$store.state.isLoading;
    },
  },
};
</script>

<style lang="scss">
@import 'src/scss/reset.scss';

[v-cloak] { visibility: hidden !important; }

body {
  padding: 0;
  margin: 0;
  font-family: 'MontserratRegular';
  font-size: 16px;
  box-sizing: border-box;
  background-color: $color_1;
  color: white;
}

hr{
  border: 1px solid #393c49;
}

.el-main {
  padding: 0;
}

// Анимация
.overlay-top,  .overlay-right   {
    background: $color_3 !important;
}

 .overlay-left,  .overlay-bottom {
   background: $color_4 !important;
 }

</style>
