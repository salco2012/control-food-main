<template>
  <div id="app">
    <el-container>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>

<style lang="scss">
@import 'src/scss/reset.scss';

body {
  padding: 0;
  margin: 0;
  font-family: 'MonserratRegular';
  font-size: 16px;
  box-sizing: border-box;
}

.el-main {
  padding: 0;
}
</style>
