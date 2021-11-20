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
                <h3>Ингредиенты</h3>
                <ul class="recipe-card__ingredients-list">
                  <li
                    class="recipe-card__ingredients-item"
                    v-for="ingredient in item.ingredientLines"
                    :key="ingredient.id"
                  >
                    {{ ingredient }}
                  </li>
                </ul>
              </div>
              <hr />
              <h3>Характеристики</h3>
              <p>{{ Math.round(item.calories) }} кал.</p>
              <p>Описание</p>
              <hr />
              <h3>Предостережения</h3>
              <el-tag
                type="warning"
                v-for="caution in item.cautions"
                :key="caution.id"
                style="margin-right: 10px"
                >{{ caution }}</el-tag
              >
              <hr />
              <h3>Тип кухни</h3>
              <el-tag v-for="cuisine in item.cuisineType" :key="cuisine.id"> {{ cuisine }}</el-tag>
              <hr />
              <h3>Тип блюда</h3>
              <el-tag v-for="dish in item.dishType" :key="dish.id"> {{ dish }}</el-tag>
              <hr />
              <h3>Этикетки здоровья</h3>
              <el-tag
                type="success"
                style="margin-right: 10px; margin-bottom: 10px"
                v-for="healthLabel in item.healthLabels"
                :key="healthLabel.id"
              >
                {{ healthLabel }}</el-tag
              >
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
      &-list {
        padding-left: 20px;
        margin: 10px 0;
      }
      &-item {
        margin-bottom: 5px;
      }
    }

    &__description {
      padding: 10px;
    }
  }

  .el-row {
    margin-bottom: 10px;
  }
  h3 {
    margin-bottom: 10px;
  }
}
</style>
