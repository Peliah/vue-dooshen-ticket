import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { toast } from 'vue-sonner'
import type { CurrentUser, User } from '@/types/auth'

export const useAuthStore = defineStore('auth', () => {
    const user = ref<CurrentUser | null>(null)
    const isLoading = ref(true)

    // Computed
    const isAuthenticated = computed(() => !!user.value)

    // Actions
    const checkAuth = () => {
        try {
            const session = localStorage.getItem('ticketapp_session')
            if (session) {
                const userData = JSON.parse(session)
                user.value = userData
            } else {
                user.value = null
            }
        } catch (error) {
            console.error('Error parsing user data:', error)
            localStorage.removeItem('ticketapp_session')
            user.value = null
        } finally {
            isLoading.value = false
        }
    }

    const login = (userData: CurrentUser) => {
        localStorage.setItem('ticketapp_session', JSON.stringify(userData))
        user.value = userData
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new Event('authChange'))
    }

    const logout = () => {
        localStorage.removeItem('ticketapp_session')
        user.value = null
        // Dispatch custom event to notify navbar
        window.dispatchEvent(new Event('authChange'))
    }

    const handleLogin = async (email: string, password: string) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Get stored users from localStorage
            const storedUsers = localStorage.getItem('dst_users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

            // Find user
            const foundUser = users.find((u) => u.email === email && u.password === password)

            if (foundUser) {
                const currentUser: CurrentUser = {
                    id: foundUser.id,
                    email: foundUser.email,
                    name: foundUser.name,
                    loginTime: new Date().toISOString(),
                }

                login(currentUser)
                toast.success('Login successful! Welcome back!')
                return { success: true }
            } else {
                toast.error('Invalid email or password')
                return { success: false, error: 'Invalid email or password' }
            }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
            return { success: false, error: 'An error occurred. Please try again.' }
        }
    }

    const handleRegister = async (name: string, email: string, password: string) => {
        try {
            // Simulate API call delay
            await new Promise(resolve => setTimeout(resolve, 1000))

            // Get stored users from localStorage
            const storedUsers = localStorage.getItem('dst_users')
            const users: User[] = storedUsers ? JSON.parse(storedUsers) : []

            // Check if user already exists
            const existingUser = users.find((u) => u.email === email)
            if (existingUser) {
                toast.error('An account with this email already exists')
                return { success: false, error: 'An account with this email already exists' }
            }

            // Create new user
            const newUser: User = {
                id: Date.now().toString(),
                name: name.trim(),
                email,
                password,
                createdAt: new Date().toISOString(),
            }

            // Store user
            users.push(newUser)
            localStorage.setItem('dst_users', JSON.stringify(users))

            // Create current user session
            const currentUser: CurrentUser = {
                id: newUser.id,
                email: newUser.email,
                name: newUser.name,
                loginTime: new Date().toISOString(),
            }

            login(currentUser)
            toast.success('Account created successfully! Welcome to DST!')
            return { success: true }
        } catch (error) {
            toast.error('An error occurred. Please try again.')
            return { success: false, error: 'An error occurred. Please try again.' }
        }
    }

    return {
        user,
        isLoading,
        isAuthenticated,
        checkAuth,
        login,
        logout,
        handleLogin,
        handleRegister
    }
})
