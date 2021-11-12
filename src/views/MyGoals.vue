<template>
  <div class="my-goals">
    <el-col :span="20">
      <h1 class="my-goals__title">Мои цели</h1>
      <hr class="my-goals__hr" />
      <el-row :gutter="10">
        <el-col :span="6">
          <div class="card set-goal">
            <h3 class="set-goal__title">Нужно сбросить:</h3>
            <div class="set-goal__weight">
              <span class="fas fa-weight set-goal__icon" style="font-size: 24px"></span>
              <p class="set-goal__weight-text">{{ numKgReduce }} <span>(кг.)</span></p>
              <el-button class="btn-minus" circle @click="numKgReduceMinus">-</el-button>
              <el-button class="btn-plus" circle @click="numKgReducePlus">+</el-button>
            </div>
            <div class="set-goal__calories">
              <span class="fas fa-fire set-goal__icon" style="font-size: 24px"></span>
              <p class="set-goal__calories-text">{{ numCaloriesReduce }} <span>(ккал.)</span></p>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="card result-weight">
            <h3 class="result-weight__title">{{ `Вес через ${daysToTarget} дней` }}:</h3>
            <div class="result-weight__weight">
              <span class="fas fa-weight result-weight__icon" style="font-size: 24px"></span>
              <p class="result-weight__weight-text">{{ resultWeight }} <span>(кг.)</span></p>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="card days-target">
            <h3 class="days-target__title">Осталось дней:</h3>
            <div class="days-target__info">
              <p class="days-target__subtitle">{{ daysToTarget }}</p>
              <span class="fas fa-calendar-alt days-target__icon" style="font-size: 32px"> </span>
            </div>
          </div>
        </el-col>
      </el-row>
      <el-row :gutter="10">
        <el-col :span="12">
          <div class="card reduce-сal">
            <h3 class="reduce-сal__title">Вам нужно сбрасывать:</h3>
            <div class="reduce-сal__info">
              <template v-if="daysToTarget">
                <span class="fas fa-fire reduce-сal__icon" style="font-size: 32px"> </span>
                <p class="reduce-сal__callories">
                  {{ reduceСaloriesDay }} <span style="font-size: 16px">(в день)</span>
                </p>
              </template>
              <p v-else>Для произведения расчета, необходимо установить дату окончания диеты.</p>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="card current-date">
            <h3 class="current-date__title">Текущая дата:</h3>
            <div class="current-date__info">
              <p class="current-date__date">{{ currentData.toISOString().slice(0, 10) }}</p>
              <span class="fas fa-calendar-alt current-date__icon" style="font-size: 32px"> </span>
            </div>
          </div>
        </el-col>

        <el-col :span="6">
          <div class="card end-diet">
            <h3 class="end-diet__title">Окончание диеты:</h3>
            <div class="end-diet__info">
              <template v-if="finishData">
                <p class="end-diet__date">
                  {{ finishData.toISOString().slice(0, 10) }}
                </p>
                <span class="fas fa-flag-checkered end-diet__icon" style="font-size: 32px"></span>
              </template>
              <template v-else>
                <p class="end-diet__defoult-text">Нужно установить</p>
                <span class="fas fa-hand-pointer icon-point" style="font-size: 32px"></span>
              </template>
            </div>
            <el-date-picker
              v-if="!finishData"
              v-model="finishData"
              type="date"
              placeholder="Выбор даты"
            >
            </el-date-picker>
          </div>
        </el-col>
      </el-row>

      <el-row :gutter="10">
        <el-col :span="12">
          <div class="card calorie-tracking">
            <img class="calorie-tracking__img" src="../assets/img/girl-card.png" alt="girl" />
            <div>
              <h3 class="calorie-tracking__title">Учет каллорий за сутки:</h3>
              <hr />
              <p class="calorie-tracking__subtitle">Норма ккал. за день</p>
              <p class="calorie-tracking__text">2720 ккал.</p>
              <p class="calorie-tracking__subtitle">Калорий съедено</p>
              <div class="calorie-tracking__subtitle calories-eaten">
                <p class="calorie-tracking__text">1320 ккал.</p>
                <div class="btn-group">
                  <el-button class="btn-minus" circle>-</el-button>
                  <el-button class="btn-plus" circle>+</el-button>
                </div>
              </div>
              <el-progress
                class="calorie-tracking__progress"
                :text-inside="true"
                :stroke-width="26"
                :percentage="67"
              ></el-progress>
            </div>
          </div>
        </el-col>

        <el-col :span="12">
          <div class="card lost-calories">
            <div>
              <h3 class="lost-calories__title">Всего сожжено каллорий:</h3>
              <hr />
              <p class="lost-calories__text">1400 калл. из 5600 калл.</p>
              <p class="lost-calories__text">Осталось сжечь: 5100 ккал.</p>
            </div>
            <el-progress
              type="dashboard"
              :stroke-width="10"
              :percentage="95"
              :color="progressСolors"
            ></el-progress>
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
      progressСolors: [
        { color: '#abbbc2', percentage: 20 },
        { color: '#ea7c69', percentage: 40 },
        { color: '#ffb572', percentage: 60 },
        { color: '#9290fe', percentage: 80 },
        { color: '#50d1aa', percentage: 100 },
      ],
      currentData: new Date(),
      finishData: '',
      numKgReduce: 6,
    };
  },
  methods: {
    numKgReduceMinus() {
      if (this.numKgReduce > 0) {
        this.numKgReduce -= 1;
      } else {
        this.$message({
          message: 'Меньше 0 увы, не сбросить:(',
          type: 'warning',
        });
      }
    },
    numKgReducePlus() {
      if (this.resultWeight > 35) {
        this.numKgReduce += 1;
      } else {
        // eslint-disable-next-line no-alert
        this.$message({
          message: 'Так голодать опасно!',
          type: 'warning',
        });
      }
    },
  },
  computed: {
    // Высчитываем кол-во дней до окончания диеты
    daysToTarget() {
      const date1 = this.currentData;
      const date2 = this.finishData;
      if (this.finishData) {
        const daysLag = Math.ceil(Math.abs(date2.getTime() - date1.getTime()) / (1000 * 3600 * 24));
        return daysLag;
      }
      return 0;
    },
    // Рассчитываем каллории к килограммам
    numCaloriesReduce() {
      return this.numKgReduce * 7700;
    },
    // Вес который будет по окончанию диеты.
    resultWeight() {
      return this.infoCurrentUser.weight - this.numKgReduce;
    },
    // Получаем регистрационную информацию о пользователе.
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
    // Высчитываем кол-во каллорий которое нужно сбросить
    reduceСaloriesDay() {
      return this.daysToTarget ? Math.round(this.numCaloriesReduce / this.daysToTarget) : '-';
    },
  },
};
</script>

<style lang="scss" scoped>
.my-goals {
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
    background-color: $color_2;
    padding: 15px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    min-height: 200px;
    overflow: hidden;
  }

  .set-goal {
    background-color: $color_11;
    color: $color_3;
    &__title {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__weight {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    &__weight-text {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-right: 10px;
    }

    &__calories {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__calories-text {
      font-family: 'MontserratMedium';
      font-size: 24px;
    }

    &__icon {
      margin-right: 10px;
    }
  }

  .result-weight {
    background-color: $color_9;
    color: $color_4;
    &__title {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__weight {
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
    }

    &__icon {
      margin-right: 10px;
    }

    &__weight-text {
      font-family: 'MontserratMedium';
      font-size: 24px;
    }
  }

  //Стили для карточки по учету каллорий
  .calorie-tracking {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-around;
    padding-bottom: 0;
    min-height: 220px;
    &__img {
      height: 200px;
      position: relative;
      bottom: -5px;
    }

    &__title {
      font-size: 24px;
    }

    &__subtitle {
      margin-bottom: 5px;
    }

    .calories-eaten {
      display: flex;
      align-items: center;
      justify-content: start;
    }

    &__text {
      margin-bottom: 10px;
    }
    &__progress {
      margin-bottom: 10px;
    }
  }
  .btn-group {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-left: 10px;
    margin-bottom: 10px;
  }
  .btn-minus {
    @extend %minusButton;
    width: 24px;
    height: 24px;
  }
  .btn-plus {
    @extend %plusButton;
    width: 24px;
    height: 24px;
  }

  // Стили для карточки по сожженым каллориям.
  .lost-calories {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    min-height: 220px;
    &__title {
      font-size: 24px;
      margin-bottom: 10px;
    }
    &__text {
      margin-bottom: 10px;
    }
  }

  .reduce-сal {
    background-color: $color_8;
    color: $color_5;
    &__title {
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      margin-right: 10px;
    }

    &__callories {
      font-family: 'MontserratMedium';
      font-size: 36px;
    }
  }

  //Дней до цели
  .days-target {
    &__title {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__subtitle {
      font-family: 'MontserratMedium';
      font-size: 36px;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__icon {
      margin-left: 10px;
    }
  }

  .current-date {
    &__title {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__date {
      font-family: 'MontserratMedium';
      font-size: 36px;
    }

    &__icon {
      margin-left: 10px;
    }
  }

  .end-diet {
    &__title {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }

    &__info {
      display: flex;
      align-items: center;
      justify-content: center;
    }

    &__date {
      font-family: 'MontserratMedium';
      font-size: 36px;
    }

    &__defoult-text {
      color: $color_3;
    }

    &__icon {
      margin-left: 10px;
    }

    .icon-point {
      margin-left: 10px;
      transform: rotate(180deg);
      color: $color_3;
    }
  }
}

.el-row {
  margin-bottom: 10px;
}
</style>

<style lang="scss">
.el-progress-bar__inner {
  background-color: $color_5;
}
</style>
