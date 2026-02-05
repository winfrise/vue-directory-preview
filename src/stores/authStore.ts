import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
// import { login as apiLogin } from '@/api/auth'

export const useAuthStore = defineStore('auth', () => {
  const token = ref<string | null>(null)
  const username = ref<string | null>(null)

  const isAuthenticated = computed(() => !!token.value)

  async function login(credentials: { username: string; password: string }) {
    // const res = await apiLogin(credentials)
    const res = {
      data: {
        token: 'token_xxx'
      }
    }
    token.value = res.data.token
    username.value = credentials.username
  }

  function logout() {
    token.value = null
    username.value = null
  }

  return {
    token,
    username,
    isAuthenticated,
    login,
    logout
  }
}, {
  persist: true
})