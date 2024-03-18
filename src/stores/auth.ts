import { defineStore } from 'pinia'
import { useStorage } from '@vueuse/core'
import { LOGIN } from '../utils/links'
import { useCustomFetch } from '../composables/useCstomFetch'

export const useAuthStore = defineStore('auth', {
  state: () => ({
    'auth._token.local': useStorage('auth._token.local', ''),
    email: ''
  }),
  getters: {
    isLogin: (state) => !!state['auth._token.local'],
    token: (state) => state['auth._token.local']
  },
  actions: {
    async login(payload: any) {
      return useCustomFetch(LOGIN, {
        method: 'POST',
        body: payload
      }).then((response: any) => {
        if (response) {
          const tokenValue = `${response?.data?.access_token}`
          this.setToken(tokenValue)
        }
        return response
      })
    },
    setToken(token: string) {
      if (token) {
        token = `Bearer ${token}`
      }
      localStorage.setItem('auth._token.local', token || '')
      this['auth._token.local'] = token || ''
    }
  }
})
