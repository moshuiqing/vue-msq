import { getPageFound, getAllMenus, add, update } from '@/api/menu'

const actions = {
  getPageFound({ commit }, param) {
    return new Promise((resolve, reject) => {
      getPageFound(param).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  getAllMenus({ commit }) {
    return new Promise((resolve, reject) => {
      getAllMenus().then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  add({ commit }, param) {
    return new Promise((resolve, reject) => {
      add(param).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  },
  update({ commit }, param) {
    return new Promise((resolve, reject) => {
      update(param).then(res => {
        resolve(res)
      }).catch(err => {
        reject(err)
      })
    })
  }
}

export default {
  namespaced: true,
  actions
}

