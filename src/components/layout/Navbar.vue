<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import { LogIn, UserPlus, LogOut, User } from 'lucide-vue-next'
import { useAuthStore } from '@/stores/auth'
import { toast } from 'vue-sonner'
import type { CurrentUser } from '@/types/auth'

const router = useRouter()
const authStore = useAuthStore()

const user = ref<CurrentUser | null>(null)
const isLoading = ref(true)

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

const handleLogout = () => {
  authStore.logout()
  user.value = null
  toast.success('Logged out successfully!')
  router.push('/')
}

onMounted(() => {
  checkAuth()
  
  // Listen for storage changes (when user logs in/out from other tabs)
  const handleStorageChange = (e: StorageEvent) => {
    if (e.key === 'ticketapp_session') {
      checkAuth()
    }
  }

  // Listen for custom auth events (when user logs in/out from same tab)
  const handleAuthChange = () => {
    checkAuth()
  }

  window.addEventListener('storage', handleStorageChange)
  window.addEventListener('authChange', handleAuthChange)

  onUnmounted(() => {
    window.removeEventListener('storage', handleStorageChange)
    window.removeEventListener('authChange', handleAuthChange)
  })
})
</script>

<template>
  <header class="bg-[#232323] text-white font-mono">
    <nav class="container mx-auto px-4 py-4">
      <div class="flex items-center justify-between">
        <RouterLink to="/" class="flex items-center space-x-2 hover:opacity-80 transition-opacity">
          <h1 class="text-2xl font-bold">DST</h1>
        </RouterLink>

        <ul class="hidden md:flex items-center space-x-8">
          <li>
            <RouterLink to="/" class="hover:text-gray-300 transition-colors">
              Home
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dashboard/tickets" class="hover:text-gray-300 transition-colors">
              Tickets
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/dashboard" class="hover:text-gray-300 transition-colors">
              Dashboard
            </RouterLink>
          </li>
          <li>
            <RouterLink to="/contact" class="hover:text-gray-300 transition-colors">
              Contact
            </RouterLink>
          </li>
        </ul>

        <div class="flex items-center space-x-4">
          <div v-if="isLoading" class="text-gray-300 font-mono">Loading...</div>
          <template v-else-if="user">
            <RouterLink to="/dashboard" class="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#232323] transition-colors">
              <User class="h-4 w-4" />
              <span>{{ user.name }}</span>
            </RouterLink>
            <button
              @click="handleLogout"
              class="flex items-center space-x-2 px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
            >
              <LogOut class="h-4 w-4" />
              <span>Logout</span>
            </button>
          </template>
          <template v-else>
            <RouterLink to="/auth?mode=login" class="flex items-center space-x-2 px-4 py-2 border border-white rounded-md hover:bg-white hover:text-[#232323] transition-colors">
              <LogIn class="h-4 w-4" />
              <span>Sign In</span>
            </RouterLink>
            <RouterLink to="/auth?mode=register" class="flex items-center space-x-2 px-4 py-2 bg-white text-[#232323] rounded-md hover:bg-gray-200 transition-colors">
              <UserPlus class="h-4 w-4" />
              <span>Sign Up</span>
            </RouterLink>
          </template>
        </div>
      </div>
    </nav>
  </header>
</template>
