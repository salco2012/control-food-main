<template>
  <div class="registration">
    <el-row class="registration-wrapper">
      <el-col class="registration-form" :span="12">
        <el-col class="registration-form__auth-menu" :span="8">
          <h3 class="registration-form__auth-menu-title">Есть аккаунт?</h3>
          <p class="registration-form__auth-menu-text">Пройдите авторизацию!</p>
          <el-button
            class="registration-form__auth-menu-btc"
            @click="$router.push({ name: 'AuthorizationForm' })"
            >Авторизация</el-button
          >
        </el-col>
        <el-col class="registration-form__register" :span="16">
          <h2 class="registration-form__title">Регистрация</h2>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-address-card" style="color: white"></i>
            <el-input placeholder="Имя" v-model.trim="formRegister.name"></el-input>
          </div>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-envelope" style="color: white"></i>
            <el-input
              placeholder="E-mail адрес"
              type="email"
              v-model.trim="formRegister.email"
            ></el-input>
          </div>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-key" style="color: white"></i>
            <el-input
              placeholder="Пароль"
              type="password"
              v-model.trim="formRegister.password"
            ></el-input>
          </div>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-key" style="color: white"></i>
            <el-input
              placeholder="Повторите пароль"
              type="password"
              v-model.trim="formRegister.repeatPassword"
            ></el-input>
          </div>

          <div class="registration-form__gender">
            <i class="wrapper-input__icon fas fa-venus-mars" style="color: white"></i>
            <p class="registration-form__gender-text">Пол:</p>
            <el-radio-group v-model="formRegister.gender">
              <el-radio label="мужской">мужской</el-radio>
              <el-radio label="женский">женский</el-radio>
            </el-radio-group>
          </div>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-child" style="color: white"></i>
            <el-input
              placeholder="Рост"
              type="number"
              v-model.trim="formRegister.height"
            ></el-input>
          </div>

          <div class="wrapper-input">
            <i class="wrapper-input__icon fas fa-weight" style="color: white"></i>
            <el-input placeholder="Вес" type="number" v-model.trim="formRegister.weight"></el-input>
          </div>

          <el-button class="registration-form__submit-btn">Создать аккаунт</el-button>
          {{ formRegister.imageUrl }}
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      formRegister: {
        name: '',
        email: '',
        password: null,
        repeatPassword: null,
        gender: '',
        height: null,
        weight: null,
      },
    };
  },
};
</script>

<style lang="scss">
.el-radio__input.is-checked .el-radio__inner {
  border: $color_3;
  background: $color_3;
}
.el-radio__label {
  color: white;
}

.el-radio__input.is-checked + .el-radio__label {
  color: white;
}

.registration {
  min-height: 100vh;
  background-image: url(~@/assets/img/register-background.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;

  &-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
}

.registration-form {
  background: rgba(31, 29, 43, 0.5);
  backdrop-filter: blur(5px);
  border-radius: 10px;
  &__title {
    @extend %title;
    margin-bottom: 50px;
  }
  &__gender {
    display: flex;
    align-items: center;
    color: white;
    font-size: 16px;
    &-text {
      margin-right: 10px;
    }
  }
  &__register {
    margin: 30px 0 30px 0;
    padding: 0 25px;
  }
  &__auth-menu {
    background-color: $color_2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-top-left-radius: 10px;
    border-bottom-left-radius: 10px;
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
    &-btc {
      @extend %baseButton;
      color: white;
      border: 1px solid white;
      transition: ease-out 0.5s;
    }
    &-btc:hover,
    &-btc:focus {
      color: white;
      background-color: rgba(255, 255, 255, 0.2);
    }
  }
  &__submit-btn {
    @extend %baseButton;
    margin-top: 10px;
  }
}

.el-input__inner {
  background-color: inherit;
  border: none;
  border-bottom: 1px solid white;
  border-radius: 0;
  color: white;
  font-size: 16px;
}

.el-input__inner:focus {
  border-color: $color_3;
}

.registration-form__gender {
  margin-bottom: 20px;
}

.wrapper-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;
  &__icon {
    margin-right: 10px;
  }
}
</style>
