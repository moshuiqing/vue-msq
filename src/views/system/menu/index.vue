<template>

    <div class="custom-tree-container treeStyle">
        <div class="block">
            <el-tree
                    :data="data"
                    node-key="id"
                    default-expand-all
                    :expand-on-click-node="false"
            >
        <span slot-scope="{ node, data }" class="custom-tree-node">
          <span>{{ data.title }}</span>
          <span>
            <el-button
                    type="text"
                    size="mini"
                    @click="() => append(data)">
              新增
            </el-button>
            <el-button
                    v-if="data.id!=='0'"
                    type="text"
                    size="mini"
                    @click="() => openUp(data)">
              修改
            </el-button>
            <el-button
                    v-if="data.id!=='0'"
                    type="text"
                    size="mini"
                    @click="() => remove(node, data)"
            >
              删除
            </el-button>
          </span>
        </span>
            </el-tree>
        </div>

        <el-dialog title="菜单编辑" :close-on-click-modal="flag" :visible.sync="dialogFormVisible">
            <el-form :model="menu" :rules="trees" ref="treeForm">
                <el-form-item label="标题" prop="title" :label-width="formLabelWidth">
                    <el-input v-model="menu.title" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="名称" prop="name" :label-width="formLabelWidth">
                    <el-input v-model="menu.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="图标" prop="icon" :label-width="formLabelWidth">
                    <el-input v-model="menu.icon" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="路径" prop="path" :label-width="formLabelWidth">
                    <el-input v-model="menu.path" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="组件" prop="component" :label-width="formLabelWidth">
                    <el-input v-model="menu.component" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="是否显示根路由" prop="alwaysShow" :label-width="formLabelWidth">
                    <el-switch v-model="menu.alwaysShow" autocomplete="off"></el-switch>
                </el-form-item>
                <el-form-item label="排序" prop="sort" :label-width="formLabelWidth">
                    <el-input v-model="menu.sort" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="resetForm('treeForm')">取 消</el-button>
                <el-button type="primary" @click="submitForm('treeForm')">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
  export default {
    name: 'Index',
    data() {
      return {
        trees: {
          title: [
            { required: true, message: '请输入菜单标题', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          name: [
            { required: true, message: '请输入菜单名称', trigger: 'blur' },
            { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur' }
          ],
          icon: [
            { required: true, message: '请输入图标', trigger: 'blur' }
          ],
          path: [
            { required: true, message: '请输入路径', trigger: 'blur' }
          ],
          component: [
            { required: true, message: '请输入组件', trigger: 'blur' }
          ],
          sort: [
            { type: 'number', message: '排序必须为数字', trigger: 'blur', transform: (value) => Number(value) },
            { pattern: /^(1|[1-9]\d?|100)$/, message: '范围在0-100', trigger: 'blur' }
          ]
        },
        data: [],
        flag: false,
        dialogFormVisible: false,
        parentId: '',
        menu: {
          id: '',
          title: '',
          icon: '',
          path: '',
          name: '',
          component: '',
          alwaysShow: false,
          sort: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.getTree()
    },
    methods: {
      resetForm(formName) {
        this.$refs[formName].resetFields()
        this.dialogFormVisible = false
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            const menu = this.menu
            if (this.parentId !== '0') {
              menu.parentId = this.parentId
            }
            console.log(222222222222222222222222222222222)
            if (this.menu.id === '') {
              this.save(menu, formName)
            } else {
              this.update(menu, formName)
            }

            //  this.$refs[formName].resetFields()
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      save(menu, formName) {
        this.$store.dispatch('menu/add', menu).then((res) => {
          const { code, msg } = res
          this.$message({
            message: msg,
            type: 'success'
          })
          if (code > 0) {
            this.getTree()
            this.dialogFormVisible = false
            this.$refs[formName].resetFields()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      update(menu, formName) {
        this.$store.dispatch('menu/update', menu).then((res) => {
          const { code, msg } = res
          this.$message({
            message: msg,
            type: 'success'
          })
          if (code > 0) {
            this.getTree()
            this.dialogFormVisible = false
            this.$refs[formName].resetFields()
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      getTree() {
        this.$store.dispatch('menu/getAllMenus').then((res) => {
          const { code, data } = res
          if (code > 0) {
            console.log(data)
            this.data = data
          }
        }).catch((err) => {
          console.log(err)
        })
      },
      append(data) {
        this.dialogFormVisible = true
        this.parentId = data.id
        console.log(data)
      },
      openUp(data) {
        this.dialogFormVisible = true
        this.parentId = data.parentId
        const m = {
          id: data.id,
          title: data.title,
          icon: data.icon,
          path: data.path,
          name: data.name,
          component: data.component,
          alwaysShow: data.alwaysShow,
          sort: data.sort
        }
        this.menu = m
      },
      remove(node, data) {
        this.$confirm('此操作将删除该菜单, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          const parent = node.parent
          const children = parent.data.children || parent.data
          const index = children.findIndex(d => d.id === data.id)
          children.splice(index, 1)
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
      }
    }
  }
</script>

<style type="scss">
    .custom-tree-node {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: space-between;
        font-size: 14px;
        padding-right: 50%;
    }

    .treeStyle {

        margin-top: 2%;
    }
</style>
