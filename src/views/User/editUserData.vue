<script setup>
import { ref, reactive, watch } from 'vue'
import { editUser } from '@/apis/user'
import { ElMessage } from 'element-plus'

// 接收父组件传递的 props
const props = defineProps({
  dialogVisible: {
    type: Boolean,
    required: true,
  },
  userInfo: {
    type: Object,
    required: true,
  },
})
// 中间变量用于 v-model 绑定
const innerDialogVisible = ref(props.dialogVisible)
// 触发事件更新父组件的状态
const emit = defineEmits(['update:dialogVisible', 'editData'])

// 表单的引用
const ruleFormRef = ref()

// 表单数据
const form = reactive({
  name: '',
  addr: '',
  birth: '',
  age: '',
  sex: 0,
})

// 表单验证规则
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

// 监听 userInfo 的变化并更新表单
watch(
  () => props.userInfo,
  (newUserInfo) => {
    form.name = newUserInfo.name || ''
    form.addr = newUserInfo.addr || ''
    form.birth = newUserInfo.birth || ''
    form.sex = newUserInfo.sex || 0
    form.id = newUserInfo.id
    form.age = calculateAge(form.birth) // 你可以根据需要重新计算 age
  },
)

// 计算年龄的函数
const calculateAge = (birth) => {
  const birthDate = new Date(birth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const month = today.getMonth() - birthDate.getMonth()

  if (month < 0 || (month === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

const onSubmit = async () => {
  form.age = calculateAge(form.birth)
  const birthDate = new Date(form.birth)
  if (isNaN(birthDate.getTime())) {
    // 日期无效
    ElMessage.warning('请选择有效的出生日期')
    return
  }
  form.birth = birthDate.toISOString().split('T')[0] // 格式化日期

  ruleFormRef.value.validate((valid) => {
    if (valid) {
      emit('update:dialogVisible', false)

      editUser(form).then(() => {
        emit('editData') // 通知父组件更新数据
        ElMessage({
          type: 'success',
          message: '修改成功',
        })
        handleClose() // 提交成功后关闭弹框并重置表单
      })
    } else {
      ElMessage.error('请检查是否修改完成！')
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

const handleClose = () => {
  emit('update:dialogVisible', false)
  ruleFormRef.value.resetFields() // 重置表单
}
</script>

<template>
  <el-dialog
    v-model="innerDialogVisible"
    title="请进行编辑"
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
        <el-form-item label="性别" prop="sex">
          <el-select v-model="form.sex">
            <el-option label="男" :value="0" />
            <el-option label="女" :value="1" />
          </el-select>
        </el-form-item>
        <el-form-item label="出生日期" prop="birth">
          <el-date-picker
            v-model="form.birth"
            type="date"
            placeholder="请选择出生日期"
            format="YYYY-MM-DD"
            value-format="YYYY-MM-DD"
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
        <el-button type="primary" @click="onSubmit">确定</el-button>
      </div>
    </template>
  </el-dialog>
</template>
