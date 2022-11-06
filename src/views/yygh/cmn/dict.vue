<template>
  <div class="app-container">
    <div class="el-toolbar">
      <div class="el-toolbar-body" style="justify-content: flex-start;">
        <el-button type="primary" @click="exportData"><i class="fa fa-plus" /> 数据字典导出</el-button>
        <el-button type="success" @click="importData"><i class="fa fa-plus" /> 数据字典导入</el-button>
      </div>
    </div>
    <el-table
      :data="list"
      :load="load"
      :tree-props="{children: 'children', hasChildren: 'hasChildren'}"
      border
      lazy
      row-key="id"
      style="width: 100%"
    >
      <el-table-column label="数据字典名称" prop="name" />
      <el-table-column label="数据字典编码" prop="dictCode" />
      <el-table-column label="创建时间" prop="createTime" />
      <el-table-column label="更新时间" prop="updateTime" />
    </el-table>
    <!-- dialogImportVisible:false 隐藏   true：显示 -->
    <el-dialog :visible.sync="dialogImportVisible" title="数据字典导入" width="500px">
      <el-form label-position="right" label-width="170px">
        <el-form-item label="数据字典">
          <el-upload
            :action="'http://localhost:8202/admin/cmn/dict/importData'"
            :multiple="false"
            :on-success="onUploadSuccess"
            class="upload-demo"
          >
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">注意：只能上传xls文件，且不超过500kb</div>
          </el-upload>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="info" @click="dialogImportVisible = false">取消</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import dictApi from '@/api/yygh/dict'

export default {
  data() {
    return {
      list: [],
      dialogImportVisible: false // 导入文件的弹出框，默认不显示
    }
  },
  created() {
    // 默认显示一级列表，对应parent_id为1
    this.getDictList(1)
  },
  methods: {
    // tree当前节点信息
    load(tree, treeNode, resolve) {
      // 根据id查询下级列表，放在resolve(list)中
      setTimeout(() => {
        dictApi.dictList(tree.id).then(resp => {
          // 如果当前节点存在子节点，则将其子节点追加到当前节点中
          resolve(resp.data.list) // resp.data.list 对应后端中return Result.ok().data("list", list);
        })
      }, 0) // 可以设置执行时时间
    },
    getDictList(id) {
      dictApi.dictList(1).then(resp => {
        this.list = resp.data.list
      })
    },
    // 数据字典导出 在浏览器中直接访问接口即可，是文件的话会自动弹出下载窗口 默认文件名【数据字典】
    exportData() {
      // 当前页打开链接
      window.location = 'http://localhost:8202/admin/cmn/dict/exportData'
      // 在新标签页中打开链接
      // window.open('http://localhost:8202/admin/cmn/dict/exportData', '_blank')
      // 在新窗口【弹出框】中打开链接
      // window.open('http://localhost:8202/admin/cmn/dict/exportData', null, 'width=500,height=500')
    },
    // 数据字典导入
    importData() {
      this.dialogImportVisible = true // 打开导入文件的弹出框
    },
    // 导入成功成功后要执行
    onUploadSuccess(response, file) {
      this.$message.success('恭喜你，上传成功')
      this.dialogImportVisible = false // 关闭弹出层
      this.getDictList(1)
    }
  }
}
</script>

<style scoped>

</style>
