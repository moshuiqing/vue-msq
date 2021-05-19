import request from '@/utils/request'

const URL = '/system/sys-user'

// 获取用户菜单
export function getMyMenus() {
  return request({
    url: URL + '/getMyMenus',
    method: 'post'
  })
}

// 获取全部菜单
export function getAllMenus() {
  return request({
    url: '/system/index/getAllMenus',
    method: 'post'
  })
}

export function getPageFound(param) {
  return request({
    url: URL + '/pageFound',
    method: 'post',
    params: param

  })
}

// 新增
export function add(param) {
  return request({
    url: '/system/sys-menu/add',
    method: 'post',
    params: param
  })
}

// 修改
export function update(param) {
  return request({
    url: '/system/sys-menu/update',
    method: 'post',
    params: param
  })
}
