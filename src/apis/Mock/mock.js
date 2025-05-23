import Mock from 'mockjs'
import { getHomeData } from './mockData/home'
import { getUserData } from './mockData/user'
// 模拟接口地址和数据
// '/apis/home/tableList'：拦截这个接口的 GET 请求。
// 'get'：请求方式。
// {...}：模拟的返回数据结构。
Mock.mock('https://apifoxmock.com/m1/4068509-0-default/api/home/getTable', 'get', {
  code: 200,
  message: '成功',
  data: getHomeData(),
})
// Mock.mock('https://apifoxmock.com/m1/4068509-0-default/api', 'get', {
//   code: 200,
//   message: '成功',
//   data: getHomeCountData(),
// })

let fixedUserData = getUserData() //预先生成一批固定数据，存起来
Mock.mock(/\/api\/user\/getList.*$/, 'get', (options) => {
  // 注意 options.url 里带的是完整 URL，确保能用 URL 构造器解析
  const url = new URL(options.url, 'https://apifoxmock.com/m1/4068509-0-default')
  // 获取搜索关键词和分页参数
  const name = url.searchParams.get('name') || ''
  const page = parseInt(url.searchParams.get('page') || '1', 10)
  const pageSize = parseInt(url.searchParams.get('pageSize') || '15', 10)

  // 筛选匹配 name 的用户（模糊搜索）
  const filteredList = fixedUserData.list.filter((item) => item.name.includes(name))

  // 计算分页数据
  const start = (page - 1) * pageSize
  const end = start + pageSize
  const pagedList = filteredList.slice(start, end)

  return {
    code: 200,
    message: '成功',
    data: {
      list: pagedList,
      total: filteredList.length, // 注意：是筛选后的总数
      page,
      pageSize,
    },
  }
})

// 模拟删除用户接口
Mock.mock(/user\/deleteUser/, 'get', (req) => {
  const urlParams = new URLSearchParams(req.url.split('?')[1])
  const id = urlParams.get('id') // 获取 id
  // 检查 id 是否有效
  if (!id) {
    return {
      code: 400,
      msg: '缺少参数 id',
    }
  }
  // 删除对应 ID 的用户
  fixedUserData.list = fixedUserData.list.filter((item) => item.id != id)
  return {
    code: 200,
    message: '删除成功',
  }
})

// 生成 UUID 的函数 //用来生成用户id
const generateUserID = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, function (c) {
      var r = (Math.random() * 16) | 0,
        v = c === 'x' ? r : (r & 0x3) | 0x8
      return v.toString(16)
    })
    .toUpperCase()
}
// 模拟添加用户接口
Mock.mock(/user\/addUser/, 'post', (req) => {
  const { name, age, sex, birth, addr } = JSON.parse(req.body)
  // 生成新的用户 id
  const newUser = {
    id: generateUserID(), // 生成一个新的 UUID 作为 id
    name,
    age,
    sex,
    birth,
    addr,
  }

  // 将新用户添加到用户数据列表中
  fixedUserData.list.push(newUser)
  return {
    code: 200,
    msg: '添加成功',
    data: newUser, // 返回新增的用户信息
  }
})

// 模拟编辑用户接口
Mock.mock(/user\/editUser/, 'post', (req) => {
  const updatedUser = JSON.parse(req.body) // 获取请求体中的用户数据
  const { id, name, age, sex, birth, addr } = updatedUser
  // 校验 id 是否存在
  if (!id) {
    return {
      code: 400,
      msg: '缺少参数 id',
    }
  }

  // 找到要编辑的用户并更新信息
  const userIndex = fixedUserData.list.findIndex((user) => user.id === id)
  if (userIndex === -1) {
    return {
      code: 404,
      msg: '用户不存在',
    }
  }

  // 更新对应用户的信息
  fixedUserData.list[userIndex] = {
    ...fixedUserData.list[userIndex], // 保留旧字段（如以后添加了其他字段）
    name,
    age,
    sex,
    birth,
    addr,
  }

  return {
    code: 200,
    message: '编辑成功',
    data: fixedUserData.list[userIndex], // 返回更新后的用户信息
  }
})

// 登录接口

// 登录接口

// 登录接口(有问题)
Mock.mock('https://apifoxmock.com/m1/4068509-0-default/api/login/', 'get', (options) => {
  let body = {}
  try {
    body = JSON.parse(options.body || '{}')
  } catch {
    return {
      code: 400,
      message: '请求格式错误',
    }
  }

  const { username, password } = body

  if (username === 'admin' && password === 'admin') {
    return {
      code: 200,
      message: '登录成功',
      data: {
        token: Mock.Random.guid(),
        userInfo: {
          username: 'admin',
          nickname: '管理员',
          role: 'admin',
        },
      },
    }
  } else {
    return {
      code: 401,
      message: '用户名或密码错误',
    }
  }
})
