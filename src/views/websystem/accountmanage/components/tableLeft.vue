 <template>
  <div>
    <el-form ref="form" size="mini" label-width="0px">
      <template>
        <el-select v-model="value" placeholder="请选择" size="mini" style="float:left;">
          <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          </el-option>
        </el-select>
      </template>
      <el-input v-model="terminal" placeholder="请输入用户账号/用户名称" size="mini" class="input"></el-input>
      <!-- <el-collapse v-model="activeNames">
        <el-collapse-item title="数据项" name="col1"> -->
      <el-button-group class="groupbt">
        <el-button type="primary" size="mini" @click="onSubmit">新增</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">查询</el-button>
        <el-button type="primary" size="mini" @click="onSubmit">导出</el-button>
      </el-button-group>
      <!-- </el-collapse-item>
      </el-collapse> -->
      <el-table v-loading="listLoading" element-loading-text="加载中" element-loading-spinner="el-icon-loading"
        element-loading-background="rgba(0, 0, 0, 0.1)" :header-cell-style="tableHeaderColor" :data="tableData" size="small"
        border stripe highlight-current-row>
        <el-table-column type="index">
        </el-table-column>
        <el-table-column prop="date" label="用户账号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="用户名称" width="180">
        </el-table-column>
        <el-table-column prop="address" label="系统角色">
        </el-table-column>
        <el-table-column prop="name" label="所属企业">
        </el-table-column>
        <el-table-column prop="name" label="联系电话">
        </el-table-column>
        <el-table-column prop="name" label="电子邮箱">
        </el-table-column>
        <el-table-column prop="name" label="操作">
        </el-table-column>
      </el-table>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [
        {
          value: "-1",
          label: "账号类型"
        },
        {
          value: "0",
          label: "企业操作员"
        },
        {
          value: "1",
          label: "企业管理员"
        }
      ],
      value: "-1",
      terminal: "",
      activeNames: "col1",
      radio1: 1,
      tableData: [],
      listLoading: false
    };
  },
  methods: {
    onSubmit() {},
    // 修改table header的背景色
    tableHeaderColor({ row, column, rowIndex, columnIndex }) {
      if (rowIndex === 0) {
        return "background-color: #eee;color: #000;";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
div {
  margin: 3px;
  margin-right: 0px;
}
.input {
  position: relative;
  font-size: 14px;
  display: inline-block;
  width: 300px;
  margin-left: 10px;
}
.el-form-item {
  margin: 0px;
}
.groupbt {
  float: right;
  margin-right: 5px;
  margin-top: 10px;
  margin-bottom: 10px;
}
.el-table {
  width: 100%;
  margin-top: 12px;
}
</style>