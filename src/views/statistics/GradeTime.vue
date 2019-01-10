<template>
  <section style="padding: 10px;">
    <!--工具条-->
    <el-col
      :span="24"
      class="toolbar"
      style="padding-bottom: 0px;">
      <el-form
        :inline="true"
        :model="filters">
        <el-form-item>
         <el-select v-model="filters.collectorID" placeholder="" @focus="geCollector()" >
          <el-option v-for="item in collectors"
               :key="item.collectorid"
               :label="item.name"
               :value="item.collectorid">
          </el-option>
        </el-select>
        </el-form-item>
        <el-form-item>
          <el-select
            v-model="filters.timeTypeValue"
            name="timeType">
            <el-option
              v-for="item in timeTypeOptions"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <div class="block" v-if="this.filters.timeTypeValue == 0">
            <span class="demonstration" style="vertical-align: top;">月</span>
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
      show-summary
      :summary-method="getSummaries"
      align="center">
      <el-table-column
        label="用能单元"
        width="200"
        prop="collectorName"
        style="height:50px"
        fixed>
      </el-table-column>
      <div v-if="this.filters.timeTypeValue == 0">
        <el-table-column
          width="800"
          label='2018-12'
          :show-overflow-tooltip="true">
          <template v-for='(col) in rows.cols'>
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col.label"
              :prop="col.prop"
              :key="col.key"
              width="120px"
              style="height:50px">
            </el-table-column>
          </template>
        </el-table-column>
      </div>
      <div v-if="this.filters.timeTypeValue == 1">
        <el-table-column
          width="800"
          :label=this.filters.year
          :show-overflow-tooltip="true">
          <template v-for='(col) in rows.cols'>
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col.label"
              :prop="col.prop"
              :key="col.key"
              width="120px"
              style="height:50px">
            </el-table-column>
          </template>
        </el-table-column>
      </div>
      <div v-if="this.filters.timeTypeValue == 2">
        <el-table-column
          width="800"
          label="年份（单位：万千瓦时）"
          :show-overflow-tooltip="true">
          <template v-for='(col) in rows.cols'>
            <el-table-column
              :show-overflow-tooltip="true"
              :label="col.label"
              :prop="col.prop"
              :key="col.key"
              width="120px"
              style="height:50px">
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
    rows: {
      cols: [
      {
        "label": "01",
        "prop": "timeValue.01"
      }, {
        "label": "02",
        "prop": "timeValue.02"
      }, {
        "label": "03",
        "prop": "timeValue.03"
      }, {
        "label": "04",
        "prop": "timeValue.04"
      }, {
        "label": "05",
        "prop": "timeValue.05"
      }, {
        "label": "06",
        "prop": "timeValue.06"
      }, {
        "label": "07",
        "prop": "timeValue.07"
      }, {
        "label": "08",
        "prop": "timeValue.08"
      }, {
        "label": "09",
        "prop": "timeValue.09"
      }, {
        "label": "10",
        "prop": "timeValue.10"
      }, {
        "label": "11",
        "prop": "timeValue.11"
      }, {
        "label": "12",
        "prop": "timeValue.12"
      }, {
        "label": "13",
        "prop": "timeValue.13"
      }, {
        "label": "14",
        "prop": "timeValue.14"
      }, {
        "label": "15",
        "prop": "timeValue.15"
      }, {
        "label": "16",
        "prop": "timeValue.16"
      }, {
        "label": "17",
        "prop": "timeValue.17"
      }, {
        "label": "18",
        "prop": "timeValue.18"
      }, {
        "label": "19",
        "prop": "timeValue.19"
      }, {
        "label": "20",
        "prop": "timeValue.20"
      }, {
        "label": "21",
        "prop": "timeValue.21"
      }, {
        "label": "22",
        "prop": "timeValue.22"
      }, {
        "label": "23",
        "prop": "timeValue.23"
      }, {
        "label": "24",
        "prop": "timeValue.24"
      }, {
        "label": "25",
        "prop": "timeValue.25"
      }, {
        "label": "26",
        "prop": "timeValue.26"
      }, {
        "label": "27",
        "prop": "timeValue.27"
      }, {
        "label": "28",
        "prop": "timeValue.28"
      }, {
        "label": "29",
        "prop": "timeValue.29"
      }, {
        "label": "30",
        "prop": "timeValue.30"
      }],
      "tableData": [
      {
        "collectorid": "1",
        "collectorName": "智能研发部办公室",
        "timeValue": {
          "01": 12.2,
          "02": 15.24,
          "03": 5.21,
          "04": 36.21,
          "05": 5.21,
          "06": 15.21,
          "07": 1.25,
          "08": 3.12,
          "09": 0,
          "10": 0,
          "11": 0,
          "12": 0,
          "13": 0,
          "14": 0,
          "15": 0,
          "16": 0,
          "17": 0,
          "18": 0,
          "19": 0,
          "20": 8.1,
          "21": 0,
          "22": 0,
          "23": 0,
          "24": 8,
          "25": 0,
          "26": 0,
          "27": 0,
          "28": 0,
          "29": 21,
          "30": 27.21
          }
        },
        {
        "collectorid": "2",
        "collectorName": "索罗内网测试",
        "timeValue": {
          "01": 1.25,
          "02": 4.21,
          "03": 8.5,
          "04": 2.36,
          "05": 3.12,
          "06": 5.21,
          "07": 6.32,
          "08": 4.21,
          "09": 8.21,
          "10": 12.35,
          "11": 45.2,
          "12": 54.01,
          "13": 12.36,
          "14": 41.21,
          "15": 0,
          "16": 0,
          "17": 0,
          "18": 21.25,
          "19": 14.21,
          "20": 21.25,
          "21": 45.25,
          "22": 21.21,
          "23": 1.25,
          "24": 5.2,
          "25": 6.21,
          "26": 5.21,
          "27": 8.24,
          "28": 9.21,
          "29": 45.1,
          "30": 36.21
         }
        }
      ]
    },
    //页面载入状态
    pageLoading: false,
    //列表高度
    clientHeight: "100%",
    switchs: [],
    collectors : [],
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

let geCollector = function() {
   this.collectors = [{collectorid:'1',name:'智能研发部办公室'},{collectorid:'2',name:'索罗思腾内网测试'}];  
}

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
    geCollector,
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
.el-table__fixed-footer-wrapper tbody td {
  border-top: 1px solid #ebeef5;
  background-color: #dff0d8;
  color: #606266;
}
.el-table__footer-wrapper tbody td {
    background-color: #dff0d8;
    color: #606266;
}
.el-table th{
     text-align: center;
 }
</style>
