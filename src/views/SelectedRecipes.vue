<template>
  <div
    v-loading.fullscreen="isLoading"
    element-loading-text="Загрузка..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <div class="selected-recipes" v-if="selectedRecipes.length">
      <el-col :md="24">
        <h1 class="selected-recipes__title">Избранные рецепты</h1>
        <hr />
        <el-row :gutter="10" v-for="(rank, externalIndex) in ranks" :key="externalIndex">
          <el-col
            :xs="24"
            :sm="12"
            :lg="6"
            v-for="(item, index) in rank"
            :key="index"
          >
            <div class="select-card">
              <span
                style="font-size: 0.7em"
                class="select-card__onClose"
                @click="onCloseCard(index)"
              >
                <i class="fas fa-times"></i>
              </span>
              <img v-if="item.image" class="select-card__img" :src="item.image" />
              <img v-else src="../assets/img/No_image_available.png" class="select-card__img" />
              <div class="select-card__title-wrapper">
                <h1 class="select-card__title">{{ item.label }}</h1>
              </div>

              <div class="select-card__description">
                <div class="select-card__ingredients">
                  <el-collapse accordion>
                    <el-collapse-item title="Ингредиенты">
                      <div
                        class="select-card__ingredients-item"
                        v-for="(ingredientLine, ingredientIndex) in item.ingredientLines"
                        :key="`${index}_${ingredientIndex}`"
                      >
                        <div v-if="item.ingredients[ingredientIndex]">
                          <img
                            v-if="item.ingredients[ingredientIndex].image"
                            class="select-card__ingredients-logo"
                            :src="item.ingredients[ingredientIndex].image"
                          />
                          <img
                            v-else
                            src="../assets/img/No_image_available.png"
                            class="select-card__ingredients-logo"
                          />
                        </div>
                        <span class="select-card__ingredients-text">
                          {{ ingredientLine }}
                        </span>
                      </div>
                    </el-collapse-item>

                    <el-collapse-item title="Калорийность">
                      <p class="select-card__calories">{{ Math.round(item.calories) }} cal.</p>
                    </el-collapse-item>

                    <el-collapse-item title="Предостережения">
                      <el-tag type="warning" v-if="!item.cautions.length">
                        {{ 'No caveats' }}
                      </el-tag>
                      <div v-else>
                        <el-tag
                          type="warning"
                          v-for="(caution, cautionIndex) in item.cautions"
                          :key="cautionIndex"
                          style="margin-right: 10px"
                          >{{ caution }}</el-tag
                        >
                      </div>
                    </el-collapse-item>

                    <el-collapse-item title="Тип кухни">
                      <el-tag v-if="!item.cuisineType.length"> {{ 'No information' }}</el-tag>
                      <div v-else>
                        <el-tag v-for="cuisine in item.cuisineType" :key="cuisine.id">
                          {{ cuisine }}</el-tag
                        >
                      </div>
                    </el-collapse-item>

                    <div v-if="item.dishType">
                      <el-collapse-item title="Тип блюда">
                        <el-tag v-for="dish in item.dishType" :key="dish.id"> {{ dish }}</el-tag>
                      </el-collapse-item>
                    </div>
                    <div v-else>
                      <el-collapse-item title="Тип блюда">
                        <el-tag> {{ 'No data' }}</el-tag>
                      </el-collapse-item>
                    </div>

                    <el-collapse-item title="Этикетки здоровья">
                      <el-tag
                        type="success"
                        style="margin-right: 10px; margin-bottom: 10px"
                        v-for="healthLabel in item.healthLabels"
                        :key="healthLabel.id"
                      >
                        {{ healthLabel }}</el-tag
                      >
                    </el-collapse-item>

                    <el-collapse-item title="Тип еды">
                      <el-tag v-if="!item.mealType.length"> {{ 'No information' }}</el-tag>
                      <div v-else>
                        <el-tag v-for="meal in item.mealType" :key="meal.id"> {{ meal }}</el-tag>
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>

                <p class="search-recipes__source">Источник: {{ `«${item.source}»` }}</p>
                <el-link class="search-recipes__to-recipe" :href="item.url" target="_blank"
                  >Перейти к рецепту</el-link
                >
              </div>
            </div>
          </el-col>
        </el-row>
      </el-col>
    </div>
    <div class="selected-recipes" v-else>
      <el-col :span="20">
        <h1 class="selected-recipes__title">Избранные рецепты</h1>
        <hr />
        <h3 class="selected-recipes__no-info">Тут пока пусто :(</h3>
      </el-col>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedRecipes: [],
      isLoading: true,
    };
  },
  created() {
    this.getUserRecipes();
  },
  computed: {
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
    ranks() {
      const ranks = [];
      this.selectedRecipes.forEach((item, index) => {
        const rank = Math.floor(index / 4);
        if (!ranks[rank]) {
          ranks[rank] = [];
        }
        ranks[rank].push(item);
      });
      return ranks;
    },
  },
  methods: {
    getUserRecipes() {
      this.$store
        .dispatch('getForm')
        .then(() => {
          // Проверяем на наличие поля selectedRecipes в бд.
          if (this.infoCurrentUser.selectedRecipes) {
            // Если поле есть, парсим его и преобразуем в массив значений.
            const result = Object.values(JSON.parse(this.infoCurrentUser.selectedRecipes));
            // Если значение в массиве есть, записываем его в getUserRecipes
            if (result.length) {
              this.$store.commit('SET_SELECT_RECIPES', result);
              this.selectedRecipes = this.$store.getters.selectRecipes;
            }
          }
          this.isLoading = false;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    onCloseCard(index) {
      this.$store.commit('DELETE_SELECT_RECIPES', index);
      this.$store.dispatch('setSelectedRecipes', JSON.stringify(this.$store.getters.selectRecipes));
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-recipes {
  margin: 40px;
  &__no-info {
    font-family: 'MontserratRegular';
    color: $color_7;
  }
  &__title {
    @extend %title;
    color: white;
  }
}
.select-card {
  background-color: $color_2;
  margin-bottom: 10px;
  position: relative;
  &__onClose {
    position: absolute;
    top: 5px;
    right: 10px;
    cursor: pointer;
    color: $color_3;
    text-shadow: -1px 0 $color_2, 0 1px $color_2, 1px 0 $color_2, 0 -1px $color_2;
    color: $color_3;
  }
  &__img {
    width: 100%;
    height: 250px;
    object-fit: cover;
    display: block;
  }

  &__title-wrapper {
    background-color: $color_3;
  }

  &__title {
    text-align: center;
    line-height: 1.5;
    font-size: 16px;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0 10px;
  }

  &__description {
    padding: 10px;
  }

  &__ingredients-item {
    color: white;
    display: flex;
    align-items: center;
    margin-bottom: 10px;
  }

  &__ingredients-logo {
    width: 30px;
    border-radius: 50%;
    margin-right: 10px;
  }

  &__calories {
    color: white;
  }
}
.search-recipes {
  &__source {
    color: $color_7;
    font-size: 14px;
    margin: 10px 0;
  }

  &__to-recipe {
    @extend %baseButton;
    font-size: 18px;
    min-width: 250px;
    height: 40px;
    display: flex;
  }
}

//media
// xs 0-767px || sm 768px-991px || md 992px-1199px || lg 1200px - 1919px || xl 1920px +
@media screen and (max-width: 1919px) {
  .search-recipes {
    &__to-recipe {
      min-width: 180px;
      font-size: 16px;
    }
  }
}
@media screen and (max-width: 767px) {
  .selected-recipes {
    margin: 10px;
    &__title {
      font-size: 28px;
    }
  }
}
</style>

<style lang="scss">
.el-loading-spinner .path,
.el-loading-spinner .el-loading-text {
  stroke: $color_3;
  color: $color_3;
}
</style>
