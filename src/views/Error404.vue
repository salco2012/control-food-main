<template>
  <div class="error-page">
    <div class="error-page__info">
      <img src="../assets/img/error404.png" class="error-page__img" alt="error404" height="150" />
      <h1 class="error-page__title">Ищете что-то интересное на нашем сайте?</h1>
      <p class="error-page__description">
        К сожалению, страница, которую Вы запрашиваете, не существует…
      </p>
      <el-button class="error-page__btn" @click="$router.push({ name: 'Home' }).catch(() => {})"
        >На главную</el-button
      >
    </div>
  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('CLEAR_USER_UD'); // Очищаем UID
    this.$store.commit('CLEAR_INFO_USER'); // Очищаем информацию о пользователе
    this.$store.commit('CLEAR_SELECT_RECIPES'); // Очищаем рецепты в сторе.
  },
};
</script>

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
//media
// xs 0-767px || sm 768px-991px || md 992px-1199px || lg 1200px - 1919px || xl 1920px +
@media screen and (max-width: 1919px) {
  .error-page {
    text-align: center;
    &__title {
      font-size: 26px;
    }
    &__img {
      height: 120px;
    }
    &__description {
      font-size: 14px;
      line-height: 20px;
    }
  }
}
</style>
