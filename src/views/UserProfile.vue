<template>
  <div class="user-profile-wrapper">
    <el-row>

    <el-col :span="20">
      <div class="user-profile">
    <h1 class="user-profile__title">Анкета пользователя</h1>
    <hr class="user-profile__hr">
      </div>
    </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
};
</script>

<style lang="scss" scoped>
.user-profile{
margin-top: 40px;
margin-left: 40px;
&-wrapper{
background-color: $color_1;
min-height: 100vh;
}
&__title{
@extend %title;
color: white;
}
&__hr{
border: 1px solid #393C49;
}
}
</style>
