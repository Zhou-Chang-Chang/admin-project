<script setup>
import { ref, reactive, watch } from 'vue'
import { addUser } from '@/apis/user'
import { ElMessage } from 'element-plus'

// 定义接收的 props
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
})
// 中间变量用于 v-model 绑定
const innerDialogVisible = ref(props.dialogVisible)
// 定义发送事件的接口
const emit = defineEmits(['update:dialogVisible', 'refreshData'])

// const dialogVisible = ref(false) //新增 弹框的显示
const ruleFormRef = ref()
//新增
const form = reactive({
  name: '',
  addr: '',
  birth: '',
  age: '',
  sex: 0,
})
const rules = reactive({
  name: [{ required: true, message: '请输入姓名', trigger: 'blur' }],
  addr: [{ required: true, message: '请输入地址', trigger: 'blur' }],
  birth: [
    {
      required: true,
      message: '请输入出生日期',
      trigger: 'blur',
    },
  ],
  age: [
    { required: true, message: '请输入年龄', trigger: 'blur' },
    { pattern: /^[0-9]+$/, message: '年龄必须为数字', trigger: 'blur' },
  ],
  sex: [
    { required: true, message: '请选择性别', trigger: 'change' },
    {
      validator: (rule, value, callback) => {
        if (value !== 1 && value !== 0) {
          callback(new Error('性别必须是男或女'))
        } else {
          callback()
        }
      },
      trigger: 'change',
    },
  ],
})
// 计算年龄的函数
const calculateAge = (birthDate) => {
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  // 如果当前日期还没到生日，减去1年
  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const onSubmit = async () => {
  // 将出生日期转换为 Date 对象
  const birthDate = new Date(form.birth)
  if (isNaN(birthDate.getTime())) {
    // 日期无效
    ElMessage.warning('请选择有效的出生日期')
    return
  }
  // 获取格式化后的日期，去除时间部分
  form.birth = birthDate.toISOString().split('T')[0] // 获取YYYY-MM-DD部分

  // 计算年龄
  form.age = calculateAge(birthDate)
  // 手动转换为数字类型
  // form.age = Number(form.age)

  // 在提交之前确保性别值是正确的
  // form.sex = form.sex === 1 ? 1 : 0 // 保证只提交 1 或 0
  ruleFormRef.value.validate((valid) => {
    if (!valid) {
      // 表单校验失败的提示
      ElMessage.warning('请完整填写表单信息')
    }
    if (valid) {
      // 表单验证通过，关闭弹窗
      // 表单验证通过，关闭弹框
      emit('update:dialogVisible', false)

      // dialogVisible.value = false
      // 调用接口，数据传到后台
      addUser(form).then(async () => {
        // 提交成功后触发刷新数据事件
        emit('refreshData')
        ElMessage({
          type: 'success',
          message: '添加成功',
        })
        handleClose() // 提交成功后重置表单字段
      })
    }
  })
}

// props 改变时，更新 innerDialogVisible
watch(
  () => props.dialogVisible,
  (val) => {
    innerDialogVisible.value = val
  },
)
//关闭新增弹窗
const handleClose = () => {
  // dialogVisible.value = false
  emit('update:dialogVisible', false)
  ruleFormRef.value.resetFields() // 重置验证状态
}
</script>

<template>
  <!-- 新增 -->
  <el-dialog
    v-model="innerDialogVisible"
    title="请填写新增用户信息："
    width="500"
    :before-close="handleClose"
    :close-on-click-modal="false"
  >
    <div class="el-dialog-container">
      <el-form
        :model="form"
        label-width="auto"
        ref="ruleFormRef"
        :rules="rules"
        style="max-width: 500px"
      >
        <el-form-item label="姓名" prop="name">
          <el-input v-model="form.name" />
        </el-form-item>
        <!-- <el-form-item label="年龄" prop="age">
          <el-input v-model="form.age" />
        </el-form-item> -->
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex">
            <el-option label="男" :value="0"></el-option>
            <el-option label="女" :value="1"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <!-- <el-input v-model="form.birth" /> -->
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择出生日期"
            format="YYYY-MM-DD"
          />
        </el-form-item>
        <el-form-item label="地址" prop="addr">
          <el-input v-model="form.addr" />
        </el-form-item>
      </el-form>
    </div>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="handleClose">取消</el-button>
        <el-button type="primary" @click="onSubmit"> 确定 </el-button>
      </div>
    </template>
  </el-dialog>
</template>

<style scoped lang="less"></style>
