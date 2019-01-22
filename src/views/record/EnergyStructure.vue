<!-- 用能结构 -->
<template>
  <section style="padding: 10px;">
    <el-row style="padding: 10px 20px;">
      <el-col :span="6">
        <label>能源种类</label>
        <template>
          <el-select v-model="value" placeholder="请选择" style="width:300px;">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </template>
        <el-tree :data="data" :props="defaultProps" @node-click="handleNodeClick" style="margin-top: 10px;"></el-tree>
      </el-col>
      <el-col :span="18">
        <div style="margin-bottom: 10px;">
          <el-input v-model="input" placeholder="请输入计量点名称/通讯地址" style="width:300px"></el-input>
          <span style="float:right;">
            <el-button type="primary" size="small">新增计量点</el-button>
            <el-button type="primary" size="small">修改计量点</el-button>
            <el-button type="primary" size="small">删除计量点</el-button>
            <el-button type="primary" size="small">查询</el-button>
            <el-button type="primary" size="small">导出</el-button>
          </span>
        </div>
        <template>
          <el-table
            :data="tableData"
            ref="multipleTable"
            border
            style="width: 100%">
            <el-table-column
              type="selection"
              width="55">
            </el-table-column>
            <el-table-column
              prop="date"
              label="日期"
              width="180">
            </el-table-column>
            <el-table-column
              prop="name"
              label="姓名"
              width="180">
            </el-table-column>
            <el-table-column
              prop="address"
              label="地址">
            </el-table-column>
          </el-table>
        </template>
      </el-col>
    </el-row>
    
  </section>
</template>

<script>
  export default {
    data() {
      return {
        options: [{
          value: '1',
          label: '电力'
        }, {
          value: '2',
          label: '水'
        }, {
          value: '3',
          label: '热水'
        }, {
          value: '4',
          label: '热能'
        }, {
          value: '5',
          label: '天然气'
        }, {
          value: '6',
          label: '蒸汽'
        }, {
          value: '7',
          label: '无烟煤'
        }, {
          value: '8',
          label: '汽油'
        }, {
          value: '9',
          label: '柴油'
        }],
        value: '',
        data: [{
          label: '一级 1',
          children: [{
            label: '二级 1-1',
            children: [{
              label: '三级 1-1-1'
            }]
          }]
        }, {
          label: '一级 2',
          children: [{
            label: '二级 2-1',
            children: [{
              label: '三级 2-1-1'
            }]
          }, {
            label: '二级 2-2',
            children: [{
              label: '三级 2-2-1'
            }]
          }]
        }, {
          label: '一级 3',
          children: [{
            label: '二级 3-1',
            children: [{
              label: '三级 3-1-1'
            }]
          }, {
            label: '二级 3-2',
            children: [{
              label: '三级 3-2-1'
            }]
          }]
        }],
        defaultProps: {
          children: 'children',
          label: 'label'
        },
        tableData: [{
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        }, {
          date: '2016-05-04',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1517 弄'
        }, {
          date: '2016-05-01',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1519 弄'
        }, {
          date: '2016-05-03',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1516 弄'
        }]
      };
    },
    methods: {
      handleNodeClick(data) {
        console.log(data);
      }
    }
  };
</script>

<style>
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
 .el-button+.el-button {
    margin-left: 0px;
}
.el-table td:first{
  text-align: center;
}
</style>
