<template>
  <el-col
    class="my-goals"
    :span="20"
    v-loading.fullscreen="isLoading"
    element-loading-text="Загрузка..."
    element-loading-background="rgba(0, 0, 0, 0.8)"
    v-if="infoCurrentUser"
  >
    <h1 class="my-goals__title">Мои цели</h1>
    <hr />
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="card">
          <template v-if="infoCurrentUser.gender === 'мужской'">
            <h3 class="card__title">
              <span style="text-decoration: underline" :title="hintForIdealWeight"
                >Идеальный вес</span
              >
              для мужчины с ростом {{ infoCurrentUser.height }}<span class="fz16"> (см.):</span>
            </h3>
            <p class="card__result36">{{ idealWeightMan }}<span class="fz16"> (кг.)</span></p>
          </template>

          <template v-if="infoCurrentUser.gender === 'женский'">
            <h3 class="card__title">
              <span style="text-decoration: underline" :title="hintForIdealWeight"
                >Идеальный вес</span
              >
              для женщины с ростом {{ infoCurrentUser.height }}<span class="fz16"> (см.):</span>
            </h3>
            <p class="card__result36" style="fontsize: 36px">
              {{ idealWeightWoman }}<span class="fz16"> (кг.)</span>
            </p>
          </template>
        </div>
      </el-col>

      <el-col :span="12">
        <div
          class="card"
          :class="[excessWeightMan || excessWeightWoman > 0 ? 'card-red' : 'card-green']"
        >
          <template v-if="infoCurrentUser.gender === 'мужской'">
            <template v-if="excessWeightMan > 0">
              <h3 class="card__title">ИМТ: {{ IMTvalue }}</h3>
              <h3 class="card__title">Вам желательно сбросить:</h3>
              <p class="card__result36" :title="hintForIdealWeight">
                {{ excessWeightMan }} <span class="fz16"> (кг.)</span>
              </p>
            </template>
            <template v-else-if="excessWeightMan < 0">
              <h3 class="card__title">ИМТ: {{ IMTvalue }}</h3>
              <h3 class="card__title">
                Отклонение от нормы на {{ Math.abs(excessWeightWoman) }}
                <span class="fz16"> (кг.)</span>
              </h3>
            </template>
            <template v-else>
              <h3 class="card__title">ИМТ: {{ IMTvalue }}</h3>
              <h3 class="card__title">У вас нет лишнего веса!</h3>
            </template>
          </template>

          <template v-if="infoCurrentUser.gender === 'женский'">
            <template v-if="excessWeightWoman > 0">
              <h3 class="card__title">ИМТ: {{ IMTvalue }}</h3>
              <h3 class="card__title">Вам желательно сбросить:</h3>
              <p class="card__result36" style="font-size: 36px" :title="hintForIdealWeight">
                {{ excessWeightWoman }}<span class="fz16"> (кг.)</span>
              </p>
            </template>
            <template v-else-if="excessWeightWoman < 0">
              <h3 class="card__title">ИМТ: {{ IMTvalue }}</h3>
              <h3 class="card__title">
                Отклонение от нормы на {{ Math.abs(excessWeightWoman) }}
                <span class="fz16"> (кг.)</span>
              </h3>
            </template>
            <template v-else>
              <h3 class="card__title">ИМТ: {{ IMTvalue }}</h3>
              <h3 class="card__title">У вас нет лишнего веса!</h3>
            </template>
          </template>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="6">
        <div class="card card-orange">
          <!--Если у пользователя дифицит каллорий, отображаем вариант с набором каллорий -->
          <h3 class="card__title" v-if="weightDeviationisNormal">Хочу набрать:</h3>
          <h3 class="card__title" v-else>Хочу cбросить:</h3>
          <div>
            <div class="card__flex-block">
              <span class="fas fa-weight mr10" style="font-size: 24px"></span>
              <p class="card__result24">{{ numKgReduce }} <span class="mr10 fz16">(кг.)</span></p>
              <el-button class="btn-minus" circle @click="numKgReduceMinus">-</el-button>
              <el-button class="btn-plus" circle @click="numKgReducePlus">+</el-button>
            </div>
            <div class="card__flex-block" style="justify-content: start">
              <span class="fas fa-fire mr10" style="font-size: 24px"></span>
              <p class="card__result24">
                {{ numCaloriesReduce }} <span class="fz16">(ккал.)</span>
              </p>
            </div>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div
          v-if="daysToTarget"
          class="card card-red"
          :class="{ 'card-green': comparisonFutureWeightIdeal }"
        >
          <h3 class="card__title">{{ `Вес через ${daysToTarget} ${declinationDays}` }}:</h3>
          <div class="card__flex-block">
            <span class="fas fa-weight mr10" style="font-size: 24px"></span>
            <p class="card__result24">{{ resultWeight }} <span class="fz16">(кг.)</span></p>
          </div>
        </div>
        <div
          v-else
          class="card"
          :class="[excessWeightMan || excessWeightWoman > 0 ? 'card-red' : 'card-green']"
        >
          <h3 class="card__title">Текущий вес:</h3>
          <div class="card__flex-block">
            <span class="fas fa-weight mr10" style="font-size: 24px"></span>
            <p class="card__result24">{{ currentWeight }} <span class="fz16">(кг.)</span></p>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="card">
          <h3 class="card__title">До завершения цели {{ declinationRemainder }}:</h3>
          <div class="card__flex-block" v-if="daysToTarget">
            <span class="fas fa-bullseye mr10" style="font-size: 32px"></span>
            <p class="card__result36">
              {{ daysToTarget }} <span class="fz16">{{ declinationDays }}</span>
            </p>
          </div>
          <p v-else>
            Для произведения расчета,
            <span class="card-warning">необходимо установить дату окончания диеты.</span>
          </p>
        </div>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col :span="12">
        <div class="card card-purple">
          <h3 class="card__title" v-if="weightDeviationisNormal">
            Необходим
            <span :title="hintForUserSurplus" style="text-decoration: underline"
              >профицит каллорий:</span
            >
          </h3>
          <h3 class="card__title" v-else>
            Необходим
            <span :title="hintForUserDeficit" style="text-decoration: underline"
              >дефицит каллорий:</span
            >
          </h3>
          <div class="card__flex-block">
            <template v-if="daysToTarget">
              <span class="fas fa-fire mr10" style="font-size: 32px"> </span>
              <p class="card__result36">
                {{ reduceСaloriesDay }} <span class="fz16">(в сутки)</span>
              </p>
            </template>
            <p v-else>Для произведения расчета, необходимо установить дату окончания диеты.</p>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="card">
          <h3 class="card__title">Текущая дата:</h3>
          <div class="card__flex-block">
            <p class="card__result36">{{ currentData.toLocaleString().slice(0, 10) }}</p>
            <span class="fas fa-calendar-alt ml10" style="font-size: 32px"> </span>
          </div>
        </div>
      </el-col>

      <el-col :span="6">
        <div class="card">
          <h3 class="card__title">Окончание диеты:</h3>
          <div class="card__flex-block" style="flex-wrap: wrap">
            <template v-if="finishData">
              <p class="card__result36">
                {{ finishData.toLocaleString().slice(0, 10) }}
              </p>
              <span class="fas fa-flag-checkered ml10" style="font-size: 32px"></span>
              <el-button
                v-if="!IsVisibilityDatePicker"
                class="card__change-date"
                @click="IsVisibilityDatePicker = true"
                ><i class="fas fa-pencil-alt mr10"></i>Поменять дату</el-button
              >
              <el-date-picker
                id="datepicker"
                v-if="IsVisibilityDatePicker"
                v-model="finishData"
                format="dd-MM-yyyy"
                :picker-options="datePickerOptions"
                type="date"
                placeholder="Выбор даты"
              >
              </el-date-picker>
              <el-button
                v-if="IsVisibilityDatePicker"
                class="card__save-date"
                @click="IsVisibilityDatePicker = false"
                >Сохранить<i class="fas fa-save ml10"></i
              ></el-button>
            </template>
            <div v-else class="card__flex-block mb10">
              <p class="mr10 card-warning">Нужно установить</p>
              <span class="fas fa-hand-pointer card__cursor-icon" style="font-size: 32px"></span>
            </div>
          </div>
          <el-date-picker
            id="datepicker"
            v-if="!finishData"
            v-model="finishData"
            :picker-options="datePickerOptions"
            type="date"
            placeholder="Выбор даты"
          >
          </el-date-picker>
        </div>
      </el-col>
    </el-row>

    <el-row :gutter="10">
      <el-col :span="12">
        <div
          class="card card__flex-block"
          style="justify-content: space-around; align-items: flex-start; min-height: 235px"
        >
          <img src="../assets/img/duet.png" alt="girl" width="250px" />
          <div>
            <h3 class="card__title">Учет каллорий за сутки:</h3>
            <hr />
            <div>
              <div class="card__flex-block" style="flex-direction: column">
                <div class="mb10">
                  <p style="margin-bottom: 5px">Норма ккал. за день</p>
                  <p v-if="infoCurrentUser.gender === 'мужской'">{{ normСaloriesMan }} (ккал.)</p>
                  <p v-if="infoCurrentUser.gender === 'женский'">{{ normСaloriesWoman }} (ккал.)</p>
                </div>
                <p style="margin-bottom: 5px">Калорий съедено</p>
                <div class="card__flex-block mb10">
                  <p v-if="changedСountingInput === false" class="mr10">
                    {{ caloriesPerDay }} (ккал.)
                  </p>

                  <div class="card__flex-block">
                    <!-- Отображаю блок с возможность
                      ввода нового значения при условии,
                      если пользователь нажал на
                      "изменить значение" флаг меняется на true -->
                    <div v-if="changedСountingInput === true">
                      <el-input class="ccalorieСountingInput" v-model="caloriesPerDay"></el-input>
                      <el-button
                        class="card__save-date"
                        style="padding-left: 0"
                        @click="
                          setUserСalories();
                          changedСountingInput = false;
                        "
                        >Сохранить<i class="fas fa-save ml10"></i
                      ></el-button>
                    </div>
                    <div v-else>
                      <el-button
                        class="card__change-date"
                        style="padding-left: 0"
                        @click="changedСountingInput = true"
                        ><i class="fas fa-pencil-alt mr10"></i>Изменить значение</el-button
                      >
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <el-progress
              :text-inside="true"
              :stroke-width="26"
              :percentage="percentageСalories"
            ></el-progress>
          </div>
        </div>
      </el-col>

      <el-col :span="12">
        <div class="card total-burned" style="min-height: 235px" v-if="!weightDeviationisNormal">
          <div>
            <h3 class="card__title">Всего сожжено каллорий:</h3>
            <hr />
            <p class="mb10">{{ caloriesBurned }} калл. из {{ numCaloriesReduce }} калл.</p>
            <p v-if="!caloriesLeftToBurn">
              Осталось сжечь:
              <span class="card-warning"> задайте параметры.</span>
            </p>
            <p v-else-if="caloriesLeftToBurn < 0">
              <span class="card-goal-achieved"> Цель достигнута!</span>
            </p>
            <p v-else>
              Осталось сжечь:
              {{ caloriesLeftToBurn }} калл.
            </p>
          </div>
          <el-progress
            type="dashboard"
            :stroke-width="10"
            :percentage="userProgress"
            :color="progressСolors"
          ></el-progress>
        </div>
                <div class="card total-burned" style="min-height: 235px" v-else>
          <div>
            <h3 class="card__title">Всего набрано каллорий:</h3>
            <hr />
            <p class="mb10">{{ caloriesBurned }} калл. из {{ numCaloriesReduce }} калл.</p>
            <p v-if="!caloriesLeftToBurn">
              Осталось сжечь:
              <span class="card-warning"> задайте параметры.</span>
            </p>
            <p v-else-if="caloriesLeftToBurn < 0">
              <span class="card-goal-achieved"> Цель достигнута!</span>
            </p>
            <p v-else>
              Осталось набрать:
              {{ caloriesLeftToBurn }} калл.
            </p>
          </div>
          <el-progress
            type="dashboard"
            :stroke-width="10"
            :percentage="userProgress"
            :color="progressСolors"
          ></el-progress>
        </div>
      </el-col>
    </el-row>
  </el-col>
</template>

<script>
export default {
  data() {
    return {
      // Объект который отвечает за доп. парраметры для el-date-picker
      datePickerOptions: {
        disabledDate(date) {
          return date < new Date(); // блокируем возможность выбора прошедших дат.
        },
        firstDayOfWeek: 1, // Установили начало недели с понедельника
      },
      progressСolors: [
        { color: '#abbbc2', percentage: 20 },
        { color: '#ea7c69', percentage: 40 },
        { color: '#ffb572', percentage: 60 },
        { color: '#9290fe', percentage: 80 },
        { color: '#50d1aa', percentage: 100 },
      ],
      hintForUserDeficit: `Это разница между калориями,
которые поступили в организм из еды,
и израсходованными в течение суток.`,
      hintForUserSurplus: `Это состояние, когда вы употребляете
за день больше калорий, чем расходуете.
Обычно рекомендуют создавать профицит не более 15-20%.`,
      hintForIdealWeight: 'Рассчет произведен по формуле Брокка',
      currentData: new Date(),
      finishData: '',
      isLoading: true, // статус загрузки loading
      numKgReduce: 0, // кол-во кг которые нужно сбросить либо набрать.
      IsVisibilityDatePicker: false,
      caloriesPerDay: 0, // употребленные калории за сутки
      changedСountingInput: false /* флаг который отвечает
      за изменение значения и отображения кнопки "Сохранить значение"
      либо "Изменить значение` */,
    };
  },
  methods: {
    calorieRenewal() {
      // объект с ключами всех дат по записям пользователя
      const keysDates = this.infoCurrentUser.userСalories;

      if (keysDates) {
        /* Получаем ключ последней даты записанной в бд, и переворачиваем его,
    для того чтобы корректно распарсить. */
        const lastRecordedDate = Object.keys(keysDates)[Object.keys(keysDates).length - 1].split('-')
          .reverse()
          .join('-');

        // Возвращаю кол-во миллисекунд последней даты в бд
        const lastDateMseconds = Date.parse(lastRecordedDate);

        // Получаю текущую дату в нужно формате для дельнейшего парсинга.
        const currentData = new Date().toLocaleString().slice(0, 10).split('.')
          .reverse()
          .join('.');

        // Возвращаю кол-во миллисекунд текущей даты
        const currentDataMseconds = Date.parse(currentData);

        // Если текущая дата больше последней, обнуляем счетчик кал.
        if (currentDataMseconds > lastDateMseconds) {
          this.caloriesPerDay = 0;
        } else {
          // В противном случае записываем значение из бд
          this.caloriesPerDay = this.infoCurrentUser.userСalories[
            Object.keys(keysDates)[Object.keys(keysDates).length - 1]
          ].caloriesEatenPerDay;
        }
      }
    },
    // Метод отправки инф. о пользовательских калориях в базу данных.
    setUserСalories() {
      let normСalories = null;

      // В зависимости от пола, записываем норму калорий в переменную normСalories
      if (this.infoCurrentUser.gender === 'мужской') {
        normСalories = this.normСaloriesMan;
      } else {
        normСalories = this.normСaloriesWoman;
      }

      // Получаем текущую дату в нужном формате
      const currentData = this.currentData.toLocaleDateString().replaceAll('.', '-');

      // Получаем разницу между употребленными кал. и нормой
      const differencePerDay = this.caloriesPerDay - normСalories;

      let weightStatus;
      // В зависимости от условия записываем весовой статус пользователя.
      if (this.excessWeightWoman < 0) {
        weightStatus = 'deficitWeight';
      } else if (this.excessWeightWoman === 0) {
        weightStatus = 'idealWeight';
      } else {
        weightStatus = 'excessWeight';
      }

      // объект с инф. о пользователе
      const dataInfoUser = {
        [currentData]: {
          normСalories,
          caloriesEatenPerDay: this.caloriesPerDay,
          differencePerDay,
          weightUserStatus: weightStatus,
        },
      };

      // Добавляем объект с инф. в базу данных
      this.$store.dispatch('setUserСalories', dataInfoUser);
    },

    // отвечает за уменьшение кол-ва сбрасываемых килограмм
    numKgReduceMinus() {
      if (this.numKgReduce > 0) {
        this.numKgReduce -= 1;
      } else if (this.weightDeviationisNormal) {
        this.$message({
          message: 'Меньше 0 увы, не набрать:(',
          type: 'warning',
        });
      } else {
        this.$message({
          message: 'Меньше 0 увы, не сбросить:(',
          type: 'warning',
        });
      }
    },
    // отвечает за увеличение кол-ва сбрасываемых килограмм
    numKgReducePlus() {
      if (this.resultWeight <= 40 && !this.weightDeviationisNormal) {
        this.$message({
          message: 'Мы против анорексии!',
          type: 'warning',
        });
      } else if (
        // Проверяем пол пользователя и является ли его текущий вес, меньше идеального
        this.infoCurrentUser.gender === 'женский'
        && this.resultWeight >= this.idealWeightWoman
        && this.weightDeviationisNormal
      ) {
        this.$message({
          message: 'Достаточно! Больше набирать не нужно)',
          type: 'warning',
        });
      } else if (
        this.infoCurrentUser.gender === 'мужской'
        && this.resultWeight >= this.idealWeightMan
        && this.weightDeviationisNormal
      ) {
        this.$message({
          message: 'Достаточно! Больше набирать не нужно)',
          type: 'warning',
        });
      } else {
        this.numKgReduce += 1;
      }
    },
  },
  watch: {
    finishData() {
      localStorage.setItem('finishData', this.finishData);
    },
    // Записываем кол-во кг которые нужно сбросить либо набрать в localStorage
    numKgReduce() {
      localStorage.setItem('numKgReduce', this.numKgReduce);
    },
  },
  created() {
    /* Диспатчим getForm, для получения и перезаписи
      информацию по калориям, подтягиваю обновленную
      информацию с dataBase Realtime */
    this.$store
      .dispatch('getForm')
      .then(() => {
        this.calorieRenewal();
        this.isLoading = false;
      })
      .catch((error) => {
        console.error(error);
        this.isLoading = false;
      });
    const responseFinishData = localStorage.getItem('finishData');
    if (responseFinishData && responseFinishData !== 'null') {
      this.finishData = new Date(responseFinishData);
    }

    const responseNumKgReduce = localStorage.getItem('numKgReduce');
    if (responseNumKgReduce && responseNumKgReduce !== 'null') {
      this.numKgReduce = +responseNumKgReduce;
    }
  },
  computed: {
    // Актуальный текущий вес, с учетом сброшенных каллорий
    currentWeight() {
      const userWeight = this.infoCurrentUser.weight;
      const result = userWeight - (this.caloriesBurned / 7700).toFixed(1);
      return result;
    },
    // Отвечает за индикацию прогресса
    userProgress() {
      const persent = Math.floor(
        ((this.numCaloriesReduce - this.caloriesLeftToBurn) / this.numCaloriesReduce) * 100,
      );
      if (persent > 100) {
        return 100;
      }
      if (Number.isNaN(Number(persent))) {
        return 0;
      }
      return persent;
    },
    // Рассчитываем кол-во каллорий, который осталось сжечь.
    caloriesLeftToBurn() {
      return this.numCaloriesReduce
        ? this.numCaloriesReduce - this.caloriesBurned
        : this.numCaloriesReduce;
    },
    // Рассчитываем сожженные калории
    caloriesBurned() {
      if (this.infoCurrentUser.userСalories) {
        // Записываю объект с userСalories в переменную
        const userСalories = this.infoCurrentUser.userСalories;
        // Преобразую в массив значений.
        const arrUserСalories = Object.values(userСalories);

        // Прохожусь циклом и сохраняю разницу в калориях за каждый день
        let sum = 0;
        for (let i = 0; i < arrUserСalories.length; i += 1) {
          sum += arrUserСalories[i].differencePerDay;
        }
        return Math.abs(sum);
      }
      return 0;
    },
    // Получаем процент съеденных каллорий от нормы в день.
    percentageСalories() {
      if (this.infoCurrentUser.gender === 'мужской') {
        const resultMan = +((this.caloriesPerDay / this.normСaloriesMan) * 100).toFixed(1);
        if (resultMan > 100) {
          return 100;
        }
        return resultMan;
      }
      const resultWoman = +((this.caloriesPerDay / this.normСaloriesWoman) * 100).toFixed(1);
      if (resultWoman > 100) {
        return 100;
      }
      return resultWoman;
    },
    // Рассчитываем идеальный вес для мужчин
    idealWeightMan() {
      return Math.round((this.infoCurrentUser.height - 100) * 0.93);
    },
    // Рассчитываем идеальный вес для женщин
    idealWeightWoman() {
      return Math.round((this.infoCurrentUser.height - 100) * 0.85);
    },
    // Рассчитываем лишний вес для мужчины
    excessWeightMan() {
      return Math.round(this.currentWeight - this.idealWeightMan);
    },
    // Рассчитываем лишний вес для женщины
    excessWeightWoman() {
      return Math.round(this.currentWeight - this.idealWeightWoman);
    },
    // Расчитываем ИМТ (индекс массы тела)
    IMTvalue() {
      const heightMeter = this.infoCurrentUser.height / 100;
      const IMT = (this.currentWeight / (heightMeter * heightMeter)).toFixed(1);
      if (IMT < 18.49) {
        return `${IMT} (дефицит массы тела)`;
        // eslint-disable-next-line no-else-return
      } else if (IMT >= 18.5 && IMT <= 24.9) {
        return `${IMT}`;
      } else if (IMT >= 25 && IMT <= 29.9) {
        return `${IMT} (избыточный вес)`;
      } else if (IMT >= 30 && IMT <= 34.9) {
        return `${IMT} (ожирение I степени)`;
      } else if (IMT >= 35 && IMT <= 39.9) {
        return `${IMT} (ожирение II степени)`;
      } else {
        return `${IMT} (ожирение III степени)`;
      }
    },
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
    // Корректно склоняет слово 'день'
    declinationDays() {
      const sumDays = this.daysToTarget;
      const remainderDays = sumDays % 10;
      if (sumDays === 0) {
        return '';
      }
      if (sumDays >= 11 && sumDays <= 20) {
        return 'дней';
      }
      if (remainderDays === 1) {
        return 'день';
      }
      if (remainderDays >= 2 && remainderDays <= 4) {
        return 'дня';
      }
      if ((remainderDays >= 5 && remainderDays <= 9) || remainderDays === 0) {
        return 'дней';
      }
      return '';
    },
    // Корректно склоняет слово 'осталось'
    declinationRemainder() {
      const sumDays = this.daysToTarget;
      if (sumDays === 0) {
        return '';
      }
      if (sumDays === 1) {
        return 'остался';
      }
      return 'осталось';
    },
    // Рассчитываем каллории к килограммам
    numCaloriesReduce() {
      return this.numKgReduce * 7700;
    },
    // Вес который будет по окончанию диеты.
    resultWeight() {
      return !this.weightDeviationisNormal // проверяем если не имеет дефицита
        ? this.currentWeight - this.numKgReduce // высчитываем кг.
        : +this.currentWeight + this.numKgReduce; // в противном случае, прибавляем кг.
    },
    // Получаем регистрационную информацию о пользователе.
    infoCurrentUser() {
      return this.$store.state.UserInfoDatabase.infoCurrentUser;
    },
    // Высчитываем кол-во каллорий которое нужно сбросить
    reduceСaloriesDay() {
      if (this.daysToTarget) {
        const result = Math.round(this.numCaloriesReduce / this.daysToTarget);
        if (result < 1500) {
          return result;
        }
        // eslint-disable-next-line no-alert
        this.$message({
          message: 'Рекомендуем установить менее амбициозную цель либо увеличить кол-во дней.',
          type: 'warning',
        });
        return result;
      }
      return 0;
    },
    // Расчитываем норму каллорий для мужчин
    normСaloriesMan() {
      return Math.round(
        (66.5
          + 13.75 * this.currentWeight
          + 5.003 * this.infoCurrentUser.height
          - 6.775 * this.infoCurrentUser.age)
          * 1.15,
      );
    },
    // Расчитываем норму каллорий для женщин
    normСaloriesWoman() {
      return Math.round(
        (665.1
          + 9.563 * this.currentWeight
          + 1.85 * this.infoCurrentUser.height
          - 6.775 * this.infoCurrentUser.age)
          * 1.15,
      );
    },
    // Проверяем пол пользователя и равняется ли его будующий вес идеальному.
    comparisonFutureWeightIdeal() {
      if (this.infoCurrentUser.gender === 'мужской') {
        return this.resultWeight === this.idealWeightMan;
      }
      return this.resultWeight === this.idealWeightWoman;
    },
    // Проверяем пол пользователя и является ли его вес меньше идеального.
    weightDeviationisNormal() {
      if (this.infoCurrentUser.gender === 'мужской') {
        return this.currentWeight < this.idealWeightMan;
      }
      return this.currentWeight < this.idealWeightWoman;
    },
  },
};
</script>

<style lang="scss" scoped>
.my-goals {
  margin: 40px 0 40px 40px;
  &__title {
    @extend %title;
    color: white;
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
    &__title {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }
    &__icon {
      margin: 0 10px 0;
    }
    &__result36 {
      font-family: 'MontserratMedium';
      font-size: 36px;
      margin-bottom: 10px;
    }
    &__result24 {
      font-family: 'MontserratMedium';
      font-size: 24px;
      margin-bottom: 10px;
    }
    &__flex-block {
      display: flex;
      flex-direction: row;
      align-items: baseline;
      justify-content: center;
    }
    &__cursor-icon {
      color: $color_3;
      transform: rotate(180deg);
    }
    // Модификатор для важного текста
    &-warning {
      color: $color_3;
    }
    // Модификаторы для цветового стиля карточек
    &-red {
      color: $color_3;
      background-color: $color_11;
    }

    &-green {
      color: $color_4;
      background-color: $color_9;
    }

    &-purple {
      color: $color_5;
      background-color: $color_8;
    }

    &-orange {
      color: $color_6;
      background-color: $color_10;
    }
    //Кнопка для корректировки даты окончания диеты
    &__change-date {
      background: transparent;
      border: none;
      color: $color_3;
    }
    &__save-date {
      background: transparent;
      border: none;
      color: $color_4;
    }

    &-goal-achieved {
      color: $color_4;
      font-size: 16px;
      font-weight: bold;
    }

    .ccalorieСountingInput {
      width: 80px;
    }
  }
  .total-burned {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
  }
}

.mr10 {
  margin-right: 10px;
}

.ml10 {
  margin-left: 10px;
}

.mb10 {
  margin-bottom: 10px;
}

.fz16 {
  font-size: 16px;
}

.btn-minus {
  @extend %minusButton;
}

.btn-plus {
  @extend %plusButton;
}

.el-row {
  margin-bottom: 10px;
}
</style>

<style lang="scss">
.el-progress-bar__inner {
  background-color: $color_5;
}

.el-progress-bar__innerText{
  color: $color_1;
  font-weight: bold;
}
</style>
