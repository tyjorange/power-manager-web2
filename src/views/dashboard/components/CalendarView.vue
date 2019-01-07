<template>
  <div>
    <el-col :span="16">
      <calendar v-on:choseDay="clickDay" v-on:changeMonth="changeDate"></calendar>
    </el-col>
    <el-col :span="8">
      <el-card class="box-card1" shadow="never" :body-style="{ padding: '10px' }">
        <div slot="header" class="text-head">
          <span>日用电量</span>
        </div>
        <div class="text-item">
          0.12 kWh
        </div>
      </el-card>
      <el-card class="box-card1" shadow="never" :body-style="{ padding: '10px' }">
        <div slot="header" class="text-head">
          <span>月用电量</span>
        </div>
        <div class="text-item">
          55.24 kWh
        </div>
      </el-card>
    </el-col>
  </div>
</template>

<script>
import calendar from "@/components/Calendar";
export default {
  components: {
    calendar
  },
  methods: {
    clickDay(data) {
      console.log("c " + data); //选中某天
    },
    changeDate(data) {
      console.log("d " + data); //左右点击切换月份
    }
    // clickToday(data) {
    //   console.log(data); //跳到了本月
    // }
  }
};
</script>

<style lang="scss" scoped>
.box-card1 {
  margin-top: 20px;
}
.text-head {
  text-align: center;
  font-size: 18px;
  color: black;
  background-color: #fff;
}
.text-item {
  text-align: center;
}
</style>





