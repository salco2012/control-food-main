<template>
  <el-col :span="4">
    <el-menu
      default-active="1"
      class="sidebar-menu"
      background-color="#1f1d2b"
      text-color="#fff"
      active-text-color="#fff"
    >
      <div class="profile-info">
        <img
          v-if="infoCurrentUser.imageData"
          class="profile-info__avatar"
          :src="infoCurrentUser.imageData"
          alt="avatar"
        />
        <img
          v-else-if="infoCurrentUser.gender === 'мужской'"
          class="profile-info__avatar"
          src="../assets/img/icons/avatar-man.jpg"
          alt="avatar"
        />
        <img
          v-else
          class="profile-info__avatar"
          src="../assets/img/icons/avatar-woman.jpg"
          alt="avatar"
        />

        <div class="profile-info__user">
          <template>
            <h3 v-if="infoCurrentUser.name" class="profile-info__user-name">
              {{ infoCurrentUser.name }}
            </h3>
            <h3
              v-if="!infoCurrentUser.name && infoCurrentUser.gender === 'мужской'"
              class="profile-info__user-name"
            >
              Неопознанный кот
            </h3>
            <h3
              v-if="!infoCurrentUser.name && infoCurrentUser.gender === 'женский'"
              class="profile-info__user-name"
            >
              Неопознанная кошка
            </h3>
            <p class="profile-info__user-email">{{ infoCurrentUser.email }}</p>
            <button class="profile-info__user-exit" @click="exitProfile">
              Выйти
              <span style="font-size: 1.3rem">
                <i class="fa fa-sign-out-alt profile-info__user-exit-icon"></i>
              </span>
            </button>
          </template>
        </div>
      </div>
      <el-menu-item
        index="index"
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ 'active-item': routeName === item.routeName }"
        @click="
          routeName = item.routeName;
          $router.push({ name: item.routeName }).catch(()=>{});
        "
      >
        <img
          class="sidebar-menu__icon"
          :src="require(`../assets/img/icons/${item.src}`)"
          :alt="item.alt"
        />
        <span class="sidebar-menu__text">{{ item.text }}</span>
      </el-menu-item>
    </el-menu>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      routeName: null,
      menuItems: [
        {
          src: 'goals.png',
          text: 'Установленные цели',
          alt: 'goals',
          routeName: 'MyGoals',
        },
        {
          src: 'search-recipes.png',
          text: 'Поиск рецептов',
          alt: 'search-recipes',
          routeName: 'SearchRecipes',

        },
        {
          src: 'selected-recipes.png',
          text: 'Избранные рецепты',
          alt: 'selected-recipes',
          routeName: 'SelectedRecipes',
        },
        {
          src: 'user-rating.png',
          text: 'Рейтинг пользователей',
          alt: 'user-rating',
          routeName: 'UserRating',
        },
      ],
    };
  },
  created() {
    this.routeName = this.currentRoute;
  },
  methods: {
    exitProfile() {
      this.$router.push({ name: 'Home' }).catch(() => {});
      this.$store.commit('CLEAR_USER_UD'); // Очищаем UID
      this.$store.commit('CLEAR_INFO_USER'); // Очищаем информацию о пользователе
      this.$store.commit('CLEAR_SELECT_RECIPES'); // Очищаем рецепты в сторе.
    },
  },
  computed: {
    currentRoute() {
      return this.$route.name;
    },
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.profile-info {
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0 70px 20px;
  font-family: 'MontserratRegular';
  &__avatar {
    width: 70px;
    height: 70px;
    object-fit: cover;
    border: 2px solid $color_3;
    border-radius: 50%;
  }
  &__user {
    margin-left: 10px;
    &-name {
      font-size: 16px;
      margin-bottom: 5px;
    }
    &-email {
      font-family: 'MontserratMedium';
      font-size: 14px;
      color: $color_7;
      margin-bottom: 3px;
    }
    &-exit {
      font-size: 14px;
      background-color: transparent;
      border: none;
      color: $color_3;
      padding: 0;
      cursor: pointer;
      display: flex;
      align-items: center;
      &-icon {
        margin-left: 5px;
      }
    }
  }
}

.sidebar-menu {
  min-height: 100vh;
  position: sticky;
  top: 0;
  &__icon {
    width: 50px;
    height: 50px;
  }
  &__text {
    font-size: 16px;
    margin-left: 10px;
  }
}

.active-item {
  display: flex;
  align-items: center;
  background-color: $color_11 !important;
  height: 80px;
  width: 100%;
}
.el-menu-item {
  display: flex;
  align-items: center;
  height: 80px;
}
</style>
