<template>
  <div
    v-loading.fullscreen="isLoading"
    element-loading-text="Загрузка..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
  >
    <el-col class="search-recipes" v-if="receptAll.length" :span="20">
      <h1 class="search-recipes__title">Поиск рецептов</h1>
      <hr />

      <div class="getDishType">
        <h3 class="getDishType__title">Тип блюда:</h3>
        <el-button
          v-for="(btn, btnIndex) in dishTypeButtons"
          :key="btnIndex"
          class="getDishType__btn"
          :class="{ getDishType__active: dishTypeActive === btn.dishTypeEn }"
          @click="
            getDishType(btn.dishTypeEn);
            dishTypeActive = btn.dishTypeEn;
          "
          >{{ btn.dishTypeRus }}</el-button
        >
      </div>

      <el-row :gutter="10" v-for="(rank, externalIndex) in ranks" :key="externalIndex">
        <el-col :span="6" v-for="(item, index) in rank" :key="index">
          <div class="recipe-card">
            <img v-if="item.recipe.image" class="recipe-card__img" :src="item.recipe.image" />
            <img v-else src="../assets/img/No_image_available.png" class="recipe-card__img" />
            <div class="recipe-card__title-wrapper">
              <h1 class="recipe-card__title">{{ upgradeTitle(item.recipe.label) }}</h1>
            </div>

            <div class="recipe-card__description">
              <div class="recipe-card__ingredients">
                <el-collapse accordion v-model="autoClosed">
                  <el-collapse-item title="Ингредиенты">
                    <div
                      class="recipe-card__ingredients-item"
                      v-for="(ingredientLine, ingredientIndex) in item.recipe.ingredientLines"
                      :key="`${index}_${ingredientIndex}`"
                    >
                      <div v-if="item.recipe.ingredients[ingredientIndex]">
                        <img
                          v-if="item.recipe.ingredients[ingredientIndex].image"
                          class="recipe-card__ingredients-logo"
                          :src="item.recipe.ingredients[ingredientIndex].image"
                        />
                        <img
                          v-else
                          src="../assets/img/No_image_available.png"
                          class="recipe-card__ingredients-logo"
                        />
                      </div>
                      <img
                        v-if="!item.recipe.ingredients[ingredientIndex]"
                        src="../assets/img/No_image_available.png"
                        class="recipe-card__ingredients-logo"
                      />
                      <span class="recipe-card__ingredients-text">
                        {{ ingredientLine }}
                      </span>
                    </div>
                  </el-collapse-item>

                  <el-collapse-item title="Калорийность">
                    <p class="recipe-card__calories">{{ Math.round(item.recipe.calories) }} cal.</p>
                  </el-collapse-item>

                  <el-collapse-item title="Предостережения">
                    <el-tag type="warning" v-if="!item.recipe.cautions.length">
                      {{ 'No caveats' }}
                    </el-tag>
                    <div v-else>
                      <el-tag
                        type="warning"
                        v-for="(caution, cautionIndex) in item.recipe.cautions"
                        :key="cautionIndex"
                        style="margin-right: 10px"
                        >{{ caution }}</el-tag
                      >
                    </div>
                  </el-collapse-item>

                  <el-collapse-item title="Тип кухни">
                    <el-tag v-if="!item.recipe.cuisineType.length"> {{ 'No information' }}</el-tag>
                    <div v-else>
                      <el-tag v-for="cuisine in item.recipe.cuisineType" :key="cuisine.id">
                        {{ cuisine }}</el-tag
                      >
                    </div>
                  </el-collapse-item>

                  <div v-if="item.recipe.dishType">
                    <el-collapse-item title="Тип блюда">
                      <el-tag v-for="dish in item.recipe.dishType" :key="dish.id">
                        {{ dish }}</el-tag
                      >
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
                      v-for="healthLabel in item.recipe.healthLabels"
                      :key="healthLabel.id"
                    >
                      {{ healthLabel }}</el-tag
                    >
                  </el-collapse-item>

                  <el-collapse-item title="Тип еды">
                    <el-tag v-if="!item.recipe.mealType.length"> {{ 'No information' }}</el-tag>
                    <div v-else>
                      <el-tag v-for="meal in item.recipe.mealType" :key="meal.id">
                        {{ meal }}</el-tag
                      >
                    </div>
                  </el-collapse-item>
                </el-collapse>
              </div>

              <div class="favorites" @click="toggleSelectedRecipes(item, index)">
                <i
                  class="fas fa-star favorites__icon"
                  :class="{ isFavorites: isItemAdded(item) }"
                ></i>
                <span>
                  {{ isItemAdded(item) ? 'Удалить из избранного' : 'Добавить в избранное' }}
                </span>
              </div>

              <p class="search-recipes__source">Источник: {{ `«${item.recipe.source}»` }}</p>
              <el-link class="search-recipes__to-recipe" :href="item.recipe.url" target="_blank"
                >Перейти к рецепту</el-link
              >
            </div>
          </div>
        </el-col>
      </el-row>
      <el-pagination
        v-if="receptAll.length"
        background
        layout="prev, pager, next"
        :total="receptAll.length + 20"
        :page-size="pageSize"
        @current-change="setPage"
      ></el-pagination>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchRecipes: null,
      receptAll: [],
      linkToNext: '',
      isLoading: true,
      page: 1,
      pageSize: 20,
      autoClosed: [],
      dishTypeActive: null,
      dishTypeButtons: [
        {
          dishTypeRus: 'Печенье',
          dishTypeEn: 'cookie',
        },
        {
          dishTypeRus: 'Хлеб',
          dishTypeEn: 'bread',
        },
        {
          dishTypeRus: 'Хлопья',
          dishTypeEn: 'flakes',
        },
        {
          dishTypeRus: 'Приправы и соусы',
          dishTypeEn: 'condiments and sauces',
        },
        {
          dishTypeRus: 'Десерты',
          dishTypeEn: 'desserts',
        },
        {
          dishTypeRus: 'Напитки',
          dishTypeEn: 'beverages',
        },
        {
          dishTypeRus: 'Основные блюда',
          dishTypeEn: 'main dish',
        },
        {
          dishTypeRus: 'Блины',
          dishTypeEn: 'pancakes',
        },
        {
          dishTypeRus: 'Салаты',
          dishTypeEn: 'salads',
        },
        {
          dishTypeRus: 'Бутерброды',
          dishTypeEn: 'sandwiches',
        },
        {
          dishTypeRus: 'Гарнир',
          dishTypeEn: 'garnish',
        },
        {
          dishTypeRus: 'Суп',
          dishTypeEn: 'soup',
        },
        {
          dishTypeRus: 'Сладости',
          dishTypeEn: 'sweets',
        },
      ],
    };
  },
  created() {
    this.getRecept().then(() => {
      this.isLoading = false;
    });
    this.getUserRecipes();
  },
  computed: {
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
    ranks() {
      const ranks = [];
      this.pagedRecept.forEach((item, index) => {
        const rank = Math.floor(index / 4);
        if (!ranks[rank]) {
          ranks[rank] = [];
        }
        ranks[rank].push(item);
      });
      return ranks;
    },
    pagedRecept() {
      return this.receptAll.slice(
        this.pageSize * this.page - this.pageSize,
        this.pageSize * this.page,
      );
    },
  },
  methods: {
    // Метод для обрезки длинных строк
    upgradeTitle(str) {
      return str.length > 48 ? `${str.slice(0, 47)}…` : str;
    },
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
            }
          }
        })
        .catch((error) => console.error(error));
    },
    nullifyАutoСlose() {
      this.autoClosed = [];
    },
    isItemAdded(item) {
      return this.$store.getters.selectRecipes.some((elem) => elem.url === item.recipe.url);
    },
    toggleSelectedRecipes(item) {
      const result = this.isItemAdded(item);
      if (result) {
        // Получаем индекс элемента который нужно удалить
        const deleteIndex = this.$store.getters.selectRecipes.findIndex(
          (el) => el.url === item.recipe.url,
        );
        // Удаляем кликнутый элемент из массива
        this.$store.commit('DELETE_SELECT_RECIPES', deleteIndex);
        // После удаления, перезаписываем в бд. обновленные данные.
        this.$store.dispatch(
          'setSelectedRecipes',
          JSON.stringify(this.$store.getters.selectRecipes),
        );
      } else {
        this.$store.commit('PUSH_SELECT_RECIPES', item.recipe);
        this.$store.dispatch(
          'setSelectedRecipes',
          JSON.stringify(this.$store.getters.selectRecipes),
        );
      }
      return result;
    },
    async getDishType(dishType) {
      try {
        this.isLoading = true;
        this.receptAll = [];
        const recept = await fetch(
          `https://api.edamam.com/api/recipes/v2?type=public&q=${dishType}&app_id=52d453a9&app_key=%20ca99304a9de5bc6c29f01da311d0ba25`,
        );
        const result = await recept.json();
        this.receptAll.push(...result.hits);
        this.page = 1;
        // eslint-disable-next-line no-underscore-dangle
        this.linkToNext = result._links.next.href;
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        this.receptAll = [];
        this.$message({
          message: 'Слишком много запросов, попробуйте через 30 сек :(',
          type: 'error',
        });
        console.error(error);
      }
    },
    async getRecept() {
      try {
        const recept = await fetch(
          'https://api.edamam.com/api/recipes/v2?type=public&q=%20hen&app_id=52d453a9&app_key=%20ca99304a9de5bc6c29f01da311d0ba25',
        );
        const result = await recept.json();
        this.receptAll.push(...result.hits);
        // eslint-disable-next-line no-underscore-dangle
        this.linkToNext = result._links.next.href;
      } catch (error) {
        console.error(error);
      }
    },
    async setPage(val) {
      this.nullifyАutoСlose();
      await this.addNewRecept();
      this.page = val;
    },
    async addNewRecept() {
      try {
        if (this.receptAll.length) {
          this.isLoading = true;
          // eslint-disable-next-line no-underscore-dangle
          const recept = await fetch(this.linkToNext);
          const result = await recept.json();
          this.receptAll.push(...result.hits);
          // eslint-disable-next-line no-underscore-dangle
          this.linkToNext = result._links.next.href;
          this.isLoading = false;
        }
      } catch (error) {
        this.isLoading = false;
        this.receptAll = [];
        this.$message({
          message: 'Слишком много запросов, попробуйте через 30 сек :(',
          type: 'error',
        });
        console.error(error);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.search-recipes {
  margin: 40px 0 40px 40px;
  &__title {
    @extend %title;
    color: white;
  }

  .getDishType {
    border: 1px solid $color_6;
    border-radius: 25px;
    padding: 15px;
    margin: 20px 0 20px 0;
    &__title {
      margin-bottom: 10px;
      color: $color_6;
    }
    &__btn {
      background-color: $color_10;
      color: $color_6;
      border: none;
      border-radius: 25px;
      transition: 0.7s ease;
      &:hover {
        background-color: $color_9;
        color: $color_4;
      }
    }
    &__active {
      background-color: $color_9;
      color: $color_4;
    }
  }

  .recipe-card {
    background-color: $color_2;
    margin-bottom: 10px;
    &__title {
      text-align: center;
      line-height: 1.5;
      font-size: 16px;
      min-height: 70px;
      display: flex;
      align-items: center;
      justify-content: center;

      &-wrapper {
        background-color: $color_3;
      }
    }

    &__img {
      width: 100%;
      height: 250px;
      object-fit: cover;
      display: block;
    }

    &__ingredients {
      &-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
      }
      &-logo {
        width: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }
    }

    &__description {
      padding: 10px;
    }

    &__calories {
      color: white;
    }
  }

  .el-row {
    margin-bottom: 10px;
  }

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

  .favorites {
    margin-top: 10px;
    font-size: 14px;
    font-family: 'MontserratRegular';
    cursor: pointer;
    &__icon {
      margin-right: 5px;
    }
  }
  .isFavorites {
    color: $color_3;
  }
}
</style>

<style lang="scss">
.el-collapse-item__header {
  background-color: transparent;
  color: white;
}

.el-collapse-item__wrap {
  background-color: transparent;
}

.recipe-card__ingredients-item {
  color: white;
}

.recipe-card__description {
  padding-top: 0 !important;
}

.el-collapse-item__content {
  padding-bottom: 15px;
}

.el-collapse {
  border-top: none;
}

.el-link.is-underline:hover:after {
  border: none;
}

.el-pagination {
  padding-left: 0;
}

.el-pagination.is-background .btn-prev {
  margin-left: 0;
}

.el-pagination.is-background .el-pager li:not(.disabled).active {
  background-color: $color_3;
}

.el-pagination.is-background .el-pager li,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .btn-next {
  border-radius: 10px;
  transition: 0.5s ease;
}

.el-pagination.is-background .el-pager li:not(.disabled):hover {
  background-color: $color_3;
  color: white;
}
</style>
