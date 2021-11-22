<template>
  <div class="search-recipes">
    <el-col :span="20">
      <h1 class="search-recipes__title">Поиск рецептов</h1>
      <hr />
      <el-row>
        <el-col :span="6">
          <el-input placeholder="Искомый рецепт" v-model="searchRecipes" clearable> </el-input>
        </el-col>
        <el-col :span="6">
          <el-button>Найти</el-button>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in receptAll" :key="index">
          <div class="recipe-card">
            <img class="recipe-card__img" :src="item.image" />
            <div class="recipe-card__title-wrapper">
              <h1 class="recipe-card__title">{{ item.label }}</h1>
            </div>
            <div class="recipe-card__description">
              <div class="recipe-card__ingredients">
                <el-collapse accordion>
                  <el-collapse-item title="Ингредиенты" :name="index">
                    <div
                      class="recipe-card__ingredients-item"
                      v-for="(ingredientLine, ingredientIndex) in item.ingredientLines"
                      :key="ingredientIndex"
                    >
                      <img
                        class="recipe-card__ingredients-logo"
                        :src="item.ingredients[ingredientIndex].image"
                      />
                      <span class="recipe-card__ingredients-text">
                        {{ ingredientLine }}
                      </span>
                    </div>
                  </el-collapse-item>

                  <el-collapse-item title="Характеристики" :name="item.calories">
                    <p>{{ Math.round(item.calories) }} кал.</p>
                    <p>Описание</p>
                  </el-collapse-item>

                  <el-collapse-item title="Предостережения" :name="item.cautions.index">
                    <el-tag type="warning" v-if="!item.cautions.length">
                      {{ 'Предостережений нет' }}
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

                  <el-collapse-item title="Тип кухни" :name="item.cuisineType.index">
                    <el-tag v-if="!item.cuisineType.length"> {{ 'Нет информации' }}</el-tag>
                    <div v-else>
                      <el-tag v-for="cuisine in item.cuisineType" :key="cuisine.id">
                        {{ cuisine }}</el-tag
                      >
                    </div>
                  </el-collapse-item>

                  <div v-if="item.dishType">
                  <el-collapse-item title="Тип блюда" :name="item.dishType.index">
                     <el-tag v-for="dish in item.dishType" :key="dish.id"> {{ dish }}</el-tag>
                  </el-collapse-item>
                  </div>

                  <el-collapse-item title="Этикетки здоровья" :name="item.healthLabels.index">
                    <el-tag
                      type="success"
                      style="margin-right: 10px; margin-bottom: 10px"
                      v-for="healthLabel in item.healthLabels"
                      :key="healthLabel.id"
                    >
                      {{ healthLabel }}</el-tag
                    >
                  </el-collapse-item>

                  <el-collapse-item title="Тип еды" :name="item.mealType.index">
                  <el-tag v-if="!item.mealType.length"> {{ 'Нет информации' }}</el-tag>
                  <div v-else>
                    <el-tag v-for="meal in item.mealType" :key="meal.id"> {{ meal }}</el-tag>
                  </div>
                  </el-collapse-item>
                </el-collapse>
              </div>

              <p class="search-recipes__source">Источник: {{ `«${item.source}»` }}</p>
              <el-link class="search-recipes__to-recipe"
              :href="item.url" target="_blank">Перейти к рецепту</el-link>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  data() {
    return {
      searchRecipes: null,
      receptAll: [],
    };
  },
  async created() {
    const recept = await fetch(
      'https://api.edamam.com/api/recipes/v2?type=public&q=%20hen&app_id=52d453a9&app_key=%20ca99304a9de5bc6c29f01da311d0ba25',
    );
    const { hits } = await recept.json();
    for (let i = 0; i < hits.length; i += 1) {
      this.receptAll.push(hits[i].recipe);
    }
  },
  mounted() {
    console.log(this.receptAll);
  },
};
</script>

<style lang="scss" scoped>
.search-recipes {
  margin-top: 40px;
  margin-left: 40px;
  &__title {
    @extend %title;
    color: white;
  }

  .recipe-card {
    background-color: $color_2;
    margin-bottom: 10px;
    &__title {
      text-align: center;
      line-height: 1.5;
      font-size: 16px;
      padding: 5px;
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
  }

  .el-row {
    margin-bottom: 10px;
  }

  &__source{
    color: $color_7;
    font-size: 14px;
    margin: 10px 0;
  }

  &__to-recipe{
  @extend %baseButton;
  font-size: 18px;
  min-width: 250px;
  height: 40px;
  display: flex;
  align-items: center;
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

.el-collapse-item__content{
  padding-bottom: 15px;
}

.el-link.is-underline:hover:after {
border: none;
}
</style>
