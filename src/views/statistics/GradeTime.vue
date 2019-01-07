<template>
  <section>
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;"
    >
      <el-form
        :inline="true"
        :model="filters"
      >
        <el-form-item>
          <el-select
            v-model="filters.switchID"
            placeholder=""
            @focus="getSwitchs()"
          >
            <el-option
              v-for="item in switchs"
              :key="item.switchid"
              :label="item.name"
              :value="item.switchid"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="filters.timeTypeValue"
            name="timeType"
          >
            <el-option
              v-for="item in timeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            >
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="block" v-if="this.filters.timeTypeValue == 0">
            <span class="demonstration">月</span>
            <el-date-picker
              v-model="filters.month"
              format="yyyy-MM"
              value-format="yyyy-MM"
              type="month"
              placeholder="选择月">
            </el-date-picker>
          </div>
          <div class="block" v-if="this.filters.timeTypeValue == 1">
            <span class="demonstration">年</span>
            <el-date-picker
              v-model="filters.year"
              format="yyyy"
              value-format="yyyy"
              type="year"
              placeholder="选择年">
            </el-date-picker>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-on:click="handleQuery"
            icon="el-icon-search"
          >刷新</el-button>
        </el-form-item>
        <el-form-item>
          <el-button
            type="primary"
            v-on:click="handleAdd"
            icon="el-icon-download"
          >导出</el-button>
        </el-form-item>
      </el-form>
    </el-col>
    <el-table
      :data="rows.tableData"
      style="width: 100%; margin-top: 20px"
      stripe
      border
      highlight-current-row
      v-loading="pageLoading"
      show-summary
      :summary-method="getSummaries"
      align="center"
    >
      <el-table-column
        label="用能单元"
        width="200"
        prop="switchName"
        style="height:50px"
        fixed
      >
      </el-table-column>
      <div v-if="this.filters.timeTypeValue == 0">
        <el-table-column
          width="800"
          :label=this.filters.month
          :show-overflow-tooltip="true"
        >
          <template v-for='(col) in rows.cols'>
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col.label"
              :prop="col.prop"
              :key="col.key"
              width="120px"
              style="height:50px"
            >
            </el-table-column>
          </template>
        </el-table-column>
      </div>
      <div v-if="this.filters.timeTypeValue == 1">
        <el-table-column
          width="800"
          :label=this.filters.year
          :show-overflow-tooltip="true"
        >
          <template v-for='(col) in rows.cols'>
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col.label"
              :prop="col.prop"
              :key="col.key"
              width="120px"
              style="height:50px"
            >
            </el-table-column>
          </template>
        </el-table-column>
      </div>
      <div v-if="this.filters.timeTypeValue == 2">
        <el-table-column
          width="800"
          label="年份（单位：万千瓦时）"
          :show-overflow-tooltip="true"
        >
          <template v-for='(col) in rows.cols'>
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col.label"
              :prop="col.prop"
              :key="col.key"
              width="120px"
              style="height:50px"
            >
            </el-table-column>
          </template>
        </el-table-column>
      </div>
    </el-table>
    <!--底部-->
    <!-- <el-col :span="24" class="toolbar">
    <el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
    </el-pagination>
  </el-col> -->

  </section>
</template>

<script>
let data = () => {
  return {
    //页码
    page: 1,
    //每页数量
    size: 20,
    //总数
    total: 0,
    //查询条件
    filters: {
      switchID: "",
      timeTypeValue: "0",
      month: new Date().getFullYear() + "-" + new Date().getMonth(),
      year: new Date().getFullYear() + ""
    },
    //页面数据
    rows: [],
    //页面载入状态
    pageLoading: false,
    //列表高度
    clientHeight: "100%",
    switchs: [],
    timeTypeOptions: [
      {
        value: "0",
        label: "逐日"
      },
      {
        value: "1",
        label: "逐月"
      },
      {
        value: "2",
        label: "逐年"
      }
    ]
  };
};

let handleAdd = function() {};

let handleEdit = function(index, row) {};

let handleDelete = function(index, row) {};

let getRows = function() {
  if (this.pageLoading) return;
  this.pageLoading = true;

  //调用post请求
  const url = "/gradeTimeStatistics";
  var params = new URLSearchParams();
  params.append("switchID", this.filters.switchID); //你要传给后台的参数值 key/value
  if (this.filters.timeTypeValue == 0) {
    params.append("time", this.filters.month);
  } else if (this.filters.timeTypeValue == 1) {
    params.append("time", this.filters.year);
  } else {
    params.append("time", "");
  }
  params.append("timeType", this.filters.timeTypeValue);
  this.$axios({
    method: "post",
    url: url,
    data: params
  })
    .then(res => {
      this.pageLoading = false;

      if (res.data.code === 403) {
        this.common.notywarn(this.$notify, res.data.code, res.data.msg);
        this.$router.replace({ path: "/" });
      }

      if (!res.data || !res.data.data) return;
      //总数赋值
      this.total = res.data.data.total;
      this.page++;
      //页面元素赋值
      this.rows = res.data.data;
    })
    .catch(e => (this.pageLoading = false));
};

let handleQuery = function() {
  this.getRows();
};

let handleCurrentChange = function(val) {
  this.page = val;
  this.getRows();
};

let initHeight = function() {
  this.clientHeight = document.documentElement.clientHeight - 258 + "px";
};

let getSwitchs = function() {
  this.$axios({
    method: "get",
    url: "/getSwitchs",
    data: null
  }).then(res => {
    this.switchs = res.data.data;
  });
};

export default {
  data: data,
  methods: {
    //查询
    handleQuery,
    //添加
    handleAdd,
    //修改
    handleEdit,
    //删除
    handleDelete,
    //页数改变
    handleCurrentChange,
    //获取分页
    getRows,
    //获取所有断路器列表
    getSwitchs,
    //初始化高度
    initHeight,
    //改变行样式
    tableRowClassName({ row, rowIndex }) {
      if (rowIndex === 1) {
        return "warning-row";
      } else if (rowIndex === 3) {
        return "success-row";
      }
      return "";
    },
    getSummaries(param) {
      const { columns, data } = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === 0) {
          sums[index] = "总计";
          return;
        }
        const values = data.map(item => {
          return Number(item.timeValue[column.property.split(".")[1]]);
        });
        if (!values.every(value => isNaN(value))) {
          sums[index] = values.reduce((prev, curr) => {
            const value = Number(curr);
            if (!isNaN(value)) {
              return prev + curr;
            } else {
              return prev;
            }
          }, 0);
          // sums[index] += ' 元';
        } else {
          sums[index] = "N/A";
        }
      });
      return sums;
    }
  },
  mounted: function() {
    window.addEventListener("resize", this.initHeight);
    this.initHeight();
    this.getRows();
  }
};
</script>

<style>
.el-table .warning-row {
  background: oldlace;
}

.el-table .success-row {
  background: #f0f9eb;
}
</style>
