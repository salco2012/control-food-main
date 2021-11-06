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
          <el-form>
            <h2 class="registration-form__title">Регистрация</h2>
            <form-wrapper :validator="$v.formRegister">
              <el-form-item-extended name="name">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-address-card" style="color: white"></i>
                  <el-input
                    placeholder="Имя *"
                    v-model.trim="formRegister.name"
                    @input="$v.formRegister.name.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="email">
                <div class="wrapper-input">
                <i class="wrapper-input__icon fas fa-envelope" style="color: white"></i>
                <el-input
                  placeholder="E-mail адрес *"
                  type="email"
                  v-model.trim="formRegister.email"
                  @input="$v.formRegister.email.$touch()"
                ></el-input>
                </div>

              </el-form-item-extended>

              <el-form-item-extended name="password">
                <div class="wrapper-input">
                   <i class="wrapper-input__icon fas fa-key" style="color: white"></i>
                <el-input
                  placeholder="Пароль *"
                  type="password"
                  v-model.trim="formRegister.password"
                  @input="$v.formRegister.password.$touch()"
                ></el-input></div>

              </el-form-item-extended>

              <el-form-item-extended name="repeatPassword">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-key" style="color: white"></i>
                  <el-input
                    placeholder="Повторите пароль *"
                    type="password"
                    v-model.trim="formRegister.repeatPassword"
                    @input="$v.formRegister.repeatPassword.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="gender">
                <div class="registration-form__gender">
                  <i class="wrapper-input__icon fas fa-venus-mars" style="color: white"></i>
                  <p class="registration-form__gender-text">Пол:</p>
                  <el-radio-group
                    v-model="formRegister.gender"
                    @input="$v.formRegister.gender.$touch()"
                  >
                    <el-radio label="мужской">мужской</el-radio>
                    <el-radio label="женский">женский</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="height">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-child" style="color: white"></i>
                  <el-input
                    placeholder="Рост (см.)"
                    type="number"
                    v-model.trim="formRegister.height"
                    @input="$v.formRegister.height.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="weight">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-weight" style="color: white"></i>
                  <el-input
                    placeholder="Вес (кг.)"
                    type="number"
                    v-model.trim="formRegister.weight"
                    @input="$v.formRegister.weight.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>
              <el-button class="registration-form__submit-btn"
              type="submit" :disabled="$v.formRegister.$invalid"
                >Создать аккаунт</el-button
              >
            </form-wrapper>
          </el-form>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import {
  required, email, sameAs, minLength, between, helpers,
} from 'vuelidate/lib/validators';

const alphaRus = helpers.regex('alphaRus', /^[А-ЯЁа-яё]+$/);

export default {
  name: 'RegistrationForm',
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
  validations: {
    formRegister: {
      name: {
        required, alphaRus,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      repeatPassword: {
        required,
        sameAs: sameAs('password'),
      },

      height: {
        between: between(80, 240),
      },
      weight: {
        between: between(30, 300),
      },
    },
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

.el-form-item__error {
  margin-left: 25px;
  margin-top: -15px;
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
    margin-top: -10px;
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
