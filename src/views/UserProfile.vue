<template>
  <div v-if="infoCurrentUser">
    <el-row>
      <el-col :span="20">
        <div class="user-profile">
          <h1 class="user-profile__title">Анкета пользователя</h1>
          <hr class="user-profile__hr" />
          <el-row :gutter="10">
            <el-col :span="6">
              <div class="card">
                <div v-if="infoCurrentUser">
                  <img
                    v-if="infoCurrentUser.imageData"
                    class="card__avatar"
                    :src="infoCurrentUser.imageData"
                    alt="avatar"
                  />

                  <img
                    v-else-if="infoCurrentUser.gender === 'мужской'"
                    class="card__avatar"
                    src="../assets/img/icons/avatar-man.jpg"
                    alt="avatar"
                  />

                  <img
                    v-else
                    class="card__avatar"
                    src="../assets/img/icons/avatar-woman.jpg"
                    alt="avatar"
                  />
                </div>

                <h2 class="card__title">Пол:</h2>

                <div class="card__gender">
                  <p class="card__gender-description">{{ infoCurrentUser.gender }}</p>

                  <span
                    v-if="infoCurrentUser.gender === 'мужской'"
                    class="fas fa-mars"
                    style="font-size: 24px; color: #5874ee"
                  >
                  </span>

                  <span v-else class="fas fa-venus" style="font-size: 24px; color: #fb8fff"> </span>
                </div>
              </div>
            </el-col>

            <el-col :span="6">
              <div class="card">
                <h2 class="card__title">Текущий рост:</h2>
                <div class="card__height">
                  <p v-if="infoCurrentUser.height" class="card__height-description">
                    {{ infoCurrentUser.height }} <span class="sm">(см.)</span>
                  </p>
                  <p v-else class="card__height-description" style="margin-right: 10px">-</p>
                  <span class="fas fa-ruler-vertical" style="font-size: 32px"> </span>
                </div>
                <div class="btn-group">
                  <el-button class="btn-minus" circle>-</el-button>
                  <el-button class="btn-plus" circle>+</el-button>
                </div>
              </div>
            </el-col>
            <el-col :span="6">
              <div class="card">
                <h2 class="card__title">Текущий вес:</h2>
                <div class="card__weight">
                  <p v-if="infoCurrentUser.weight" class="card__weight-description">
                    {{ infoCurrentUser.weight }} <span class="kg">(кг.)</span>
                  </p>
                  <p v-else class="card__weight-description" style="margin-right: 10px">-</p>
                  <span class="fas fa-weight" style="font-size: 32px"></span>
                </div>
                <div class="btn-group">
                  <el-button class="btn-minus" circle>-</el-button>
                  <el-button class="btn-plus" circle>+</el-button>
                </div>
              </div>
            </el-col>
          </el-row>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserProfile',
  computed: {
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
  },
};
</script>

<style lang="scss" scoped>
.user-profile {
  margin-top: 40px;
  margin-left: 40px;
  &__title {
    @extend %title;
    color: white;
  }
  &__hr {
    border: 1px solid #393c49;
  }
  .card {
    padding: 15px;
    background: $color_2;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    &__avatar {
      width: 75px;
      height: 75px;
      border-radius: 50%;
      border: 2px solid $color_3;
      margin-bottom: 10px;
    }
    &__title {
      font-family: 'MontserratMedium';
      margin-bottom: 10px;
    }
    &__gender {
      display: flex;
      align-items: center;
      justify-content: center;
      &-description {
        font-size: 20px;
        margin-right: 5px;
      }
      &-icon {
        font-size: 18px;
      }
    }
    &__height {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      &-description {
        font-family: 'MontserratMedium';
        font-size: 36px;
        .sm {
          font-size: 16px;
          margin-right: 10px;
          margin-left: -5px;
        }
      }
    }
    &__weight {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      &-description {
        font-family: 'MontserratMedium';
        font-size: 36px;
        .kg {
          font-size: 16px;
          margin-right: 10px;
          margin-left: -5px;
        }
      }
    }
    .btn-group {
      display: flex;
      align-items: center;
      justify-content: center;
      .btn-minus {
        @extend %minusButton;
      }
      .btn-plus {
        @extend %plusButton;
      }
    }
  }
}
</style>
