<template>
  <div class="app-container">
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
  </div>
</template>

<script>
import dictApi from '@/api/yygh/dict'

export default {
  data() {
    return {
      list: []
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
    }
  }
}
</script>

<style scoped>

</style>
