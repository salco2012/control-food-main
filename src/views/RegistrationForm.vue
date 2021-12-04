<template>
  <div class="registration">
    <el-row class="registration-wrapper">
      <el-col class="registration-form" :xs="20" :sm="18" :md="16" :lg="20" :xl="16">
        <el-col class="registration-form__auth-menu hidden-md-and-down" :span="8">
          <h3 class="registration-form__auth-menu-title">Есть аккаунт?</h3>

          <p class="registration-form__auth-menu-text">Пройдите авторизацию!</p>

          <el-button
            class="registration-form__auth-menu-btn"
            @click="$router.push({ name: 'AuthorizationForm' }).catch(() => {})"
            >Авторизация</el-button
          >
        </el-col>
        <el-col class="registration-form__register" :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
          <el-form>
            <h2 class="registration-form__title">Регистрация</h2>
            <form-wrapper :validator="$v.formRegister">
              <el-form-item-extended name="name">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-address-card"></i>
                  <el-input
                    placeholder="Имя"
                    v-model.trim="formRegister.name"
                    @input="$v.formRegister.name.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="email">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-envelope"></i>
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
                  <i class="wrapper-input__icon fas fa-key"></i>
                  <el-input
                    placeholder="Пароль *"
                    type="password"
                    v-model.trim="formRegister.password"
                    @input="$v.formRegister.password.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="repeatPassword">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-key"></i>
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
                  <i class="wrapper-input__icon fas fa-venus-mars"></i>
                  <p class="registration-form__gender-text">Пол * :</p>
                  <el-radio-group v-model="formRegister.gender">
                    <el-radio label="мужской">мужской</el-radio>
                    <el-radio label="женский">женский</el-radio>
                  </el-radio-group>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="age">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-heart"></i>
                  <el-input
                    placeholder="Возраст (кол-во лет) *"
                    type="number"
                    v-model.trim="formRegister.age"
                    @input="$v.formRegister.age.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="height">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-child"></i>
                  <el-input
                    placeholder="Рост (см.) *"
                    type="number"
                    v-model.trim="formRegister.height"
                    @input="$v.formRegister.height.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <el-form-item-extended name="weight">
                <div class="wrapper-input">
                  <i class="wrapper-input__icon fas fa-weight"></i>
                  <el-input
                    placeholder="Вес (кг.) *"
                    type="number"
                    v-model.trim="formRegister.weight"
                    @input="$v.formRegister.weight.$touch()"
                  ></el-input>
                </div>
              </el-form-item-extended>

              <div class="photo-upload">
                <div class="file-upload-form">
                  <input
                    type="file"
                    @change="previewThumbnail"
                    name="photo-upload-button"
                    id="photo-upload-button"
                    accept="image/*"
                    class="input-file"
                  />
                  <label for="photo-upload-button">Аватарка</label>
                </div>
                <div class="image-preview" v-if="formRegister.imageData.length > 0">
                  <img :src="formRegister.imageData" class="image-preview__img" />
                </div>
              </div>
            </form-wrapper>
            <el-button
              class="registration-form__submit-btn"
              type="submit"
              @click.prevent="registration"
              :disabled="$v.formRegister.$invalid"
              >Создать аккаунт</el-button
            >
            <el-button
            class="registration-form__auth-menu-btn hidden-lg-and-up"
            @click="$router.push({ name: 'AuthorizationForm' }).catch(() => {})"
            >Авторизация</el-button
          >
            <div class="registration__notification">
              * - поля являются обязательными и необходимыми для точного расчета дальнейших
              показателей!
            </div>
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
        imageData: '',
        age: '',
      },
    };
  },
  methods: {
    previewThumbnail: function getPreview(event) {
      const input = event.target;
      if (input.files && input.files[0]) {
        const reader = new FileReader();
        reader.onload = (e) => {
          this.formRegister.imageData = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
      }
    },
    registration() {
      this.$store
        .dispatch('registration', {
          email: this.formRegister.email,
          password: this.formRegister.password,
        })
        .then(() => {
          if (this.isAuthenticated) {
            this.$message({
              message: 'Успешная регистрация, поздравляем!',
              type: 'success',
            });
            this.$store.commit('LOADING_TRUE');
            this.$store.dispatch('setForm', this.formRegister);
            this.$store.dispatch('getForm');
          } else {
            this.$message({
              message: 'Электронная почта уже используется :(',
              type: 'error',
            });
          }
        })
        .then(() => {
          if (this.isAuthenticated) {
            this.$router.push({ name: 'MyGoals' }).catch(() => {});
          }
        });
    },
  },
  computed: {
    isAuthenticated() {
      return this.$store.state.UserAuth.user.isAuthenticated;
    },
  },
  validations: {
    formRegister: {
      name: {
        alphaRus,
      },
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(6),
      },
      gender: {
        required,
      },
      repeatPassword: {
        required,
        sameAs: sameAs('password'),
      },
      age: {
        required,
        between: between(6, 100),
      },
      height: {
        required,
        between: between(80, 240),
      },
      weight: {
        required,
        between: between(30, 300),
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.registration {
  min-height: 100vh;
  background-image: url(~@/assets/img/register-background.jpg);
  background-repeat: no-repeat;
  background-position: center center;
  background-size: cover;
  &-wrapper {
    padding: 20px 0;
    display: flex;
    justify-content: center;
    width: 100%;
    position: absolute;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
  }

  &__notification {
    font-size: 12px;
    color: $color_3;
    margin-top: 10px;
    line-height: 16px;
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
      margin-bottom: 15px;
    }
    &-text {
  font-family: 'MontserratRegular';
      font-size: 14px;
      margin-bottom: 15px;
    }
    &-btn {
      @extend %baseButton;
      color: white;
      border: 1px solid white;
      transition: ease-out 0.5s;
    }
    &-btn:hover,
    &-btn:focus {
        background-color: rgba(255, 255, 255, 0.2);
        border: 1px solid white;
    }
  }
  &__submit-btn {
    @extend %baseButton;
    margin-top: 10px;
  }
  &__submit-btn[disabled] {
      cursor: not-allowed;
      background-color: white;
      color: #888;
      border: none;
    }
}

// Стили для аватарки
.photo-upload {
  height: auto;
  margin: 20px 0;
  position: relative;
  width: 100%;
  .input-file {
    height: 0.1px;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    width: 0.1px;
    z-index: -1;

    &:focus + label {
      border-color: $color_3;
    }

    & + label {
      background: transparent;
      border: 2px solid rgb(255, 255, 255);
      border-radius: 50%;
      color: rgb(255, 255, 255);
      display: inline-block;
      font-size: 12px;
      font-weight: 500;
      height: 100px;
      line-height: 100px;
      text-align: center;
      width: 100px;

      &:hover,
      &:focus {
        border-color: $color_6;
        cursor: pointer;
      }
    }
  }
  .image-preview {
    border-radius: 50%;
    height: 100px;
    left: 0;
    pointer-events: none;
    position: absolute;
    right: 0;
    top: 0;
    width: 100px;

    &__img {
      border: 2px solid $color_3;
      border-radius: 50%;
      height: 100px;
      object-fit: cover;
      object-position: center;
      width: 100px;
    }
  }
}

.wrapper-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  &__icon {
    margin-right: 10px;
  }
}

.el-input__inner {
  background-color: inherit;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  border-radius: 0;
  font-size: 16px;
}

.el-input__inner:focus {
  border-color: $color_3;
}

//media
// xs 0-767px || sm 768px-991px || md 992px-1199px || lg 1200px - 1919px || xl 1920px +
@media screen and (max-width: 575px) {
 .registration-form {
     &__title{
       font-size: 26px;
       margin-bottom: 20px;
     }
     &__submit-btn{
       min-width: 200px;
       margin: 0 10px 10px 0;
     }
     &__gender{
       flex-direction: column;
       align-items: flex-start;
     }
     &__auth-menu-btn{
       min-width: 200px;
       margin: 0;
     }
 }
}
@media screen and (max-width: 991px){
 .registration-form {
     &__submit-btn{
       min-width: 200px;
       margin: 0 10px 10px 0;
     }
     &__auth-menu-btn{
       min-width: 200px;
       margin: 0;
     }
 }
}
</style>

// Переопределяем стили библиотеки element.io
<style lang="scss">
.wrapper-input {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 10px;
  &__icon {
    margin-right: 10px;
  }
}

.el-input__inner {
  background-color: inherit;
  border: none;
  border-bottom: 1px solid white;
  color: white;
  border-radius: 0;
  font-size: 16px;
}

.el-input__inner:focus {
  border-color: $color_3;
}

//media
// xs 0-767px || sm 768px-991px || md 992px-1199px || lg 1200px - 1919px || xl 1920px +
@media screen and (max-width: 767px) {

}
</style>
