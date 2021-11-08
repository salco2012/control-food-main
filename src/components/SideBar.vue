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
          class="profile-info__avatar"
          src="https://shapka-youtube.ru/wp-content/uploads/2021/02/avatarka-dlya-skaypa-dlya-parney.jpg"
          alt="avatar"
        />
        <div class="profile-info__user">
          <h3 class="profile-info__user-name">Имя</h3>
          <p class="profile-info__user-email">Почта</p>
          <button class="profile-info__user-exit" @click="exitProfile">
            Выйти
            <span style="font-size: 1.3rem">
              <i class="fa fa-sign-out-alt profile-info__user-exit-icon"></i>
            </span>
          </button>
        </div>
      </div>
      <el-menu-item
        index="index"
        v-for="(item, index) in menuItems"
        :key="index"
        :class="{ 'active-item': currentIndex === index }"
        @click="currentIndex = index"
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
      currentIndex: null,
      menuItems: [
        {
          src: 'search-recipes.png',
          text: 'Поиск рецептов',
          alt: 'search-recipes',
        },
        {
          src: 'news.png',
          text: 'Интересные новости',
          alt: 'news',
        },
        {
          src: 'my-profile.png',
          text: 'Моя анкета',
          alt: 'my-profile',
        },
        {
          src: 'goals.png',
          text: 'Установленные цели',
          alt: 'goals',
        },
        {
          src: 'selected-recipes.png',
          text: 'Избранные рецепты',
          alt: 'selected-recipes',
        },
        {
          src: 'photo.png',
          text: 'Личные фотографии',
          alt: 'photo',
        },
      ],
    };
  },
  methods: {
    exitProfile() {
      this.$router.push({ name: 'Home' });
      this.$store.commit('EXIT_USER_PROFILE');
    },
  },
  // computed: {
  //   nameUser() {

  //   }
  // }
};
</script>

<style lang="scss" scoped>
.profile-info {
  display: flex;
  flex-wrap: wrap;
  margin: 40px 0 70px 20px;
  font-family: 'MonserratRegular';
  color: white;
  &__avatar {
    width: 70px;
    height: 70px;
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
  overflow: hidden;
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
