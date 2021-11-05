<template>
  <div class="home">
    <div class="home__content">
      <el-button class="home__content-button" round
        >Сервис №1 по мнению журнала "Здоровье"</el-button
      >
      <h1 class="home__content-title">
        <span class="home__content-title_color">Забудьте</span> про диеты. <br />
        Ведь есть <br />FOOD ACCOUTING!
      </h1>

      <p class="home__content-description">
        Не знаете что приготовить? <br />На нашем сервисе вы найдете массу оригинальных рецептов.
        <br />А, так же сможете ввести детальный учет по съеденным каллориям.
      </p>
      <div class="home__content-buttons">
        <el-button class="home__content-btn" @click="$router.push({ name: 'RegistrationForm' })"
          >Регистрация</el-button
        >
        <el-button class="home__content-btn" @click="$router.push({ name: 'AuthorizationForm' })"
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
    <div>
      <img class="home__img-girl" src="@/assets/img/main-screen-girl.png" alt="girl" />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.home {
  padding: 25px 125px;
  color: white;
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
    line-height: 125%;
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
    margin-right: 20px;
    border: none;
    transition: ease-out 0.5s;
  }

  &__content-btn:hover {
    background-color: $color_6;
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
    max-height: 950px;
  }
}
</style>
