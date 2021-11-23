<template>
  <div class="error-page">
    <div class="error-page__info">
      <img src="../assets/img/error404.png" alt="error404" height="150" />
      <h1 class="error-page__title">Ищете что-то интересное на нашем сайте?</h1>
      <p class="error-page__description">
        К сожалению, страница, которую Вы запрашиваете, не существует…
      </p>
      <el-button class="error-page__btn" @click="$router.push({ name: 'Home' }).catch(()=>{})"
        >На главную</el-button
      >
    </div>
  </div>
</template>

<style lang="scss" scoped>
.error-page {
  background-color: $color_1;
  min-height: 100vh;
  &__info {
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  &__title {
    @extend %title;
    color: white;
    margin-top: 20px;
    margin-bottom: 20px;
  }
  &__description {
    margin-bottom: 30px;
  }
  &__btn {
    @extend %baseButton;
  }
}
</style>
