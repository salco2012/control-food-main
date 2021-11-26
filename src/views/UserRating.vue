<template>
  <div class="user-rating" v-if="tableExcessWeight.length && tableDeficitWeight.length">
    <el-row>
      <el-col :span="20">
        <h1 class="user-rating__title">Рейтинг пользователей</h1>
        <hr />

        <el-col :span="12"
          >
          <el-button
            class="user-rating__tabs"
            :class="{ btnActive: tabsActive === 'excess' }"
            @click="
              isExcessWeight = true;
              tabsActive = 'excess';
            "
            >Сбрасывают вес</el-button>
            </el-col>
        <el-col :span="12">
          <el-button
            class="user-rating__tabs"
            :class="{ btnActive: tabsActive === 'deficit' }"
            @click="
              isExcessWeight = false;
              tabsActive = 'deficit';
            "
            >Набирают вес</el-button>
            </el-col>

        <el-table
          v-if="isExcessWeight"
          :data="tableExcessWeight"
          :key="1"
          header-row-class-name="table-header"
          row-class-name="table-rows-name"
          :header-cell-style="{ 'background-color': '#ffb572' }"
          :cell-style="{ 'background-color': '#ffb5727F' }"
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="Аватарка">
            <template slot-scope="scope">
              <img
                v-if="scope.row.imageData"
                class="user-rating__avatar"
                :src="scope.row.imageData"
              />
              <img
                v-else-if="scope.row.gender === 'мужской'"
                class="user-rating__avatar"
                src="../assets/img/icons/avatar-man.jpg"
              />
              <img v-else class="user-rating__avatar" src="../assets/img/icons/avatar-woman.jpg" />
            </template>
          </el-table-column>

          <el-table-column label="Имя">
            <template slot-scope="scope">
              <p v-if="scope.row.name">{{ scope.row.name }}</p>
              <p v-else-if="scope.row.imageData">Анонимный</p>
              <p v-else-if="scope.row.gender === 'мужской'">Неопознанный кот</p>
              <p v-else>Неопознанная кошка</p>
            </template>
          </el-table-column>

          <el-table-column prop="age" label="Возраст" sortable>
            <template slot-scope="scope">
              <p>{{ scope.row.age }}</p>
            </template>
          </el-table-column>

          <el-table-column label="e-mail">
            <template slot-scope="scope">
              {{ scope.row.email.replace(/.{3}/, '***') }}
            </template>
          </el-table-column>

          <el-table-column prop="sumCalories" label="Потеряно (кал.)" sortable>
            <template slot-scope="scope">
              {{ `${scope.row.sumCalories} кал.` }}
            </template>
          </el-table-column>

          <el-table-column prop="sumKg" label="Потеряно (кг.)" sortable>
            <template slot-scope="scope">
              <b> {{ `${scope.row.sumKg} кг.` }}</b>
            </template>
          </el-table-column>
        </el-table>

        <el-table
          v-else
          :data="tableDeficitWeight"
          :key="2"
          header-row-class-name="table-header"
          row-class-name="table-rows-name"
          :header-cell-style="{ 'background-color': '#ffb572' }"
          :cell-style="{ 'background-color': '#ffb5727F' }"
          style="width: 100%"
          height="100%"
        >
          <el-table-column label="Аватарка">
            <template slot-scope="scope">
              <img
                v-if="scope.row.imageData"
                class="user-rating__avatar"
                :src="scope.row.imageData"
              />
              <img
                v-else-if="scope.row.gender === 'мужской'"
                class="user-rating__avatar"
                src="../assets/img/icons/avatar-man.jpg"
              />
              <img v-else class="user-rating__avatar" src="../assets/img/icons/avatar-woman.jpg" />
            </template>
          </el-table-column>

          <el-table-column label="Имя">
            <template slot-scope="scope">
              <p v-if="scope.row.name">{{ scope.row.name }}</p>
              <p v-else-if="scope.row.imageData">Анонимный</p>
              <p v-else-if="scope.row.gender === 'мужской'">Неопознанный кот</p>
              <p v-else>Неопознанная кошка</p>
            </template>
          </el-table-column>

          <el-table-column prop="age" label="Возраст" sortable>
            <template slot-scope="scope">
              <p>{{ scope.row.age }}</p>
            </template>
          </el-table-column>

          <el-table-column label="e-mail">
            <template slot-scope="scope">
              {{ scope.row.email.replace(/.{3}/, '***') }}
            </template>
          </el-table-column>

          <el-table-column prop="sumCalories" label="Набрано (кал.)" sortable>
            <template slot-scope="scope">
              {{ `${scope.row.sumCalories} кал.` }}
            </template>
          </el-table-column>

          <el-table-column prop="sumKg" label="Набрано (кг.)" sortable>
            <template slot-scope="scope">
              <b> {{ `${scope.row.sumKg} кг.` }}</b>
            </template>
          </el-table-column>

        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  name: 'UserRating',
  data() {
    return {
      // Данные пользователей с избыточным весом (которые сбрасывают)
      tableExcessWeight: [],
      // Данные пользователей с дефицитом веса (которые набирают)
      tableDeficitWeight: [],
      // Флаг отвечает какой список отображаем.
      isExcessWeight: true,
      tabsActive: 'excess',
    };
  },
  computed: {
    // Получаем всех пользователей.
    allUsers() {
      return this.$store.state.UserInfoDatabase.listAllUsers;
    },
  },
  methods: {
    // Подсчет калорий сброшенных пользователем за время пользования сервисом
    totalCaloriesBurned() {
      for (let i = 0; i < this.tableExcessWeight.length; i += 1) {
        const userСalories = Object.values(this.tableExcessWeight[i].userСalories);
        const sumCalories = userСalories.reduce((total, obj) => total + obj.differencePerDay, 0);
        this.tableExcessWeight[i].sumCalories = Math.abs(sumCalories);
        this.tableExcessWeight[i].sumKg = +Math.abs(sumCalories / 7700).toFixed(2);
      }

      for (let i = 0; i < this.tableDeficitWeight.length; i += 1) {
        const userСalories = Object.values(this.tableDeficitWeight[i].userСalories);
        const sumCalories = userСalories.reduce((total, obj) => total + obj.differencePerDay, 0);
        this.tableDeficitWeight[i].sumCalories = Math.abs(sumCalories);
        this.tableDeficitWeight[i].sumKg = +Math.abs(sumCalories / 7700).toFixed(2);
      }
    },

    // Распределяем пользователей на категории (с лишним весом и дефицитом веса)
    spreadOverTables() {
      // Получаем ключ всех пользователей
      const keysAllUsers = Object.keys(this.allUsers);

      // Сохраняем всех пользователей в массив.
      const allUsersArr = [];
      for (let i = 0; i < keysAllUsers.length; i += 1) {
        allUsersArr.push(this.allUsers[keysAllUsers[i]]);
      }

      // Фильтруем только пользователей у которых есть свойство: userСalories
      const inUserCalories = allUsersArr.filter((el) => el.userСalories);

      for (let i = 0; i < inUserCalories.length; i += 1) {
        // Ключ последней даты
        const lastDate = Object.keys(inUserCalories[i].userСalories)[
          Object.keys(inUserCalories[i].userСalories).length - 1
        ];

        // Значение свойства weightUserStatus по ключу последней даты
        const weightUserStatus = inUserCalories[i].userСalories[lastDate].weightUserStatus;

        /* При условии weightUserStatus === 'deficitWeight' пушим в массив
      пользователей с дефицитом калорий */
        if (weightUserStatus === 'excessWeight') {
          this.tableExcessWeight.push(inUserCalories[i]);
        } else if (weightUserStatus === 'deficitWeight') {
          this.tableDeficitWeight.push(inUserCalories[i]);
        }
      }
    },
  },
  async created() {
    await this.$store.dispatch('getListAllUsers');
    this.spreadOverTables();
    this.totalCaloriesBurned();
  },
  mounted() {
    // Сортируем массивы по значению sumKg
    this.tableExcessWeight = this.tableExcessWeight.sort((a, b) => (a.sumKg < b.sumKg ? 1 : -1));
    this.tableDeficitWeight = this.tableDeficitWeight.sort((a, b) => (a.sumKg < b.sumKg ? 1 : -1));
  },
};
</script>

<style lang="scss" scoped>
.user-rating {
  margin-top: 40px;
  margin-left: 40px;
  &__title {
    @extend %title;
    color: white;
  }
  &__avatar {
    width: 75px;
    height: 75px;
    object-fit: cover;
    border-radius: 50%;
  }
  &__tabs {
    background-color: $color_6;
    color: $color_2;
    border-radius: 0;
    width: 100%;
    transition: 1s;
    &:hover {
      background: $color_4;
    }
  }
  .btnActive {
    background: $color_4;
  }
}
</style>

<style lang="scss">
// .el-table {
//   height: auto !important;
// }

.el-table .cell {
  word-break: break-word;
}

tr.table-header > th {
  font-family: 'MontserratMedium';
  text-transform: uppercase;
  color: $color_1;
  font-size: 16px;
}

.table-rows-name {
  color: $color_2;
  font-family: 'MontserratRegular';
  font-size: 16px;
}

.el-table .sort-caret.descending {
  border-top-color: $color_2;
}

.el-table .sort-caret.ascending {
  border-bottom-color: $color_2;
}

.el-table .ascending .sort-caret.ascending {
  border-bottom-color: $color_4;
}

.el-table .descending .sort-caret.descending {
  border-top-color: $color_4;
}
</style>
