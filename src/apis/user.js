import request from '@/utils/request'
//获取用户信息列表
export const getUserData = (params) => {
  return request({
    url: '/user/getList',
    method: 'get',
    params, // 注意这里是否写对了
  })
}

//删除用户信息
export const deleteUser = (params) => {
  return request({
    url: `/user/deleteUser?id=${params.id}`, // 确保拼接了 id
    method: 'get',
  })
}

//添加用户信息
export const addUser = (data) => {
  return request({
    url: '/user/addUser',
    method: 'post',
    data,
  })
}

//编辑用户信息
export const editUser = (data) => {
  return request({
    url: '/user/editUser',
    method: 'post',
    data,
  })
}
