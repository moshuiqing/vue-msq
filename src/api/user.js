import request from '@/utils/request'

export function login(data) {
  return request({
    url: '/system/sys-user/login',
    method: 'post',
    data
  })
}

export function getInfo() {
  return request({
    url: '/system/sys-user/getUserInfo',
    method: 'post'

  })
}

export function logout() {
  return request({
    url: '/vue-admin-template/user/logout',
    method: 'post'
  })
}
