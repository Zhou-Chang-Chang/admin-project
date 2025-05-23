import Mock from 'mockjs'

// 计算年龄函数
function calculateAge(birth) {
  const birthDate = new Date(birth)
  const today = new Date()
  let age = today.getFullYear() - birthDate.getFullYear()
  const m = today.getMonth() - birthDate.getMonth()
  if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) {
    age--
  }
  return age
}

export const getUserData = () => {
  const data = Mock.mock({
    'list|200': [
      {
        id: '@guid',
        name: '@cname',
        birth: '@date("yyyy-MM-dd")',
        sex: '@integer(0, 1)',
        addr: '@province @city @county',
      },
    ],
  })

  // 根据 birth 计算 age
  data.list.forEach((item) => {
    item.age = calculateAge(item.birth)
  })

  return data
}
