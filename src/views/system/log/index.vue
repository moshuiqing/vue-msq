<template>
    <div style="margin-top: 1%">
        <el-form :model="dataForm" label-width="100px" class="demo-ruleForm">
            <el-row>
                <el-col :span="6">
                    <el-form-item label="操作人">
                        <el-input v-model="dataForm.operator"></el-input>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item label="是否异常">
                        <el-select v-model="dataForm.isAbnormal" placeholder="请选择">
                            <el-option label="请选择" value=""></el-option>
                            <el-option label="正常" value="正常"></el-option>
                            <el-option label="异常" value="异常"></el-option>
                        </el-select>
                    </el-form-item>
                </el-col>
                <el-col :span="6">
                    <el-form-item>
                        <el-button type="primary" @click="seachForm">查询</el-button>
                    </el-form-item>
                </el-col>
            </el-row>
        </el-form>
        <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                @selection-change="handleSelectionChange">
            <el-table-column
                    type="selection"
                    width="55">
            </el-table-column>
            <el-table-column
                    prop="operator"
                    label="操作人"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="method"
                    label="请求方法"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="timeConsuming"
                    label="耗时"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="isAbnormal"
                    label="是否异常"
                    width="120">
            </el-table-column>
            <el-table-column
                    prop="url"
                    label="请求地址"
                    show-overflow-tooltip>
            </el-table-column>
            <el-table-column
                    prop="ip"
                    label="ip地址"
                    width="120">
            </el-table-column>
            <el-table-column
                    label="操作时间"
                    width="200">
                <template slot-scope="scope">{{ scope.row.operatingTime }}</template>
            </el-table-column>
        </el-table>
        <el-pagination
                background
                layout="sizes,prev, pager, next"
                @current-change="change"
                @size-change="sizeChage"
                :page-size="size"
                :current-page="page"
                :page-sizes="[10,20,30]"
                :total="total">
        </el-pagination>
    </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        page: 1,
        size: 10,
        tableData: [],
        total: 0,
        multipleSelection: [],
        dataForm: {
          operator: '',
          isAbnormal: ''
        }
      }
    },
    mounted() {
      this.pageFound()
    },
    methods: {
      seachForm() {
        this.pageFound()
      },
      pageFound() {
        const param = {
          page: this.page,
          limit: this.size
        }
        console.log(1111)
        let p = Object.assign({}, this.dataForm)
        p = Object.assign({}, param, p)
        this.global_delete(p)
        this.$store.dispatch('syslog/pageFound', p).then((res) => {
          const { code, data } = res
          if (code > 0) {
            this.tableData = data.data
            this.total = data.count
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      sizeChage(size) {
        this.size = size
        this.pageFound()
      },
      change(page) {
        this.page = page
        this.pageFound()
      },
      handleSelectionChange(val) {
        this.multipleSelection = val
      }
    }
  }
</script>

<style scoped>

</style>
