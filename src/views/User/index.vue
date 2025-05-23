<script setup>
import { ref, onMounted, reactive } from 'vue'
import { getUserData, deleteUser } from '@/apis/user'
import { openConfirm } from '@/components/confirmBox'
import addUserData from './addUserData.vue'
import editUserData from './editUserData.vue'

const tableData = ref([])
const dialogVisible = ref(false) //新增 弹框的显示
const editDialogVisible = ref(false) //编辑 弹框的显示
// 个人用户信息
const userInfo = ref({
  id: '',
  name: '',
  addr: '',
  birth: '',
  sex: '',
})

const getTableData = async () => {
  const list = await getUserData(config)
  // console.log(list.data) //返回的是一个array
  tableData.value = list.data.list
  config.total = list.data.total
}
const formInline = reactive({
  keyWord: '',
})
const config = reactive({
  name: '',
  total: 0,
  page: 1,
  pageSize: 25,
})
const isSearch = ref(true)

const handleSearch = async () => {
  config.name = formInline.keyWord
  await getTableData()
  isSearch.value = false
}
const handleBack = async () => {
  formInline.keyWord = ''
  config.name = ''
  await getTableData()
  isSearch.value = true
}
const handleCurrentChange = async (page) => {
  config.page = page
  await getTableData()
}
const handleSizeChange = async (size) => {
  config.pageSize = size
  config.page = 1 // 改变每页条数后通常重置为第1页
  await getTableData()
}

const handleAdd = () => {
  dialogVisible.value = true
}

const handleDelete = async (id) => {
  try {
    await openConfirm('您确定删除用户信息吗？')
    // 发送删除请求
    await deleteUser({ id })
    // 删除成功后更新本地数据
    tableData.value = tableData.value.filter((item) => item.id !== id)
    await getTableData()
  } catch (error) {
    console.error('删除失败', error)
  }
}

// 当编辑弹窗时更新
const handleEdit = (user) => {
  // console.log('#######')
  userInfo.value = user
  // console.log(userInfo.value) //有值
  editDialogVisible.value = true
}

onMounted(() => {
  getTableData()
  // console.log('初始化时 dialogVisible:', editDialogVisible.value) // 检查是否传入正确
})
</script>

<template>
  <div class="page">
    <div class="header">
      <el-button type="primary" @click="handleAdd">新增</el-button>
      <el-form inline="true" :model="formInline">
        <el-form-item label="请输入您需要找的用户名：">
          <el-input placeholder="请输入用户名:" v-model="formInline.keyWord"> </el-input>
        </el-form-item>
        <el-form-item>
          <el-button v-show="isSearch" type="primary" @click="handleSearch">搜索</el-button>
          <el-button v-show="!isSearch" type="primary" @click="handleSearch">搜索</el-button>
          <el-button v-show="!isSearch" type="primary" @click="handleBack">返回</el-button>
        </el-form-item>
      </el-form>
    </div>

    <div class="container">
      <!-- lable绑定表头，，prop绑定数据 -->
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="name" label="姓名" width="150" />
        <el-table-column prop="age" label="年龄" width="150" />
        <el-table-column label="性别" width="150">
          <template #default="{ row }">
            {{ row.sex === 0 ? '男' : '女' }}
          </template>
        </el-table-column>
        <el-table-column prop="birth" label="出生日期" width="250" />
        <el-table-column prop="addr" label="地址" width="600" />
        <el-table-column label="操作" min-width="120">
          <template #default="{ row }">
            <el-button type="primary" size="small" @click="handleEdit(row)"> 编辑 </el-button>
            <el-button type="danger" size="small" @click="handleDelete(row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="footer">
      <el-pagination
        v-model:page-size="config.pageSize"
        v-model:current-page="config.page"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
        background
        layout="sizes,prev, pager, next,jumper"
        :total="config.total"
        :page-size="config.pageSize"
        :page-sizes="[10, 15, 20, 25, 30]"
      />
    </div>
  </div>

  <!-- 新增 -->
  <addUserData v-model:dialogVisible="dialogVisible" @refreshData="getTableData"></addUserData>
  <!-- 编辑 -->

  <editUserData
    v-model:dialogVisible="editDialogVisible"
    :userInfo="userInfo"
    @update:dialogVisible="editDialogVisible = $event"
    @editData="getTableData"
  ></editUserData>
</template>

<style scoped lang="less">
.page {
  padding: 0 20px 20px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  box-sizing: border-box;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;

  .el-form {
    display: flex;
    align-items: center;
    gap: 10px;
  }
}

.container {
  height: calc(100vh - 250px);
  // max-height: calc(100vh - 250px);
  overflow-y: auto;
  background-color: #fff;
  padding: 10px;
  border-radius: 8px;
}
.footer {
  padding: 10px;
  background-color: #fff;
  display: flex;
  justify-content: flex-end;
}
</style>
