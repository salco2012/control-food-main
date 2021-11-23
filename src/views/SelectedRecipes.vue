<template>
  <div class="selected-recipes">
    <el-col :span="20">
      <h1 class="selected-recipes__title">Избранные рецепты</h1>
      <hr />
      <el-row :gutter="10">
        <el-col :span="6">
          <!-- <div class="selected-recipes__card">
            <img v-if="item.recipe.image" class="recipe-card__img" :src="item.recipe.image" />
            <img v-else src="../assets/img/No_image_available.png" class="recipe-card__img" />
            <div class="recipe-card__title-wrapper">
              <h1 class="recipe-card__title">{{ item.recipe.label }}</h1>
            </div>
            <div class="recipe-card__description">
              <div class="recipe-card__ingredients">
                <el-collapse accordion>
                  <el-collapse-item title="Ингредиенты" :name="index">
                    <div
                      class="recipe-card__ingredients-item"
                      v-for="(ingredientLine, ingredientIndex) in item.recipe.ingredientLines"
                      :key="ingredientIndex"
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
                      <span class="recipe-card__ingredients-text">
                        {{ ingredientLine }}
                      </span>
                    </div>
                  </el-collapse-item>

                  <el-collapse-item title="Калорийность" :name="item.recipe.calories">
                    <p class="recipe-card__calories">{{ Math.round(item.recipe.calories) }} кал.</p>
                  </el-collapse-item>

                  <el-collapse-item title="Предостережения" :name="item.recipe.cautions.index">
                    <el-tag type="warning" v-if="!item.recipe.cautions.length">
                      {{ 'Предостережений нет' }}
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
                    <el-tag v-if="!item.recipe.cuisineType.length"> {{ 'Нет информации' }}</el-tag>
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
                      <el-tag> {{ 'Данных нет' }}</el-tag>
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
                    <el-tag v-if="!item.recipe.mealType.length"> {{ 'Нет информации' }}</el-tag>
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
          </div> -->
        </el-col>
      </el-row>
    </el-col>
  </div>
</template>

<script>
export default {

};
</script>

<style lang="scss" scoped>
.selected-recipes{
  margin-top: 40px;
  margin-left: 40px;
  &__title{
    @extend %title;
    color: white;
  }
  &__card{
    background-color: $color_2;
    margin-bottom: 10px;
  }
}
</style>
