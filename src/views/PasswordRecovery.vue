<template>
  <div class="password-recovery">
    <el-row class="password-recovery-wrapper">
      <el-col class="password-recovery__form" :span="12">
        <el-col class="password-recovery__form-left" :span="8">
          <h3 class="password-recovery__form-left-title">Вспомнили пароль?</h3>

          <p class="password-recovery__form-left-text">Пройдите авторизацию прямо сейчас!</p>

          <el-button
            class="password-recovery__form-left-btn"
            @click="$router.push({ name: 'AuthorizationForm' })"
            >Авторизация</el-button
          >
        </el-col>
        <el-col class="password-recovery__form-right" :span="16">
          <h2 class="password-recovery__form-right-title">Восстановление пароля</h2>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-envelope" style="color: white"></i>

            <el-input placeholder="E-mail адрес" type="email" v-model.trim="email"></el-input>
          </div>
          <el-button class="password-recovery__form-right-btn">Сбросить пароль</el-button>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  email: '',
};
</script>

<style lang="scss" scoped>
.password-recovery {
  background-image: url(~@/assets/img/password-recovery-background.jpg);
  min-height: 100vh;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  &__form-left {
    background-color: $color_2;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 10px 0 0 10px;
    &-title {
      font-family: 'MontserratSemiBold';
      color: white;
      margin-bottom: 15px;
    }
    &-text {
      font-family: 'MonserratRegular';
      color: white;
      font-size: 14px;
      margin-bottom: 15px;
    }
    &-btn {
      @extend %baseButton;
      color: white;
      border-color: white;
    }
    &-btn:focus,
    &-btn:hover {
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &__form-right {
    margin: 30px 0 30px 0;
    padding: 0 25px;
    &-title {
      @extend %title;
      margin-bottom: 50px;
    }
    &-btn {
      @extend %baseButton;
    }
  }
  &-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  &__form {
    background: rgba(31, 29, 43, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 10px;
  }
}
</style>
