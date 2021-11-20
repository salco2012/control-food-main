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
          <el-form @submit.prevent>
            <h2 class="password-recovery__form-right-title">Восстановление пароля</h2>
            <form-wrapper :validator="$v.passwordRecowery">
              <el-form-item-extended name="email">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-envelope" style="color: white"></i>
                  <el-input
                    placeholder="E-mail адрес *"
                    type="email"
                    v-model.trim="passwordRecowery.email"
                    @input="$v.passwordRecowery.email.$touch()"
                  ></el-input>
                  <input type="text" style="display: none" />
                  <!-- формы с одним элементом ввода всегда отправляются,
                  добавление еще одного ввода (и его скрытие) устаняет этот баг. -->
                </div>
              </el-form-item-extended>
            </form-wrapper>
            <el-button
              class="password-recovery__form-right-btn"
              type="submit"
              @click.prevent="resetPassword"
              :disabled="$v.passwordRecowery.$invalid"
              >Сбросить пароль</el-button
            >
          </el-form>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { required, email } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      passwordRecowery: {
        email: '',
      },
    };
  },
  methods: {
    resetPassword() {
      this.$store
        .dispatch('resetPassword', {
          email: this.passwordRecowery.email,
        })
        .then(() => {
          if (this.statusResetPassword) {
            this.$message({
              message: 'Ссылка на восстановление пароля отправленна!',
              type: 'success',
            });
            setTimeout(() => {
              this.$router.push({ name: 'AuthorizationForm' });
            }, 3000);
          } else {
            this.$message({
              message: 'Неверный email-адрес',
              type: 'error',
            });
          }
        });
    },
  },
  computed: {
    statusResetPassword() {
      return this.$store.state.UserAuth.resetPassword.successfulResetPassword;
    },
    errorMessageResetPassword() {
      return this.$store.state.UserAuth.resetPassword.errorResetPassword;
    },
  },
  validations: {
    passwordRecowery: {
      email: {
        required,
        email,
      },
    },
  },
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
      margin-bottom: 15px;
    }
    &-text {
  font-family: 'MontserratRegular';
      font-size: 14px;
      margin-bottom: 15px;
    }
    &-btn {
      @extend %baseButton;
    }
    &-btn:focus,
    &-btn:hover {
      background-color: rgba(255, 255, 255, 0.2);
      border: 1px solid white;
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
    &-btn[disabled] {
      cursor: not-allowed;
      background-color: white;
      color: #888;
      border: none;
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
