<template>
  <div>
    <el-row class="home hidden-md-and-down">
      <el-col span="12">
        <div class="home__content">
          <el-button class="home__content-button" round
            >Сервис №1 по мнению журнала "Здоровье"</el-button
          >
          <h1 class="home__content-title">
            <span class="home__content-title_color">Забудьте</span> про диеты. <br />
            Ведь есть <br />FOOD ACCOUTING!
          </h1>

          <p class="home__content-description">
            Не знаете что приготовить? <br />На нашем сервисе вы найдете массу оригинальных
            рецептов. <br />А, так же сможете ввести детальный учет по съеденным каллориям.
          </p>
          <div class="home__content-buttons">
            <el-button
              class="home__content-btn"
              @click="$router.push({ name: 'RegistrationForm' }).catch(() => {})"
              >Регистрация</el-button
            >
            <el-button
              class="home__content-btn"
              @click="$router.push({ name: 'AuthorizationForm' }).catch(() => {})"
              >Авторизация</el-button
            >
          </div>
          <div class="home__content-statistics">
            <div class="home__content-statistics_one">
              <h2 class="home__content-statistics_title">1.000+</h2>
              <p>Пользователей</p>
            </div>
            <div class="home__content-statistics_two">
              <h2 class="home__content-statistics_title">17.000+</h2>
              <p>Рецептов</p>
            </div>
            <div class="home__content-statistics_three">
              <h2 class="home__content-statistics_title">-38.000 кг</h2>
              <p>Растопленного жира</p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col span="12">
        <img class="home__img-girl" src="@/assets/img/main-screen-girl.png" alt="girl" />
      </el-col>
    </el-row>

    <el-row class="home hidden-lg-and-up">
        <div class="home__content">

        <img class="home__img-girl" src="@/assets/img/main-screen-girl-mobile.png" alt="girl" />

          <h1 class="home__content-title">
            <span class="home__content-title_color">Забудьте</span> про диеты. <br />
            Ведь есть <br />FOOD ACCOUTING!
          </h1>

          <el-button class="home__content-button" round
            >Сервис №1 по мнению журнала "Здоровье"</el-button
          >

          <p class="home__content-description">
            Не знаете что приготовить? <br />На нашем сервисе вы найдете массу оригинальных
            рецептов. <br />А, так же сможете ввести детальный учет по съеденным каллориям.
          </p>

          <div class="home__content-buttons">
            <el-button
              class="home__content-btn"
              @click="$router.push({ name: 'RegistrationForm' }).catch(() => {})"
              >Регистрация</el-button
            >
            <el-button
              class="home__content-btn"
              @click="$router.push({ name: 'AuthorizationForm' }).catch(() => {})"
              >Авторизация</el-button
            >
          </div>
          <div class="home__content-statistics">
            <div class="home__content-statistics_one">
              <h2 class="home__content-statistics_title">1.000+</h2>
              <p>Пользователей</p>
            </div>
            <div class="home__content-statistics_two">
              <h2 class="home__content-statistics_title">17.000+</h2>
              <p>Рецептов</p>
            </div>
            <div class="home__content-statistics_three">
              <h2 class="home__content-statistics_title">-38.000 кг</h2>
              <p>Растопленного жира</p>
            </div>
          </div>
        </div>
    </el-row>

  </div>
</template>

<script>
export default {
  created() {
    this.$store.commit('CLEAR_USER_UD'); // Очищаем UID
  },
};
</script>

<style lang="scss" scoped>
.home {
  padding: 20px 80px;
  min-height: 100vh;
  background-color: $color_1;
  display: flex;
  align-items: center;
  justify-content: space-between;
  &__content {
    &-button {
      background-color: transparent;
      border: 1px solid $color_6;
      color: $color_6;
      font-size: 16px;
      display: flex;
      text-align: start;
      cursor: inherit;
      margin-bottom: 30px;
    }
  }

  &__content-title {
    font-family: 'MontserratSemiBold';
    font-size: 56px;
    line-height: 120%;
    text-align: start;
    margin-bottom: 10px;
    &_color {
      color: $color_3;
    }
  }

  &__content-description {
    font-family: 'MontserratMedium';
    font-size: 20px;
    text-align: start;
    line-height: 160%;
    color: $color_7;
    margin-bottom: 30px;
  }

  &__content-buttons {
    text-align: start;
    margin-bottom: 30px;
  }

  &__content-btn {
    font-family: 'MontserratSemiBold';
    font-size: 18px;
    min-width: 250px;
    height: 50px;
    border-radius: 100px;
    height: 60px;
    background-color: $color_3;
    color: white;
    border: none;
    transition: ease-out 0.5s;
     margin: 0 10px 10px 0;

    &:hover {
      background-color: $color_6;
    }
  }

  &__content-statistics {
    display: flex;
    align-items: center;
    color: $color_7;
    &_one {
      text-align: start;
      margin-right: 55px;
    }
    &_two {
      text-align: start;
      margin-right: 55px;
    }
    &_three {
      text-align: start;
    }
    &_title {
      margin-bottom: 10px;
    }
  }

  &__img-girl {
    max-height: 900px;
  }
}

//media
// 0-575px || 576-767px || 768-991px || 992-1199px || 1200px+
@media screen and (min-width: 1200px) and (max-width: 1799px) {
.home{
    &__img-girl {
    max-height: 600px;
  }
}
}
@media screen and (max-width: 1199px){
.home {
  &__img-girl{
    max-height: 500px;
  }
  &__content-button{
    margin-bottom: 10px;
  }
  &__content-btn{
    margin-right: 10px;
}
}
}
@media screen and (max-width: 991px){
.home{
  &__img-girl{
    max-height: 400px;
  }
&__content-title{
  font-size: 42px;
}
&__content-btn{
  min-width: 200px;
}
}
}
@media screen and (max-width: 767px){
.home{
  padding: 20px 60px;
  &__img-girl{
    max-height: 350px;
  }
&__content-title{
  font-size: 32px;
}
&__content-description{
  font-size: 18px;
  margin-bottom: 20px;
  max-width: 80%;
}
&__content-btn{
  font-size: 16px;
  min-width: 200px;
}
&__content-statistics{
align-items: flex-start;
}
&__content-statistics_title{
  font-size: 18px;
}
}
}
@media screen and (max-width: 575px){
.home {
  padding: 20px;
  &__content-title{
    font-size: 26px;
  }
  &__content-button{
    display: none;
  }
  &__content-description{
    margin-bottom: 10px;
  }
  &__content-buttons{
    margin-bottom: 10px;
  }
  &__content-btn{
  height: 50px;
  margin: 0 10px 10px 0;
}
&__content-statistics{
  flex-direction: column;
  &_title{
    margin-bottom: 0;
  }
  p {
    margin-bottom: 10px;
  }
}
  &__img-girl{
    max-height: 280px;
  }
}
}
</style>
