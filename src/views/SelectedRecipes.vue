<template>
  <div class="selected-recipes">
    <el-col :span="20">
      <h1 class="selected-recipes__title">Избранные рецепты</h1>
      <hr />
      <el-row :gutter="10">
        <el-col :span="6" v-for="(item, index) in selectedRecipes" :key="index">
          <div>
            <div class="select-card">
              <img v-if="item.recipe.image" class="select-card__img" :src="item.recipe.image" />
              <img v-else src="../assets/img/No_image_available.png" class="select-card__img" />
              <div class="select-card__title-wrapper">
                <h1 class="select-card__title">{{ item.recipe.label }}</h1>
              </div>

              <div class="select-card__description">
                <div class="select-card__ingredients">
                  <el-collapse accordion>
                    <el-collapse-item title="Ингредиенты" :name="index">
                      <div
                        class="select-card__ingredients-item"
                        v-for="(ingredientLine, ingredientIndex) in item.recipe.ingredientLines"
                        :key="ingredientIndex"
                      >
                        <div v-if="item.recipe.ingredients[ingredientIndex]">
                          <img
                            v-if="item.recipe.ingredients[ingredientIndex].image"
                            class="select-card__ingredients-logo"
                            :src="item.recipe.ingredients[ingredientIndex].image"
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

                    <el-collapse-item title="Калорийность" :name="item.recipe.calories">
                      <p class="select-card__calories">
                        {{ Math.round(item.recipe.calories) }} cal.
                      </p>
                    </el-collapse-item>

                    <el-collapse-item title="Предостережения" :name="item.recipe.cautions.index">
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

                    <el-collapse-item title="Тип кухни" :name="item.recipe.cuisineType.index">
                      <el-tag v-if="!item.recipe.cuisineType.length">
                        {{ 'No information' }}</el-tag
                      >
                      <div v-else>
                        <el-tag v-for="cuisine in item.recipe.cuisineType" :key="cuisine.id">
                          {{ cuisine }}</el-tag
                        >
                      </div>
                    </el-collapse-item>

                    <div v-if="item.recipe.dishType">
                      <el-collapse-item title="Тип блюда" :name="item.recipe.dishType.index">
                        <el-tag v-for="dish in item.recipe.dishType" :key="dish.id">
                          {{ dish }}</el-tag
                        >
                      </el-collapse-item>
                    </div>
                    <div v-else>
                      <el-collapse-item title="Тип блюда" :name="Math.random()">
                        <el-tag> {{ 'No data' }}</el-tag>
                      </el-collapse-item>
                    </div>

                    <el-collapse-item
                      title="Этикетки здоровья"
                      :name="item.recipe.healthLabels.index"
                    >
                      <el-tag
                        type="success"
                        style="margin-right: 10px; margin-bottom: 10px"
                        v-for="healthLabel in item.recipe.healthLabels"
                        :key="healthLabel.id"
                      >
                        {{ healthLabel }}</el-tag
                      >
                    </el-collapse-item>

                    <el-collapse-item title="Тип еды" :name="item.recipe.mealType.index">
                      <el-tag v-if="!item.recipe.mealType.length"> {{ 'No information' }}</el-tag>
                      <div v-else>
                        <el-tag v-for="meal in item.recipe.mealType" :key="meal.id">
                          {{ meal }}</el-tag
                        >
                      </div>
                    </el-collapse-item>
                  </el-collapse>
                </div>

                <p class="search-recipes__source">Источник: {{ `«${item.recipe.source}»` }}</p>
                <el-link class="search-recipes__to-recipe" :href="item.recipe.url" target="_blank"
                  >Перейти к рецепту</el-link
                >
              </div>
            </div>
          </div>
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {
  computed: {
    selectedRecipes() {
      return this.$store.getters.selectedRecipes;
    },
  },
};
</script>

<style lang="scss" scoped>
.selected-recipes {
  margin-top: 40px;
  margin-left: 40px;
  &__title {
    @extend %title;
    color: white;
  }
}
.select-card {
  background-color: $color_2;
  margin-bottom: 10px;
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
    padding: 5px;
    min-height: 70px;
    display: flex;
    align-items: center;
    justify-content: center;
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
</style>
