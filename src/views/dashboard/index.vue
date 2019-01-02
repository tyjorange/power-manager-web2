<template>
  <div class="dashboard-container">
    <div class="dashboard-text">name:{{ name }}</div>
    <div class="dashboard-text">roles:<span
        v-for="role in roles"
        :key="role"
      > {{ role }} </span></div>
    <div class="dashboard-text">permissions:<span
        v-for="permission in permissions"
        :key="permission"
      > {{ permission }} </span></div>
    <div>
      <el-row>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <calendar
              v-on:choseDay="clickDay"
              v-on:changeMonth="changeDate"
            ></calendar>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple"></div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple-light"></div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import calendar from "vue-calendar-component";

export default {
  name: "Dashboard",
  computed: {
    ...mapGetters(["name", "roles", "permissions"])
  },
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

<style rel="stylesheet/scss" lang="scss" scoped>
.dashboard {
  &-container {
    margin: 30px;
  }
  &-text {
    font-size: 30px;
    line-height: 46px;
  }
}
.el-row {
  margin-bottom: 20px;
  &:last-child {
    margin-bottom: 0;
  }
}
.el-col {
  border-radius: 4px;
}
.bg-purple-dark {
  background: #99a9bf;
}
.bg-purple {
  background: #d3dce6;
}
.bg-purple-light {
  background: #e5e9f2;
}
.grid-content {
  border-radius: 4px;
  min-height: 360px;
}
.row-bg {
  padding: 10px 0;
  background-color: #f9fafc;
}
.calendar {
  background-color: fuchsia;
}
</style>
