import request from '@/utils/request'

export const Login = (username, password) => {
  return request({
    url: '/login',
    method: 'get',
    data: {
      username,
      password,
    },
  })
}
