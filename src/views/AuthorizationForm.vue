<template>
  <div class="authorization">
    <el-row class="authorization-wrapper">
      <el-col class="authorization-form" :xs="20" :sm="20" :md="20" :lg="16" :xl="11">
        <el-col class="recover-password hidden-xs-only" :span="8">
          <h3 class="recover-password__title">Забыли пароль?</h3>
          <p class="recover-password__text">Установите новый!</p>
          <el-button
            class="recover-password__btn"
            @click="$router.push({ name: 'PasswordRecovery' }).catch(() => {})"
            >Восстановить пароль</el-button
          >
        </el-col>
        <el-col class="authorization-form__auth" :span="16" :xs="24">
          <el-form>
            <h2 class="authorization-form__title">Авторизация</h2>

            <form-wrapper :validator="$v.formAuthorization">
              <el-form-item-extended name="email">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-envelope"></i>
                  <el-input
                    placeholder="E-mail адрес *"
                    type="email"
                    v-model.trim="formAuthorization.email"
                    @input="$v.formAuthorization.email.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>
              <el-form-item-extended name="password">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-key"></i>
                  <el-input
                    placeholder="Пароль *"
                    type="password"
                    v-model.trim="formAuthorization.password"
                    @input="$v.formAuthorization.password.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>
            </form-wrapper>
            <el-button
              :disabled="$v.formAuthorization.$invalid"
              class="authorization-form__submit-btn"
              type="submit"
              @click.prevent="authorization"
              >Войти в кабинет</el-button
            >
            <el-button
              class="recover-password__btn hidden-sm-and-up"
              @click="$router.push({ name: 'PasswordRecovery' }).catch(() => {})"
              >Восстановить пароль</el-button
            >
          </el-form>
        </el-col>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import { required, email, minLength } from 'vuelidate/lib/validators';

export default {
  data() {
    return {
      formAuthorization: {
        email: '',
        password: null,
      },
    };
  },
  methods: {
    authorization() {
      this.$store
        .dispatch('authorization', {
          email: this.formAuthorization.email,
          password: this.formAuthorization.password,
        })
        .then(() => {
          if (this.isAuthenticated) {
            this.$message({
              message: 'Успешная авторизация!',
              type: 'success',
            });
            this.$store.commit('LOADING_TRUE');
            this.$router.push({ name: 'MyGoals' }).catch(() => {});
          } else {
            this.$message({
              message: 'Некорректные данные :(',
              type: 'error',
            });
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.UserAuth.user.isAuthenticated;
    },
  },
  validations: {
    formAuthorization: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
    },
  },
};
</script>
<style lang="scss" scoped>
.authorization {
  background-image: url(~@/assets/img/authorization-background.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  min-height: 100vh;
  &-wrapper {
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }
  .recover-password {
    background-color: $color_2;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 10px 0 0 10px;
    &__title {
      font-family: 'MontserratSemiBold';
      margin-bottom: 15px;
    }
    &__text {
      font-family: 'MontserratRegular';
      font-size: 14px;
      margin-bottom: 15px;
    }
    &__btn {
      @extend %baseButton;

      &:focus,
      &:hover {
        background-color: rgba(255, 255, 255, 0.2);
        border: 1px solid white;
      }
    }
  }

  .authorization-form {
    background: rgba(31, 29, 43, 0.5);
    backdrop-filter: blur(5px);
    border-radius: 10px;
    &__title {
      @extend %title;
      margin-bottom: 50px;
    }
    &__submit-btn {
      @extend %baseButton;
      margin-top: 20px;
    }
    &__submit-btn[disabled] {
      cursor: not-allowed;
      background-color: white;
      color: #888;
      border: none;
    }
    &__auth {
      margin: 30px 0 30px 0;
      padding: 0 25px;
    }
  }
}

//media
// 0-575px || 576-767px || 768-991px || 992-1199px || 1200px+
@media screen and (max-width: 991px) {
  .authorization {
  .recover-password__btn {
    padding: 0px;
    font-size: 16px;
    min-width: 200px ;
  }
  }
}
@media screen and (max-width: 767px) {
    .authorization{
  .authorization-form__auth {
    padding: 10px;
  }
  .authorization-form__title {
    font-size: 28px;
    margin-bottom: 30px;
  }
  .authorization-form__submit-btn {
    height: 40px;
    padding: 0;
    max-width: 200px;
    margin-top: 10px;
    margin-right: 10px;
  }
  .recover-password__btn {
    height: 40px;
    min-width: 250px;
    margin: 0;
    margin-top: 10px;
  }
  }
}
</style>
