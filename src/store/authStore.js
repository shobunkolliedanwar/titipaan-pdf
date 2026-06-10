import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import api from '../lib/api'

const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      loading: false,

      login: async (email, password) => {
        set({ loading: true })
        try {
          const { data } = await api.post('/api/auth/login', { email, password })
          set({ 
            user: data.user, 
            token: data.token,
            loading: false 
          })
          return data
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      register: async (email, password, full_name) => {
        set({ loading: true })
        try {
          const { data } = await api.post('/api/auth/register', { 
            email, 
            password, 
            full_name 
          })
          set({ 
            user: data.user, 
            token: data.token,
            loading: false 
          })
          return data
        } catch (error) {
          set({ loading: false })
          throw error
        }
      },

      logout: () => {
        set({ user: null, token: null })
      },

      setToken: (token) => set({ token }),
      setUser: (user) => set({ user })
    }),
    {
      name: 'auth-store',
      partialize: (state) => ({ token: state.token, user: state.user })
    }
  )
)

export default useAuthStore
