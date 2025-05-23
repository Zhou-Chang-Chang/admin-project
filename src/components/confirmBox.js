import { ElMessage, ElMessageBox } from 'element-plus'

export const openConfirm = (message) => {
  return new Promise((resolve, reject) => {
    ElMessageBox.confirm(message, '提示', {
      confirmButtonText: '确定',
      cancelButtonText: '取消',
      type: 'warning',
    })
      .then(() => {
        // 用户点击了“确定”，则 resolve
        ElMessage({
          type: 'success',
          message: '操作完成',
        })
        resolve() // 确认后 resolve，表示操作成功
      })
      .catch(() => {
        // 用户点击了“取消”，则 reject

        reject('cancel') // 取消时 reject，表示操作被取消
      })
  })
}
