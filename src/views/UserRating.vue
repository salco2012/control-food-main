<template>
<div class="user-rating">
  <h1 class="user-rating__title">
      Рейтинг пользователей
  </h1>
  <hr/>
</div>
</template>

<style lang="scss" scoped>
.user-rating{
  margin-top: 40px;
  margin-left: 40px;
  &__title {
    @extend %title;
    color: white;
  }
}
</style>
